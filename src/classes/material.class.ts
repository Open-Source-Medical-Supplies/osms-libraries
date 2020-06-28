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

export class Material extends DataConverter {
  constructor(data: BasicObject<any>) {
    super(data, RawMap);
  }

  toCarousel() {
    return {
			header: this.idealCaption || '',
			subHeader: this.detail || '',
			imageURL: this.imageURL || '',
		};
  }
}
