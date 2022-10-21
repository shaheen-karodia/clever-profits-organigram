import React, { useState, StrictMode } from "react";
import ReactDOM from "react-dom";

import MenuProvider from "react-flexible-sliding-menu";
import "./styles.css";
import App from "./App";
import Menu from "./Menu";
import { PlotterProvider, usePlotterStore } from "./PlotterContext";
import { HoldingsProvider, useHoldingsStore } from "./HoldingsContext";
import { EntityProvider, useEntityStore } from "./EntityContext";
import { getNodes, getEdges } from "./dataTransformer";
import { TitleProvider } from "./TitleContext";

const rootElement = document.getElementById("root");

const IndexComp = () => {
  const entityStore = useEntityStore();
  const entitiesOptions = entityStore.getEntityOptions();
  const holdingStore = useHoldingsStore(entitiesOptions);
  const titleStore = useState("");
  const initialNodes = getNodes(entityStore.entities);
  const initialEdges = getEdges(holdingStore.holdings);
  const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange } =
    usePlotterStore({
      initialNodes,
      initialEdges,
      entities: entityStore.entities,
      holdings: holdingStore.holdings,
    });

  return (
    <StrictMode>
      <HoldingsProvider holdingStore={holdingStore}>
        <TitleProvider titleStore={titleStore}>
          <EntityProvider entityStore={entityStore}>
            <PlotterProvider
              nodes={nodes}
              edges={edges}
              setNodes={setNodes}
              setEdges={setEdges}
              onEdgesChange={onEdgesChange}
              onNodesChange={onNodesChange}
            >
              <MenuProvider MenuComponent={Menu} width={"900px"}>
                <App />
              </MenuProvider>
            </PlotterProvider>
          </EntityProvider>
        </TitleProvider>
      </HoldingsProvider>
    </StrictMode>
  );
};

ReactDOM.render(<IndexComp />, rootElement);
