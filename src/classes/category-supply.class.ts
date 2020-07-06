import { BasicObject } from "../types/shared.type";
import DataConverter, { ClassMaps, sharedFields } from "./data-converter";

const RawMap = {
  "CoverImage": ClassMaps.imageURL,
  ...ClassMaps.DISPLAY_NAME,
  ...ClassMaps.WEB_NAME,
  ...sharedFields
};

export class CategorySupply {
  // Used by the Projects library
  
  imageURL!: string;
  name!: string;
  key!: string;
  isNew!: '0' | '1';
  isUpdated!: '0' | '1';
  raw: BasicObject<any> = {};

  constructor(data: BasicObject<any>) {
    DataConverter.format(this, data, RawMap);
  }
}
