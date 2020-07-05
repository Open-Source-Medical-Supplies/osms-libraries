import { BasicObject } from "../types/shared.type";
import DataConverter from "./data-converter";

const RawMap = {
  "Assembly/Fabrication Requirements": 'fabReqs',
  "CategoryName": 'displayName',
  "Image": 'imageURL',
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
  raw: BasicObject<any> = {};

  constructor(data: BasicObject<any>) {
    DataConverter.format(this, data, RawMap);
  }
}
