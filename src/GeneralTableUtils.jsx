export const generateUUID = () =>
  (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

export const AddButton = ({ onClick, value }) => (
  <input type="button" onClick={onClick} className="add-btn" value={value} />
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

const EditableSelector = ({
  options,
  placeholder,
  selectedOption,
  onChange,
}) => {
  return (
    <div>
      <select
        name=""
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
        required
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
    </div>
  );
};
