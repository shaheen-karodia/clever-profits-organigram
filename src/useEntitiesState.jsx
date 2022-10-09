import React, { useState } from "react";

import { cellTypes, getAdditionalRow, generateUUID } from "./GeneralTableUtils";

const HEADERS = ["Name", "Type", "Passthrough"];

const IndividualValue = generateUUID();

const ROW_SCHEMA = [
  { name: "entityName", initialValue: "", type: cellTypes.INPUT },
  {
    name: "entityTypeId",
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

const a = getAdditionalEntityRow();
a.entityName = "tasneem";
const b = getAdditionalEntityRow();
b.entityName = "Shaheen";
const c = getAdditionalEntityRow();
c.entityName = "JL";
const d = getAdditionalEntityRow();
d.entityName = "Onyx";
const initialData = [a, b, c, d];

function useEntitiesState() {
  const [entities, setEntities] = useState(initialData);

  const onCellChange = ({ rowId, property, value }) => {
    const newEntities = entities.map((e) => {
      if (e.id === rowId) {
        e[property] = value;
      }
      return e;
    });

    setEntities(newEntities);
  };

  const onRowDelete = (id) => {
    const updateEntities = entities.filter((e) => e.id !== id);
    setEntities(updateEntities);
  };

  const onRowAdd = () => {
    const additionalRow = getAdditionalEntityRow();
    setEntities([...entities, additionalRow]);
  };

  /**
   * Method for making an Entities Dropdown to be used by the Holdings table
   */
  const getEntityOptions = () => {
    return entities.map((e) => {
      return {
        value: e.id,
        display: e.entityName,
      };
    });
  };

  return {
    onCellChange,
    onRowDelete,
    onRowAdd,
    entities,
    ROW_SCHEMA,
    HEADERS,
    getEntityOptions,
  };
}

export default useEntitiesState;
