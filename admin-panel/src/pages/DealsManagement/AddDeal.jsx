import { useContext, useEffect, useState } from "react";
import { Alert, 
         Button, 
         Spinner, 
         Card,
         Container, 
         Col,
         Row,
         Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { EditorState, convertToRaw  } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import { createDeal, uploadImage } from "./http";
import { citiesList } from "_services/commons"; 
import { ImagesDropZone } from "../../components/Dropzone/Index";
import { getTodayDate } from "_helpers/dates";
import TextEditor from "components/TextEditor";
import mammoth from 'mammoth';
import { RootContext } from "utils/context/RootContextProvider";

function addDeal() {
  
  const [errorMessage, setErrorMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageValidationMessage, setImageValidationMessage] = useState(false);
  const [fullDescValidationMessage, setFullDescValidationMessage] = useState(false);
  const [cities, setCities] = useState([]);
  const [validated, setValidated] = useState(false);
  const history = useHistory();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [dealImages, setDealImages] = useState([]);
  const [docError, setDocError] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState('');
  const contextText = useContext(RootContext);
  const {state:{role, cityId}} = contextText;

  const [formData, setFormData] = useState({
    activeFrom: '',
    activeTo: '',
    title: '',
    dealPrice: '',
    city:'',
    status: 'Active',
    shortDescription: '',
    longDescription: '',
    contactNumber: '',
    contactEmail: '',
    dealAuthorName: '',
    dealAuthorDesignation: '',
    customerServiceAvailable: '',
    dealOfferPrice: ''
  });

  /** get cities list */
  const getCitiesList = async () => {
    try {
      const cities = await citiesList();
      setCities(cities.data)
    }
    catch(error) {
      console.error("Error - citiesList()", error)
    }
  }

  useEffect(() => {
    getCitiesList();
  }, [])
  
  // updating the input fields
  const handleChange = (e, fieldName) => {
    const inputVal = e.target.value;
    setFormData({
      ...formData,
      [fieldName]: inputVal
    })
  }

  // updating the editor state
  const editorStateChange = (data) => {
    setEditorState(data);
    let description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if(description) {description.replace(/\n/g,'');}
    setFormData({
      ...formData,
      longDescription: description
    }) 
  }

  // updating the deal images state
  const onChangeDealImages = (files) => {
    files.map((data, i) => {
      if(!data.index) {data.index = i;}
      if(!data.order) {data.order = i;}
      return data;
    })
    setDealImages(files);
    setImageValidationMessage(false)
  }

  /** remove the image from uploaded images list */
  const removeImage = (itemIndex) => {
    if(dealImages.length !== 0) {
      const data = dealImages.filter((item, index) => index != itemIndex)
      setDealImages(data)
    }
  }

  const docFile = async (event) => {
    try{
      const file = event.target.files[0];
      const maxSize = 1 * 1024 * 1024; // 2 MB

      if (file) {
        if (file.size > maxSize) {
          setDocError('File size must be less than 2 MB.');
          // setFile(null);
        } else {
          // console.log(file)
          if (file && (file.name.endsWith('.docx') || file.name.endsWith('.doc') || file.name.endsWith('.rtf'))) {
            try {
              const arrayBuffer = await file.arrayBuffer();
              const result = await mammoth.convertToHtml({ arrayBuffer });
              // setHtmlContent(result.value); // Set the HTML content
              // setEditorState(result.value)
              setFormData({
                ...formData,
                longDescription: result.value
              }) 

              const blocksFromHtml = htmlToDraft(result.value);
              const { contentBlocks, entityMap } = blocksFromHtml;
              const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
              const text = EditorState.createWithContent(contentState);
              setEditorState(text);
              
              setDocError(''); // Clear any previous errors
            } catch (err) {
              setDocError('Error converting file to HTML');
            }
          }
          else {
            setDocError("Please select a Doc or Docx file only.")
          }
        }
      }
    }
    catch(error) {
      console.error(error)
    }
    
  }

  // submiting the deal form information
  const submitDeal = async (e) => {
    try {
      const form = e.currentTarget;
      e.preventDefault();
      e.stopPropagation();
      
      if (form.checkValidity() === false) {      
        setValidated(true);
        if(dealImages.length == 0) setImageValidationMessage(true);
        if(formData.longDescription == "") setFullDescValidationMessage(true);
      } else {
        if(dealImages.length == 0 || formData.longDescription == "") {
          (dealImages.length == 0) ? setImageValidationMessage(true): setImageValidationMessage(false); 
          (formData.longDescription == "")? setFullDescValidationMessage(true): setFullDescValidationMessage(false);
          return false;
        }
        setImageValidationMessage(false);
        setFullDescValidationMessage(false);
  
        setIsLoading(true);
        const result = await createDeal(formData);
        // console.log(result);
        setIsLoading(false)
        const dealId = result?.data?.result?.dealId;
        dealImages.map((imageInfo, i) => {
          uploadImage(imageInfo, dealId)
            .then((response) => {
              // console.log(response);
            })
            .catch(error => {
              console.log(error);
            })
          history.push("/admin/dealsManagement");
        });
      }
    }
    catch(error) {
      setIsLoading(false);
      console.error(error)
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Add Deal</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form className="createDeal-form"
                onSubmit={(e) => submitDeal(e)}
                noValidate
                validated={validated}>

                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Deal Title:</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter Deal Title"
                        name="title"
                        value={formData.title}
                        onChange={(e) => handleChange(e, 'title')} 
                        required/>
                      <Form.Control.Feedback type="invalid">
                        Please enter deal title
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Deal Price:</Form.Label>
                      <Form.Control 
                        type="number" 
                        placeholder="Enter Deal Price"
                        name="dealPrice"
                        value={formData.dealPrice}
                        onChange={(e) => handleChange(e, 'dealPrice')} 
                        required />
                        <Form.Control.Feedback type="invalid">
                          Please enter deal price
                        </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Deal Active From:</Form.Label>
                      <Form.Control
                        type="date"
                        min={getTodayDate()}
                        name="activeFrom"
                        placeholder="DateRange"
                        value={formData.activeFrom}
                        onChange={(e) => handleChange(e, 'activeFrom')}
                        onKeyDown={(e) => e.preventDefault()}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select active from
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Deal Active To:</Form.Label>
                      <Form.Control
                        type="date"
                        name="activeTo"
                        min={formData.activeFrom?formData.activeFrom : getTodayDate()}
                        placeholder="DateRange"
                        value={formData.activeTo}
                        onChange={(e) => handleChange(e, 'activeTo')}
                        onKeyDown={(e) => e.preventDefault()}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select active to
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Deal City:</Form.Label>
                      <Form.Select
                        aria-label="Role ID"
                        name="city"
                        onChange={(e) => handleChange(e, 'city')}
                        className="form-control" 
                        value={role == '3'?cityId:formData.city}
                        required
                        disabled={role == '3'?true:false}>
                        <option value="" >Select city</option>
                        {cities && cities.map((city) => (
                          <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                          Please select city
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Deal Status:</Form.Label>
                      <div className="mt-2">
                        <Form.Check
                          inline
                          label="Active"
                          name="status"
                          type="radio"
                          id="statusActive"
                          value="Active"
                          checked={formData.status === 'Active'}
                          onChange={(e) => handleChange(e, 'status')}
                        />
                        <Form.Check
                          inline
                          label="Inactive"
                          name="status"
                          type="radio"
                          id="statusInactive"
                          value="Inactive"
                          checked={formData.status === 'Inactive'}
                          onChange={(e) => handleChange(e, 'status')}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Service provider contact number:</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter Service provider contact number"
                        name="contactNumber"
                        maxLength={10}
                        minLength={10}
                        pattern="^[0-9]+$"
                        value={formData.contactNumber}
                        onChange={(e) => handleChange(e, 'contactNumber')} 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter valid service provider contact number
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Service provider email:</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Service provider email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        pattern="/^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,4}$/"
                        onChange={(e) => handleChange(e, 'contactEmail')} 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter service provider valid email
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Deal Author name:</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter Author name"
                        name="dealAuthorName"
                        value={formData.dealAuthorName}
                        onChange={(e) => handleChange(e, 'dealAuthorName')} 
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter author name
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Deal Author Designation:</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter Author Designation"
                        name="dealAuthorDesignation"
                        value={formData.dealAuthorDesignation}
                        onChange={(e) => handleChange(e, 'dealAuthorDesignation')} 
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter author designation
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Customer Service Available Time:</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Customer Service Available Time"
                        name="customerServiceAvailable"
                        value={formData.customerServiceAvailable}
                        onChange={(e) => handleChange(e, 'customerServiceAvailable')} 
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Deal discount:</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Please enter deal Discount"
                        name="dealOfferPrice"
                        value={formData.dealOfferPrice}
                        maxLength={2}
                        onChange={(e) => handleChange(e, 'dealOfferPrice')}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Short Description</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        minLength={35}
                        placeholder="Enter Short Description"
                        name="shortDescription"
                        value={formData.shortDescription} 
                        onChange={(e) => handleChange(e, 'shortDescription')}
                        required />
                      <Form.Control.Feedback type="invalid">
                        Short descrition should be min 35 characters
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>                  
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Description</Form.Label>
                      <TextEditor
                        editorState={editorState}
                        editorStateChange={editorStateChange} />
                      {fullDescValidationMessage && 
                        <p className="form-error-text text-danger mt-2">Please enter full description</p>
                      }
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Upload document for description</Form.Label>
                      <Form.Control
                        type="file"
                        name="title"
                        onChange={(e) => docFile(e)} 
                        isInvalid={!!docError}
                        accept=".doc, .docx, .rtf"
                      />
                      <Form.Control.Feedback type="invalid">{docError}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
                <Row>
                  <Col>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Deal Images</Form.Label>
                      <ImagesDropZone  
                        dealImages={dealImages}
                        onChangeDealImages={onChangeDealImages}
                        removeImage={removeImage}
                        maxFiles="5"  />
                    </Form.Group>
                    {imageValidationMessage && 
                      <p className="form-error-text text-danger">Please upload at leat 1 image</p>
                    }
                  </Col>
                </Row>
                <div>
                  {errorMessage.length !== 0 && 
                    <Alert key={"danger"} variant={"danger"}>
                      {errorMessage.map((data, i) => (
                        <div key={i}>{data?.message}<br /></div>
                      ))}
                    </Alert>
                  }
                </div>
                <div className="clearfix mb-4">
                  <Button variant="primary" 
                          type="submit" 
                          className="float-right mt-2"
                          disabled={isLoading? true: false}>
                    {isLoading ? <Spinner animation="border" />: `` } <span>Submit</span>
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => history.push(`dealsManagement`)}
                    className="float-right mt-2 mr-2">Cancel</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default addDeal;