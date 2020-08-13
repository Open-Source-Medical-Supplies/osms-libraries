import TreeNode from "primereact/components/treenode/TreeNode";
import { Panel } from "primereact/panel";
import { Tree, TreeProps } from "primereact/tree";
import React from "react";
import { FilterNodes, FilterNodeData } from "../../types/filter-node.type";

const AttributesList = ({
  nodes, nodeFilters, setSelection
}: {
  nodes: FilterNodes;
  nodeFilters: FilterNodeData;
  setSelection: TreeProps['onSelectionChange'];
}) => {
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
