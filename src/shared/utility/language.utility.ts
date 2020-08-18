import { BasicObject } from "../types/shared.type";
import { AirtableRecord } from "../types/airtable.type";
import { useTypedSelector } from "../../redux/root.reducer";
import { TABLE_MAPPING } from "../constants/google-bucket.constants";

// Only callable w/in a valid React component
// eslint-disable-next-line react-hooks/rules-of-hooks
export const getLang = () => useTypedSelector(({tables}) => tables.completed ? tables.loaded[TABLE_MAPPING.Translations] as BasicObject<string> : {} )

export const mapLangData = (data: any): BasicObject<string> => {
  const locale = navigator.language;
  return data.reduce((acc: BasicObject<string>, {fields}: AirtableRecord<BasicObject<string>>) => {
    const {key, ...langs} = fields;
    const tempVal = langs[locale] || langs['en-US'];
    if (!tempVal) {
      console.warn('no value for ' + key);
    }
    acc[key] = tempVal || 'no val';
    return acc;
  }, {});
}