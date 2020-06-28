import { BasicObject } from "../types/shared.type";

const parseImageUrl = (img: Array<{thumbnails: {large: {url: string}}}>) => img[0].thumbnails.large.url;

export class DataConverter implements BasicObject<any> {
  [k: string]: any;
  raw: BasicObject<any> = {};

  static parseImageUrl = parseImageUrl;

  // keyMap = { [airtableKey: string]: [frontendKey: string], ... }
  constructor(data: BasicObject<any>, keyMap: BasicObject<string>) {
    for (let key in data) {
      if (keyMap.hasOwnProperty(key)) {
        if (!data[key]) {
          this[keyMap[key]] = undefined;  
        } else {
          this[keyMap[key]] = key.toLowerCase().includes('image') ?
            DataConverter.parseImageUrl(data[key]) :
            data[key];
        }
      } else {
        this.raw[key] = data[key];
      }
    }
  }
}
