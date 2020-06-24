import { BasicObject } from "../types/shared.type";
import { DataConverter } from "./data-converter.class";

const RawMap = {
  "Display Name" : 'name',
  "web-name" : 'key',
  "CoverImage" : 'imageURL',
  "Medical Supply Category": 'categoryKey',
  "CategoryName": 'categoryName',
  "Disclaimer": 'disclaimer',
  "The Problem": 'problem',
  "Current Global Resources": 'currentGlobalResources',
  "Engineering Requirements": 'engReqs',
  "Assembly/Fabrication Requirements": 'fabReqs',
  "Resources": 'resources',
  "Disclaimer Designs": 'designDisclaimers'
};

export type CategoryType = typeof RawMap & Category;

export class Category extends DataConverter {
  constructor(data: BasicObject<any>) {
    super(data, RawMap);
  }
}
