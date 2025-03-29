import React, { useContext, useState } from 'react';
import './trending.scss';
import Card from 'react-bootstrap/Card';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Button, Col, Row } from 'react-bootstrap';
import { APP_API_URL } from '../../config/constants';
import { useNavigate } from 'react-router-dom';
import { RootContext } from '../../utils/context/RootContextProvider';
import { DealPopup } from '../dealsList/popupComponents/popup';

const Trending = ({viewedDeals, title, dynamicClassName = ''}) => {

  const navigate = useNavigate();
  const {state:{isLoggedIn, userId}} = useContext(RootContext);
  const [dealPopupStatus, setDealPopupStatus] = useState(false);
  const [dealPopupInfo, setDealPopupInfo] = useState();

  const handleClose = () => {
    setDealPopupStatus(false)
  }
  
  var carouselSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
      }
    ]
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <Button type='button'
              className={`btn-next`}
              onClick={onClick}
      ><i className='fa fa-angle-right'></i></Button>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <Button type='button'
              className={`btn-prev`}
              onClick={onClick}
      ><i className='fa fa-angle-left'></i></Button>
    );
  }

  const onNavigation = (dealInfo) => {
    console.log("info", dealInfo)      
    if(!userId) {
      console.log("info", dealInfo)      
      setDealPopupStatus(true)
      setDealPopupInfo(dealInfo)
    }
    else {
      navigate(`/dealInfo?cityName=${dealInfo.cityName}&locationId=${dealInfo.city}&dealId=${dealInfo.dealId}`);
    }
  }

  return (
    <div className='trending'>
      <Row>
        <Col xs="8"><div className="title">{title}</div></Col>
      </Row>
      <div className="card-container">
        <div className="slider-container arraow-btns">
          <Slider {...carouselSettings}>
            {viewedDeals && viewedDeals.map((card, i) => (
              <div key={i}>
                <Card>
                  <div className='card-img'>
                    <img variant="top" 
                         alt=""
                         src={card.imageName ? APP_API_URL + "dealImages/" + card.imageName : "https://via.placeholder.com/200x150"} />
                         <span>{card.cityName}</span>
                         {card.dealOfferPrice && <div className='discount'>{card.dealOfferPrice}% off</div>}
                  </div>
                  
                  <Card.Body className="card-body">
                    <Card.Title>{card.title ? 
                                card.title.substring(0, 50) : ""}
                                <div className="hrLine"></div>
                    </Card.Title>
                    
                    <div className='mt-2'>
                      <Card.Text>{card.shortDescription ? 
                            card.shortDescription.substring(0, 50) : ""}</Card.Text>
                      <div className="offer-text mb-4"><i className="fas fa-inr"></i> {card.dealPrice}</div>
                      <div className="text-center view-details-link mb-3">
                        <a onClick={() => onNavigation(card)}>View Details</a>
                      </div>
                    </div>
                    
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <DealPopup 
        showPopup={dealPopupStatus} 
        handleClose={handleClose}
        dealPopupInfo={dealPopupInfo} />
    </div>
  );
};

export default Trending;