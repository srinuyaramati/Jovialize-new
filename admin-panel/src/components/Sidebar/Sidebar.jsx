// import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "utils/context/RootContextProvider";

function Sidebar({ color, image, routes }) {
  
  const location = useLocation();
  const [routesList, setRoutesList] = useState([]);  
  const contextText = useContext(RootContext);
  const {state:{role}} = contextText;

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  useEffect(() => {
    if(routes) {
      const menuItems = routes.map((data) => {
        if(role == 1 && (data.name == "City Management" ||
                          data.name == "Admin Users" ||
                          data.name == "Banner Images")
        ) {
          data.displayBasedOnRole = true;
        }
        return data;
      })
      // console.log(menuItems)
      setRoutesList(menuItems);
    }
  }, [role]);

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a className="simple-text" href="">
            Jovialize 
          </a>
        </div>
        <Nav>
          {routesList && routesList.map((prop, key) => {
            if (!prop.redirect && prop.layout == '/admin' && prop.displayOnSideBar && prop.displayBasedOnRole)
              return (
                <li
                  className={activeRoute(prop.layout + prop.path)}
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
