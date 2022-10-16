import React, { useState, StrictMode } from "react";
import ReactDOM from "react-dom";

import useEntityStore from "./useEntityStore";
import MenuProvider from "react-flexible-sliding-menu";
import "./styles.css";
import App from "./App";
import Menu from "./Menu";
import { StoreProvider } from "./StoreProvider";
import { PlotterProvider, usePlotterStore } from "./PlotterContext";
import { HoldingsProvider, useHoldingsStore } from "./HoldingsContext";
import { getNodes, getEdges } from "./dataTransformer";

const rootElement = document.getElementById("root");

const IndexComp = () => {
  const entityStore = useEntityStore();
  const entitiesOptions = entityStore.getEntityOptions();
  const holdingStore = useHoldingsStore(entitiesOptions);
  const titleStore = useState("");
  const initialNodes = getNodes(entityStore.entities);
  const initialEdges = getEdges(holdingStore.holdings);
  const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange } =
    usePlotterStore({ initialNodes, initialEdges });

  return (
    <StrictMode>
      <HoldingsProvider holdingStore={holdingStore}>
        <StoreProvider entityStore={entityStore} titleStore={titleStore}>
          <PlotterProvider
            nodes={nodes}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
            edges={edges}
            setEdges={setEdges}
            onEdgesChange={onEdgesChange}
          >
            <MenuProvider MenuComponent={Menu} animation="push" width={"900px"}>
              <App />
            </MenuProvider>
          </PlotterProvider>
        </StoreProvider>
      </HoldingsProvider>
    </StrictMode>
  );
};

ReactDOM.render(<IndexComp />, rootElement);
