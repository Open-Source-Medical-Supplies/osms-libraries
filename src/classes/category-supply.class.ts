import { BasicObject } from "../types/shared.type";
import { DataConverter } from "./data-converter.class";

const RawMap = {
  "CoverImage": 'imageURL',
  "Display Name": 'name',
  "web-name": 'key'
};

export type CategorySupplyType = typeof RawMap & CategorySupply;

export class CategorySupply extends DataConverter<typeof RawMap> {
  // Used by the Projects library
  constructor(data: BasicObject<any>) {
    super(data, RawMap);
  }
}
