import { BasicObject } from "../types/shared.type";
import { valueOf } from "../types/general.type";

const parseImageUrl = (img: Array<{thumbnails: {large: {url: string}}}>) => img[0].thumbnails.large.url;

export class DataConverter<T> implements BasicObject<any> {
  [k: string]: Partial<valueOf<T>>;
  raw: any = {}; // May be a better way than using any here, but makes it cleaner elsewhere

  static parseImageUrl = parseImageUrl;

  // keyMap = { [airtableKey: string]: [frontendKey: string], ... }
  constructor(data: BasicObject<any>, keyMap: BasicObject<string>) {
    for (let key in data) {
      if (keyMap.hasOwnProperty(key)) {
        this[keyMap[key]] = key.toLowerCase().includes('image') ?
          DataConverter.parseImageUrl(data[key]) :
          data[key];
      } else {
        this.raw[key] = data[key];
      }
    }
  }
}
