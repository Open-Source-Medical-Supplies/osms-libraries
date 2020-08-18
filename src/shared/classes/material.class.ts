import { BasicObject } from "../types/shared.type";
import DataConverter from "./data-converter";

const RawMap = {
  'Detail': 'detail',
  'Full Project Name': 'name',
  'Function': 'fn',
  'Ideal Material Name': 'idealCaption',
  ...DataConverter.classMaps.IMAGE_URL,
};

export class Material {
  detail!: string;
  name!: string;
  fn!: string;
  idealCaption!: string;
  imageURL!: string;
  raw: BasicObject<any> = {};

  constructor(data: BasicObject<any>) {
    DataConverter.format(this, data, RawMap);
  }
}
