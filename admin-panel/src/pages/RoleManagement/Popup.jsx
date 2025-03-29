import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { roleRequest } from "./http";

function RoleManagePopup({ showPopup, handleClose, roleInfo }) {

  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    roleId: roleInfo.roleId,
    roleName: roleInfo.roleName
  });

  useEffect(() => {
    setFormData(roleInfo);
    setErrorMessage('')
  }, [roleInfo])

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
      roleRequest(formData)
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
        <Modal.Title>Add Role Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="city-form"
          onSubmit={(e) => onSubmit(e)}
          noValidate
          validated={validated} >

          <Form.Group className="mb-3" controlId="cityName">
            <Form.Label>Role Name:</Form.Label>
            <Form.Control
              required
              type="text"
              name="roleName"
              placeholder="Role Name"
              value={formData.roleName}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter role name
            </Form.Control.Feedback>
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

export default RoleManagePopup;