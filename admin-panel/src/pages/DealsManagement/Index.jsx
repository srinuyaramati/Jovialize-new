import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ViewDealPopup from "./ViewDealPopup";
import { dateFormat } from "_helpers/dates";
import { getAllDeals, deleteMultiplsDeals, getDealImages } from "./http";
import { ListSearchComponent } from "../../components/SearchComponent";
import PaginatedItems from "components/Pagination";
import { RootContext } from "utils/context/RootContextProvider";

function DealsManagement() {

  const history = useHistory();
  const [dealsList, setDealsList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectDealMessage, setSelectDealMessage] = useState(false);
  const [individualDealInfo, setIndividualDealInfo] = useState({});
  const [searchValue, setsearchValue] = useState();
  const [dealsLength, setDealsLength] = useState(0);
  const contextText = useContext(RootContext);
  const {state:{role, cityId}} = contextText;

  // get deals list
  const getDealsList = async (value, offset) => {
    try {
      const city = role == 3 ? cityId : '';
      const result = await getAllDeals(value, offset, city);
      const data = result.data?.rows;
      setDealsList(data);
      setDealsLength(result.data?.count);
    }
    catch(error) {
      console.error(error)
      // console.error(error.message)
    }
  }

  useEffect(() => {
    getDealsList();
  }, [])

  const handleClose = () => {
    setShowPopup(false)
  }

  const viewDealInfo = (e, dealInfo) => {
    e.preventDefault();
    e.stopPropagation();
    getDealImages(dealInfo.dealId)
      .then(response => {
        const info = dealInfo;
              info.images = response.data; 
        setIndividualDealInfo(info)
        setShowPopup(true)
      })
    
  }

  const addDealNavigation = () => {
    history.push("/admin/addDeal");
  }

  const onDeleteDeal = (e, dealId) => {
    e.preventDefault();
    e.stopPropagation();

    let text = "Are you sure you want to delete the deal";
    if (confirm(text) == true) {
      deleteMultiplsDeals([dealId])
        .then(response => {
          console.log(response);
          getDealsList()
        })
        .catch(error => {
          console.log(error);
        })
    } else {
      // console.log("No")
    }
  }

  const onCheckDeal = (e, index) => {
    const value = e.target.checked
    const list = dealsList;
    list[index].checked = value;
    setDealsList([...list])
  }

  const onDeleteMultiplsDeals = () => {
    const dealIds = [];
    dealsList.map((data) => {
      if (data.checked === true) {
        dealIds.push(data.dealId)
      }
    })
    if (dealIds.length !== 0) {
      let text = "Are you sure you want to delete the deal's";
      if (confirm(text) == true) {
        deleteMultiplsDeals(dealIds)
          .then(response => {
            console.log(response);
            getDealsList()
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
    else {
      setSelectDealMessage(true);
      setTimeout(() => {
        setSelectDealMessage(false);
      }, 5000);
    }
  }

  const onSearch = (e) => {
    let value = e.target.value;
    setsearchValue(value);
    getDealsList(value);
  }

  const onSwitchPage = (offset) => {
    getDealsList("", offset);
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
                    <Card.Title as="h4">Deals List</Card.Title>
                    <p className="card-category">
                      Manage the deals information
                    </p>  
                  </Col>
                  <Col className="text-right">
                    <a onClick={() => addDealNavigation()}><Button className="btn btn-light">Add Deal</Button></a> &nbsp;
                    <a onClick={onDeleteMultiplsDeals}><Button className="btn btn-light">Delete Deal(s)</Button></a>
                    {selectDealMessage && <div class="text-danger mt-2">Select at least one deal</div>}
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <ListSearchComponent 
                  onSearch={onSearch} 
                  searchValue={searchValue}
                  title="Search with deal title" />
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="border-0">No</th>
                      <th className="border-0">Deal Title</th>
                      <th className="border-0">Deal Price</th>
                      <th className="border-0">Active From</th>
                      <th className="border-0">Active To</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">City</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dealsList && dealsList.map((data, i) => (
                        <tr key={i}>
                          <td>
                            {/* {data.dealId} */}
                            <input type="checkbox"
                                   checked={data.checked}
                                   value={data.dealId}
                                   onChange={(e) => onCheckDeal(e, i) } /></td>
                          <td>{i + 1}</td>
                          <td>{`${data.title && data.title.substring(0, 25)}...`}</td>
                          <td>{data.dealPrice}</td>
                          <td>{dateFormat(data.activeFrom, 'en-GB')}</td>
                          <td>{dateFormat(data.activeTo, 'en-GB')}</td>
                          <td>{data.status}</td>
                          <td>{data.cities?.cityName}</td>
                          <td>
                            <button
                              type="button"
                              className="btn-simple btn-link p-1 btn btn-info"
                              onClick={(e) => viewDealInfo(e, data)}><i className="fas fa-eye"></i></button> &nbsp; 
                            <button
                              type="button"
                              className="btn-simple btn-link p-1 btn btn-info"
                              onClick={(e) => history.push(`editDeal?dealId=${data.dealId}`)}><i className="fas fa-edit"></i></button>
                            <button
                              type="button"
                              className="btn-simple btn-link p-1 btn btn-danger"
                              data-toggle="confirmation"
                              onClick={(e) => onDeleteDeal(e, data.dealId)}><i className="fas fa-trash"></i></button>
                          </td>
                        </tr>
                      ))
                    }
                    {dealsList && dealsList.length == 0 && 
                      <tr>
                        <td colSpan={`9`}>
                          <p className="pl-4 ml-2 mb-0">No Records</p>
                        </td>
                      </tr>}
                  </tbody>
                </Table>
              </Card.Body>
              
              {/* Pagination component */}
              {dealsLength !== 0 && <PaginatedItems 
                itemsPerPage={10} 
                itemsLength={dealsLength}
                switchPage={onSwitchPage} />}
            </Card>
          </Col>
        </Row>
        <ViewDealPopup
          showPopup={showPopup}
          handleClose={handleClose}
          dealInfo={individualDealInfo} />
      </Container>
    </>
  );
}

export default DealsManagement;
