import { BasicObject } from "../types/shared.type";
import DataConverter from "./data-converter";

const RawMap = {
  "CoverImage": 'imageURL',
  "Display Name": 'name',
  "web-name": 'key'
};

export class CategorySupply {
  // Used by the Projects library
  
  imageURL!: string;
  name!: string;
  key!: string;
  raw: BasicObject<any> = {};

  constructor(data: BasicObject<any>) {
    DataConverter.format(this, data, RawMap);
  }
}
