import React from "react";
import Modal from "react-bootstrap/Modal";

const VideoConfirmationModal = ({
  show,
  onClose,
  popupMessage,
  videoLinkId,
  handleIframeFun,
}) => {
  const watchVideo = (e) => {
    handleIframeFun(videoLinkId);
    onClose("shareClicked");
  };
  return (
    <div
      className="video-modal"
      id="watch-confirm"
      show={show}
      onHide={() => onClose(false)}
      backdrop="static"
      centered
    >
      <div className="video-modal-header">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          onClick={() => onClose(false)}
        ></button>
      </div>
      <div className="video-modal-body">
        <p>{popupMessage ? popupMessage : ""}</p>
        <div className="modal-buttons">
          <button
            type="button"
            className="btn btn-primary btn-filled"
            onClick={(e) => watchVideo(e)}
          >
            Watch
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoConfirmationModal;
