import React from "react";
import { SkarTable } from "./GeneralTableUtils";

const HEADERS = ["yeet", "wheet"];
function RelationshipsTable() {
  return (
    <div>
      <p>
        Relationships Table
        <SkarTable headers={HEADERS} />
      </p>
    </div>
  );
}

export default RelationshipsTable;
