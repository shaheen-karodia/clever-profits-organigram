import React, { useState } from "react";

const initialData = [
  {
    id: 1,
    category: "Sporting Goods",
    price: "49.99",
    qty: 12,
    name: "football",
  },
  {
    id: 2,
    category: "Sporting Goods",
    price: "9.99",
    qty: 15,
    name: "baseball",
  },
  {
    id: 3,
    category: "Sporting Goods",
    price: "29.99",
    qty: 14,
    name: "basketball",
  },
  {
    id: 4,
    category: "Electronics",
    price: "99.99",
    qty: 34,
    name: "iPod Touch",
  },
  {
    id: 5,
    category: "Electronics",
    price: "399.99",
    qty: 12,
    name: "iPhone 5",
  },
  {
    id: 6,
    category: "Electronics",
    price: "199.99",
    qty: 23,
    name: "nexus 7",
  },
];
const EntitiesTable = () => {
  const [entities, setEntities] = useState([...initialData]);

  const handleRowDel = (entity) => {
    const updatedEntities = entities.filter((e) => e.id !== entity.id);
    setEntities(updatedEntities);
  };

  const handleAddEvent = (evt) => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36); //TODO must be a better way to generate a unique id
    const entity = {
      id: id,
      name: "",
      price: "",
      category: "",
      qty: 45,
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
      <EntityTable
        onEntitiesTableUpdate={handleEntityTable}
        onRowAdd={handleAddEvent}
        onRowDel={handleRowDel}
        entities={entities}
      />
    </div>
  );
};

const EntityTable = ({
  onEntitiesTableUpdate,
  onRowDel,
  entities,
  onRowAdd,
}) => {
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>price</th>
            <th>quantity</th>
            <th>category</th>
          </tr>
        </thead>

        <tbody>
          {entities.map((entity) => (
            <EntityRow
              onEntitiesTableUpdate={onEntitiesTableUpdate}
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
        className="add-btn "
        value="Add Row"
      />
    </div>
  );
};

const EntityRow = ({ onDelEvent, entity, onEntitiesTableUpdate }) => {
  const onDelete = () => {
    onDelEvent(entity);
  };

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

export default EntitiesTable;
