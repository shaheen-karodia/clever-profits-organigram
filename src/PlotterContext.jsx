import React, { useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "react-flow-renderer";
import _ from "lodash";
import {
  entityDataToNodeDataMapper,
  createNewNodeFromEntity,
  holidingToEdgeMapper,
} from "./dataTransformer";
/***
 * Hook for managaing the state of the the plotter
 */
function usePlotterStore({ entities, holdings }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  /***
   * Dynamically update the plotter based on the entities table
   */
  useEffect(() => {
    setNodes((nds) => {
      const normalizedEntities = _.mapKeys(entities, "id");
      const entityIds = Object.keys(normalizedEntities);
      const nodeIds = _.map(nds, _.property("id"));
      const addedNodes = entities
        .filter((e) => !nodeIds.includes(e.id))
        .map((e) => createNewNodeFromEntity(e));

      return (
        nds
          //entity deletes
          .filter((node) => entityIds.includes(node.id))
          //updated entities
          .map((node) => {
            const updatedEntity = normalizedEntities[node.id];
            node.type = updatedEntity.entityTypeId;
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

  /***
   * Dynamically update the plotter based on the edges table
   */
  useEffect(() => {
    setEdges((edges) => {
      const normalizedHoldings = _.mapKeys(holdings, "id");
      const holdingsIds = Object.keys(normalizedHoldings);
      const edgeIds = _.map(edges, _.property("id"));
      const addedEdges = holdings
        .filter((e) => !edgeIds.includes(e.id))
        .map((e) => holidingToEdgeMapper(e));

      return (
        edges
          //holdings deletes
          .filter((edge) => holdingsIds.includes(edge.id))
          //holdings edit
          .map((edge) => {
            const updatedHolding = normalizedHoldings[edge.id];
            return holidingToEdgeMapper(updatedHolding);
          })
          //new holdings
          .concat(addedEdges)
      );
    });
  }, [holdings, setNodes]);

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
