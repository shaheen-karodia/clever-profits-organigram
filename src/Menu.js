import React, { useContext } from "react";
import { MenuContext } from "react-flexible-sliding-menu";
import { SkarTable } from "./GeneralTableUtils";
import useHoldingsState from "./useHoldingsState";

import useEntitiesState from "./useEntitiesState";
function Menu() {
  const { closeMenu } = useContext(MenuContext);
  const {
    HEADERS: ENTITY_HEADERS,
    ROW_SCHEMA: ENTITY_ROW_SCHEMA,
    entities,
    onCellChange: onEntitiesCellChange,
    onRowDelete: onEntitiesRowDelete,
    onRowAdd: onEntitiesRowAdd,
  } = useEntitiesState();

  const {
    onCellChange: onHoldingsCellChange,
    onRowDelete: onHoldingsRowDelete,
    onRowAdd: onHoldingsRowAdd,
    holdings,
    ROW_SCHEMA: HOLDINGS_ROW_SCHEMA,
    HEADERS: HOLDING_ROW_HEADERS,
  } = useHoldingsState();
  return (
    <div className="Menu">
      <h2>Entities Table</h2>
      <SkarTable
        headers={ENTITY_HEADERS}
        rowSchema={ENTITY_ROW_SCHEMA}
        rows={entities}
        onCellChange={onEntitiesCellChange}
        onRowDelete={onEntitiesRowDelete}
        onRowAdd={onEntitiesRowAdd}
      />
      <SkarTable
        headers={HOLDING_ROW_HEADERS}
        rowSchema={HOLDINGS_ROW_SCHEMA}
        rows={holdings}
        onCellChange={onHoldingsCellChange}
        onRowDelete={onHoldingsRowDelete}
        onRowAdd={onHoldingsRowAdd}
      />
      <button onClick={closeMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
    </div>
  );
}

export default Menu;
