import React, { useState } from "react";

import { cellTypes, getAdditionalRow } from "./GeneralTableUtils";

function useHoldingsStore(entitiesOptions) {
  const HEADERS = ["Name", "Investment in", "Holdings %"];

  const ROW_SCHEMA = [
    {
      name: "fromEntityId",
      initialValue: "",
      type: cellTypes.SELECT,
      config: {
        placeholder: "Select an Entity",
        options: entitiesOptions,
      },
    },
    {
      name: "toEntityId",
      initialValue: "",
      type: cellTypes.SELECT,
      config: {
        placeholder: "Select an Entity",
        options: entitiesOptions,
      },
    },
    { name: "percentageHoldings", initialValue: "", type: cellTypes.INPUT },
  ];

  const getAdditionalHoldingRow = getAdditionalRow(ROW_SCHEMA);
  const [holdings, setHoldings] = useState([]);

  const onCellChange = ({ rowId, property, value }) => {
    const newHoldings = holdings.map((h) => {
      if (h.id === rowId) {
        h[property] = value;
      }
      return h;
    });

    setHoldings(newHoldings);
  };

  const onRowDelete = (id) => {
    const updatedHoldings = holdings.filter((h) => h.id !== id);
    setHoldings(updatedHoldings);
  };

  const onBulkRowDelete = (ids) => {
    const updatedHoldings = holdings.filter((h) => !ids.includes(h.id));
    setHoldings(updatedHoldings);
  };

  const onRowAdd = () => {
    setHoldings([...holdings, getAdditionalHoldingRow()]);
  };

  return {
    onCellChange,
    onRowDelete,
    onBulkRowDelete,
    onRowAdd,
    holdings,
    ROW_SCHEMA,
    HEADERS,
  };
}

const HoldingsContext = React.createContext({});

const HoldingsProvider = (props) => {
  const { holdingStore, children } = props;

  return (
    <HoldingsContext.Provider
      value={{
        holdingStore,
      }}
    >
      {children}
    </HoldingsContext.Provider>
  );
};

export { HoldingsProvider, HoldingsContext, useHoldingsStore };
