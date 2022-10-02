import React, { useState } from "react";
import { SkarTable, cellTypes, getAdditionalRow } from "./GeneralTableUtils";

const HEADERS = ["yeet", "wheet"];

const ROW_SCHEMA = [
  { name: "name", initialValue: "", type: cellTypes.INPUT },
  { name: "investmentIn", initialValue: "", type: cellTypes.INPUT },
  { name: "holdings", initialValue: "", type: cellTypes.INPUT },
];

const getAdditionalHoldingRow = getAdditionalRow(ROW_SCHEMA);
function HoldingsTable() {
  const [holdings, setHoldings] = useState([]);

  console.log(getAdditionalHoldingRow());
  return (
    <div>
      <p>
        Relationships Table
        <SkarTable headers={HEADERS} />
      </p>
    </div>
  );
}

export default HoldingsTable;
