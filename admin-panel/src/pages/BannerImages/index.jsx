import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { getBanners, axiosMultipartRequest } from "_services/commons";
import { APP_BASE_URL } from "config/constants";
import { URL } from "config/constants";

function BannerImages() {

  const [banners, setBanners] = useState([]);

  // get banners list
  const getBannersList = async () => {
    try {
      const bannersList = await getBanners();
      setBanners(bannersList.data);
    }
    catch (error) {
      console.error("Error - getBannersList()", error)
    }
  }

  useEffect(() => {
    getBannersList();
  }, []);

  // submiting the deal form information
  const submitDeal = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    // setIsLoading(true);
  }

  const uploadFile = async (event, id, index) => {
    try {
      const file = event.target.files[0];
      let fd = new FormData();
      fd.append('image', file);
      fd.append('imageId', id);
      fd.append('uploadLocation', 'banners');
      const response = await axiosMultipartRequest.post(URL.BANNER_UPLOAD, fd);
      // console.log(response?.data?.response);
      let banersList = banners;
      banersList[index].bannerName = response?.data?.response;
      setBanners({...banners, banersList })
    }
    catch(error) {
      window.console.error(error);
    }
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h4">Upload Banner Images</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={(e) => submitDeal(e)} noValidate>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Banner 1:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={(e) => uploadFile(e, banners[0]?.id, 0)} 
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              {banners[0]?.bannerName && <img src={`${APP_BASE_URL}banners/${banners[0]?.bannerName}`}
                style={{ width: "100%", height: "100px", overflow: "hidden" }} />}
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Banner 2:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={(e) => uploadFile(e, banners[1]?.id, 1)} 
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              {banners[1]?.bannerName && <img src={`${APP_BASE_URL}banners/${banners[1]?.bannerName}`}
                style={{ width: "100%", height: "100px", overflow: "hidden" }} />}
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Banner 3:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={(e) => uploadFile(e, banners[2]?.id, 2``)} 
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              {banners[2]?.bannerName && <img src={`${APP_BASE_URL}banners/${banners[2]?.bannerName}`}
                style={{ width: "100%", height: "100px", overflow: "hidden" }} />}
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Banner 4:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={(e) => uploadFile(e, banners[3]?.id, 3)} 
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              {banners[3]?.bannerName && <img src={`${APP_BASE_URL}banners/${banners[3]?.bannerName}`}
                style={{ width: "100%", height: "100px", overflow: "hidden" }} />}
            </Col>
          </Row>

          {/* <Button variant="primary"
            type="submit"
            className="float-right mt-2"
            disabled={isLoading ? true : false}>
            {isLoading ? <Spinner animation="border" /> : ``} <span>Submit</span>
          </Button> */}
        </Form>
      </Card.Body>
    </Card>
  )
}
export default BannerImages;