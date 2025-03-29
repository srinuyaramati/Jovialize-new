import React, { useContext, useEffect, useState } from "react";
import HeaderComponent from '../../components/HeaderComponent'
import { Col, Container, Row } from "react-bootstrap";
import "./styles.scss"
import Footer from "./../../components/footer/footer";
import Trending from "./../../components/trendings/trending";
import { useLocation, useNavigate } from "react-router-dom";
import { getDealInfoRequest, insertRecentlyViewDealRequest, getRecentlyViewDealRequest } from "../../_services/http";
import { APP_API_URL } from "../../config/constants";
import SocialMediaShare from "../../components/socialMediaShare/socialMediaShare";
import { fullDateFormat } from "../../_helpers/dates";
import { ImageGalleryPopup } from "./popup";
import { RootContext } from "../../utils/context/RootContextProvider";
import user from "../../assets/images/user-smaple.png";

const DealInfo = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  // const cityName = queryParams.get('cityName');
  // const cityId = queryParams.get('locationId');
  const { state: { userId } } = useContext(RootContext);
  const dealId = queryParams.get('dealId');
  const [dealInfo, setDealInfo] = useState();
  const [recentlyViewedDeals, setRecentlyViewedDeals] = useState([]);
  const [showGalleryImagePopupState, setShowGalleryImagePopupState] = useState(false);

  // get the deal information
  const getDealInfo = async () => {
    try {
      const result = await getDealInfoRequest(dealId);
      setDealInfo(result.data);
    } catch (error) {
      console.error("Error", error)
      navigate(-1)
    }
  }

  //
  const insertRecentlyViewDeal = async () => {
    try {
      const payload = {
        userId: userId,
        dealId: dealId
      }
      await insertRecentlyViewDealRequest(payload);
    } catch (error) {
      console.error("Error:", error)
    }
  }

  // get recently viewed deals list
  const getRecentlyViewDeal = async () => {
    try {
      const result = await getRecentlyViewDealRequest(userId);
      setRecentlyViewedDeals(result.data);
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    getDealInfo();
    insertRecentlyViewDeal();
    getRecentlyViewDeal();
  }, [dealId]);

  /** open image gallery popup */
  const onImageGallery = (e, status) => {
    e.preventDefault();
    setShowGalleryImagePopupState(status)
  }
  // Close image gallery popup
  const handlePopupClose = () => {
    setShowGalleryImagePopupState(false)
  }

  return (
    <>
      <HeaderComponent userId={userId} />
      <Container className="mt-4 pt-4">
        {dealInfo && dealInfo.allImages.length != 0 &&
          <Row className="image-gallery">
            <Col className="d-none d-md-block small-images" md={4}>
              <div>
                {dealInfo.allImages && dealInfo.allImages[1] && (
                  <img alt=""
                    src={APP_API_URL + "dealImages/" + dealInfo.allImages[1].imageName}
                    className="smallImg w-100 mb-2" />
                )}
              </div>
              <div>
                {dealInfo.allImages && dealInfo.allImages[2] && (
                  <img alt="" src={APP_API_URL + "dealImages/" + dealInfo.allImages[2].imageName} className="smallImg w-100" />
                )}
              </div>
            </Col>
            <Col md={8} className="large-img-container">
              <img alt=""
                src={dealInfo.allImages ? APP_API_URL + "dealImages/" + dealInfo.allImages[0].imageName : ''}
                className="largeImg w-100" />
            </Col>
            <Col className="pb-2">
              <a href={(e) => e.preventDefault()} 
                 className="text-decoration-none" 
                 onClick={(e) => onImageGallery(e, true)}
                 role="button"><i className="fa fa-camera"></i> Click to view Gallery</a>
            </Col>
          </Row>
        }

        <div>
          <Row >
            <Col md={8} className="deal-content pt-0">
              <Row>
                <Col xs={9} sm={10}>
                  <h2 className="header mb-3 pt-4">
                    {dealInfo?.title}
                  </h2>
                </Col>
                { dealInfo?.dealPrice && <Col className="g-0">
                  <div className="price-component">
                    <div>
                      <span>Price</span> <br />
                      <span className="rupee"><i className="fa fa-inr "></i></span> {dealInfo?.dealPrice}</div>
                  </div>
                </Col>}
              </Row>
              <div className="avatar-block small pb-3 pt-2">
                <div className="avatar">
                  <img src={user} title="" alt="" />
                </div>
                <div className="avatar-body">
                  <label>{dealInfo?.dealAuthorName}</label>
                  <span>Posted on, {fullDateFormat(dealInfo?.createdAt)}</span>
                </div>
              </div>
              {dealInfo?.dealOfferPrice && <div className="discount">{dealInfo?.dealOfferPrice}% off</div>}
              <div className="deal-description">
                <div dangerouslySetInnerHTML={{ __html: dealInfo?.longDescription }}></div>
              </div>
            </Col>
            <Col md={4}>
              {/* Author info */}
              <div className="white-card">
                <div className="card-title">
                  <h3>Author</h3>
                </div>
                <div className="card-content">
                  <div className="avatar-block">
                    <div className="avatar">
                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png" title="" alt="" />
                    </div>
                    <div className="avatar-body">
                      <h6>{dealInfo?.dealAuthorName}</h6>
                      <span>{dealInfo?.dealAuthorDesignation}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Social media share */}
              <div className="white-card">
                <div className="card-title">
                  <h3>Share on social media</h3>
                </div>
                <div className="card-content">
                  <div className="social-media-btns">
                    <SocialMediaShare
                      faceBookShareInfo={
                        {
                          url: "https://www.travelzoo.com/uk/local-deals/All/Other/413305/Candlelight-Concerts/?searchGuid=fc104c25-6a6c-4f12-9cbe-3f026330c11c&dlocId=1719",
                          hashtag: "Jovialize deal",
                          quote: "CampersTribe - World is yours to explore"
                        }
                      }
                      twitterShareInfo={
                        {
                          url: "https://www.travelzoo.com/uk/local-deals/All/Other/413305/Candlelight-Concerts/?searchGuid=fc104c25-6a6c-4f12-9cbe-3f026330c11c&dlocId=1719",
                          title: "Why We Love This Deal",
                          hashtag: "Jovialize deal"
                        }
                      } />
                  </div>
                </div>
              </div>
              {/* When we can go block */}
              <div className="white-card">
                <div className="card-title">
                  <h3>When You Can Go</h3>
                </div>
                <div className="card-content">
                  <p className="mb-0">{fullDateFormat(dealInfo?.activeFrom)} - {fullDateFormat(dealInfo?.activeTo)}</p>
                </div>
              </div>

              <div className="white-card">
                <div className="card-title">
                  <h3>Have a Question? Contact Jovialize.</h3>
                </div>
                <div className="card-content">
                  {dealInfo?.contactNumber &&
                    <p className="">
                      <i className="fa fa-phone"></i> &nbsp;
                      {dealInfo?.contactNumber}
                    </p>
                  }
                  {dealInfo?.contactEmail &&
                    <p className="">
                      <i className="fa-solid fa-envelope"></i> &nbsp;
                      <a href="mailto:test@gmail.com">{dealInfo.contactEmail}</a></p>}
                  {dealInfo?.customerServiceAvailable &&
                    <p><i className="fa-solid fa-calendar-days"></i>&nbsp; Customer Service available, {dealInfo?.customerServiceAvailable}</p>}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <div className="container-fluid my-4 recent-viewed">
        <div className=""></div>
        <div className="recent-viewed-1">
          <Trending hideTitle={true}
            title="Recently viewed deals"
            viewedDeals={recentlyViewedDeals} dynamicClassName="mb-0" />
          {recentlyViewedDeals.length == 0 && <p>No Deals</p>}
        </div>
      </div>
      <ImageGalleryPopup
        showPopup={showGalleryImagePopupState}
        handleClose={handlePopupClose}
        dealPopupInfo={dealInfo?.allImages} />
      <Footer />
    </>
  )
}
export default DealInfo;