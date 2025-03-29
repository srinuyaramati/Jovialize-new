import { Carousel, Modal } from "react-bootstrap";
import "./styles.scss";
import { APP_API_URL } from "../../config/constants";

export function ImageGalleryPopup({showPopup, handleClose, dealPopupInfo}) {

  return(
    <Modal show={showPopup} onHide={handleClose} className="image-gallery-popup" size="lg">
      <div className="popup-content">
        <Carousel interval={null} indicators={false} className="carousel-custom">
          {dealPopupInfo && dealPopupInfo.map((data, i) =>(
            <Carousel.Item key={i}>
              <img src={APP_API_URL + "dealImages/" + data?.imageName}
                  alt="Location" />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Modal>
  )
}