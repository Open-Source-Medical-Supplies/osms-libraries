import { BasicObject } from "../types/shared.type";
import { DataConverter } from "./data-converter.class";

const RawMap = {
  "Assembly/Fabrication Requirements": 'fabReqs',
  "CategoryName": 'categoryName',
  "CoverImage": 'imageURL',
  "Current Global Resources": 'currentGlobalResources',
  "Disclaimer": 'disclaimer',
  "Disclaimer Designs": 'designDisclaimers',
  "Display Name": 'name',
  "Engineering Requirements": 'engReqs',
  "Medical Supply Category": 'categoryKey',
  "Resources": 'resources',
  "The Problem": 'problem',
  "web-name": 'key'
};

const CardSections = [
	['disclaimer', 'Disclaimer'],
	['problem', 'The Problem'],
	['currentGlobalResources', 'Current Global Resources'],
	['engReqs', 'Engineering Requirements'],
	['fabReqs', 'Assembly/Fabrication Requirements'],
	['resources', 'Resources'],
	['designDisclaimers', 'Disclaimer Designs']
];

export type CategoryType = typeof RawMap & Category;

export class Category extends DataConverter {
  static CardSections = CardSections;

  constructor(data: BasicObject<any>) {
    super(data, RawMap);
  }
}
