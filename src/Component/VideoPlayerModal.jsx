import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useLocation } from "react-router";
import useTrackingHandlers from "../hooks/useTrackingHandlers";

const VideoPlayerModal = ({ videoData, onClose, isFirst }) => {
  const { search } = useLocation();
  const [isFirstTimeVideo, setIsFirstTimeVideo] = useState(true);
  const [isFirstTime1, setIsFirstTime1] = useState(true);
  const searchParams = new URLSearchParams(search);
  const userId = searchParams.get("user-id");

  const isFirstTime = useRef(true);

  const {
    show,
    url,
    poster,
    videoPlayIcon,
    videoText: video_id,
    videoText,
  } = videoData;
  const [isPlaying, setIsPlaying] = useState(isFirst || false);

  const [watchStart, setWatchStart] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  const { handleVideoInteraction } = useTrackingHandlers();

  const formatTime = (seconds) => {
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleProgress = (e) => {
  //   const currentTime = formatTime(0);
  // console.log("currentTime", currentTime);
  setCurrentTime(e?.target?.currentTime || 0);
    // setCurrentTime(playedSeconds);
  };

  const trackStart = () => {
    const time = formatTime(currentTime);
    setWatchStart(time);
    handleVideoInteraction({
      video_id,
      user_id: userId,
      start_time: time,
      video: videoText || "1",
    });
  };

  const trackEnd = () => {
    const endTime = formatTime(currentTime);
    handleVideoInteraction({
      video_id,
      user_id: userId,
      start_time: "00:00:00",
      end_time: endTime,
      video: videoText || "1",
    });
  };

  return (
    <Modal
      show={show}
      backdrop="static"
      onHide={() => {
        trackEnd();
        onClose();
        setIsPlaying(false);
        setIsFirstTime1(false);
        isFirstTime.current = true;
      }}
      size="lg"
      centered
      className="isth-agenda-modal isth2026-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {videoText.endsWith(":") ? videoText.slice(0, -1) : videoText}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ISTH-agenda-modal-body">
          <div
            className="video-player-container"
            style={{ position: "relative" }}
          >
            <ReactPlayer
              src={url}
              controls
              width="100%"
              height="75vh"
              playing={isPlaying}
              // light={isFirst ?false:poster ? window.location.origin + poster : false}
              className="one_source_video"
              playsInline
              onTimeUpdate={handleProgress}
              muted={isFirst ? true : false}
              playIcon={
                <div
                  className="video-btn-play"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <img src={videoPlayIcon} alt="Play Icon" id="videoPlayIcon" />
                </div>
              }
              onPlay={() => {
                isFirstTime.current = false;
                setIsFirstTime1(false);
                setIsPlaying(true);
                setIsFirstTimeVideo(false);
                if (isFirstTime.current) {
                  trackStart();
                }
              }}
              onPause={() => {
                setIsPlaying(false);
              }}
              onEnded={() => {
                setIsPlaying(false);
              }}
              poster={poster}
              preload="auto"
              // config={{
              //   attributes: {
              //     poster,
              //     preload: "auto",
              //   },
              //}}
            />
            {!isPlaying && !isFirstTime1 && (
              <>
                <img className="thumbnail" src={poster} alt="poster" />
                <div
                  className="video-btn-play"
                  onClick={() => setIsPlaying(true)}
                >
                  <img src={videoPlayIcon} alt="Play Icon" />
                </div>
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VideoPlayerModal;
