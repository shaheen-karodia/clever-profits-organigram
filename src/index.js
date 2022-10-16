import React, { useState, StrictMode } from "react";
import ReactDOM from "react-dom";
import useHoldingsStore from "./useHoldingsStore";
import useEntityStore from "./useEntityStore";
import MenuProvider from "react-flexible-sliding-menu";
import "./styles.css";
import App from "./App";
import Menu from "./Menu";
import { StoreProvider } from "./StoreProvider";

const rootElement = document.getElementById("root");

const IndexComp = () => {
  const entityStore = useEntityStore();
  const entitiesOptions = entityStore.getEntityOptions();
  const holdingStore = useHoldingsStore(entitiesOptions);
  const titleStore = useState("");

  return (
    <StrictMode>
      <StoreProvider
        entityStore={entityStore}
        holdingStore={holdingStore}
        titleStore={titleStore}
      >
        <MenuProvider MenuComponent={Menu} animation="push" width={"900px"}>
          <App />
        </MenuProvider>
      </StoreProvider>
    </StrictMode>
  );
};

ReactDOM.render(<IndexComp />, rootElement);
