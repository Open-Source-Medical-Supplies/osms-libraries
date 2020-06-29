import { RootState } from "../redux/root.reducer";
import { timeNow } from "../shared/utility/general.utility";

export class LocalStorageService {
  // handles storage / access & refresh-timing for local-storage Store data
  allowed = false;
  timeout = 600000;

  constructor(
    private updateStore: () => RootState,
    private store: RootState,
  ) {
    this.testForLS();
  }

  destroy(): void {
    this.deleteLocalStore();
    this.deleteStoredTime();
  }
  
  setLocalData(data: RootState) {
    if (!this.allowed) return;
    window.localStorage.setItem('osms_store', JSON.stringify(data));
    this.updateStoredTime();
  }
  
  getLocalData(): RootState {
    if (!this.allowed) {
      return this.store;
    }

    if (this.storeExpired()) {
      const newStore = this.updateStore();
      this.setLocalData(newStore);
      return newStore;
    }

    const data = window.localStorage.getItem('osms_store');
    if (data) {
      return JSON.parse(data) as RootState;
    }
    return this.store;
  }

  deleteLocalStore(): void {
    if (!this.allowed) return;
    window.localStorage.removeItem('osms_store');
  }

  storeExpired(): boolean {
    // 10 minutes as ms
    const diff = timeNow() - this.getStoredTime();
    return diff > this.timeout;
  }


  private getStoredTime(): number {
    const data = window.localStorage.getItem('osms_store-last_updated');
    if (data) {
      return new Date(JSON.parse(data)).getTime();
    }
    return timeNow();
  }

  private updateStoredTime(): void {
    if (!this.allowed) return;
    window.localStorage.setItem('osms_store-last_updated', JSON.stringify(new Date()));
  }

  private deleteStoredTime(): void {
    if (!this.allowed) return;
    window.localStorage.removeItem('osms_store-last_updated')
  }

  private testForLS(): void {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      this.allowed = true;
    } catch {
      this.allowed = false;
      console.warn('LocalStorage is disabled - page performance will suffer.');
    }
  }
}