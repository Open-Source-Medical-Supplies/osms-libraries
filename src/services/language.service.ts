import { Dispatch } from "react";
import { SET_LANG } from "../redux/lang.reducer";
import { NestedBasicObject, BasicObject } from "../types/shared.type";
import { AirtableHelpers, AirtableSupportingCalls } from "./airtable";

const loadStaticLanguage = async (dispatch: Dispatch<any>): Promise<void>  => {
	const langData = await AirtableHelpers.callATbase(
		AirtableSupportingCalls.getStaticLanguage,
		(data: any) => data.reduce((a: NestedBasicObject<string>, v: BasicObject<string>) => {
      const {key, ...vals} = v;
      a[key] = vals;
      return a;
    }, {})
	);
	dispatch({type: SET_LANG, payload: langData})
};

const LanguageService = {
  loadStaticLanguage
}

export default LanguageService;