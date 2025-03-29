import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Spinner
} from "react-bootstrap";
import "./styles.scss";
import { sendMails, checkMassMailStatus } from "./http";
import { dateFormat1, getTodayDate } from "_helpers/dates";

function MassMailing() {

  const [isLoading, setIsLoading] = useState(false);
  const [sendBtnDisabled, setSendBtnDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getMassMailStatus = async () => {
    try {
      const result = await checkMassMailStatus();
      let lastSendMassMailDate = dateFormat1(result.data[0]?.dealsTo, "fr-CA");
      setSendBtnDisabled(lastSendMassMailDate >= getTodayDate());
    }
    catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMassMailStatus();  
  },[])

  const onSubmit = async () => {
    const text = "Are you sure you want to send this week deals to subscribers?"
    try {
      if(confirm(text) == true) {
        await sendMails();
        setSendBtnDisabled(true);
      }
      setErrorMessage('')
    }
    catch(error) {
      console.error(error.response.data.message)
      setErrorMessage(error?.response?.data?.message)
    }
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Mass mailing</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="mt-3">
                  <h5>Are you want to send this week deals to all subscribers? </h5>
                  <Button 
                    type="button" 
                    className="btn btn-fill btn-info"
                    onClick={onSubmit}
                    disabled={isLoading || sendBtnDisabled ? true: false}>
                      {isLoading ? <Spinner animation="border" />: `` } <span>Send</span></Button>
                      <span className="text-danger font-weight-bold">{errorMessage}</span>
                </div>
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MassMailing;
