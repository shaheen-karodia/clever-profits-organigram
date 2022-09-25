import { StrictMode } from "react";
import ReactDOM from "react-dom";
import MenuProvider from "react-flexible-sliding-menu";
import "@glideapps/glide-data-grid/dist/index.css";
import "./styles.css";
import App from "./App";
import Menu from "./Menu";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <MenuProvider MenuComponent={Menu} animation="push" width={"900px"}>
      <App />
    </MenuProvider>
  </StrictMode>,
  rootElement
);
