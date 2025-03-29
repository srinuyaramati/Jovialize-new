import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { submitUserInfo } from "./http";
import { citiesList, getRolesList } from "_services/commons";

function UserManagePopup({ showPopup, handleClose, userInfo }) {

  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    status: "Active",
    roleId: "",
    cityId: "",
    entityId: "1"
  });
  const [rolesList, setRolesList] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData(userInfo);
    setErrorMessage('');
  }, [userInfo])

  const getUserRolesList = () => {
    getRolesList()
      .then(response => {
        setRolesList(response.data);
      })
      .catch(error => {
        console.log("Error-getUserRoles()", error)
      })
  }

  const getCitiesList = () => {
    citiesList()
      .then(response => {
        setCities(response.data)
      })
      .catch(error => {
        console.log("Error - citiesList()", error)
      })
  }

  useEffect(() => {
    getUserRolesList();
    getCitiesList();
  }, [])

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
      const payload = {
        userName: formData.userName,
        status: formData.status,
        roleId: formData.roleId,
        cityId: formData.cityId,
        entityId: '1'
      }

      if(!formData.adminUserId) {
        payload.password = formData.password;
        payload.email = formData.email
      } else {
        payload.adminUserId = formData.adminUserId;
      }

      submitUserInfo(payload)
        .then(response => {
          console.log(response);
          handleClose(response.data);
          setIsLoading(false);          
          setErrorMessage([])
        })
        .catch((error) => {
          console.log("Error-addUser-onSubmit()", error);
          setIsLoading(false);
          setErrorMessage(error)
        })
    }
  }

  return (
    <Modal show={showPopup} onHide={handleClose} animation={true} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{userInfo.adminUserId? "Edit": "Add"} User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="city-form"
          onSubmit={(e) => onSubmit(e)}
          noValidate
          validated={validated}>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="userName">
                <Form.Label>Admin user Name:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="userName"
                  placeholder="User Name"
                  value={formData.userName}
                  onChange={onChange}
                  maxLength={55}
                  pattern="^[a-zA-Z_ ]+$"
                  isInvalid={
                    validated &&
                    !/^[a-zA-Z_ ]+$/.test(formData.userName)
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please enter valid user name
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={onChange}
                  readOnly={formData.adminUserId? true:false}
                  pattern="/^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,4}$/"
                  maxLength={65}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter user email
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {!formData.adminUserId && <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={onChange}
                  pattern="/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"
                  isInvalid={
                    validated &&
                    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(formData.password)
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please enter strong password
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="confirmPassword">
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
                    formData.confirmPassword !== formData.password
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Passwords and confirm password do not match
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>}

          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="roleId">
                <Form.Label>Role:</Form.Label>
                <Form.Select
                  aria-label="Role ID"
                  name="roleId"
                  defaultValue={formData.roleId}
                  required
                  onChange={onChange}
                  value={formData.roleId}
                  className="form-control"
                >
                  <option value="" >Select Role</option>
                  {rolesList && rolesList.map((data, i) => (
                    <option key={data.roleId} value={data.roleId}>{data.roleName}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select role
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="cityId">
                <Form.Label>City:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="cityId"
                  defaultValue={formData.cityId}
                  required
                  onChange={onChange}
                  className="form-control"
                  value={formData.cityId}
                >
                  <option value="">Select City</option>
                  {cities && cities.map((city) => (
                    <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select city
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>User Status:</Form.Label>
                <div className="mt-2">
                  <Form.Check
                    inline
                    label="Active"
                    name="status"
                    type="radio"
                    id="statusActive"
                    value="1"
                    checked={formData.status == '1'}
                    onChange={onChange}
                  />
                  <Form.Check
                    inline
                    label="Inactive"
                    name="status"
                    type="radio"
                    id="statusInactive"
                    value="0"
                    checked={formData.status == '0'}
                    onChange={onChange}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* <Form.Group className="mb-3" controlId="entityId">
            <Form.Label>Entity:</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="entityId"
              defaultValue={formData.entityId}
              required
              onChange={onChange}
              className="form-control"
            >
              <option >Select Entity</option>
              <option value={`1`}>HYD 1</option>
              <option value={`2`}>Hyd 2</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select entity
            </Form.Control.Feedback>
          </Form.Group> */}

          <div>
            {errorMessage.length !== 0 &&
              <Alert key={"danger"} variant={"danger"}>
                {errorMessage.map((data, i) => (
                  <div key={i}>{data?.message}<br /></div>
                ))}
              </Alert>
            }
          </div>

          <div className="clearfix">
            <Button variant="primary" onClick={handleClose} className="float-right mt-2">
              Close
            </Button>
            <Button variant="primary" 
                    type="submit" 
                    className="float-right mt-2 mr-2"
                    disabled={isLoading? true: false}>
              {isLoading ? <Spinner animation="border" />: `` } <span>Submit</span>
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default UserManagePopup;