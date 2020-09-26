import { CategoryInfo } from "../../shared/classes/category-info.class";
import { Project } from "../../shared/classes/project.class";
import { TABLE_MAPPING } from "../../shared/constants/general.constants";
import ActiveLib from "../../shared/types/lib.enum";
import { Selected } from "../../shared/types/selected.type";
import { TypedThunkAction } from "../root.reducer";
import { setCategories } from "./filter.action";
import { changeLib } from "./lib.action";
import { setSelected, setSelectedByName } from "./selected.action";

export const filterFromCategoryToProjects = (
  category: CategoryInfo["displayName"]
): TypedThunkAction => (dispatch, _) => {
  dispatch(changeLib(ActiveLib.PROJECT));
  dispatch(
    setCategories({
      [category]: true,
    })
  );
};

export const libToCatAndSelectCategory = (
  displayName: string,
  selected: Selected
): TypedThunkAction => (dispatch, _) => {
  new Promise((r) => {
    dispatch(changeLib(ActiveLib.CATEGORY));
    r();
  }).then(() => {
    dispatch(
      setSelectedByName(
        displayName,
        "displayName",
        TABLE_MAPPING.CategoryInfo,
        ActiveLib.CATEGORY,
        selected
      )
    );
  });
};

export const linkAcross = (
  selected: Selected,
  displayName: string,
  origin?: Selected
): TypedThunkAction => (dispatch, _) => {
  const toLib = selected instanceof Project ? ActiveLib.PROJECT : ActiveLib.CATEGORY;

  dispatch(changeLib(toLib));

  if (selected instanceof Project) {
    // sets selected category as filter after jump to project lib
    dispatch(setCategories({ [displayName]: true }));
  }

  // for race issue
  setTimeout(() => dispatch(setSelected(
    selected,
    toLib,
    origin
  )));
};
