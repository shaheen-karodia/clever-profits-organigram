import React, { useContext } from "react";
import "./styles.css";
import NodePlotter from "./NodePlotter";
import styled from "styled-components";
import { MenuContext } from "react-flexible-sliding-menu";
import { Container, Row, Col } from "react-bootstrap";
import useExcelFetcher from "./ExcelFetcher/useExcelFetcher";
import { getNodes, getEdges } from "./ExcelFetcher/dataTransformer";
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
  const { loading, error, entities, holdings } = useExcelFetcher();

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  const initialNodes = getNodes(entities);
  const initialEdges = getEdges(holdings, entities);

  return (
    <>
      <button onClick={toggleMenu} className="primary-btn menu-button">
        Toggle Menu
      </button>
      <DownloadButton />
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
