import React, { useContext } from "react";
import "./styles.css";

import styled from "styled-components";
import { MenuContext } from "react-flexible-sliding-menu";
import { Container, Row, Col } from "react-bootstrap";
import { getNodes, getEdges } from "./dataTransformer";
import { StoreContext } from "./StoreProvider";
import DownloadButton from "./DownloadButton";
import { nodeTypes } from "./NodePlotter/Nodes";
import SimpleFloatingEdge from "./NodePlotter/SimpleFloatingEdge";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Controls,
} from "react-flow-renderer";

const ContainerDiv = styled(Container)`
  font-family: sans-serif;
  text-align: center;
`;

const DemoArea = styled(Col)`
  width: 100%;
  height: calc(100vh - 16px);
`;

const edgeTypes = {
  floating: SimpleFloatingEdge,
};

const fitViewOptions = { padding: 4 };

export default function App() {
  const { toggleMenu } = useContext(MenuContext);
  const { entityStore, holdingStore, titleStore } = useContext(StoreContext);

  const initialNodes = getNodes(entityStore.entities);
  const initialEdges = getEdges(holdingStore.holdings);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [title] = titleStore;
  return (
    <div className="screenshot-area">
      <div className="action-button-wrapper">
        <button onClick={toggleMenu} className="primary-btn menu-button">
          Toggle Menu
        </button>
        <DownloadButton />
      </div>
      <h2 className="project-title">{title}</h2>

      <ContainerDiv fluid>
        <Row>
          <DemoArea>
            <div className="simple-floatingedges">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={fitViewOptions}
                connectionMode={ConnectionMode.Loose}
              >
                <Background style={{ backgroundColor: "white" }} />
                <Controls />
              </ReactFlow>
            </div>
          </DemoArea>
        </Row>
      </ContainerDiv>
    </div>
  );
}
