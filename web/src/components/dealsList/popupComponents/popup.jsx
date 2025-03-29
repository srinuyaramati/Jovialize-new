import { Button, Form, Modal } from "react-bootstrap";
import "./styles.scss";
import { useContext, useEffect, useState } from "react";
import { APP_API_URL } from "../../../config/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../../_services/http";
import { RootContext } from "../../../utils/context/RootContextProvider";

export function DealPopup({showPopup, handleClose, dealPopupInfo}) {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cityId = queryParams.get('locationId');

  useEffect(() => {
    setValidated(false)
  }, [showPopup])

  const { dispatch } = useContext(RootContext);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async(e) => {
    try{
      const form = e.currentTarget;
      e.preventDefault();
      e.stopPropagation();
      if (form.checkValidity() === false) {
        setValidated(true);
      } else {
        const payload = {
          email: formData.email,
          cityId: cityId
        }    
        const result = await login(payload);
        dispatch({
          type: "LOGIN",
          payload: result?.data
        })
        navigate(`/dealInfo?cityName=${dealPopupInfo.cityName}&locationId=${dealPopupInfo.city}&dealId=${dealPopupInfo.dealId}`);
      }
    } catch(error) {
      console.log("Error:-", error.response.data.message)
      setErrorMessage(error?.response?.data?.message)
    }
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return(
    <Modal show={showPopup} onHide={handleClose} className="deal-popup" size="md">
      <div className="image-block position-relative">
        {dealPopupInfo?.allImages && <img src={APP_API_URL + "dealImages/" + dealPopupInfo.allImages[dealPopupInfo.imageIndex]?.imageName} alt="" />}
        <a className="close-btn" onClick={handleClose}><i className="fa fa-close"></i></a>
      </div>
      <div className="popup-content">
        <h3>{dealPopupInfo?.title}</h3>
        <p className="short-description">
          {dealPopupInfo?.shortDescription}
        </p>
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
                value={formData.email}
                onChange={onChange}
                readOnly={formData.userId? true:false}
                maxLength={65}
                pattern="/^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,4}$/"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your email
              </Form.Control.Feedback>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <Button className="mt-3 btn-info submit-btn" type="submit">Join Jovialize</Button>
            </Form.Group>
        </Form>
      </div>
    </Modal>
  )
}