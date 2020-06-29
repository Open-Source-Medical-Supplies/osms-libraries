import { BasicObject } from "../types/shared.type";
import { valueof } from "../types/general.type";

const parseImageUrl = (img: Array<{thumbnails: {large: {url: string}}}>) => img[0].thumbnails.large.url;

export class DataConverter<T> {
  [k: string]: valueof<T>;
  raw: any = {}; // May be a better way than using any here, but makes it cleaner elsewhere

  static parseImageUrl = parseImageUrl;

  // keyMap = { [airtableKey: string]: [frontendKey: string], ... }
  constructor(data: BasicObject<any>, keyMap: BasicObject<string>) {
    Object.entries(data).forEach(([atKey, val]) => {
      if (keyMap.hasOwnProperty(atKey)) {
        this[keyMap[atKey]] = atKey.toLowerCase().includes('image') ?
          DataConverter.parseImageUrl(val) : val;
      } else {
        this.raw[atKey] = val;
      }
    })
  }
}
