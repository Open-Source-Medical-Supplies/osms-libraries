import ActiveLib from '../types/lib.enum';

const libReducer = (
  state = ActiveLib.CATEGORIES,
  { type }: { type: ActiveLib }
) => {
  if (type in ActiveLib) {
    return type
  }
  return state;
}

export default libReducer;