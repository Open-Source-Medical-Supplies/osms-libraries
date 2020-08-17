import TreeNode from "primereact/components/treenode/TreeNode";
import { Panel } from "primereact/panel";
import { Tree } from "primereact/tree";
import React from "react";
import { FilterNodeData, FilterNodes } from "../../types/filter-node.type";

const AttributesList = ({
  nodes, nodeFilters, setFilterState
}: {
  nodes: FilterNodes;
  nodeFilters: FilterNodeData;
  setFilterState: Function;
}) => {
  const setSelection = (event: {originalEvent: Event, value: any}) => {
    setFilterState({
      nodeFilters: event.value,
      previousFilters: {
        nodeFilters
      }
    });
  };
  
  return (
    <Panel header='Attributes' toggleable={true} className='attribute-list-panel filter-panel'>
      <Tree
        value={nodes as TreeNode[]}
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
