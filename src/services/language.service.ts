import { Dispatch } from "react";
import { SET_LANG } from "../redux/lang.reducer";
import { BasicObject } from "../types/shared.type";
import { AirtableHelpers, AirtableSupportingCalls } from "./airtable";

const loadStaticLanguage = async (dispatch: Dispatch<any>): Promise<void>  => {
  const locale = navigator.language;
	const langData = await AirtableHelpers.callATbase(
		AirtableSupportingCalls.getStaticLanguage,
		(data: any) => data.reduce((a: BasicObject<string>, v: BasicObject<string>) => {
      const {key, ...vals} = v;
      a[key] = vals[locale];
      return a;
    }, {})
	);
	dispatch({type: SET_LANG, payload: langData})
};

const LanguageService = {
  loadStaticLanguage
}

export default LanguageService;