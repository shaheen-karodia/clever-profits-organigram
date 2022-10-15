import React, { useState } from "react";
import { ENTITY_INDIVIDUAL_VALUE, ENTITY_TYPE_OPTIONS } from "./entityType";

import { cellTypes, getAdditionalRow, generateUUID } from "./GeneralTableUtils";

const HEADERS = ["Name", "Type", "Passthrough"];

const ROW_SCHEMA = [
  { name: "entityName", initialValue: "", type: cellTypes.INPUT },
  {
    name: "entityTypeId",
    initialValue: ENTITY_INDIVIDUAL_VALUE,
    type: cellTypes.SELECT,
    config: {
      placeholder: "Select an Entity",
      options: ENTITY_TYPE_OPTIONS,
    },
  },
  {
    name: "passthrough",
    initialValue: true,
    type: cellTypes.CHECK_BOX,
  },
];

const getAdditionalEntityRow = getAdditionalRow(ROW_SCHEMA);

const initialData = [
  {
    id: "84c56940-f17b-45dd-ad8b-572ba04e681a",
    entityName: "tasneem",
    entityTypeId: "individual",
    passthrough: true,
  },
  {
    id: "57870f8f-756a-4a62-8d12-d2254562bb56",
    entityName: "Shaheen",
    entityTypeId: "partnership",
    passthrough: true,
  },
  {
    id: "49bf9fed-90b8-4328-912a-25b407efc159",
    entityName: "JL",
    entityTypeId: "llc",
    passthrough: true,
  },
  {
    id: "be8c5cb6-ddd8-4103-b54b-60ae99712375",
    entityName: "Onyx",
    entityTypeId: "trust",
    passthrough: true,
  },
  {
    id: "357ac6fe-2430-43d9-abf2-16bbe0d6396d",
    entityName: "Romelon",
    entityTypeId: "s-corp",
    passthrough: true,
  },
];

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
