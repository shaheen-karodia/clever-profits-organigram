import React, { useContext } from "react";
import { MenuContext } from "react-flexible-sliding-menu";
import { SkarTable } from "./GeneralTableUtils";
import useHoldingsState from "./useHoldingsState";

import useEntitiesState from "./useEntitiesState";
import CloseMenuButton from "./CloseMenuButton";

function Menu() {
  const { closeMenu } = useContext(MenuContext);
  const entityStore = useEntitiesState();
  const entitiesOptions = entityStore.getEntityOptions();
  const holdingStore = useHoldingsState(entitiesOptions);

  /***
   * Ensures that the user is aware that they will be deleting some of the dependent holdings below
   */
  const onEntitiesRowDeleteCordinator = (id) => {
    const dependentHoldings = holdingStore.holdings.filter((h) =>
      [h.fromEntityId, h.toEntityId].includes(id)
    );
    const confirmationText =
      "Deleting an entity will result in a dependent holding being delete";

    if (dependentHoldings.length === 0) {
      entityStore.onRowDelete(id);
    } else if (confirm(confirmationText)) {
      holdingStore.onBulkEntityRowDelete(dependentHoldings.map((h) => h.id));
      entityStore.onRowDelete(id);
    }
  };

  console.log("entities", JSON.stringify(entityStore.entities));
  console.log("holdings", holdingStore.holdings);
  console.log("entityoptions", entitiesOptions);
  return (
    <div className="Menu">
      <h2>Entities Table</h2>
      <SkarTable
        headers={entityStore.HEADERS}
        rowSchema={entityStore.ROW_SCHEMA}
        rows={entityStore.entities}
        onCellChange={entityStore.onCellChange}
        onRowDelete={onEntitiesRowDeleteCordinator}
        onRowAdd={entityStore.onRowAdd}
      />
      <br />
      <h2>Holding Table</h2>
      <SkarTable
        headers={holdingStore.HEADERS}
        rowSchema={holdingStore.ROW_SCHEMA}
        rows={holdingStore.holdings}
        onCellChange={holdingStore.onCellChange}
        onRowDelete={holdingStore.onRowDelete}
        onRowAdd={holdingStore.onRowAdd}
      />
      <CloseMenuButton onClick={closeMenu} />
    </div>
  );
}

export default Menu;
