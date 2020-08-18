import { BasicObject } from "../types/shared.type";

const DataConverter = {
  // keyMap = { [airtableKey: string]: [frontendKey: string], ... }
  format: function(klass: any, data: BasicObject<any>, keyMap: BasicObject<string>): any {
    if (data.fields) {
      throw TypeError('Data should be handled better before this point');
    }
    Object.entries(data).forEach(([atKey, val]) => {
      if (keyMap.hasOwnProperty(atKey)) {
        if (atKey.toLowerCase().includes('image')) {
          klass[keyMap[atKey]] = this.parseImageUrl(val);
        } else if (Array.isArray(val) && val.length === 1) {
          klass[keyMap[atKey]] = val[0];
        } else {
          klass[keyMap[atKey]] = val;
        }
      } else {
        klass.raw[atKey] = val;
      }
    })
  },
  parseImageUrl:(img: Array<{thumbnails: {large: {url: string}}}>) => img[0].thumbnails.large.url,
  sharedFields: {
    New: 'isNew',
    Updated: 'isUpdated'
  },
  classMaps: {
    imageURL: 'imageURL',
    displayName: 'displayName',
    WEB_NAME: {'web-name': 'key'},
    IMAGE_URL: {'Image': 'imageURL'},
    DISPLAY_NAME: {'Display Name': 'name'}
  }
}

export default DataConverter;