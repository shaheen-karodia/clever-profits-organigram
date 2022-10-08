import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

export const cellTypes = {
  INPUT: "INPUT",
  SELECT: "SELECT",
  CHECK_BOX: "CHECK_BOX",
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

export const EditableInput = ({ rowId, property, value, onChange }) => (
  <td>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange({ rowId, property, value: e.target.value })}
    />
  </td>
);

export const EditableCheckBox = ({ rowId, property, value, onChange }) => {
  return (
    <td>
      <input
        type="checkbox"
        checked={value}
        onChange={() => {
          onChange({ rowId, property, value: !value });
        }}
      />
    </td>
  );
};

const EditableSelector = ({
  options = [],
  placeholder = "",
  onChange,
  rowId,
  property,
  value,
}) => {
  return (
    <td>
      <select
        value={value}
        onChange={(e) => onChange({ rowId, property, value: e.target.value })}
        // required
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((e) => {
          return (
            <option value={e} key={e}>
              {e}
            </option>
          );
        })}
      </select>
    </td>
  );
};

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
    const property = entry[0];
    const value = entry[1];
    const { type, config } = normalizedSchema[property];
    switch (type) {
      case cellTypes.INPUT:
        return (
          <EditableInput
            rowId={rowId}
            onChange={onCellChange}
            property={property}
            value={value}
          />
        );
      case cellTypes.SELECT:
        return (
          <EditableSelector
            rowId={rowId}
            onChange={onCellChange}
            property={property}
            value={value}
            placeholder={config.placeholder}
            options={config.options}
          />
        );
      case cellTypes.CHECK_BOX:
        return (
          <EditableCheckBox
            rowId={rowId}
            onChange={onCellChange}
            property={property}
            value={value}
          />
        );
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
                <DeleteCell onClick={() => onRowDelete(row)} value="X" />
              </tr>
            );
          })}
        </tbody>
      </table>
      <AddButton onClick={onRowAdd} value="Add Row" />
    </div>
  );
};
