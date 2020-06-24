import { BasicObject } from "../types/shared.type";

export class DataConverter implements BasicObject<any> {
  [k: string]: any;
  raw: BasicObject<any> = {};

  static parseImageUrl(img: Array<{thumbnails: {large: {url: string}}}>) {
    return img[0].thumbnails.large.url
  }

  constructor(data: BasicObject<any>, keyMap: BasicObject<string>) {
    for (let key in data) {
      if (keyMap.hasOwnProperty(key)) {
        if (!data[key]) continue;
        
        this[keyMap[key]] = key.includes('image') ?
          DataConverter.parseImageUrl(data[key]) :
          data[key];
      } else {
        this.raw[key] = data[key];
      }
    }
  }
}
