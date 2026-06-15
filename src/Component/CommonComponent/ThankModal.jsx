import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { externalApi } from "../../axios/apiHelper";

export default function ThankModal({ handleShowThankYou, message }) {
  return (
    <Modal
      show={true}
      onHide={() => handleShowThankYou(false)}
      centered
      className="add-data"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <h5>{message?.heading}</h5>

        <p>{message?.body}</p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="primary" onClick={() => handleShowThankYou(false)}>
        Ok
      </Button>
      </Modal.Footer>
    </Modal>
  );
}
