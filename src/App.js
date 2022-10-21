import React, { useContext } from "react";
import "./styles.css";

import styled from "styled-components";
import { MenuContext } from "react-flexible-sliding-menu";
import { Container, Row, Col } from "react-bootstrap";

import DownloadButton from "./DownloadButton";
import { nodeTypes } from "./NodePlotter/Nodes";
import SimpleFloatingEdge from "./NodePlotter/SimpleFloatingEdge";
import ReactFlow, {
  Background,
  ConnectionMode,
  Controls,
} from "react-flow-renderer";
import { PlotterContext } from "./PlotterContext";
import { TitleContext } from "./TitleContext";

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

const fitViewOptions = { padding: 0 };

export default function App() {
  const { toggleMenu } = useContext(MenuContext);
  const { titleStore } = useContext(TitleContext);
  const { nodes, edges, onNodesChange, onEdgesChange } =
    useContext(PlotterContext);

  const [title] = titleStore;

  return (
    <div className="screenshot-area">
      <div className="action-button-wrapper">
        <button onClick={toggleMenu} className="primary-btn menu-button">
          Show Table
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
