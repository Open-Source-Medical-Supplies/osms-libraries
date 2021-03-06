import TreeNode from "primereact/components/treenode/TreeNode";
import { Panel } from "primereact/panel";
import { Tree } from "primereact/tree";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setAttributes } from "../../../redux/actions/filter.action";
import { DispatchFilterAction } from "../../../redux/filter.reducer";
import { useTypedSelector } from "../../../redux/root.reducer";
import { TABLE_MAPPING } from "../../constants/general.constants";
import { FilterNodes } from "../../types/filter-node.type";
import { getLang } from "../../utility/language.utility";
import { mapFilterData } from '../filter-menu/filter-menu.utilities';

const AttributesList = () => {
  const dispatch = useDispatch<DispatchFilterAction>();
  const { tables, nodeFilters } = useTypedSelector(({ tables, filter: { nodeFilters } }) => ({
    tables,
    nodeFilters,
  }));
  const nodes = useRef<FilterNodes>([]);
  const Lang = getLang();

  useEffect(() => {
    if (tables.completed) {
      nodes.current = (tables.loaded[TABLE_MAPPING.FilterMenu] as ReturnType<typeof mapFilterData>).nodes;
    }
  }, [tables.completed]); // eslint-disable-line react-hooks/exhaustive-deps

  const setSelection = (event: {originalEvent: Event, value: any}) => {
    dispatch(setAttributes(event.value));
  };
  
  return (
    <Panel header={Lang.get('attributes')} toggleable={true} className='attribute-list-panel filter-panel'>
      <Tree
        value={nodes.current as TreeNode[]}
        selectionMode="checkbox"
        selectionKeys={nodeFilters}
        onSelectionChange={setSelection}
        filter={true}
        filterPlaceholder="Search list"
      ></Tree>
    </Panel>
  );
};

export default AttributesList;
