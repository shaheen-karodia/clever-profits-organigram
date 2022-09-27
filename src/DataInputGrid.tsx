import React, { useMemo, useState } from "react";

import {
  DataEditor,
  GridColumn,
  GridCell,
  GridCellKind,
  Item,
  EditableGridCell,
} from "@glideapps/glide-data-grid";

interface DummyItem {
  name: string;
  company: string;
  phone: string;
  email: string;
}

let data: DummyItem[] = [
  {
    name: "Deidre Morris",
    company: "GONKLE",
    email: "deidremorris@gonkle.com",
    phone: "+1 (867) 507-3332",
  },
  {
    name: "Sheryl Craig",
    company: "EVENTAGE",
    email: "sherylcraig@eventage.com",
    phone: "+1 (869) 520-2227",
  },
  {
    name: "Sheryl asdsf",
    company: "EVENTAGE",
    email: "sherylcraig@eventage.com",
    phone: "+1 (869) 520-2227",
  },
];

function DataInputGrid() {
  // const [numRows, setNumRows] = React.useState(20);
  const [len, setLen] = useState(data.length);
  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;

    const dataRow = data[row];

    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];

    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      readonly: false,
      displayData: d,
      data: d,
    };
  }, []);

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      //TODO this will not always be true
      if (newValue.kind !== GridCellKind.Text) {
        // we only have text cells, might as well just die here.
        return;
      }

      const indexes: (keyof DummyItem)[] = [
        "name",
        "company",
        "email",
        "phone",
      ];
      const [col, row] = cell;
      const key = indexes[col];
      data[row][key] = newValue.data; //TODO
    },
    []
  );

  const onRowAppended = React.useCallback(() => {
    console.log("asSdsdfdfdas", data);

    const obj = {
      name: "",
      company: "goat",
      email: "",
      phone: "",
    };

    data = [...data, obj];
    setLen((len) => len + 1);
  }, []);

  const columns = useMemo<GridColumn[]>(() => {
    return [
      {
        title: "Name",
        id: "name",
      },
      {
        title: "Company",
        id: "company",
      },
      {
        title: "Email",
        id: "email",
      },
      {
        title: "Phone",
        id: "phone",
      },
    ];
  }, []);

  return (
    <div
      style={{
        borderRadius: "12px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.4)",
        overflow: "hidden",
      }}
    >
      <DataEditor
        getCellContent={getContent}
        columns={columns}
        rows={len}
        onCellEdited={onCellEdited}
        width="100"
        rowMarkers="number"
        trailingRowOptions={{
          sticky: true,
          tint: true,
          hint: "New row...",
        }}
        onRowAppended={onRowAppended}
      />
    </div>
  );
}

export default DataInputGrid;
