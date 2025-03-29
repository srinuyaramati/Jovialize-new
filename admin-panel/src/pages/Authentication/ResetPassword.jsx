import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { resetPassword } from "./http";
import { useHistory } from "react-router-dom";

function ResetPassword() {

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = new URLSearchParams(location.search.substring(1));
  const paramEmail = params.get("email");
  const paramEmailVerificationCode = params.get("verificationCode");
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
        const payload = {
          password: formData.newPassword,
          email: paramEmail,
          verificationCode: paramEmailVerificationCode
        }
        const response = await resetPassword(payload);
        setsuccessMessage(response.data.message);
        setFormData({newPassword: "", confirmPassword:""});
        setIsLoading(false);
        setTimeout(() => {
          setsuccessMessage("");
          navigation("/authentication/login");
        }, 10000);
      }
    }
    catch (error) {
      console.log("ResetPassword():- ", error);
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
                  <Card.Title as="h3" className="text-center mt-5">Reset Password</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form className="authentication-form"
                    onSubmit={(e) => onSubmit(e)}
                    noValidate
                    validated={validated}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>New Password:</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={onChange}
                        isInvalid={
                          validated &&
                          !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(formData.newPassword)
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter strong password
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Confirm Password:</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={onChange}
                        isInvalid={
                          validated &&
                          formData.confirmPassword !== formData.newPassword
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Please and confirm password do not match
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

export default ResetPassword;