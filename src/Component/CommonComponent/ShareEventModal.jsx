import React, { useState } from "react";
import { FormControl, FormLabel, FormText } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { externalApi,postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import useUserTracking from "../../hooks/useUserTracking";
import { isValidEmail } from "../../util/EmailValidation";

export default function ShareEvent({
  handleShowShare,
  eventId,
  handleShowThankYou,
  symposiumId,
  id,
  setId,
}) {
  const trackUserAction = useUserTracking();
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [emailError, setEmailError] = useState("");
  const [commentsError, setCommentsError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
    setCommentsError("");
  };

 
  const handleSubmit =async () => {
    let isValid = true;
   
    // Perform validation
    if (!email) {
      setEmailError("Please provide an email address");
      isValid = false;
    } else {
      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(email)) {
      //   setEmailError("Please provide a valid email address");
      //   isValid = false;
      // }
      if (!isValidEmail(email)) {
        setEmailError("Please provide a valid email address");
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }
    await trackUserAction(eventId, 'Share Event','');
    setLoading(true)
    const requestData = {
      event_id: eventId,
      method: "share_event",
      sent_to_email: email,
      message:comments,
      APP_USED: "OneSource",
      user_id: localStorage.getItem("un"),
    };

    const result = await externalApi(
      import.meta.env.VITE_REACT_APP_API_INDEX_URL+ '/share_event',
      "post",
      requestData
    );
    setLoading(false)
    handleShowThankYou(true)
    setEmail("");
    setComments("");
    handleShowShare(false);
  };

  return (
    <Modal
      show={true}
      onHide={() => handleShowShare(false)}
      centered
      className="add-data"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <h5>Share this event</h5>
        <div className="shareEmail">
        <FormControl
          type="email"
          placeholder="To"
          aria-label="Email"
          value={email}
          onChange={handleEmailChange}
          className = {emailError ? "input_error" : ""}
        />
        <svg width="36" height="27" viewBox="0 0 36 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M35.88 3.82764L19.2686 13.7019C18.8849 13.9214 18.4506 14.0369 18.0086 14.0369C17.5666 14.0369 17.1322 13.9214 16.7486 13.7019L0.12 3.82764C0.0405137 4.17054 0.000255503 4.52136 0 4.87335V21.6391C0 22.8257 0.471397 23.9638 1.31049 24.8029C2.14958 25.642 3.28763 26.1133 4.47429 26.1133H31.5257C32.7124 26.1133 33.8504 25.642 34.6895 24.8029C35.5286 23.9638 36 22.8257 36 21.6391V4.87335C35.9997 4.52136 35.9595 4.17054 35.88 3.82764Z" fill="#a3a7bd"/>
<path d="M18.4089 12.2799L35.1746 2.30276C34.7628 1.71638 34.2162 1.23748 33.5808 0.906347C32.9454 0.575211 32.2397 0.401525 31.5232 0.399902H4.47174C3.75521 0.401525 3.04956 0.575211 2.41413 0.906347C1.77871 1.23748 1.23211 1.71638 0.820312 2.30276L17.6032 12.2799C17.7267 12.3474 17.8652 12.3828 18.006 12.3828C18.1468 12.3828 18.2853 12.3474 18.4089 12.2799Z" fill="#a3a7bd"/>
</svg>
        </div>

        {emailError && <div className="error">{emailError}</div>}
        <textarea
          rows={4}
          placeholder="Message"
          value={comments}
          onChange={handleCommentsChange}
          className = {commentsError ? "input_error" : ""}
        />
        {commentsError && <div className="error">{commentsError}</div>}
      </Modal.Body>
      <Modal.Footer>
      {
        loading?<img className="loading_image" src="/images/loading-gif.gif" />:<Button variant="primary" onClick={handleSubmit}>Send</Button>
      }

      </Modal.Footer>
    </Modal>
  );
}
