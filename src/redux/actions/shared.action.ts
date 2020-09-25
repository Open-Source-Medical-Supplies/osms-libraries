import { Dispatch } from "react";
import { CategoryInfo } from "../../shared/classes/category-info.class";
import ActiveLib from "../../shared/types/lib.enum";
import { Selected } from "../../shared/types/selected.type";
import { RootState, TypedThunkAction } from "../root.reducer";
import { setCategories } from "./filter.action";
import { changeLib, setLib } from "./lib.action";
import { setSelected } from "./selected.action";

export const filterFromCategoryToProjects = (
  category: CategoryInfo['displayName']
): TypedThunkAction => (dispatch, _) => {
  dispatch(changeLib(ActiveLib.PROJECT))
  dispatch(setCategories({
    [category]: true
  }))
};

export const linkAcross = (
  data: Selected,
  displayName: string,
  origin: Selected
  ) => (dispatch: Dispatch<any>, getState: () => RootState) => {
  // set project as selected
  new Promise(r => {
    dispatch(setLib(ActiveLib.PROJECT));
    dispatch(
      setCategories({
        [displayName]: true,
      })
    );
    r();
  }).then(() => {
    dispatch(setSelected(
      data,
      ActiveLib.PROJECT, 
      origin
    ));
  });
};