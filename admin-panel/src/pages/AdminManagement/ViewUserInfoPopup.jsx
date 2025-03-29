import { Modal, Table } from "react-bootstrap";

export default function UserDetailsPopup({ showUserDetailsPopup, handleUserDetailsClose, userInfo }) {

  return (
    <Modal show={showUserDetailsPopup} onHide={handleUserDetailsClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered >
          <tr>
            <td>User Name:</td>
            <td>{userInfo.userName}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{userInfo.email}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{userInfo.status == 1? 'Active' : 'Inactive'}</td>
          </tr>
          <tr>
            <td>City:</td>
            <td>{userInfo.cities?.cityName}</td>
          </tr>
          <tr>
            <td>Role:</td>
            <td>{userInfo.roles?.roleName}</td>
          </tr>
        </Table>
      </Modal.Body>
    </Modal>
  )
}

