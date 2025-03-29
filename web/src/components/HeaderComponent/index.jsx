import React, { useContext } from "react";
import { Nav, NavDropdown, Row, Col } from 'react-bootstrap';
import "./styles.scss";
import Search from "../bannerSearch";
import { Link, useNavigate } from "react-router-dom";
import { RootContext } from "../../utils/context/RootContextProvider";
import SignInComponent from "../signInPopup";
import { SignInContext } from "../../utils/context/signInPopupContextProvider";

const HeaderComponent = ({gotoJoinBlock}) => {

  const { dispatch } = useContext(RootContext);
  const { signInDispatch } = useContext(SignInContext);
  const navigate = useNavigate();
  const {state:{userId}} = useContext(RootContext);
  // logout
  function logout() {
    dispatch({
      type: "LOGOUT"
    })
    navigate('/deals');
  }

  //
  const signInPopup = () => {
    signInDispatch({
      type: "OPEN"
    })
  }

  return (
    <div className="container-fluid page-header">
      <Row className="py-2">
        <Col xs={12} md={3} className="">
          <div className="logo text-center">
            <Link to="/deals?cityName=Bangalore&locationId=1">
              <img src="../../images/logo.png" alt="Logo" />
            </Link>
          </div>
        </Col>

        <Col xs={12} md={7}>
          <Search inHeader={true} />
        </Col>
        <Col xs={12} md={2}>
          {!userId && 
            <div className="sign-in">
              <a href={(e) => e.preventDefault()} className="m-2" onClick={signInPopup}>SIGN IN</a> 
              {/* | <a href="#" className="m-2" onClick={gotoJoinBlock}>SIGN UP</a> */}
            </div>}
          {userId && <Nav className="menu">            
            <NavDropdown title={<span><i className="fa fa-circle-user"></i> My Account <i className="bi bi-person"></i></span>} id="user-nav-dropdown" align="end">
              {/* <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#settings">Settings</NavDropdown.Item> */}
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav> }
        </Col>
      </Row>
      <SignInComponent gotoJoinBlock={gotoJoinBlock} />
    </div>
  );
};

export default HeaderComponent;
