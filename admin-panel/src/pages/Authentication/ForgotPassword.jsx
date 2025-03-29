import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { forgotPassword } from "./http";
import { useHistory } from "react-router-dom";

function ForgotPassword() {

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    try {
      const form = e.currentTarget;
      e.preventDefault();
      e.stopPropagation();

      if (form.checkValidity() === false) {
        setValidated(true);
      } else {
        setIsLoading(true);
        const response = await forgotPassword(formData);
        setSuccessMessage(response?.data?.message);
        setFormData({email:""});
        setIsLoading(false);
        setTimeout(() => {
          setSuccessMessage("");          
        }, 10000);
      }
    }
    catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message);
      setIsLoading(false);
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
                  <Card.Title as="h3" className="text-center mt-5">Forgot Password</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form className="authentication-form"
                    onSubmit={(e) => onSubmit(e)}
                    noValidate
                    validated={validated}>
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

                    {errorMessage &&
                      <Alert key={"danger"} variant={"danger"}>
                        {errorMessage}
                      </Alert>
                    }
                    {successMessage &&
                      <Alert key={"success"} variant={"success"}>
                        {successMessage}
                      </Alert>
                    }

                    <div className="clearfix">
                      <Button type="button" variant="link" className="border-0 mt-2 pl-0">
                        <a className="anchor-tag" onClick={() => navigation('/authentication/login')}>Login</a>
                      </Button>
                      
                      <Button variant="primary" 
                              type="submit" 
                              className="float-right mt-2"
                              disabled={isLoading ? true: false}>
                        {isLoading ? <Spinner animation="border" />: `` } <span>Submit</span>
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
  )
}

export default ForgotPassword;