import React, { useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "react-flow-renderer";
import _ from "lodash";
import { entityToNodeMapper } from "./dataTransformer";
/***
 * Hook for managaing the state of the the plotter
 */
function usePlotterStore({ initialNodes, initialEdges, entities }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes((nds) => {
      const entityIds = _.map(entities, _.property("id"));
      const nodeIds = _.map(nds, _.property("id"));
      const addedNodes = entities
        .filter((e) => !nodeIds.includes(e.id))
        .map((e) => entityToNodeMapper(e));

      return (
        nds
          //deal with any entity deletes
          .filter((node) => entityIds.includes(node.id))
          .map((node) => {
            // if (node.id === ) {
            //   // it's important that you create a new object here
            //   // in order to notify react flow about the change
            //   node.data = {
            //     ...node.data,
            //     label: nodeName,
            //   };
            // }

            return node;
          })
          //deal with new entities
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
