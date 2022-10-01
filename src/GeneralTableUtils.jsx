export const generateUUID = () =>
  (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

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
