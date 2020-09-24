import { BasicObject } from "../types/shared.type";

type KeyMap = BasicObject<string | string[]>;

const setKlassAtr = (klass: any, klassKey: string, val: any) => {
  const onlyImageURL: boolean = klassKey === DataConverter.classMaps.imageURL;
  if (onlyImageURL) {
    klass[klassKey] = val[0].thumbnails.large.url;
  } else if (Array.isArray(val) && val.length === 1) {
    klass[klassKey] = val[0];
  } else {
    klass[klassKey] = val;
  }
}

const DataConverter = {
  /** 
   * @param {keyMap} - alike {
   *  [airtableKey: string]: [frontendKey: string | string[]],
   *  ...
   * }
   * Where frontendKey = klassKey, e.g. frontendKey = 'foo'; -> Project[foo]
   * 
   * IF keyMap[airtableKey] is an Array, e.g. frontendKey = ['foo', 'bar'],
   *  the matching value from the database will be applied to both klassKeys
   *  ... I abuse this a bit for image handling as you'll see.
   * 
   */
  format: function(klass: any, data: BasicObject<any>, keyMap: KeyMap): any {
    if (data.fields) {
      throw TypeError('Data should be handled better before this point');
    }
    Object.entries(data).forEach(([atKey, val]) => {
      if (keyMap.hasOwnProperty(atKey)) {
        if (Array.isArray(keyMap[atKey])) {
          (keyMap[atKey] as string[]).forEach(klassKey => {
            setKlassAtr(klass, klassKey, val);
          })
        } else {
          setKlassAtr(klass, keyMap[atKey] as string, val);
        }
      } else {
        klass.raw[atKey] = val;
      }
    })
  },
  sharedFields: {
    New: 'isNew',
    Updated: 'isUpdated'
  },
  classMaps: {
    imageURL: 'imageURL',
    imageRaw: 'imageRaw',
    displayName: 'displayName',
    WEB_NAME: {'web-name': 'key'},
    IMAGE_URL: {'Image': 'imageURL'},
    DISPLAY_NAME: {'Display Name': 'name'}
  }
}

export default DataConverter;