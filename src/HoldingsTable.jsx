import React, { useState } from "react";
import { SkarTable, cellTypes, getAdditionalRow } from "./GeneralTableUtils";

const HEADERS = ["Name", "Investment in", "Holdings %"];

const ROW_SCHEMA = [
  { name: "name", initialValue: "", type: cellTypes.INPUT },
  { name: "investmentIn", initialValue: "", type: cellTypes.SELECT },
  { name: "holdings", initialValue: "", type: cellTypes.INPUT },
];

const getAdditionalHoldingRow = getAdditionalRow(ROW_SCHEMA);
function HoldingsTable() {
  const [holdings, setHoldings] = useState([
    getAdditionalHoldingRow(),
    getAdditionalHoldingRow(),
  ]);

  const onCellChange = (e) => {
    const item = {
      id: e.target.id,
      name: e.target.name,
      value: e.target.value,
    };

    const newHoldings = holdings.map((h) => {
      for (let key in h) {
        if (key == item.name && h.id == item.id) {
          h[key] = item.value;
        }
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

  return (
    <div>
      <h2>Holdings Table</h2>
      <p>
        <SkarTable
          headers={HEADERS}
          rowSchema={ROW_SCHEMA}
          rows={holdings}
          onCellChange={onCellChange}
          onRowDelete={onRowDelete}
          onRowAdd={onRowAdd}
        />
      </p>
    </div>
  );
}

export default HoldingsTable;
