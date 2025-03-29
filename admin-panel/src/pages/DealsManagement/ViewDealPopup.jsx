import { dateFormat } from "_helpers/dates";
import { APP_BASE_URL } from "config/constants";
import { useEffect } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import "./index.scss";
function ViewDealPopup({ showPopup, handleClose, dealInfo }) {

  useEffect(() => {
    // console.log(dealInfo)
  }, [])

  return (
    <Modal show={showPopup} onHide={handleClose} size="lg" animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Deal Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered >
          <tr>
            <td width="150">Title:</td>
            <td>{dealInfo.title}</td>
          </tr>
          <tr>
            <td>Deal Price:</td>
            <td>{dealInfo.dealPrice}</td>
          </tr>
          <tr>
            <td>Active From:</td>
            <td>{ dealInfo.activeFrom && dateFormat(dealInfo.activeFrom, 'en-GB')}</td>
          </tr>
          <tr>
            <td>Active To:</td>
            <td>{ dealInfo.activeFrom && dateFormat(dealInfo.activeTo, 'en-GB')}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{ dealInfo.status}</td>
          </tr>
          <tr>
            <td>City:</td>
            <td>{ dealInfo.cities?.cityName}</td>
          </tr>
          <tr>
            <td>Created At:</td>
            <td>{ dealInfo.createdAt}</td>
          </tr>
          <tr>
            <td>Short Description:</td>
            <td>{dealInfo.shortDescription}</td>
          </tr>
          <tr>
            <td>Long Description:</td>
            <td><div dangerouslySetInnerHTML={{__html: dealInfo.longDescription}}></div></td>
          </tr>
          <tr>
            <td>Service provider contact number:</td>
            <td>{dealInfo.contactNumber}</td>
          </tr>
          <tr>
            <td>Service provider email:</td>
            <td>{dealInfo.contactEmail}</td>
          </tr>
          <tr>
            <td>Images:</td>
            <td>
              <Row className="no-gutters">
                {dealInfo.images && dealInfo.images.map((data, i) => (
                  <Col sm={3} key={i} className="mb-3 ">
                    <div className="view-image-thumb" >
                      <img style={{width: '100%'}} src={`${APP_BASE_URL}dealImages/${data.imageName}`} />
                    </div>
                  </Col>
                ))}
                {dealInfo.images && dealInfo.images.length == 0 && <span className="pl-3">No Images</span>}
              </Row>
              
            </td>
          </tr>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewDealPopup;