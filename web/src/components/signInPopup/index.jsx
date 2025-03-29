import { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import "./styles.scss";
import { SignInContext } from "../../utils/context/signInPopupContextProvider";
import { RootContext } from "../../utils/context/RootContextProvider";
import { getCities, joinWithUsRequest, login } from "../../_services/http";

function SignInComponent({gotoJoinBlock}) {

  const { state: { showPopup, isSignUp, inputEmail } } = useContext(SignInContext);
  const { signInDispatch } = useContext(SignInContext);
  const { dispatch } = useContext(RootContext);
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /** get cities list  */
  const getCitiesList = async () => {
    try{
      const cities = await getCities();
      setCities(cities.data);
    }
    catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCitiesList();
    setFormData({});
    setErrorMessage("");
    setSuccessMessage("");
  }, []);
  
  useEffect(() => {
    setFormData({email: inputEmail});
  }, [showPopup])

  useEffect(() => {
    setFormData({});
    setErrorMessage("");
    setSuccessMessage("");
  }, [isSignUp]);
  
  const handleClose = () => {
    setFormData({})
    signInDispatch({
      type: "CLOSE"
    })
  }

  // this method will call from backend response
  const onGotoJoinBlock = () => {
    handleClose();
    gotoJoinBlock();
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //
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
          email: formData.email
        }  
        if(isSignUp) {
          payload.cityId = formData.city;
          let joinResponse = await joinWithUsRequest(payload);
          setSuccessMessage(joinResponse?.data?.message);
          setTimeout(() => {
            signInDispatch({
              type: "CLOSE"
            });  
          }, 5000);
          

        } else {
          const signInResult = await login(payload);
          setFormData({})
          dispatch({
            type: "LOGIN",
            payload: signInResult?.data
          })
          signInDispatch({
            type: "CLOSE"
          });
        }
        setIsLoading(false);
        
      }
    }
    catch (error) {
      setIsLoading(false)
      console.log("Error:-", error.response.data.message);
      setErrorMessage(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    setErrorMessage("");
    setFormData({email: ""})
  }, []);

  const JoinNowAction = () => (
    <>User email doesn't exist, please Join now</>
  )
  
  return (
    <div>
      <Modal show={showPopup} onHide={handleClose} className="deal-popup signin-popup-content" size="md">
        <div className="image-block position-relative clearfix">
          <a className="close-btn" onClick={handleClose}><i className="fa fa-close"></i></a>
        </div>
        <div className="popup-content">
          <div className="text-center">
            <div className="icon-signin-account"></div>
            <h2 className="mt-2">Sign {isSignUp? "Up":"In"} to your account </h2>
          </div>
          <div>
            <Form
              onSubmit={(e) => onSubmit(e)}
              noValidate
              validated={validated}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Your E-mail"
                  value={formData.email == ''? inputEmail: formData.email}
                  onChange={onChange}
                  readOnly={formData.userId ? true : false}
                  maxLength={65}
                  pattern="/^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,4}$/"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your email
                </Form.Control.Feedback>
              </Form.Group>

              {isSignUp && <Form.Group className="mb-3" controlId="city">
                <Form.Select
                        aria-label="city"
                        name="city"
                        onChange={onChange}
                        className="form-control" 
                        value={formData.city}
                        required>
                        <option value="" >Select city</option>
                        {cities && cities.map((city) => (
                          <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                        ))}
                      </Form.Select>
                <Form.Control.Feedback type="invalid">
                    Please select city
                </Form.Control.Feedback>
              </Form.Group>}

              {errorMessage && 
                <p className="error-message">{errorMessage == "User email doesn't exist, please join now"? <JoinNowAction /> : errorMessage}</p>}
              {successMessage && <p className="text-success text-start">{successMessage}</p>}
              {/* <a href={(e) => e.preventDefault()} onClick={onGotoJoinBlock}>Join now</a> */}
              <Button className="mt-3 btn-info submit-btn" type="submit" disabled={isLoading? true: false}>
                {isLoading ? <Spinner size="sm" animation="border" />: `` } Sign {isSignUp? "Up":"In"}
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SignInComponent;