import React, { useContext } from "react";
import { MenuContext } from "react-flexible-sliding-menu";
import { SkarTable } from "./GeneralTableUtils";
import useHoldingsState from "./useHoldingsState";

import useEntitiesState from "./useEntitiesState";
import CloseMenuButton from "./CloseMenuButton";

function Menu() {
  const { closeMenu } = useContext(MenuContext);
  const {
    HEADERS: ENTITY_HEADERS,
    ROW_SCHEMA: ENTITY_ROW_SCHEMA,
    entities,
    onCellChange: onEntitiesCellChange,
    onRowDelete: onEntitiesRowDelete,
    onRowAdd: onEntitiesRowAdd,
    getEntityOptions,
  } = useEntitiesState();

  const entitiesOptions = getEntityOptions();
  const {
    onCellChange: onHoldingsCellChange,
    onRowDelete: onHoldingsRowDelete,
    onRowAdd: onHoldingsRowAdd,
    holdings,
    onBulkRowDelete: onBulkEntityRowDelete,
    ROW_SCHEMA: HOLDINGS_ROW_SCHEMA,
    HEADERS: HOLDING_ROW_HEADERS,
  } = useHoldingsState(entitiesOptions);

  /***
   * Ensures that the user is aware that they will be deleting some of the dependent holdings below
   */
  const onEntitiesRowDeleteCordinator = (id) => {
    const dependentHoldings = holdings.filter((h) =>
      [h.fromEntityId, h.toEntityId].includes(id)
    );
    const confirmationText =
      "Deleting an entity will result in a dependent holding being delete";

    if (dependentHoldings.length === 0) {
      onEntitiesRowDelete(id);
    } else if (confirm(confirmationText)) {
      onBulkEntityRowDelete(dependentHoldings.map((h) => h.id));
      onEntitiesRowDelete(id);
    }
  };

  console.log("entities", JSON.stringify(entities));
  console.log("holdings", holdings);
  return (
    <div className="Menu">
      <h2>Entities Table</h2>
      <SkarTable
        headers={ENTITY_HEADERS}
        rowSchema={ENTITY_ROW_SCHEMA}
        rows={entities}
        onCellChange={onEntitiesCellChange}
        onRowDelete={onEntitiesRowDeleteCordinator}
        onRowAdd={onEntitiesRowAdd}
      />
      <br />
      <h2>Holdings Table</h2>
      <SkarTable
        headers={HOLDING_ROW_HEADERS}
        rowSchema={HOLDINGS_ROW_SCHEMA}
        rows={holdings}
        onCellChange={onHoldingsCellChange}
        onRowDelete={onHoldingsRowDelete}
        onRowAdd={onHoldingsRowAdd}
      />
      <CloseMenuButton onClick={closeMenu} />
    </div>
  );
}

export default Menu;
