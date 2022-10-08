import React, { useState } from "react";

import { SkarTable, cellTypes, getAdditionalRow } from "./GeneralTableUtils";

const HEADERS = ["Name", "Type", "Passthrough"];

const ROW_SCHEMA = [
  { name: "name", initialValue: "", type: cellTypes.INPUT },
  {
    name: "type",
    initialValue: "there",
    type: cellTypes.SELECT,
    config: { placeholder: "Select an Entity", options: ["hello", "there"] },
  },
  {
    name: "passthrough",
    initialValue: true,
    type: cellTypes.CHECK_BOX,
  },
];

const getAdditionalEntityRow = getAdditionalRow(ROW_SCHEMA);

const EntitiesTable = () => {
  const [entities, setEntities] = useState([
    getAdditionalEntityRow(),
    getAdditionalEntityRow(),
  ]);

  const onCellChange = ({ rowId, property, value }) => {
    const newEntities = entities.map((e) => {
      if (e.id === rowId) {
        e[property] = value;
      }
      return e;
    });

    setEntities(newEntities);
  };

  const onRowDelete = (entity) => {
    const updateEntities = entities.filter((e) => e.id !== entity.id);
    setEntities(updateEntities);
  };

  const onRowAdd = () => {
    setEntities([...entities, getAdditionalEntityRow()]);
  };

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
