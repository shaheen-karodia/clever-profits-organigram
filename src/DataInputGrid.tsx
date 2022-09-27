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

let initData: DummyItem[] = [
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
  const [len, setLen] = useState(initData.length);
  const getContent = React.useCallback((cell: Item): GridCell => {
    console.log("are you being called");
    const [col, row] = cell;

    const dataRow = initData[row];

    // console.log("dataOverall", data);
    console.log("row asd", row);
    console.log("datarow", initData[row]);
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];

    //TODO what if tgere are itger tyoes
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
      // data[row][key] = newValue.data; //TODO
    },
    []
  );

  const onRowAppended = React.useCallback(() => {
    console.log("asSdsdfdfdas", initData);

    const obj = {
      name: "",
      company: "goat",
      email: "",
      phone: "",
    };

    initData = [...initData, obj];
    setLen((len) => len + 1);
    console.log("new data", initData);
  }, []);

  // const onRowAppended = React.useCallback(() => {
  //       const newRow = numRows;
  //     for (let c = 0; c < 6; c++) {
  //       const cell = getCellContent([c, newRow]);
  //       setCellValueRaw([c, newRow], clearCell(cell));
  //     }
  //       setNumRows((cv) => cv + 1);
  //     }, [getCellContent, numRows, setCellValueRaw]);

  // const onRowAppended = React.useCallback(() => {
  //   const newRow = numRows;
  //   for (let c = 0; c < 6; c++) {
  //     const cell = getCellContent([c, newRow]);
  //     setCellValueRaw([c, newRow], clearCell(cell));
  //   }
  //   setNumRows((cv) => cv + 1);
  // }, [getCellContent, numRows, setCellValueRaw]);

  //what is the last row now
  // extract the info into a cell
  //set the vakyes ub yiyr store
  //add one to the row

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
        // @ts-ignore
        onRowAppended={onRowAppended} //eslin
      />
    </div>
  );
}

export default DataInputGrid;
