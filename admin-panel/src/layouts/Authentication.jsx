import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import Footer from "components/Footer/Footer";
import { PublicRoutes } from "../routes";

function Authentication() {
  const mainPanel = React.useRef(null);

  const getRoutes = (routes) => {
    return routes && routes.map((prop, key) => {
      if (prop.layout === "/authentication") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="wrapper">
      <div className="authentication-panel" ref={mainPanel}>
        <div className="content">
          <Switch>
            {getRoutes(PublicRoutes)}
          </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Authentication;