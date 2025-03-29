import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import './utils/axios';
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";

import MainApp from "./AppInitializer";
import { RootContextProvider } from "utils/context/RootContextProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <RootContextProvider>
    <MainApp />
  </RootContextProvider>
);