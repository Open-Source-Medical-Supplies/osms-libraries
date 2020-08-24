import { TypedThunkAction } from "../root.reducer";
import { CategoryInfo } from "../../shared/classes/category-info.class";
import { changeLib } from "./lib.action";
import ActiveLib from "../../shared/types/lib.enum";
import { setCategories } from "./filter.action";

export const filterFromCategoryToProjects = (
  category: CategoryInfo['displayName']
): TypedThunkAction => (dispatch, _) => {
  dispatch(changeLib(ActiveLib.PROJECT))
  dispatch(setCategories({
    [category]: true
  }))
};