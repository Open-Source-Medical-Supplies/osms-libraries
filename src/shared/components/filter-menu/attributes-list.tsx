import TreeNode from "primereact/components/treenode/TreeNode";
import { Panel } from "primereact/panel";
import { Tree } from "primereact/tree";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { DispatchFilterAction } from "../../../redux/filter.reducer";
import { useTypedSelector } from "../../../redux/root.reducer";
import { FILTER_ACTIONS } from "../../constants/filter.constants";
import { TABLE_MAPPING } from "../../constants/general.constants";
import { FilterNodes } from "../../types/filter-node.type";
import { mapFilterData } from '../filter-menu/filter-menu.utilities';

const AttributesList = () => {
  const dispatch = useDispatch<DispatchFilterAction>();
  const { tables, nodeFilters } = useTypedSelector(({ tables, filter: { nodeFilters } }) => ({
    tables,
    nodeFilters,
  }));
  const nodes = useRef<FilterNodes>([]);

  useEffect(() => {
    if (tables.completed) {
      nodes.current = (tables.loaded[TABLE_MAPPING.FilterMenu] as ReturnType<typeof mapFilterData>).nodes;
    }
  }, [tables.completed]); // eslint-disable-line react-hooks/exhaustive-deps

  const setSelection = (event: {originalEvent: Event, value: any}) => {
    dispatch({
      type: FILTER_ACTIONS.SET_FILTER,
      payload: {
        nodeFilters: event.value,
        previousFilters: {
          nodeFilters
        }
      },
    });
  };
  

  return (
    <Panel header='Attributes' toggleable={true} className='attribute-list-panel filter-panel'>
      <Tree
        value={nodes.current as TreeNode[]}
        selectionMode="checkbox"
        selectionKeys={nodeFilters}
        onSelectionChange={setSelection}
        filter={true}
        filterPlaceholder="Filter attributes"
      ></Tree>
    </Panel>
  );
};

export default AttributesList;
