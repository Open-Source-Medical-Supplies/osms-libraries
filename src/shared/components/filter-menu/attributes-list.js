import { Panel } from "primereact/panel";
import { Tree } from "primereact/tree";
import React from "react";

const AttributesList = ({nodes, nodeFilters, setSelection}) => {
  return (
    <Panel header='Attributes' toggleable={true} className='attribute-list-panel filter-panel'>
      <Tree
        value={nodes}
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
