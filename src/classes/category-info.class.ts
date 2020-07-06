import { BasicObject } from "../types/shared.type";
import DataConverter from "./data-converter";

const RawMap = {
  "Assembly/Fabrication Requirements": 'fabReqs',
  "CategoryName": DataConverter.classMaps.displayName,
  "Current Global Resources": 'currentGlobalResources',
  "Disclaimer": 'disclaimer',
  "Disclaimer Designs": 'designDisclaimers',
  "Engineering Requirements": 'engReqs',
  "Medical Supply Category": 'categoryKey',
  "Resources": 'resources',
  "The Problem": 'problem',
  ...DataConverter.classMaps.DISPLAY_NAME,
  ...DataConverter.classMaps.IMAGE_URL,
  ...DataConverter.classMaps.WEB_NAME,
  ...DataConverter.sharedFields
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

export class CategoryInfo {
  // used by the Category Library

  static CardSections = CardSections;

  fabReqs!: string;
  displayName!: string;
  imageURL!: string;
  currentGlobalResources!: string;
  disclaimer!: string;
  designDisclaimers!: string;
  name!: string;
  engReqs!: string;
  categoryKey!: string;
  resources!: string;
  problem!: string;
  key!: string;
  isNew!: '0' | '1';
  isUpdated!: '0' | '1';
  raw: BasicObject<any> = {};

  constructor(data: BasicObject<any>) {
    DataConverter.format(this, data, RawMap);
  }
}
