import { Dispatch } from "react";
import { SET_LANG } from "../redux/lang.reducer";
import { BasicObject } from "../types/shared.type";
import { AirtableHelpers, AirtableSupportingCalls } from "./airtable";

const langReducer = (data: any) => {
  const locale = navigator.language;
  return data.reduce((acc: BasicObject<string>, val: BasicObject<string>) => {
    const {key, ...langs} = val;
    acc[key] = langs[locale] || langs['en-US'];
    return acc;
  }, {});
}

const loadStaticLanguage = async (dispatch: Dispatch<any>): Promise<void>  => {
	const langData = await AirtableHelpers.callATbase(
		AirtableSupportingCalls.getStaticLanguage,
    langReducer,
    false
	);
	dispatch({type: SET_LANG, payload: langData})
};

const LanguageService = {
  loadStaticLanguage
}

export default LanguageService;