import { BasicObject } from "../types/shared.type";
import { DataConverter } from "./data-converter.class";

enum RawMap {
  'Detail' = 'detail',
  'Full Project Name' = 'name',
  'Function' = 'fn',
  'Ideal Material Name' = 'idealCaption',
  'Image' = 'imageURL'
};

export type MaterialType = typeof RawMap & Material;

export class Material extends DataConverter<typeof RawMap> {
  static toCarousel(mat: MaterialType) {
    return {
			header: mat.idealCaption || '',
			subHeader: mat.detail || '',
			imageURL: mat.imageURL || '',
		};
  }

  constructor(data: BasicObject<any>) {
    super(data, RawMap);
  }
}
