import { Action } from "redux";
import { TableState } from "../../redux/tables.reducer";
import { CategoryInfo } from "../classes/category-info.class";
import { Material } from "../classes/material.class";
import { Project } from "../classes/project.class";
import { SELECTED_ACTIONS } from "../constants/selected.constants";
import { BasicObject } from "./shared.type";

export type SupportingDatum = Project | Material
export type SupportingData = SupportingDatum[];
export type SupportingDataSet = BasicObject<SupportingData>;

export type Selected = null | undefined | CategoryInfo | Project;

export interface SelectedState {
  data?: Selected;
  dataSet?: Selected[];
  supportingData?: SupportingData;
  supportingDataSet?: TableState['loaded'];
  selector?: string;
  origin?: Selected;
}

export type SelectAction = Action<SELECTED_ACTIONS> & SelectedState;