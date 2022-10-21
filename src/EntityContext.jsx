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
    initialValue: false,
    type: cellTypes.CHECK_BOX,
  },
];

const getAdditionalEntityRow = getAdditionalRow(ROW_SCHEMA);

function useEntityStore() {
  const [entities, setEntities] = useState([]);

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

const EntityContext = React.createContext({});

const EntityProvider = (props) => {
  const { entityStore, children } = props;

  return (
    <EntityContext.Provider
      value={{
        entityStore,
      }}
    >
      {children}
    </EntityContext.Provider>
  );
};

export { EntityProvider, useEntityStore, EntityContext };
