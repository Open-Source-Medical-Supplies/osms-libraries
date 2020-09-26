import { CategoryInfo } from "../../shared/classes/category-info.class";
import { Project } from "../../shared/classes/project.class";
import { TABLE_MAPPING } from "../../shared/constants/general.constants";
import ActiveLib from "../../shared/types/lib.enum";
import { Selected } from "../../shared/types/selected.type";
import { TypedThunkAction } from "../root.reducer";
import { setCategories } from "./filter.action";
import { changeLib, setLib } from "./lib.action";
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

export const libToProjAndSetFilter = (
  displayName: string
): TypedThunkAction => (dispatch, _) => {
  dispatch(setLib(ActiveLib.PROJECT));
  dispatch(
    setCategories({
      [displayName]: true,
    })
  );
};

export const libToCatAndSelectCategory = (
  displayName: string,
  selected: Selected
): TypedThunkAction => (dispatch, _) => {
  dispatch(setLib(ActiveLib.CATEGORY));
  dispatch(
    setSelectedByName(
      displayName,
      "displayName",
      TABLE_MAPPING.CategoryInfo,
      ActiveLib.CATEGORY,
      selected
    )
  );
};

export const linkAcross = (
  selected: Selected,
  displayName: string,
  origin?: Selected
): TypedThunkAction => (dispatch, _) => {
  new Promise((r) => {
    if (selected instanceof Project) {
      dispatch(libToProjAndSetFilter(displayName));
    } else if (selected instanceof CategoryInfo) {
      dispatch(setLib(ActiveLib.CATEGORY));
    }
    r();
  }).then(() => {
    // for race issue
    if (selected instanceof Project) {
      dispatch(setSelected(selected, ActiveLib.PROJECT, origin));
    } else if (selected instanceof CategoryInfo) {
      dispatch(
        setSelectedByName(
          displayName,
          "displayName",
          TABLE_MAPPING.CategoryInfo,
          ActiveLib.CATEGORY
        )
      );
    }
  });
};
