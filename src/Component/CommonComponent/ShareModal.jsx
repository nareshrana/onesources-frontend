import React, { useState } from "react";
import { FormControl, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { externalApi, postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { isValidEmail } from "../../util/EmailValidation";

export default function ShareModal({
  handleShowShare,
  pdfId,
  handleShowThankYou,
  symposiumId,
  id,
  setId,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [commentsError, setCommentsError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
    setCommentsError("");
  };

  const symposiumHighlightTracking = async (payload) => {
    try {
      if (id !== -1) {
        payload.id = id;
      }
      const response = await postData(
        `${ENDPOINT.SYMPOSIUM_HIGHLIGHTS_TRACKING}`,
        payload
      );
      setId(response.data.id);
    } catch (err) {
      console.error("Error fetching ID:", err);
    }
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (!name) {
      setNameError("Please provide a name");
      isValid = false;
    }

    if (!email) {
      setEmailError("Please provide an email address");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Please provide a valid email address");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    // symposiumHighlightTracking({
    //   action: "Symposium Highlights",
    //   videoId: -1,
    //   article_id: symposiumId,
    //   materialId: -1,
    //   clickedData: {
    //     sendClicked: {
    //       name: name,
    //       sentToEmail: email,
    //       message: comments,
    //       sentDate: new Date(),
    //     },
    //   },
    // });

    const tempMethod = pdfId === 0 ? "/share_article_symp" : "/share_article_doc";

    const requestData = {
      pdf_id: pdfId,
      method: pdfId === 0 ? "share_article_symp" : "share_article_doc",
      sent_to_email: email,
      name: name,
      message: comments,
      APP_USED: "OneSource",
      user_id: localStorage.getItem("un"),
    };

    await externalApi(
      import.meta.env.VITE_REACT_APP_API_INDEX_URL + tempMethod,
      "post",
      requestData
    );

    setLoading(false);
    handleShowThankYou(true);
    setName("");
    setEmail("");
    setComments("");
    handleShowShare(false);
  };

  return (
    <Modal show={true} onHide={() => handleShowShare(false)} centered className="add-data">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h5>Share this content</h5>

        <div>
          <FormLabel className="label-left">HCP Name</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter HCP Name"
            value={name}
            onChange={handleNameChange}
            className={nameError ? "input_error" : ""}
          />
        </div>
        {nameError && <div className="error">{nameError}</div>}

        <div>
          <FormLabel className="label-left">HCP Email</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter HCP Email"
            value={email}
            onChange={handleEmailChange}
            className={emailError ? "input_error" : ""}
          />
        </div>
        {emailError && <div className="error">{emailError}</div>}
        <FormLabel className="label-left">Message</FormLabel>
        <textarea
          rows={4}
          placeholder="Type your message for the HCP"
          value={comments}
          onChange={handleCommentsChange}
          className={commentsError ? "input_error" : ""}
        />
        {commentsError && <div className="error">{commentsError}</div>}
      </Modal.Body>

      <Modal.Footer>
        {loading ? (
          <img className="loading_image" src="/images/loading-gif.gif" />
        ) : (
          <Button variant="primary" onClick={handleSubmit}>
            Send
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
