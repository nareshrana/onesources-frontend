import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


export default function DeleteConsent({ deleteConsentShowConfirm }) {
  return (
    <>
    <Modal
      show={true}
      onHide={() => deleteConsentShowConfirm(false)}
      centered
      className="confirm-data"
    >
      <Modal.Header closeButton>
       {/* <Modal.Title>Minimum consent required!</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h5>Delete account</h5>
          <p>Are you sure you wish to delete your account?</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" className="btn-filled delete" onClick={() => deleteConsentShowConfirm(false,'del')}>
          Yes, delete
        </Button>
        <Button variant="primary" className="btn-bordered" onClick={() => deleteConsentShowConfirm(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
