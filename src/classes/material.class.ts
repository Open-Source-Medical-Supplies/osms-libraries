import { BasicObject } from "../types/shared.type";
import { DataConverter } from "./data-converter.class";

const RawMap = {
  name: "Full Project Name",
  idealCaption: "Ideal Material Name",
  imageURL: "Image",
  detail: "Detail",
  fn: "Function"
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
