import React, { useState } from "react";
import { cellTypes, getAdditionalRow } from "./GeneralTableUtils";

const HEADERS = ["Name", "Investment in", "Holdings %"];

const ROW_SCHEMA = [
  {
    name: "name",
    initialValue: "",
    type: cellTypes.SELECT,
    config: {
      placeholder: "Select an Entity",
      options: [
        { display: "hello", value: "1" },
        { display: "there", value: "2" },
      ],
    },
  },
  {
    name: "investmentIn",
    initialValue: "",
    type: cellTypes.SELECT,
    config: {
      placeholder: "Select an Entity",
      options: [
        { display: "hello", value: "1" },
        { display: "there", value: "2" },
      ],
    },
  },
  { name: "holdings", initialValue: "", type: cellTypes.INPUT },
];

const getAdditionalHoldingRow = getAdditionalRow(ROW_SCHEMA);

function useHoldingsState() {
  const [holdings, setHoldings] = useState([getAdditionalHoldingRow()]);

  const onCellChange = ({ rowId, property, value }) => {
    const newHoldings = holdings.map((h) => {
      if (h.id === rowId) {
        h[property] = value;
      }
      return h;
    });

    setHoldings(newHoldings);
  };

  const onRowDelete = (holding) => {
    const updatedHoldings = holdings.filter((h) => h.id !== holding.id);
    setHoldings(updatedHoldings);
  };

  const onRowAdd = () => {
    setHoldings([...holdings, getAdditionalHoldingRow()]);
  };

  return { onCellChange, onRowDelete, onRowAdd, holdings, ROW_SCHEMA, HEADERS };
}

export default useHoldingsState;
