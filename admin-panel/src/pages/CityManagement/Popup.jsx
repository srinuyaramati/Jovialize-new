import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { cityRequest } from "./http";

function CityManagePopup({ showPopup, handleClose, cityInfo }) {

  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    cityId: cityInfo.cityId,
    cityName: cityInfo.cityName
  });

  useEffect(() => {
    setFormData(cityInfo);
    setErrorMessage('')
  }, [cityInfo])

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value,
    });
  };

  const onSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity() === false) {      
      setValidated(true);
    } else {
      cityRequest(formData)
        .then(response => {
          console.log(response);
          handleClose(response);
        })
        .catch((error) => {
          console.log(error?.response?.data?.error);
          setErrorMessage(error?.response?.data?.error.split('for')[0])
        })
    }
  }

  return (
    <Modal show={showPopup} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Add City Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form className="city-form"
          onSubmit={(e) => onSubmit(e)}
          noValidate
          validated={validated} >

          <Form.Group className="mb-3" controlId="cityName">
            <Form.Label>City Name:</Form.Label>
            <Form.Control
              required
              type="text"
              name="cityName"
              placeholder="City Name"
              value={formData.cityName}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter city name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City Status:</Form.Label>
            <div className="mt-2">
              <Form.Check
                inline
                label="Active"
                name="status"
                type="radio"
                id="statusActive"
                value="Active"
                checked={formData.status === 'Active'}
                onChange={onChange}
              />
              <Form.Check
                inline
                label="Inactive"
                name="status"
                type="radio"
                id="statusInactive"
                value="Inactive"
                checked={formData.status === 'Inactive'}
                onChange={onChange}
              />
            </div>
          </Form.Group>

          {errorMessage &&
            <Alert key={"danger"} variant={"danger"}>
              {errorMessage}
            </Alert>
          }

          <div className="clearfix">
            <Button variant="primary" onClick={handleClose} className="float-right mt-2">
              Close
            </Button>
            <Button variant="primary" type="submit" className="float-right mt-2 mr-2">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CityManagePopup;