import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { externalApi } from "../../axios/apiHelper";

export default function RequestModal({
  handleShowRequest,
  pdfId,
  handleShowThankYou,
}) {
  const [message, setMessage] = useState(""); // State for textarea value
  const [error, setError] = useState(""); // State for error message
  const [loading, setLoading] = useState(false);
  const handleSubmitRequest = async () => {
    if (!message.trim()) {
      setError("Please enter a message"); // Display error if message is empty
      return;
    }
    setLoading(true)
    const requestData = {
      pdf_id: pdfId,
      method: "chat_message",
      message: message,
      Device_used: "web",
      APP_USED: "OneSource",
      BUILD_NUMBER: 1.0,
      LANGCODE: "en",
      user_id: localStorage.getItem("un"),
    };

    try {
        const result = await externalApi(
          import.meta.env.VITE_REACT_APP_API_INDEX_URL+ "/chat_message",
          "post",
          requestData
        );
      setLoading(false);
      handleShowRequest(false);
      handleShowThankYou(true);
    } catch (error) {
      // Handle error if the request fails
      console.error("Request failed:", error);
      setError("An error occurred while sending the request");
    }
  };

  const handleTextareaChange = (event) => {
    setMessage(event.target.value); // Update the textarea value in state
    setError(""); // Clear any previous error message
  };

  return (
    <Modal
      show={true}
      onHide={() => handleShowRequest(false)}
      centered
      className="add-data"
    >
      <Modal.Header closeButton>
        {/* <Modal.Title>Request Materials</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
      <h5>Request materials</h5>

        <p>Click request to request the original material.</p>

        <textarea
          rows={4}
          placeholder="Message"
          value={message}
          onChange={handleTextareaChange}
          className = {error ? "form-control input_error" : "form-control"}
        />

        {error && <div className="error">{error}</div>}
      </Modal.Body>
      <Modal.Footer>
      {
        loading?<img className="loading_image" src="/images/loading-gif.gif" />:<Button variant="primary" onClick={handleSubmitRequest}>Request</Button>
      }
      </Modal.Footer>
    </Modal>
  );
}
