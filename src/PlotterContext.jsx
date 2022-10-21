import React, { useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "react-flow-renderer";
import _ from "lodash";
import {
  entityDataToNodeDataMapper,
  entityToNodeMapper,
} from "./dataTransformer";
/***
 * Hook for managaing the state of the the plotter
 */
function usePlotterStore({ initialNodes, initialEdges, entities }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes((nds) => {
      const normalizedEntities = _.mapKeys(entities, "id");

      console.log("normalized", normalizedEntities);
      const entityIds = Object.keys(normalizedEntities);
      const nodeIds = _.map(nds, _.property("id"));
      const addedNodes = entities
        .filter((e) => !nodeIds.includes(e.id))
        .map((e) => entityToNodeMapper(e));

      return (
        nds
          //entity deletes
          .filter((node) => entityIds.includes(node.id))
          //updated entities
          .map((node) => {
            console.log("node", node);
            // it's important that you create a new object here
            // in order to notify react flow about the change
            node.data = {
              ...entityDataToNodeDataMapper(normalizedEntities[node.id]),
            };

            return node;
          })
          //new entities
          .concat(addedNodes)
      );
    });
  }, [entities, setNodes]);

  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
  };
}

const PlotterContext = React.createContext({});

const PlotterProvider = (props) => {
  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    children,
  } = props;

  return (
    <PlotterContext.Provider
      value={{
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
      }}
    >
      {children}
    </PlotterContext.Provider>
  );
};

export { PlotterProvider, PlotterContext, usePlotterStore };
