import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import RoleManagePopup from "./Popup";
import { getRolesList } from "_services/commons";

function RoleManagement() {

  const [rolesList, setRolesList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [individualRoleInfo, setIndividualRoleInfo] = useState({});

  const getRoles = () => {
    getRolesList()
      .then(response => {
        setRolesList(response.data)
      })
      .catch(error => {
        console.log("Roles List", error)
      })
  }

  useEffect(() => {
    getRoles();
  }, []);

  const addRole = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPopup(true)
  }

  const editRole = (e, roleInfo) => {
    e.preventDefault();
    e.stopPropagation();
    setIndividualRoleInfo(roleInfo);
    setShowPopup(true)
  }

  const handleClose = (formResponse) => {
    setIndividualRoleInfo({})
    setShowPopup(false);
    if (formResponse) {
      getRoles();
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Row>
                <Col>
                  <Card.Title as="h4">Roles List</Card.Title>
                  <p className="card-category">
                    Manage the Roles information
                  </p>
                </Col>
                <Col className="text-right">
                  <Button onClick={(e) => addRole(e)} className="btn btn-light">Add Role</Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Role name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    rolesList && rolesList.map((data, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{data.roleName}</td>
                        <td>
                          <button
                            type="button"
                            className="btn-simple btn-link p-1 btn btn-info"
                            onClick={(e) => editRole(e, data)}><i className="fas fa-edit"></i></button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <RoleManagePopup
                showPopup={showPopup}
                handleClose={handleClose}
                roleInfo={individualRoleInfo} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default RoleManagement