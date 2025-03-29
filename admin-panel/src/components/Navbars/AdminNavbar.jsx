import React, { Component, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { PrivateRoutes } from "routes";
import { logoutFun } from "../http";
import { RootContext } from "utils/context/RootContextProvider";

function Header() {

  const history = useHistory();
  const location = useLocation();
  const { dispatch } = useContext(RootContext);

  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < PrivateRoutes.length; i++) {
      if (location.pathname.indexOf(PrivateRoutes[i].layout + PrivateRoutes[i].path) !== -1) {
        return PrivateRoutes[i].name;
      }
    }
    return "Brand";
  };

  const logout = (e) => {
    logoutFun()
      .then(response => {
        sessionStorage.clear();
        dispatch({
          type: "LOGOUT"
        })
        history.push("/authentication/login");
        console.clear();
        window.location.reload();
      })
      .catch((error) => {
        console.log("Eror:", error);
      })    
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        {/* Responsive Icon */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                onClick={(e) => logout(e)}
              >
                <span className="no-icon">Log out</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
