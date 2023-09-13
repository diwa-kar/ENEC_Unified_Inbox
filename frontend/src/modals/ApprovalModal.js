import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const ApprovalModal = (props) => {

  const [approval, setApproval] = useState(null);



  function handleApproval() {
    // setApproval(isApproved);
    props.onHide();
    if (props.status === 'Approve') {
      new Swal({
        title: 'Approved',
        icon: 'success',

      })
    } else {
      new Swal({
        icon: 'error',
        title: 'Rejected',
        // text: 'Something went wrong!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          IT request
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to {props.status} the request.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleApproval}>Yes</Button>
        <Button variant="secondary" onClick={props.onHide} >No</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ApprovalModal;