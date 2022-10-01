export const cellTypes = {
  INPUT: "INPUT",
  SELECT: "SELECT",
};

export const generateUUID = () =>
  (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

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
        <tbody>TODO fill out</tbody>
      </table>
      <AddButton onClick={onRowAdd} value="Add Entity Row" />
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
