import { BasicObject } from "../types/shared.type";
import { DataConverter } from "./data-converter.class";

const RawMap = {
  "CoverImage": 'imageURL',
  "Display Name": 'name',
  "web-name": 'key'
};


export class CategorySupply extends DataConverter {
  // Used by the Projects library
  
  imageURL: string | undefined;
  name: string | undefined;
  key: string | undefined;
  
  constructor(data: BasicObject<any>) {
    super(data, RawMap);
  }
}
