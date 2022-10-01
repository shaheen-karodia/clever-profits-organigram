import React, { useState } from "react";

const generateUUID = () =>
  (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

const ENTITY_TEMPLATE_OBJECT = {
  // id: id,
  name: "",
  price: "",
  category: "",
  qty: 45,
  entityType: "person",
};

const initialData = [
  {
    id: generateUUID(),
    ...ENTITY_TEMPLATE_OBJECT,
  },
];

const EntitiesTable = () => {
  const [entities, setEntities] = useState([...initialData]);

  const onRowDel = (entity) => {
    const updatedEntities = entities.filter((e) => e.id !== entity.id);
    setEntities(updatedEntities);
  };

  const onRowAdd = (evt) => {
    const id = generateUUID(); //TODO must be a better way to generate a unique id
    const entity = {
      ...ENTITY_TEMPLATE_OBJECT,
      id,
    };

    setEntities([...entities, entity]);
  };

  const handleEntityTable = (e) => {
    const item = {
      id: e.target.id,
      name: e.target.name,
      value: e.target.value,
    };

    const newEntities = entities.map((entity) => {
      for (let key in entity) {
        if (key == item.name && entity.id == item.id) {
          entity[key] = item.value;
        }
      }
      return entity;
    });

    setEntities(newEntities);
  };

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>price</th>
            <th>quantity</th>
            <th>category</th>
            <th>Entity Type</th>
          </tr>
        </thead>

        <tbody>
          {entities.map((entity) => (
            <EntityRow
              onEntitiesTableUpdate={handleEntityTable}
              entity={entity}
              onDelEvent={onRowDel}
              key={entity.id}
            />
          ))}
        </tbody>
      </table>
      <input
        type="button"
        onClick={onRowAdd}
        className="add-btn"
        value="Add Entity Row"
      />
    </div>
  );
};

const EntityRow = ({ onDelEvent, entity, onEntitiesTableUpdate }) => {
  const onDelete = () => {
    onDelEvent(entity);
  };

  console.log("nnnnnn", entity);
  return (
    <tr className="eachRow">
      <EditableCell
        onEntitiesTableUpdate={onEntitiesTableUpdate}
        cellData={{
          type: "name",
          value: entity.name,
          id: entity.id,
        }}
      />
      <EditableCell
        onEntitiesTableUpdate={onEntitiesTableUpdate}
        cellData={{
          type: "price",
          value: entity.price,
          id: entity.id,
        }}
      />
      <EditableCell
        onEntitiesTableUpdate={onEntitiesTableUpdate}
        cellData={{
          type: "qty",
          value: entity.qty,
          id: entity.id,
        }}
      />
      <EditableCell
        onEntitiesTableUpdate={onEntitiesTableUpdate}
        cellData={{
          type: "category",
          value: entity.category,
          id: entity.id,
        }}
      />
      <EditableDropDown
        onEntitiesTableUpdate={onEntitiesTableUpdate}
        cellData={{
          type: "entityType",
          value: entity.entityType,
          id: entity.id,
        }}
      />
      <td className="del-cell">
        <input type="button" onClick={onDelete} value="X" className="del-btn" />
      </td>
    </tr>
  );
};

const EditableCell = ({ cellData, onEntitiesTableUpdate }) => (
  <td>
    <input
      type="text"
      name={cellData.type}
      id={cellData.id}
      value={cellData.value}
      onChange={onEntitiesTableUpdate}
    />
  </td>
);

const EditableDropDown = ({ cellData, onEntitiesTableUpdate }) => {
  console.log("cell", cellData);
  return (
    <td>
      <p>{cellData.value}</p>
    </td>
  );
};

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

export default EntitiesTable;
