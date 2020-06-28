declare module 'primereact/components/utils/DomHandler' {
  // https://github.com/primefaces/primereact/blob/master/src/components/utils/DomHandler.js

  function innerWidth(el: HTMLElement): number;
  function width(el: HTMLElement): number;
  function getWindowScrollTop(): number;
  function getWindowScrollLeft(): number;
  function getOuterWidth(el: HTMLElement, margin?: boolean): number;
  function getOuterHeight(el: HTMLElement, margin?: boolean): number;
  function getClientHeight(el: HTMLElement, margin?: boolean): number;
  function getViewport(): { width: number; height: number; };
  function getOffset(el: HTMLElement): { top: number | 'auto'; left: number | 'auto' };
  function generateZIndex(): number;
  function getCurrentZIndex(): number;
  function index(element: HTMLElement): number;
  function addMultipleClasses(element: HTMLElement, className: string): void;
  function addClass(element: HTMLElement, className: string): void;
  function removeClass(element: HTMLElement, className: string): void;
  function hasClass(element: HTMLElement, className: string): void;
  function find(element: HTMLElement, selector: string): HTMLElement[] | [];
  function findSingle(element: HTMLElement, selector: string): HTMLElement | null;
  function getHeight(el: HTMLElement): number;
  function getWidth(el: HTMLElement): number;
  function absolutePosition(element: HTMLElement, target: HTMLElement): void;
  function relativePosition(element: HTMLElement, target: HTMLElement): void;
  function getHiddenElementOuterHeight(element: HTMLElement): number;
  function getHiddenElementOuterWidth(element: HTMLElement): number;
  function getHiddenElementDimensions(element: HTMLElement): { width?: number; height?: number; };
  function fadeIn(element: HTMLElement, duration: number): void;
  function fadeOut(element: HTMLElement, ms: number): void;
  function getUserAgent(): string;
  function isIOS(): boolean;
  function isAndroid(): boolean;
  function appendChild(element: HTMLElement, target: HTMLElement): void;
  function scrollInView(container: HTMLElement, item: HTMLElement): void;
  function clearSelection(): void;
  function calculateScrollbarWidth(el: HTMLElement): number;
  function getBrowser(): any; // Browser object
  function resolveUserAgent(): { browser: string; version: string; };
  function isVisible(element: HTMLElement): boolean;
  function getFocusableElements(element: HTMLElement): HTMLElement[];
}