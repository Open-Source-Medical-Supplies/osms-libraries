import { BasicObject } from "../types/shared.type";
import DataConverter from "./data-converter";

const RawMap = {
  "CoverImage": DataConverter.classMaps.imageURL,
  ...DataConverter.classMaps.DISPLAY_NAME,
  ...DataConverter.classMaps.WEB_NAME,
  ...DataConverter.sharedFields
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
