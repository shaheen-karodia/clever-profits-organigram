import React, { useState } from "react";

import { cellTypes, getAdditionalRow, generateUUID } from "./GeneralTableUtils";

const HEADERS = ["Name", "Type", "Passthrough"];

const IndividualValue = generateUUID();

const ROW_SCHEMA = [
  { name: "entityName", initialValue: "", type: cellTypes.INPUT },
  {
    name: "entityType",
    initialValue: IndividualValue,
    type: cellTypes.SELECT,
    config: {
      placeholder: "Select an Entity",
      options: [
        { display: "Individual", value: IndividualValue },
        { display: "Partnership", value: generateUUID() },
        { display: "LLC", value: generateUUID() },
        { display: "Trust", value: generateUUID() },
        { display: "S-Corp", value: generateUUID() },
      ],
    },
  },
  {
    name: "passthrough",
    initialValue: true,
    type: cellTypes.CHECK_BOX,
  },
];

const getAdditionalEntityRow = getAdditionalRow(ROW_SCHEMA);

function useEntitiesState() {
  const [entities, setEntities] = useState([
    getAdditionalEntityRow(),
    getAdditionalEntityRow(),
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
    const additionalRow = getAdditionalEntityRow();
    setEntities([...entities, additionalRow]);
  };

  return { onCellChange, onRowDelete, onRowAdd, entities, ROW_SCHEMA, HEADERS };
}

export default useEntitiesState;
