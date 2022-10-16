import React, { useCallback } from "react";
import {
  ENTITY_PARTNERSHIP_VALUE,
  ENTITY_INDIVIDUAL_VALUE,
  ENTITY_LLC_VALUE,
  ENTITY_TRUST_VALUE,
  ENTITY_SCORP_VALUE,
} from "../entityType";
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
  [ENTITY_PARTNERSHIP_VALUE]: PartnershipNode,
  [ENTITY_INDIVIDUAL_VALUE]: IndividualNode,
  [ENTITY_LLC_VALUE]: LLCNode,
  [ENTITY_TRUST_VALUE]: TrustNode,
  [ENTITY_SCORP_VALUE]: SCorpNode,
};

const edgeTypes = {
  floating: SimpleFloatingEdge,
};

const fitViewOptions = { padding: 4 };

const NodeAsHandleFlow = ({ initialNodes, initialEdges }) => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: "floating",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "black",
            width: 50,
            height: 50,
          },
        },
        eds
      )
    ),
      [];
  });

  return (
    <div className="simple-floatingedges">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        // snapToGrid
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        connectionMode={ConnectionMode.Loose}
      >
        <Background style={{ backgroundColor: "white" }} />
      </ReactFlow>
    </div>
  );
};

export default NodeAsHandleFlow;
