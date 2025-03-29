import { useHistory, useLocation } from "react-router-dom";
import { 
  getDealImages, 
  getIndividualDealsdetails, 
  updateDeal, 
  uploadImage,
  deleteImages } from "./http";
import { citiesList } from "_services/commons";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { dateFormat1 } from "_helpers/dates";
import { getTodayDate } from "_helpers/dates";
import TextEditor from "components/TextEditor";
import { EditorState, convertToRaw, ContentState  } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { DealImagesList } from "./FormComponents/DealImagesList";
import mammoth from "mammoth";
import { RootContext } from "utils/context/RootContextProvider";

function EditDeal() {

  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search.substring(1));
  const dealId = params.get("dealId");
  const [cities, setCities] = useState([]);
  const [validated, setValidated] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [fullDescValidationMessage, setFullDescValidationMessage] = useState(false);
  const [dealImages, setDealImages] = useState([]);
  const [deletedImagesIndexes, setDeletedImagesIndexes] = useState([]);
  const [editedDealImages, setEditedDealImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [docError, setDocError] = useState('');
  const contextText = useContext(RootContext);
  const {state:{role, cityId}} = contextText;
  const [formData, setFormData] = useState({
    activeFrom: '',
    activeTo: '',
    title: '',
    dealPrice: '',
    city:'',
    status: '',
    shortDescription: '',
    longDescription: '',
    contactNumber: '',
    contactEmail: '',
    dealAuthorName: '',
    dealAuthorDesignation: '',
    customerServiceAvailable: '',
    dealOfferPrice: ''
  });

  /** get the cities list from API request */
  const getCitiesList = async () => {
    try {
      const cities = await citiesList();
      setCities(cities.data)
    }
    catch(error) {
      console.log("Error - citiesList()", error)
    }
  }
  /** get the deals deatils from the API request */
  const getDealDetails = async (dealId) => {
    try {
      const dealDetails = await getIndividualDealsdetails(dealId);
      const data = dealDetails.data;
      data.activeFrom = dateFormat1(data.activeFrom, "fr-CA");
      data.activeTo = dateFormat1(data.activeTo, "fr-CA");
      setFormData(data);
      // const newContent = ContentState.createFromRaw(data.longDescription);
      const blocksFromHtml = htmlToDraft(data.longDescription);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const text = EditorState.createWithContent(contentState);
      setEditorState(text);
    }
    catch(error) {
      console.error("Error:", error)
    }
  }
  /** get the deal images from the API request */
  const getDealImagesList = async (dealId) => {
    try {
      const dealImages = await getDealImages(dealId);
      setDealImages(dealImages.data);
    } catch(error) {
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    if(dealId) {
      getDealDetails(dealId);
      getDealImagesList(dealId);
    }
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

  const onDeleteDealImage = (index, imageId) => {
    const images = dealImages;
    delete images[index];
    setDealImages(images);
    setDeletedImagesIndexes([...deletedImagesIndexes, imageId]);
  }

  /** submit the deal edit info */
  const submitDeal = async(e) => {
    try {
      const form = e.currentTarget;
      e.preventDefault();
      e.stopPropagation();
  
      if (form.checkValidity() === false) {      
        setValidated(true);
        // if(dealImages.length == 0) setImageValidationMessage(true);
        if(formData.longDescription == "") setFullDescValidationMessage(true);

      } else {
        const payload = {
          dealId: formData.dealId,
          title: formData.title,
          shortDescription: formData.shortDescription,
          longDescription: formData.longDescription,
          status: formData.status,
          dealPrice: formData.dealPrice,
          activeFrom: formData.activeFrom,
          activeTo: formData.activeTo,
          city: formData.city,
          contactNumber: formData.contactNumber,
          contactEmail: formData.contactEmail,
          dealAuthorName: formData.dealAuthorName,
          dealAuthorDesignation: formData.dealAuthorDesignation,
          customerServiceAvailable: formData.customerServiceAvailable,
          updatedBy: sessionStorage.getItem("userId"),
          dealOfferPrice: formData.dealOfferPrice
        }
        // console.log("---", deletedImagesIndexes)
        setIsLoading(true);
        const dealUpdateResponse = await updateDeal(payload);
        if(dealUpdateResponse) {
          if(editedDealImages.length !== 0) {
            editedDealImages.map((imageInfo, i) => {
              uploadImage(imageInfo, payload.dealId)
                .then(() => { })
                .catch(error => { console.log(error); }) 
            });
          }
          if(deletedImagesIndexes.length != 0) {
            await deleteImages(deletedImagesIndexes);
          }
        }
        setIsLoading(false);
        history.push("/admin/dealsManagement");
      }
    } 
    catch(error) {
      setIsLoading(false);
      console.error(error)
    }
    
  }

  const docFile = async (event) => {
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
            console.log("---", result.value)
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

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Edit Deal</Card.Title>
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
                        required />
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
                        min={formData.activeFrom ? formData.activeFrom : getTodayDate()}
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
                        aria-label="Default select example"
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
                        Please enter service provider contact number
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Service provider email:</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter service provider email"
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
                        placeholder="Deal offer price"
                        name="dealOfferPrice"
                        maxLength={2}
                        value={formData.dealOfferPrice}
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
                        placeholder="Enter Short Description"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={(e) => handleChange(e, 'shortDescription')}
                        required />
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
                <Row>
                  <Col>
                    <DealImagesList 
                      dealImages={dealImages} 
                      onUpdateDealImages={setEditedDealImages}
                      deleteDealImage={onDeleteDealImage} />
                  </Col>
                </Row>
                {/* 
                <div>
                  {errorMessage.length !== 0 &&
                    <Alert key={"danger"} variant={"danger"}>
                      {errorMessage.map((data, i) => (
                        <div key={i}>{data?.message}<br /></div>
                      ))}
                    </Alert>
                  }
                  {imageValidationMessage &&
                    <p className="form-error-text text-danger">Please upload at leat 1 image</p>
                  }
                </div> */}
                <div className="clearfix mb-4">
                  <Button variant="primary"
                    type="submit"
                    className="float-right mt-2"
                    disabled={isLoading ? true : false}>
                    {isLoading ? <Spinner animation="border" /> : ``} <span>Submit</span>
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

export default EditDeal;