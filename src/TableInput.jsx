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
  const [products, setProducts] = useState([...initialData]);

  const handleRowDel = (product) => {
    const updatedProducts = products.filter((p) => p.id !== product.id);
    setProducts(updatedProducts);
  };

  const handleAddEvent = (evt) => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36); //TODO must be a better way to generate a unique id
    const product = {
      id: id,
      name: "",
      price: "",
      category: "",
      qty: 0,
    };

    setProducts([...products, product]);
  };

  const handleProductTable = (e) => {
    const item = {
      id: e.target.id,
      name: e.target.name,
      value: e.target.value,
    };

    const newProducts = products.map((product) => {
      for (let key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
        }
      }
      return product;
    });

    setProducts(newProducts);
  };

  return (
    <div>
      <ProductTable
        onProductTableUpdate={handleProductTable}
        onRowAdd={handleAddEvent}
        onRowDel={handleRowDel}
        products={products}
      />
    </div>
  );
};

const ProductTable = ({
  onProductTableUpdate,
  onRowDel,
  products,
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
          {products.map((product) => (
            <ProductRow
              onProductTableUpdate={onProductTableUpdate}
              product={product}
              onDelEvent={onRowDel}
              key={product.id}
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

const ProductRow = ({ onDelEvent, product, onProductTableUpdate }) => {
  const onDelete = () => {
    onDelEvent(product);
  };

  return (
    <tr className="eachRow">
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "name",
          value: product.name,
          id: product.id,
        }}
      />
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "price",
          value: product.price,
          id: product.id,
        }}
      />
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "qty",
          value: product.qty,
          id: product.id,
        }}
      />
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "category",
          value: product.category,
          id: product.id,
        }}
      />
      <td className="del-cell">
        <input type="button" onClick={onDelete} value="X" className="del-btn" />
      </td>
    </tr>
  );
};

const EditableCell = ({ cellData, onProductTableUpdate }) => (
  <td>
    <input
      type="text"
      name={cellData.type}
      id={cellData.id}
      value={cellData.value}
      onChange={onProductTableUpdate}
    />
  </td>
);

export default EntitiesTable;
