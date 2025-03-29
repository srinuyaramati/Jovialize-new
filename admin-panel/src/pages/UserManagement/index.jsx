import PaginatedItems from "components/Pagination";
import { ListSearchComponent } from "components/SearchComponent";
import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { getAllUsers } from "./http";
import { RootContext } from "utils/context/RootContextProvider";

function UserManagement() {

  const [searchValue, setsearchValue] = useState();
  const [usersLength, setUsersLength] = useState();
  const [usersList, setUsersList] = useState();
  const contextText = useContext(RootContext);
  const {state:{role, cityId}} = contextText;

  // search box action
  const onSearch = (e) => {
    let value = e.target.value;
    setsearchValue(value)
    getUsers(value)
  }

  const getUsers = async (value, offset) => {
    try {
      const city = role == 3 ? cityId : '';
      const users = await getAllUsers(value, offset, city);
      setUsersList(users.data?.rows);
      setUsersLength(users.data?.count)
    }
    catch(error) {
      console.error("Error:", error)
    }
  }

  /** pagination page change action */
  const onSwitchPage = (offset) => {
    getUsers("", offset)
  }

  useEffect(() => {
    getUsers();
  }, []);

  return(
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
                </Row>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <ListSearchComponent
                  onSearch={onSearch}
                  searchValue={searchValue}
                  title="Search with user" />

                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">No</th>
                      <th className="border-0">User Email</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Subscription</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList && usersList.map((data, i) => (
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td>{data?.email}</td>
                        <td>{data?.status}</td>
                        <td>{data?.subscription == '1'? "Subscribed" : "Un-subscribed"}</td>
                        <td>{data?.userCities?.cityName}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {/* Pagination component */}
                <PaginatedItems
                  itemsPerPage={10}
                  itemsLength={usersLength}
                  switchPage={onSwitchPage} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserManagement;