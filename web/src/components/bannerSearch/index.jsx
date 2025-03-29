import { Button, Col, Form, Row } from 'react-bootstrap';
import "./styles.scss";
import { dealSearch, getCities } from '../../_services/http';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';

function Search({ inHeader }) {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cityName = queryParams.get('cityName');
  const cityId = queryParams.get('locationId');
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);  
  
  const selectRef = useRef(null);
  const [singleSelections, setSingleSelections] = useState([]); // state for search input
  const [searchOptionsData, setSearchOptionsData] = useState([]); // state for search options list
  const [citySelectItem, setCitySelectItem] = useState(); // state for selected city 

  /** get cities list  */
  const getCitiesList = async () => {
    try{
      const cities = await getCities();
      setCities(cities.data);
    }
    catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCitiesList();
  }, []);

  /** search for product */
  const onSearch = async (searchValue) => {
    try {
      if(searchValue != '') {
        let cityId = selectRef.current.value;
        const result = await dealSearch(searchValue, cityId);
        setSearchOptionsData(result.data)
      } else {
        setSearchOptionsData([])
      }      
    }
    catch(error) {
      console.error(error)
    }
  }

  /** */
  const onChangeCity = (cityId) => {
    if(cityId != 0) {
      const cityName = cities.find(x=>x.cityId == cityId).cityName;
      setCitySelectItem({cityId: cityId, cityName:cityName});      
    }
  }

  // search submit
  const onSearchSubmit = (e) => {
    e.preventDefault();
    if(singleSelections.length !== 0 && citySelectItem != undefined) {
      navigate(`/dealInfo?cityName=${citySelectItem.cityName}&locationId=${citySelectItem.cityId}&dealId=${singleSelections[0].dealId}`);
    } 
    else if(singleSelections.length == 0 && citySelectItem != undefined) {
      navigate(`/deals?cityName=${citySelectItem.cityName}&&locationId=${citySelectItem.cityId}`);
    }
    else if(singleSelections.length !== 0 && citySelectItem == undefined) {
      navigate(`/deals?search=${singleSelections[0].title}`);
    }
  }

  return (
    <div className={`search-bar ${inHeader ? "header" : ""}`}>
      <Form onSubmit={(e) => onSearchSubmit(e)} noValidate>
        <Row>
          {/* city dropdown */}
          <Col xs="12" md="4" xl={`${inHeader? '4': '3'}`}>
            <div className="input-group city-dropdown">
              <label className="input-group-text"><i className="fa fa-location-dot"></i></label>
              <select className="form-select" 
                      aria-label="Filter select" 
                      onChange={e => onChangeCity(e.target.value)}
                      ref={selectRef}
                      value={citySelectItem?citySelectItem.cityId:cityId}>
                <option value="0">Select city</option>
                {cities && cities.map((data, i) => (
                  <option key={i} value={data.cityId}>{data.cityName}</option>
                ))}
              </select>              
            </div>
          </Col>
          {/* search input */}
          <Col xs="9" md="6" xl={`${inHeader? '6': '7'}`}>
            <Form.Group>
              <Typeahead
                className='border-0 search-input'
                id="basic-typeahead-single"
                labelKey="title"
                options={searchOptionsData}
                onInputChange={(e) => onSearch(e)}
                onChange={setSingleSelections}
                placeholder="Search your deal..."
                selected={singleSelections}
              />
            </Form.Group>            
          </Col>
          {/* search submit button */}
          <Col xs="3" md="2">
            <div className='float-end'>
              <Button className='submit-btn' type='submit'>
                <img alt="" src='../../icons/search.png' />
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Search;