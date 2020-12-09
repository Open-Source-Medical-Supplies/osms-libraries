import { Dispatch } from "react";
import loadTables from "../../services/google-bucket.service";
import { IETF } from "../../shared/constants/ietf.constants";
import { LANG_ACTIONS } from "../language.reducer";
import { RootState } from "../root.reducer";
import { TABLE_ACTIONS } from "../tables.reducer";

export const changeLang = (key: IETF) => (dispatch: Dispatch<any>, _: () => RootState) => {
	console.log("language changed to " + key)

	dispatch({
		type: TABLE_ACTIONS.TABLES_RESET
	})

  dispatch({
		type: LANG_ACTIONS.SELECT_LANG,
		selected: key as IETF
	});

	loadTables(dispatch, key);
}