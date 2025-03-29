import React, { useEffect, useState } from "react";

import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { citiesList } from "_services/commons";
import CityManagePopup from "./Popup";
import { ListSearchComponent } from "components/SearchComponent";

function CityManagement() {

  const [searchValue, setsearchValue] = useState();
  const [cities, setCities] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [individualCityInfo, setIndividualCityInfo] = useState({});

  // get cities list
  const getCities = async (value) => {
    try {
      const cities = await citiesList(value);
      setCities(cities.data)
    }
    catch(error) {
      console.error("citiesList", error)
    }
  }

  useEffect(() => {
    getCities();
  }, []);


  const addCity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPopup(true)
  }

  const editCity = (e, cityInfo) => {
    e.preventDefault();
    e.stopPropagation();
    setIndividualCityInfo(cityInfo);
    setShowPopup(true)
  }

  const handleClose = (formResponse) => {
    setIndividualCityInfo({})
    setShowPopup(false)
    if (formResponse) {
      getCities();
    }
  }

  // search box action
  const onSearch = (e) => {
    let value = e.target.value;
    setsearchValue(value)
    getCities(value)
  }

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Row>
                <Col>
                  <Card.Title as="h4">Cities List</Card.Title>
                  <p className="card-category">
                    Manage the cities information
                  </p>
                </Col>
                <Col className="text-right">
                  <Button onClick={(e) => addCity(e)} className="btn btn-light">Add City</Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <ListSearchComponent
                  onSearch={onSearch}
                  searchValue={searchValue}
                  title="Search with city" />
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">City name</th>
                    <th className="border-0">Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cities && cities.map((data, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{data.cityName}</td>
                        <td>{data.status}</td>
                        <td>
                          <button
                            type="button"
                            className="btn-simple btn-link p-1 btn btn-info"
                            onClick={(e) => editCity(e, data)}><i className="fas fa-edit"></i></button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <CityManagePopup
                showPopup={showPopup}
                handleClose={handleClose}
                cityInfo={individualCityInfo} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CityManagement;
