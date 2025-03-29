import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation  } from "react-router-dom";
import Banner from '../../components/banner/bannerOld';
import DealsList from './../../components/dealsList/index';
import Footer from './../../components/footer/footer';
import Trending from './../../components/trendings/trending'
import { getDeals, getTrendingDealsRequest } from '../../_services/http';
import JoinNow from '../../components/joinNow';
import { RootContext } from '../../utils/context/RootContextProvider';

const LandingPage = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cityName = queryParams.get('cityName');
  const cityId = queryParams.get('locationId');
  const dealSearchText = queryParams.get('search');
  const {state:{userId}} = useContext(RootContext);

  const [dealsList, setDealsList] = useState([]);
  const [trendingDeals, setTrendingDeals] = useState([]);
  const joinNowBlockRef = useRef();

  // get the deals list
  const getDealsList = async (cityName, cityId, dealSearchText) => {
    try {
      // console.log(cityName, cityId, dealSearchText)
      const result = await getDeals(cityName, cityId, dealSearchText); 
      setDealsList(result.data)
    }
    catch(error) {
      console.error(error.message)
    }
  }

  // get trending deals
  const getTrendingDeals = async () => {
    try {
      const result = await getTrendingDealsRequest();
      setTrendingDeals(result.data);
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDealsList(cityName, cityId, dealSearchText);
    getTrendingDeals();    
  }, [cityId, cityName, dealSearchText]);

  // goto join now block
  const gotoJoinNowBlock = () => {
    joinNowBlockRef.current?.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div>
      {/* <HeaderComponent gotoJoinBlock={gotoJoinNowBlock} /> */}
      {/* Banner component */}
      <Banner gotoJoinBlock={gotoJoinNowBlock} />
      {!userId && <JoinNow />}
      <div className='container'>
        {/* Trending list component */}
        <Trending viewedDeals={trendingDeals} title="Trending" />
      </div>
      {/* Deals list component */}
      <DealsList cityName={cityName} dealsList={dealsList} />
      
      {/* Join now component */}
      {/* {!userId && <JoinNow />} */}
      {/* Footer component */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
