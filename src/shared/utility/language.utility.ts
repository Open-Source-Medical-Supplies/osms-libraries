import { LanguageBase } from "../../redux/language.reducer";
import { useTypedSelector } from "../../redux/root.reducer";
import { IETF, IETF_MAIN, iIETF } from "../constants/ietf.constants";
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
        loading: true,
        selected,
      };
		}
		
		if (base.error) {
			console.error('Language table load error');
			return {
        get: () => "Error",
        loading: false,
        selected,
      };
		}

    return {
      get: (key: string) => getLangVal(base, key, selected),
      loading: false,
      selected,
    };
	});
	
export const getNavLangAsIETF = (): iIETF => {
	const navLang = navigator.language;
	if (navigator.language.length === 5) {
		return navLang as IETF;
	}
	const foundLang = Object.values(IETF_MAIN).find(k => k.includes(navLang));
	if (foundLang) {
		return foundLang;
	}
	console.warn('could not find language based on navigator.language');
	return IETF['en-US']
}

/** Handles fall-back scenarios during language retrieval */
export const getLangVal = (
  langObj: LanguageBase,
  key: string,
  useLang: undefined | IETF
) => {
  let langKey = useLang || (navigator.language as IETF);

  /**
   * If the langKey, eg. en-GB, doesn't exist in the translated keys,
   * attempt to find a partial match back to one that does, or fallback to en-US
   * e.g. en-GB -> en -> en-US
   * e.g. fr-CA -> fr -> fr-FR
   */
  if (!langObj[langKey]) {
    const major = langKey.slice(0, 2);
    const tempKey = Object.keys(langObj).find((k) => k.includes(major)) as IETF;
    langKey = tempKey || IETF["en-US"];
  }

  let val: string;
  try {
    val = langObj[langKey][key];
  } catch (e) {
    console.warn(
      `
      Couldn't retrieve value for ${langKey}, ${key}.
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
