import React, { useContext, useState } from "react";
import { login } from "./http";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { RootContext } from "utils/context/RootContextProvider";


function Login() {

  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: "admin@deals.com",
    password: "123456"
  });
  const { dispatch } = useContext(RootContext);
  
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value,
    });
  };

  const submitLogin = async (e) => {
    try {
      const form = e.currentTarget;
      e.preventDefault();
      e.stopPropagation();
  
      if (form.checkValidity() === false) {      
        setValidated(true);
      } else {
        const response = await login(formData);
        dispatch({
          type: "LOGIN",
          payload: response?.data
        })
        history.push("/admin/dashboard");
      }
    }
    catch(error) {
      console.error("Error:", error);
      setErrorMessage(error.response?.data?.message)
    }    
  }

  const navigation = (path) => {
    history.push(path);
  }

  return (
    <Row className="justify-content-center">
      <Col sm="12" md="8" lg="5">
        <Container>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h3" className="text-center mt-5">Admin Login</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form className="authentication-form" 
                        onSubmit={(e) => submitLogin(e)}
                        noValidate 
                        validated={validated} >

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control 
                        required 
                        type="email"
                        name="email" 
                        placeholder="Email"
                        value={formData.email}
                        onChange={onChange}
                        isInvalid={
                          validated &&
                          !/^\S+@\S+\.\S+$/.test(formData.email)
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter email
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control 
                        required 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={onChange} 
                        isInvalid={
                          validated && formData.password.length < 6
                        } />
                      <Form.Control.Feedback type="invalid">
                        Please enter password
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    {errorMessage && 
                      <Alert key={"danger"} variant={"danger"}>
                        {errorMessage}
                      </Alert>
                    }

                    <div className="clearfix">
                      <Button type="button" variant="link" className="border-0 mt-2 pl-0">
                        <a className="anchor-tag" onClick={() => navigation('/authentication/forgotPassword')}>Forgot password</a>
                      </Button>
                      <Button variant="primary" type="submit" className="float-right mt-2">
                        Login
                      </Button>
                    </div>                    
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}

export default Login;