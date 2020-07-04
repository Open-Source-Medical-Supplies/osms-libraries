import { BasicObject } from "../types/shared.type";

const DataConverter = {
  // keyMap = { [airtableKey: string]: [frontendKey: string], ... }
  format: function(klass: any, data: BasicObject<any>, keyMap: BasicObject<string>): any {
    Object.entries(data).forEach(([atKey, val]) => {
      if (keyMap.hasOwnProperty(atKey)) {
        klass[keyMap[atKey]] = atKey.toLowerCase().includes('image') ?
          this.parseImageUrl(val) :
          val;
      } else {
        klass.raw[atKey] = val;
      }
    })
  },
  parseImageUrl:(img: Array<{thumbnails: {large: {url: string}}}>) => img[0].thumbnails.large.url
}

export default DataConverter;