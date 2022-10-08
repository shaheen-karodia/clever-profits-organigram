import React from "react";

import { SkarTable } from "./GeneralTableUtils";
import useEntitiesState from "./useEntitiesState";

const EntitiesTable = () => {
  const { HEADERS, ROW_SCHEMA, entities, onCellChange, onRowDelete, onRowAdd } =
    useEntitiesState();

  return (
    <div>
      <h2>Entity Table</h2>
      <SkarTable
        headers={HEADERS}
        rowSchema={ROW_SCHEMA}
        rows={entities}
        onCellChange={onCellChange}
        onRowDelete={onRowDelete}
        onRowAdd={onRowAdd}
      />
    </div>
  );
};

export default EntitiesTable;
