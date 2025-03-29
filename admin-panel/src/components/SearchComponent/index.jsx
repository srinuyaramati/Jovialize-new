import { Col, Row } from "react-bootstrap";

export function ListSearchComponent({onSearch, searchValue, title}) {
  return (
    <div className="px-2">
      <Row>
        <Col className="col-sm-12 col-md-4 offset-md-8 mb-4">
          <p>{title}:</p>
          <input
            className="form-control"
            type="text"
            placeholder="Search.."
            value={searchValue}
            onChange={(e) => onSearch(e)}></input>
        </Col>
      </Row>
    </div>
  )
}