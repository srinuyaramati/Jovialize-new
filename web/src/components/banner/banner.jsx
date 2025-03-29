import React, { useContext, useEffect, useState } from 'react';
import Carousel from "react-bootstrap/Carousel";
import lockWhite from "../../assets/images/lock-white.svg";
import './banner.scss'
import { RootContext } from "../../utils/context/RootContextProvider";
import { getBanners } from '../../_services/http';
import { APP_API_URL } from '../../config/constants';

function Banner({ gotoJoinBlock }) {

  const { state: { userId } } = useContext(RootContext);
  const [banners, setBanners] = useState([]);

  const getBannersList = async () => {
    try {
      const data = await getBanners();
      setBanners(data.data);
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBannersList()
  }, [])

  return (
    <div className='container pt-5'>
      <div className="banner-container">
        <div className='new-banner-1'>
          <Carousel interval={3000} controls={false} className="banner-carousel">
            {banners.map((data, i) => ( 
              <Carousel.Item key={i}>
                <div className='banner-img'>
                  <img alt='Banner 1' src={APP_API_URL + "banners/" + data.bannerName} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="banner-content">
            <div className="banner-title">
              Are you tired of spending your precious weekends and holidays wondering what to do?
            </div>
            <div className="sub-text mt-3 mt-md-4">
              <p>We are here to transform your free time into extraordinary experiences and will help you discover, plan, and enjoy the perfect weekends and holidays tailored to your interests and location. </p>
              <p>Our specilist team will find budget friendly local gems and hidden tresasures for unique experiences in your area.</p>
              <p>Personalised recommendations will be shared to your email on weekly basis for you to effortlessly organise your weekend and holidays even in last minute.</p>              
            </div>
            {!userId && <div className="main-btn mb-3 mt-3">
              <a className='text-white'
                onClick={gotoJoinBlock}><img src={lockWhite} alt='' />  Sign Up</a>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;