import React, { useContext } from 'react';
import './banner.scss'
import Search from '../bannerSearch';
import { Link, useNavigate } from 'react-router-dom';
import { RootContext } from '../../utils/context/RootContextProvider';
import { SignInContext } from '../../utils/context/signInPopupContextProvider';
import lockWhite from "../../assets/images/lock-white.svg";

function Banner() {

  const {state:{userId}, dispatch} = useContext(RootContext);
  const { signInDispatch } = useContext(SignInContext);
  const navigate = useNavigate();

  const signInPopup = () => {
    signInDispatch({
      type: "OPEN"
    })
  }

  const signOut = () => {
    dispatch({
      type: "LOGOUT"
    })
    navigate('/deals');
  }

  return (
    <div>
      <div className="banner-container old">
        <div className='w-100 clearfix'>
          <div className="logo float-start">
            <Link to="/deals?cityName=Bangalore&locationId=1">
              <img src="../../images/logo.png" alt="Logo" />
            </Link>
          </div>
          
            <div className="sign-in float-end">
              {!userId && <a className="m-2 mt-md-5 pointer" onClick={signInPopup}>SIGN IN</a> }
              {/* | <a href="#" className="m-2" onClick={gotoJoinBlock}>SIGN UP</a> */}
              {userId && <a className="m-2 mt-md-5 pointer" onClick={signOut}>SIGN OUT</a> }
            </div>
        </div>
        
        <div className="banner-content">
          <div className="banner-title">
            Let’s make your weekends and Holidays amazing
          </div>
          <div className="sub-text mt-3 mt-md-4">
            Our specialist team is dedicated to uncovering budget friendly deals in your area. With our easy-to-follow recommendations, planning your next adventure has never been simpler—even if it’s last minute!
          </div>
          <Search />
        </div>
      </div>

      
    </div>
  );
};

export default Banner;
