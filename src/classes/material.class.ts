import { BasicObject } from "../types/shared.type";
import { DataConverter } from "./data-converter.class";

const RawMap = {
  'Detail': 'detail',
  'Full Project Name': 'name',
  'Function': 'fn',
  'Ideal Material Name': 'idealCaption',
  'Image': 'imageURL'
};

export type MaterialType = typeof RawMap & Material;

export class Material extends DataConverter<typeof RawMap> {
  constructor(data: BasicObject<any>) {
    super(data, RawMap);
  }
}
