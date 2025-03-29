import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { getAllUsers, deleteUser } from "./http";
import UserManagePopup from "./UserManagePopup";
import ViewUserInfoPopup from "./ViewUserInfoPopup";
import { ListSearchComponent } from "components/SearchComponent";
import PaginatedItems from "components/Pagination";

function AdminManagement() {

  const [usersList, setUsersList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [individualUserInfo, setIndividualUserInfo] = useState({});
  const [showUserDetailsPopup, setShowUserDetailsPopup] = useState(false);
  const [searchValue, setsearchValue] = useState();
  const [usersLength, setUsersLength] = useState();

  const getUsers = (value, offset) => {
    getAllUsers(value, offset)
      .then(response => {
        setUsersList(response.data?.rows);
        setUsersLength(response.data?.count)
      })
      .catch(error => {
        console.log("citiesList", error)
      })
  }

  useEffect(() => {
    getUsers();
  }, []);

  const addUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPopup(true)
  }

  const editUser = (e, userInfo) => {
    e.preventDefault();
    e.stopPropagation();
    setIndividualUserInfo(userInfo)
    setShowPopup(true)
  }

  const onDeleteUser = async (e, userId) => {
    try{
      let text = "Are you sure you want to delete the user";
      if (confirm(text) == true) {
        const result = await deleteUser(userId);
        if (result) {
          getUsers();
        }
      }
      
    }
    catch(error) {
      console.error(error)
    }
  }

  const handleClose = (formResponse) => {
    setIndividualUserInfo({});
    setShowPopup(false)
    if (formResponse) {
      getUsers();
    }
  }

  const viewUserInfo = (data) => {
    setShowUserDetailsPopup(true);
    setIndividualUserInfo(data)
  }

  const handleUserDetailsClose = (status) => {
    setShowUserDetailsPopup(status);
  }

  const onSearch = (e) => {
    let value = e.target.value;
    setsearchValue(value)
    getUsers(value)
  }

  const onSwitchPage = (offset) => {
    getUsers("", offset)
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Row>
                  <Col>
                    <Card.Title as="h4">Users List</Card.Title>
                    <p className="card-category">Manage the Users information</p>
                  </Col>
                  <Col className="text-right">
                    <Button onClick={(e) => addUser(e)} className="btn btn-light">Add User</Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <ListSearchComponent
                  onSearch={onSearch}
                  searchValue={searchValue}
                  title="Search with user name" />
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">No</th>
                      <th className="border-0">User Name</th>
                      <th className="border-0">User Email</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Role</th>
                      <th className="border-0">City</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      usersList && usersList.map((data, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{data.userName}</td>
                          <td>{data.email}</td>
                          <td>{data.status == 1 ? 'Active' : 'Inactive'}</td>
                          <td>{data.roles?.roleName}</td>
                          <td>{data.cities?.cityName}</td>
                          <td>
                            <button
                              type="button"
                              className="btn-simple btn-link p-1 btn btn-info"
                              onClick={(e) => viewUserInfo(data)}><i className="fas fa-eye"></i></button> &nbsp;
                            {data.roleId != 4 && data.roles?.roleName != "App user" &&
                              <button
                                type="button"
                                className="btn-simple btn-link p-1 btn btn-info"
                                onClick={(e) => editUser(e, data)}><i className="fas fa-edit"></i></button>
                            }
                            <button
                              type="button"
                              className="btn-simple btn-link p-1 btn btn-danger"
                              onClick={(e) => onDeleteUser(e, data.adminUserId)}><i className="fas fa-trash"></i></button>
                          </td>
                        </tr>
                      ))
                    }
                    {usersList.length == 0 && <td colSpan="7">No Data</td>}
                  </tbody>
                </Table>
                {/* Pagination component */}
                <PaginatedItems
                  itemsPerPage={10}
                  itemsLength={usersLength}
                  switchPage={onSwitchPage} />
                <UserManagePopup
                  showPopup={showPopup}
                  handleClose={handleClose}
                  userInfo={individualUserInfo} />
                <ViewUserInfoPopup
                  showUserDetailsPopup={showUserDetailsPopup}
                  handleUserDetailsClose={handleUserDetailsClose}
                  userInfo={individualUserInfo} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminManagement;
