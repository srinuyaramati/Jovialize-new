import React, { useContext, useState } from 'react';
import './footer.scss'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { unsubscribe } from '../../_services/http';
import { RootContext } from '../../utils/context/RootContextProvider';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

  const {state:{userId, userEmail}} = useContext(RootContext);
  const { dispatch } = useContext(RootContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onUnsubscribe = async (e) => {
    try {
      const payload = {
        email: userEmail
      }    
      await unsubscribe(payload);
      dispatch({
        type: "LOGOUT"
      })
      navigate('/deals');
    }
    catch(error) {
      console.log("Error:-", error.response.data.message);
      setErrorMessage(error?.response?.data?.message);
    }    
  }

  const navigation = (path) => {
    navigate("/"+path);
  }

  return (
    <div className='main-footer'>
      <div className='container'>
        <div className='pt-3'>
          <Row>
            {/* <Col xs="12" md="4" className='aboutus'>
              <h5>About us</h5>
              <span className='aboutus-content'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</span>
            </Col> */}
            <Col xs="12" md="6" className='contactus mt-3 mt-md-0'>
              <h5>Contact us</h5>
              <span className='contactus-content'> 
                Plese signup for weekly deals and updates. 
                Have questions or suggestions? We’d love to hear from you! Reach out to us at <a href='mailto:support@jovialize.com'>contactus@jovialize.com</a> or follow us on social media.  
              </span><br />
            </Col>
            <Col xs="12" md="2" className='mt-3 mt-md-0'>
              <h5>Quick links</h5>
              <ul className='quick-links'>
                <li><a onClick={() => navigation("aboutus")}>Abouts</a></li>
                <li><a onClick={() => navigation("termsConditions")}>Terms & Conditions</a></li>
              </ul>
            </Col>
            {userId &&  <Col xs="12" md="3" className='mt-3 mt-md-0'>
              <h5>Unsubscribe</h5>
              <a className='anchor' href={(e) => e.preventDefault()} onClick={onUnsubscribe}>Un-subscribe</a>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </Col>}
          </Row>
        </div>
      </div>
      
      <div className="footer">
        <div className='container py-0 clearfix'>
          <div className='left float-start'>
            © {new Date().getFullYear()}{" "}
            <a onClick={(e) => e.preventDefault()}>Jovialize.com</a>
          </div>
          <div className='right float-lg-end text-right'>
            Copyright © JOVIALIZE.COM India Private Limited. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer;