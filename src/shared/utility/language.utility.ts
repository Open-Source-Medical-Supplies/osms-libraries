import { BasicObject } from "../types/shared.type";

export const mapLangData = (data: any): BasicObject<string> => {
  const locale = navigator.language;
  return data.reduce((acc: BasicObject<string>, val: BasicObject<string>) => {
    const {key, ...langs} = val;
    const tempVal = langs[locale] || langs['en-US'];
    if (!tempVal) {
      console.warn('no value for ' + key);
    }
    acc[key] = tempVal || 'no val';
    return acc;
  }, {});
}