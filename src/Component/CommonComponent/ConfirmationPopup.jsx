import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


export default function ConfirmationPopup({ handleShowConfirm }) {
  return (
    <>
    <Modal
      show={true}
      onHide={() => handleShowConfirm(false)}
      centered
      className="confirm-data"
    >
      <Modal.Header closeButton>
       {/* <Modal.Title>Minimum consent required!</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h5>Minimum consent required!</h5>
          <p>
          To keep this account, I give Octapharma the minimum consent required.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" className="btn-filled" onClick={() => handleShowConfirm(false)}>
          Keep account
        </Button>
        <Button variant="primary" className="btn-bordered delete" onClick={() => handleShowConfirm(false,'del')}>
          Delete account
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
