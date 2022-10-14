import React, { useState, StrictMode } from "react";
import ReactDOM from "react-dom";
import useHoldingsState from "./useHoldingsState";
import useEntitiesState from "./useEntitiesState";
import MenuProvider from "react-flexible-sliding-menu";
import "@glideapps/glide-data-grid/dist/index.css";
import "./styles.css";
import App from "./App";
import Menu from "./Menu";
import { StoreProvider } from "./StoreProvider";

const rootElement = document.getElementById("root");

const IndexComp = () => {
  const entityStore = useEntitiesState();
  const entitiesOptions = entityStore.getEntityOptions();
  const holdingStore = useHoldingsState(entitiesOptions);

  return (
    <StrictMode>
      <StoreProvider entityStore={entityStore} holdingStore={holdingStore}>
        <MenuProvider MenuComponent={Menu} animation="push" width={"900px"}>
          <App />
        </MenuProvider>
      </StoreProvider>
    </StrictMode>
  );
};

ReactDOM.render(<IndexComp />, rootElement);
