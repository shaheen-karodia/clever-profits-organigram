import React from "react";
import { SkarTable } from "./GeneralTableUtils";
import useHoldingsState from "./useHoldingsState";

function HoldingsTable() {
  const { onCellChange, onRowDelete, onRowAdd, holdings, ROW_SCHEMA, HEADERS } =
    useHoldingsState();
  return (
    <div>
      <h2>Holdings Table</h2>
      <SkarTable
        headers={HEADERS}
        rowSchema={ROW_SCHEMA}
        rows={holdings}
        onCellChange={onCellChange}
        onRowDelete={onRowDelete}
        onRowAdd={onRowAdd}
      />
    </div>
  );
}

export default HoldingsTable;
