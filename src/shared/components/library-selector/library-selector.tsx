import { SelectButton } from "primereact/selectbutton";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLib } from '../../../redux/actions/lib.action';
import { useTypedSelector } from "../../../redux/root.reducer";
import ActiveLib from "../../types/lib.enum";
import { getLang } from "../../utility/language.utility";
import "./_library-selector.scss";

interface SelectBtnOption {
  label: string;
  value: ActiveLib;
}
type SelectBtnOptions = SelectBtnOption[];

const LibrarySelector = ({ className = "" }: { className: string }) => {
  const dispatch = useDispatch();
  const lib = useTypedSelector(({ lib }) => lib);
  const Lang = getLang();
  const options = useCallback<() => SelectBtnOptions>(() => Lang.loading ? [] : [
    {
      label: Lang.get("categories"),
      value: ActiveLib.CATEGORY,
    },
    {
      label: Lang.get("projects"),
      value: ActiveLib.PROJECT,
    },
  ], [Lang.selected, Lang.loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = (toLib: SelectBtnOption["value"]) => {
    if (!toLib || toLib === lib.active) return;
    dispatch(setLib(toLib));
  };
  
  return (
    <div className={"library-selector " + className}>
      <SelectButton
        value={lib.active}
        options={options()}
        onChange={(e) => onChange(e.value)}
      />
    </div>
  );
};

export default LibrarySelector;
