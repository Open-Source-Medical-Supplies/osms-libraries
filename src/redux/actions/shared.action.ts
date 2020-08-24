import { TypedThunkAction } from "../root.reducer";
import { CategoryInfo } from "../../shared/classes/category-info.class";
import { setLib } from "./lib.action";
import ActiveLib from "../../shared/types/lib.enum";
import { setCategories } from "./filter.action";

export const filterFromCategoryToProjects = (
  category: CategoryInfo['displayName']
): TypedThunkAction => (dispatch, _) => {
  dispatch(setLib(ActiveLib.PROJECT))
  dispatch(setCategories({
    [category]: true
  }))
};