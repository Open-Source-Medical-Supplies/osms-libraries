import { BasicObject } from "../types/shared.type";
import { DataConverter } from "./data-converter.class";

enum RawMap {
  "Assembly/Fabrication Requirements" = 'fabReqs',
  "CategoryName" = 'categoryName',
  "Image" = 'imageURL',
  "Current Global Resources" = 'currentGlobalResources',
  "Disclaimer" = 'disclaimer',
  "Disclaimer Designs" = 'designDisclaimers',
  "Display Name" = 'name',
  "Engineering Requirements" = 'engReqs',
  "Medical Supply Category" = 'categoryKey',
  "Resources" = 'resources',
  "The Problem" = 'problem',
  "web-name" = 'key'
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

export type CategoryInfoType = typeof RawMap & CategoryInfo;

export class CategoryInfo extends DataConverter<typeof RawMap> {
  // used by the Category Library
  static CardSections = CardSections;

  constructor(data: BasicObject<any>) {
    super(data, RawMap);
  }
}
