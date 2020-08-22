import { LanguageBase } from "../../redux/language.reducer";
import { useTypedSelector } from "../../redux/root.reducer";
import { IETF } from "../constants/ietf.constants";
import { AirtableRecords } from "../types/airtable.type";
import { BasicObject } from "../types/shared.type";
import { empty } from "./general.utility";

/**
 * Main language function
 * Use alike:
 *  const Lang = getLang();
 *  ...
 *  <label>{Lang.get('someLabel')}</label>
 *
 * Only callable w/in a valid React component
 */
export const getLang = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useTypedSelector(({ lang: { base, selected } }) => {
    if (!base || empty(base)) {
      return {
        get: () => "Loading",
      };
    }
    return {
      get: (key: string) => getLangVal(base, key, selected),
    };
  });

// basically a function just to handle fall-backs
export const getLangVal = (
  langObj: LanguageBase,
  key: string,
  useLang: undefined | IETF
) => {
  const lang = useLang || (navigator.language as IETF);
  let val: string;
  try {
    val = langObj[lang][key];
  } catch (e) {
    console.warn(
      `
      Couldn't retrieve value for ${lang}, ${key}.
      Attempting to default to en-US.
    `,
      e
    );
    try {
      val = langObj[IETF["en-US"]][key];
    } catch {
      console.warn(`Couldn't retrieve en-US, ${key}`, e);
      val = "err";
    }
  }
  return val;
};

// called by the reducer
export const mapLangData = (
  data: AirtableRecords<BasicObject<string>>
): LanguageBase => {
  return data.reduce((acc: LanguageBase, { fields }) => {
    // parse each row; a single value, e.g. {key: hello, en-US: Hello, es-ES: Hola, etc.}
    const { key, ...langs } = fields;
    // key = 'hello',
    // langs = { en-US: Hello, ... }
    for (const lang in langs) {
      const val = langs[lang];
      // lang = 'en-US'
      if (acc[lang]) {
        // {'en-US': {'foo': 'Foo'}}
        acc[lang][key] = val;
      } else {
        acc[lang] = {
          [key]: val,
        };
      }
    }
    return acc;
  }, {});
};
