import React, { useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "react-flow-renderer";
import _ from "lodash";
/***
 * Hook for managaing the state of the the plotter
 */
function usePlotterStore({ initialNodes, initialEdges, entities }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    console.log("entitiesUpdateInside useEffect");

    const entityIds = _.map(entities, _.property("id"));

    console.log("entityIds", entityIds);
    setNodes((nds) =>
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
    );
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
