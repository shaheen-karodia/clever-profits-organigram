import React, { useState } from "react";
import { AddButton, EditableInput, generateUUID } from "./GeneralTableUtils";

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

  const onRowAdd = () => {
    const id = generateUUID();
    const entity = {
      ...ENTITY_TEMPLATE_OBJECT,
      id,
    };

    setEntities([...entities, entity]);
  };

  const onTableUpdate = (e) => {
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
            <th>Namess</th>
            <th>price</th>
            <th>quantity</th>
            <th>category</th>
            <th>Entity Type</th>
          </tr>
        </thead>

        <tbody>
          {entities.map((entity) => (
            <EntityRow
              onChange={onTableUpdate}
              entity={entity}
              onDelEvent={onRowDel}
              key={entity.id}
            />
          ))}
        </tbody>
      </table>
      <AddButton onClick={onRowAdd} value="Add Entity Row" />
    </div>
  );
};

const EntityRow = ({ onDelEvent, entity, onChange }) => {
  const onDelete = () => {
    onDelEvent(entity);
  };

  return (
    <tr className="eachRow">
      <EditableInput
        onChange={onChange}
        cellData={{
          type: "name",
          value: entity.name,
          id: entity.id,
        }}
      />
      <EditableInput
        onChange={onChange}
        cellData={{
          type: "price",
          value: entity.price,
          id: entity.id,
        }}
      />
      <EditableInput
        onChange={onChange}
        cellData={{
          type: "qty",
          value: entity.qty,
          id: entity.id,
        }}
      />
      <EditableInput
        onChange={onChange}
        cellData={{
          type: "category",
          value: entity.category,
          id: entity.id,
        }}
      />
      <EditableDropDown
        onChange={onChange}
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

const EditableDropDown = ({ cellData, onChange }) => {
  console.log("cell", cellData);
  return (
    <td>
      <p>{cellData.value}</p>
    </td>
  );
};

export default EntitiesTable;
