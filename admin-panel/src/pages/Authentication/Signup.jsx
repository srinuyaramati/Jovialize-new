import React from "react";

import {
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";

function Signup() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Signup page</Card.Title>
              </Card.Header>
              <Card.Body>Content</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Signup;