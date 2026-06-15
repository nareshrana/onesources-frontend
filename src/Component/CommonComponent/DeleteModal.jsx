import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { externalApi } from "../../axios/apiHelper";

export default function DeleteModal({ handleShowDelete, deleteContent }) {
  return (
    <>
      <Modal
        show={true}
        onHide={() => handleShowDelete(false)}
        centered
        className="add-data"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Delete Content</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h5>Delete content</h5>
            <p>
              Are you sure you want to delete this content from your content
              space?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => deleteContent()} classname="delete">
            Yes, Delete
          </Button>
          <Button variant="primary" className="btn-bordered" onClick={() => handleShowDelete(false, "")}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
