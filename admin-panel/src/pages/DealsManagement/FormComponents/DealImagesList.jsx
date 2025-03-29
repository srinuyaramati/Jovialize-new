import { ImagesDropZone } from "components/Dropzone/Index";
import { APP_BASE_URL } from "config/constants";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

export function DealImagesList({ dealImages, onUpdateDealImages, deleteDealImage }) {

  const [editUploadedImages, setEditUploadedImages] = useState([]);
  const [uploadImages, setUploadImages] = useState(false);

  /** remove the image from uploaded images list */
  const removeImage = (itemIndex) => {
    if(editUploadedImages.length !== 0) {
      const data = editUploadedImages.filter((item, index) => index != itemIndex)
      setEditUploadedImages(data)
    }
  }

  // updating the deal images state
  const onChangeDealImages = (files) => {
    files.map((data, i) => {
      if(!data.index) {data.index = i;}
      if(!data.order) {data.order = i;}
      return data;
    })
    setEditUploadedImages(files);
    onUpdateDealImages(files)
    // setImageValidationMessage(false)
  }

  const onUploadImagesStateChange = (status) => {
    setEditUploadedImages([])
    setUploadImages(status);
  }

  return (
    <div>
      <div className="clearfix mb-2">
        {!uploadImages && 
          <button className="btn btn-primary float-right" onClick={() => onUploadImagesStateChange(true)}><i className="fa fa-upload"></i> Upload Images</button>
        }
        {uploadImages && <button className="btn btn-primary float-right mr-2" onClick={() => onUploadImagesStateChange(false)}>Cancel</button>}
      </div>
      {uploadImages && 
        <Row>
          <Col>
            <ImagesDropZone
              dealImages={editUploadedImages}
              onChangeDealImages={onChangeDealImages}
              removeImage={removeImage}
              maxFiles="5" />
          </Col>
        </Row>
      }

      {! uploadImages && dealImages.length == 0 && <div>No Images</div>}
      {!uploadImages && dealImages && dealImages.map((data, i) => (
        <Row key={i}>
          <Col sm={3}>
            <div className="float-left view-image-thumb" key={i}>
              <img style={{ width: '100%' }} src={`${APP_BASE_URL}dealImages/${data.imageName}`} />
            </div>
          </Col>
          <Col sm={3}>
            {data.imageName} - {data.imageId}
          </Col>
          <Col>
            <button
              type="button"
              className="btn-simple btn-link p-1 btn btn-danger"
              data-toggle="confirmation"
              onClick={(e) => deleteDealImage(i, data?.imageId)}><i className="fas fa-trash"></i></button>
          </Col>
        </Row>
      ))}
    </div>
  )
}