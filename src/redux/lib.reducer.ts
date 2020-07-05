import ActiveLib from '../types/lib.enum';

const libReducer = (
  state = ActiveLib.CATEGORY,
  { type }: { type: ActiveLib }
) => {
  switch (type) {
    case ActiveLib.CATEGORY: case ActiveLib.PROJECT:
      return type
    default:
      return state;
  }
}

export default libReducer;