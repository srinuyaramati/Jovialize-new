import React, { useContext, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
// import "@fontsource/montserrat";
import { Col, Row } from "react-bootstrap";
import { DealPopup } from "./popupComponents/popup";
import { APP_API_URL } from "../../config/constants";
import noImage from "../../assets/images/Image_not_available.png";
import { formatDateWithOrdinalSuffix } from "../../_helpers/dates";
import { RootContext } from "../../utils/context/RootContextProvider";

const DealsList = ({ dealsList, cityName }) => {

  const navigate = useNavigate();
  const [dealPopupStatus, setDealPopupStatus] = useState(false);
  const [dealPopupInfo, setDealPopupInfo] = useState();

  const { state: { isLoggedIn, userId } } = useContext(RootContext);

  const handleClose = () => {
    setDealPopupStatus(false)
  }

  const onDealSelect = (dealInfo, imageIndex) => {
    // console.log(userId)
    if (!userId) {
      console.log(dealInfo)
      dealInfo.imageIndex = imageIndex;
      setDealPopupStatus(true)
      setDealPopupInfo(dealInfo)
    }
    else {
      navigate(`/dealInfo?cityName=${cityName}&locationId=${dealInfo.city}&dealId=${dealInfo.dealId}`);
    }
  }

  return (
    <div className='container'>
      <div className="deals-list-title-block">
        <h2 className="title">Near by your location</h2>
      </div>
      <div>
        {dealsList.length == 0 && <div className="my-3">No deals with this location</div>}
        {dealsList && dealsList.map((card, i) => (
          <div className='deal-container' key={i}>
            <Row className="g-0">
              <Col xs="12" lg="6">
                <div className="image-slide">
                  {card.dealOfferPrice !=0 && <div className='discount'>{card.dealOfferPrice}% off</div>}
                  {card.allImages && card.allImages.length != 0 &&
                    <Carousel interval={null} className="carousel-custom">
                      {card.allImages.map((data, j) => (
                        <Carousel.Item key={j}>
                          <a role="button" onClick={() => onDealSelect(card, j)}>
                            <img src={APP_API_URL + "dealImages/" + data.imageName}
                              alt="Location" />
                          </a>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  }
                  {card.allImages && card.allImages.length == 0 &&
                    <div className="no-images"
                      onClick={() => onDealSelect(card, 0)}
                      style={{
                        backgroundImage: "url(" + noImage + ")"
                      }}>
                  </div>}
                </div>

              </Col>
              <Col xs="12" lg="6">
                <div className='deal-info'>
                  <h3 className="mt-4">
                    <a role="button" onClick={() => onDealSelect(card, 1)}>{card.title}</a>
                  </h3>
                  <div className='deal-title-border'></div>
                  <p>{card?.shortDescription.substring(0, 100)}</p>
                  <p className="deal-date">Starts from: {formatDateWithOrdinalSuffix(card.activeFrom)} to {formatDateWithOrdinalSuffix(card.activeTo)}</p>
                  <div className='offer'>
                    <div className='offer-text'><i className="fa fa-inr "></i> {card.dealPrice}</div>
                    <div className='deal-offer-border'></div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ))}

        <DealPopup
          showPopup={dealPopupStatus}
          handleClose={handleClose}
          dealPopupInfo={dealPopupInfo} />
      </div>
    </div>
  );
};

export default DealsList;
