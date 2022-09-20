import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ConnectionMode,
} from "react-flow-renderer";

import SimpleFloatingEdge from "./SimpleFloatingEdge";
import {
  LLCNode,
  PartnershipNode,
  TrustNode,
  SCorpNode,
  IndividualNode,
} from "./Nodes";

const nodeTypes = {
  partnership: PartnershipNode,
  individual: IndividualNode,
  llc: LLCNode,
  trust: TrustNode,
  "s-corp": SCorpNode,
};

const edgeTypes = {
  floating: SimpleFloatingEdge,
};

const fitViewOptions = { padding: 4 };

const NodeAsHandleFlow = ({ initialNodes, initialEdges }) => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      console.log(params) ||
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "floating",
            markerEnd: { type: MarkerType.Arrow },
          },
          eds
        )
      ),
    []
  );

  return (
    <div className="simple-floatingedges">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        connectionMode={ConnectionMode.Loose}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NodeAsHandleFlow;
