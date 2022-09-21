import { StrictMode } from "react";
import ReactDOM from "react-dom";
import MenuProvider from "react-flexible-sliding-menu";
import "./styles.css";
import App from "./App";
import Menu from "./Menu";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <MenuProvider MenuComponent={Menu} animation="push">
      <App />
    </MenuProvider>
  </StrictMode>,
  rootElement
);
