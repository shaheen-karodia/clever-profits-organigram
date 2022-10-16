import React from "react";
import ReactFlow, { useNodesState, useEdgesState } from "react-flow-renderer";

/***
 * Hook for managaing the state of the the plotter
 */
function usePlotterStore({ initialNodes, initialEdges }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
