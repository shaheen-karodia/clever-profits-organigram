import React, { useContext } from "react";
import { MenuContext } from "react-flexible-sliding-menu";
import { SkarTable } from "./GeneralTableUtils";

import CloseMenuButton from "./CloseMenuButton";
import { HoldingsContext } from "./HoldingsContext";
import { EntityContext } from "./EntityContext";
import { TitleContext } from "./TitleContext";

function Menu() {
  const { closeMenu } = useContext(MenuContext);
  const { holdingStore } = useContext(HoldingsContext);
  const { titleStore } = useContext(TitleContext);
  const { entityStore } = useContext(EntityContext);
  const [title, setTitle] = titleStore;

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
      holdingStore.onBulkRowDelete(dependentHoldings.map((h) => h.id));
      entityStore.onRowDelete(id);
    }
  };
  console.log("entities", entityStore.entities);

  return (
    <div className="Menu">
      <h2>Title</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <h2>Entity Table</h2>
      <SkarTable
        headers={entityStore.HEADERS}
        rowSchema={entityStore.ROW_SCHEMA}
        rows={entityStore.entities}
        onCellChange={entityStore.onCellChange}
        onRowDelete={onEntitiesRowDeleteCordinator}
        onRowAdd={entityStore.onRowAdd}
      />
      <br />
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
