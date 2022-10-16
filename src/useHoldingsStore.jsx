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

  const initialData = [
    {
      id: "ed59f2a4-bff2-434b-9d2f-3d30214d835b",
      fromEntityId: "84c56940-f17b-45dd-ad8b-572ba04e681a",
      toEntityId: "57870f8f-756a-4a62-8d12-d2254562bb56",
      percentageHoldings: "50",
    },
    {
      id: "4f0cf603-ff51-4507-a789-9ca109331140",
      fromEntityId: "84c56940-f17b-45dd-ad8b-572ba04e681a",
      toEntityId: "49bf9fed-90b8-4328-912a-25b407efc159",
      percentageHoldings: "20",
    },
    {
      id: "715a9575-30d8-487e-bda0-75f87888e4d9",
      fromEntityId: "49bf9fed-90b8-4328-912a-25b407efc159",
      toEntityId: "be8c5cb6-ddd8-4103-b54b-60ae99712375",
      percentageHoldings: "10",
    },
    {
      id: "ef09f15c-6fea-490a-b1ee-c3c03d4caf4c",
      fromEntityId: "be8c5cb6-ddd8-4103-b54b-60ae99712375",
      toEntityId: "357ac6fe-2430-43d9-abf2-16bbe0d6396d",
      percentageHoldings: "5",
    },
    {
      id: "3d349ab9-8ed9-490a-9720-eb527d78eb2b",
      fromEntityId: "57870f8f-756a-4a62-8d12-d2254562bb56",
      toEntityId: "357ac6fe-2430-43d9-abf2-16bbe0d6396d",
      percentageHoldings: "20",
    },
  ];

  const getAdditionalHoldingRow = getAdditionalRow(ROW_SCHEMA);
  const [holdings, setHoldings] = useState(initialData);

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
    console.log("in delete", id);
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

export default useHoldingsStore;
