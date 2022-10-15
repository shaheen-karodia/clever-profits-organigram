import React, { useContext } from "react";
import "./styles.css";
import NodePlotter from "./NodePlotter";
import styled from "styled-components";
import { MenuContext } from "react-flexible-sliding-menu";
import { Container, Row, Col } from "react-bootstrap";
import { getNodes, getEdges } from "./dataTransformer";
import { StoreContext } from "./StoreProvider";
import DownloadButton from "./DownloadButton";

const ContainerDiv = styled(Container)`
  font-family: sans-serif;
  text-align: center;
`;

const DemoArea = styled(Col)`
  width: 100%;
  height: 85vh;
`;

export default function App() {
  const { toggleMenu } = useContext(MenuContext);
  const { entityStore, holdingStore, titleStore } = useContext(StoreContext);

  const initialNodes = getNodes(entityStore.entities);
  const initialEdges = getEdges(holdingStore.holdings);

  const [title] = titleStore;
  return (
    <>
      <div className="action-button-wrapper">
        <button onClick={toggleMenu} className="primary-btn menu-button">
          Toggle Menu
        </button>
        <DownloadButton />
      </div>
      <h2 className="project-title">{title}</h2>

      {/* <h3>{titleStore.title}</h3> */}
      <ContainerDiv fluid>
        <Row>
          <DemoArea>
            <NodePlotter
              initialNodes={initialNodes}
              initialEdges={initialEdges}
            />
          </DemoArea>
        </Row>
      </ContainerDiv>
    </>
  );
}
