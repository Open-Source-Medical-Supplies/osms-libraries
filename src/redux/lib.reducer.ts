import LIB from '../types/lib.enum';

const libReducer = (
  state = LIB.CATEGORIES,
  { type }: { type: LIB }
) => {
  if (type in LIB) {
    return type
  }
  return state;
}

export default libReducer;