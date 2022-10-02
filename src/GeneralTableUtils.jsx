import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

export const cellTypes = {
  INPUT: "INPUT",
  SELECT: "SELECT",
};

export const generateUUID = () => uuidv4();

export const TableHead = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((h) => (
          <th key={h}>{h}</th>
        ))}
      </tr>
    </thead>
  );
};

export const AddButton = ({ onClick, value }) => (
  <input type="button" onClick={onClick} className="add-btn" value={value} />
);

export const DeleteCell = ({ onClick, value }) => (
  <td className="del-cell">
    <input type="button" onClick={onClick} value={value} className="del-btn" />
  </td>
);

export const EditableInput = ({ cellData, onChange }) => (
  <td>
    <input
      type="text"
      name={cellData.type}
      id={cellData.id}
      value={cellData.value}
      onChange={onChange}
    />
  </td>
);

export const getAdditionalRow = (schema) => {
  return () => {
    const additionalRow = {
      id: generateUUID(),
    };
    schema.forEach((entry) => {
      additionalRow[entry.name] = entry.initialValue;
    });
    return additionalRow;
  };
};

export const RenderRow = ({ row, rowSchema, onCellChange }) => {
  const normalizedSchema = _.mapKeys(rowSchema, "name");
  const rowId = row.id;
  const rowExcludeId = _.omit(row, "id");

  return Object.entries(rowExcludeId).map((entry) => {
    const name = entry[0];
    const value = entry[1];
    const cellType = normalizedSchema[name].type;

    switch (cellType) {
      case cellTypes.INPUT:
        return (
          <EditableInput
            onChange={onCellChange}
            cellData={{ type: name, value, id: row.id }}
          />
        );
      case cellTypes.SELECT:
        return null;
      default:
        return null;
    }
  });
};

export const SkarTable = ({
  headers,
  rowSchema,
  rows,
  onRowAdd,
  onRowDelete,
  onCellChange,
}) => {
  return (
    <div>
      <table className="table table-bordered">
        <TableHead headers={headers} />
        <tbody>
          {rows.map((row) => {
            return (
              <tr className="eachRow" key={row.id}>
                <RenderRow
                  row={row}
                  onCellChange={onCellChange}
                  rowSchema={rowSchema}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
      <AddButton onClick={onRowAdd} value="Add Row" />
    </div>
  );
};

// const EditableSelector = ({
//   options,
//   placeholder,
//   selectedOption,
//   onChange,
// }) => {
//   return (
//     <div>
//       <select
//         name=""
//         value={selectedOption}
//         onChange={(e) => onChange(e.target.value)}
//         required
//       >
//         <option value="" disabled>
//           {placeholder}
//         </option>
//         {options.map((e) => {
//           return (
//             <option value={e} key={e}>
//               {e}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//   );
// };
