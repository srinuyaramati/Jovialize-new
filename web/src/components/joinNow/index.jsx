import { Col, Form, Row } from "react-bootstrap";
import lock from "../../assets/images/lock.svg";
import mail from "../../assets/images/mail.svg";
import { useContext, useState } from "react";
import './styles.scss'
import { SignInContext } from "../../utils/context/signInPopupContextProvider";
import SignInComponent from "../signInPopup";

function JoinNow({gotoJoinBlock}) {

  const [email, setEmail] = useState();
  const { signInDispatch } = useContext(SignInContext);
  
  // 
  const onSubmitJoin = async () => {
    signInDispatch({
      type: "OPEN",
      payload: {isSignUp: true, email: email}
    })
  }

  return (
    <div className='mail-container'>
      <div className='container'>
        <Row>
          <Col xs="12" md="6">
            <div className='left'>
              <div className='d-flex'>
                <div className='me-3'>
                  <img src={lock} alt='' />
                </div>
                <div>
                  <h5>Join now to get exclusive deals to inbox every week:</h5>
                  <span>  We negotiate the best deals on behalf of our members across cities  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col xs="12" md="6">
            <Form>
              <div className='d-flex join-mail-input'>
                <img src={mail} alt="" className='ps-2' />
                <div className="w-100">
                  <Form.Control
                    className='border-0'
                    placeholder="ENTER YOUR EMAIL ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type='button'
                    className='arrow-btn'
                    onClick={(e) => onSubmitJoin()}>
                    <i className="fa-solid fa-circle-arrow-right fa-2x"></i>
                  </button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <SignInComponent gotoJoinBlock={gotoJoinBlock} />
    </div>
  )
}

export default JoinNow;