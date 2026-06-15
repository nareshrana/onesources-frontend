import React, { useState } from "react";
import ReactPlayer from "react-player";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


export default function VideoModal({ handleShowVideo }) {
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayPause = () => {
    setIsVisible(false)
    setIsPlaying(!isPlaying);
  };
  return (
    <>
      <Modal
        show={true}
        onHide={() => handleShowVideo(false)}
        centered
        className="video-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className = "video_popup_title">One Source</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
          <ReactPlayer
            className="one_source_video"
            playing={isPlaying}
            // config={{ attributes: { poster: path_image + "video_md_logo.png",
            // play:isPlaying?"true":'false'
            // } }}
            poster= {path_image + "video_md_logo.png"}
            src="https://docintel.s3.eu-west-1.amazonaws.com/onesource_videos/img_1685517635.mp4"
            controls={isVisible?false:true}
            width="640"
            height="360"
          />

          {isVisible? (
            <div onClick={handlePlayPause}>
                <div className="video-btn-play">
                  <img
                    className="video_btn"
                    src={path_image + "play-button.png"}
                    alt="Play Icon"
                  />
                </div>
            </div>
          ):null}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
