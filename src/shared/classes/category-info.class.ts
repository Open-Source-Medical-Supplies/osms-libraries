import { BasicObject } from "../types/shared.type";
import DataConverter from "./data-converter";

// IMPORTANT
// If you add a new column in AT, it needs to be added to CardSections
const CardSections = [
	{
    key: 'disclaimer',
    value: 'Disclaimer'},
	{
    key: 'problem',
    value: 'The Problem'},
	{
    key: 'currentGlobalResources',
    value: 'Current Global Resources'},
	{
    key: 'engReqs',
    value: 'Engineering Requirements'},
	{
    key: 'addReqs',
    value: 'Additional Requirements'},
	{
    key: 'resources',
    value: 'Resources'},
	{
    key: 'designDisclaimers',
    value: 'Disclaimer Designs'
  }
];
const mappedSections = CardSections.reduce<BasicObject<string>>((acc, section) => {
  acc[section.value] = section.key;
  return acc;
}, {});

const RawMap = {
  "CategoryName": DataConverter.classMaps.displayName,
  "Medical Supply Category": 'categoryKey',
  ...DataConverter.classMaps.DISPLAY_NAME,
  ...DataConverter.classMaps.IMAGE_URL,
  ...DataConverter.classMaps.WEB_NAME,
  ...DataConverter.sharedFields,
  ...mappedSections
};

export class CategoryInfo {
  // used by the Category Library

  static CardSections = CardSections;

  addReqs!: string;
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
