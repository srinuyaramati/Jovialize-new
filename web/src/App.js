
import './main.scss';
import "./assets/styles/scss/_main.scss";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import LandingPage from "./pages/LandingPage/index";
import DealInfo from "./pages/DealInfoPage/index";
import { useContext, useEffect } from 'react';
import { RootContext } from './utils/context/RootContextProvider';
import AboutUsPage from './pages/OtherPages/AboutUs';
import TermsConditionsPage from './pages/OtherPages/TermsConditions';

function App() {
  const location = useLocation();
  const {state:{userId}} = useContext(RootContext);
  
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/deals?cityName=Bangalore&locationId=1" />} /> 
      <Route path="/deals" element={<LandingPage />} />
      {userId && <Route path="/dealInfo" element={<DealInfo />} />}
      <Route path="*" element={<Navigate to="/deals?cityName=Bangalore&locationId=1" />} />
      <Route path="/aboutus" element={<AboutUsPage />} />
      <Route path="/termsConditions" element={<TermsConditionsPage />} />
    </Routes>
  );
}

export default App;
