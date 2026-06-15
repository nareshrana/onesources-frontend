import React, { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rating } from "react-simple-star-rating";
import { Button } from "react-bootstrap";
import ReactPlayer from "react-player";
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import VideoConfirmationModal from "../Modals/VideoConfirmationModal";
import useUserTracking from "../hooks/useUserTracking";

const ExpertSymposium = ({
  symposium,
  heading,
  active,
  type,
  handleIframe,
  isVisibleFlag,
  symposiumId,
  id,
  setId,
}) => {
  const [playerKey, setPlayerKey] = useState(0);
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const [isVisible, setIsVisible] = useState(true);
  const [expertOpinion, setExpertOpinion] = useState([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [apiFlag, setApiFlag] = useState(false);
  const [firstTimeLoaded, setFirstTimeLoaded] = useState(true);
  const timeOutId = useRef(0);
  const [videoDurations, setVideoDurations] = useState({});
  const [trackingId, setTracking] = useState(null);
  const [rating, setRating] = useState(0);
  const [playingVideoCurrentTime, setPlayingVideoCurrentTime] = useState(0);
  const [forceCount, setForceCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExpertNotLoaded, setIsExpertNotLoaded] = useState(true);
  const [disableEvents, setDisableEvents] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const playerRef = useRef(null);
  const presentCall = useRef(null);
  const [videoLinkId, setVideoLinkId] = useState();
  const trackUserAction = useUserTracking();

  useEffect(() => {
    if (isVisibleFlag) {
      setIsVisible(true);
      setIsPlaying(false);
        if (playerRef.current) {
      playerRef.current.currentTime = 0;
    }
    }
  }, [isVisibleFlag]);

  useEffect(() => {
    if (!timeOutId.current && firstTimeLoaded) {
      let intervalIndex = 0;
      timeOutId.current = setInterval(() => {
        intervalIndex = (intervalIndex + 1) % symposium.length;
        setSelectIndex(intervalIndex);
      }, 10000);
    }
  }, [firstTimeLoaded, symposium.length]);

  useEffect(() => {
    setExpertOpinion(symposium);
    const currentIndex = symposium?.findIndex((item) => item.id == active) || 0;
    setSelectIndex(currentIndex);
    setIsExpertNotLoaded(false);
    setVideoLinkId(symposium?.[0]?.video_linked_link);
    if (active) {
      setTimeout(() => {
        scrollToSection("expertPlayer");
      }, 1000);

      handleClickDivFunction(currentIndex, symposium?.[currentIndex]);
      handlePlayer();
    }
  }, [symposium]);

  const handlePlayPause = () => {
    setIsVisible(false);
  };

  const handlePlayerPause = async () => {
    setIsPlaying(false);
    setIsVisible(true);
    try {
      if (trackingId) {
        await postData(ENDPOINT.UPDATE_VIDEO_TRACKING, {
          id: trackingId,
          video_end_time: playingVideoCurrentTime,
        });
      }
      setTracking(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDuration = (index, duration) => {
    setVideoDurations((prev) => ({
      ...prev,
      [index]: formatDuration(duration),
    }));
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const scrollContainerRef = document.getElementById("root");
    if (sectionElement && scrollContainerRef) {
      const scrollContainer = scrollContainerRef;
      const containerOffsetTop = scrollContainer.getBoundingClientRect().top;
      const sectionOffsetTop = sectionElement.getBoundingClientRect().top;
      const scrollToPosition =
        sectionOffsetTop -
        containerOffsetTop +
        scrollContainer.scrollTop -
        (sectionId === "highchart_move" ? 200 : 100);
      scrollContainer.scrollTo({ top: scrollToPosition, behavior: "smooth" });
    }
  };

  const submitRating = async (id, title, symposium_id = 0) => {
    try {
      symposiumHighlightTracking({
        action: "Symposium Highlights",
        article_id: symposiumId,
        video_id: id,
        clickedData: {
          [`videoRating_${id}`]: rating,
        },
      });

      const body = {
        video_id: id,
        rating: rating,
        ...(type === "symposium" && { symposium_id }),
      };
      setLoading(true);
      await trackUserAction(
        id,
        "Symposium-video-rating",
        `${title} ~ ${rating}`,
      );
      await postData(ENDPOINT.VIDEORATING, body);
      setLoading(false);
      if (expertOpinion?.[selectIndex]) {
        const updatedOpinion = [...expertOpinion];
        updatedOpinion[selectIndex].has_rated = true;
        setExpertOpinion(updatedOpinion);
        setForceCount((prev) => prev + 1);
        setApiFlag(true);
        setTimeout(() => setApiFlag(false), 3000);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const symposiumHighlightTracking = async (payload) => {
    try {
      if (id != -1) payload.id = id;
      const response = await postData(
        `${ENDPOINT.SYMPOSIUM_HIGHLIGHTS_TRACKING}`,
        payload,
      );
      setId(response.data.id);
    } catch (err) {
      console.error("Error fetching ID:", err);
    }
  };

  const handleClickDiv = async (index) => {
    setIsPlaying(false);
    setIsVisible(true);
    if (trackingId) {
      await postData(ENDPOINT.UPDATE_VIDEO_TRACKING, {
        id: trackingId,
        video_end_time: playingVideoCurrentTime,
      });
    }

    setPlayerKey((prev) => prev + 1);
    handleIframe("", false);
    setShowVideoModal(false);
    setRating(0);
    setPlayingVideoCurrentTime(0);
    setSelectIndex(index);
    setForceCount((prev) => prev + 1);
    setFirstTimeLoaded(false);
    if (timeOutId.current) {
      clearInterval(timeOutId.current);
    }
  };

  const formatDuration = (duration) => {
    return new Date(duration * 1000).toISOString().substr(11, 8);
  };

  // const handleProgress = (progress) => {
  //   console.log("formatTime",progress)
  //   setPlayingVideoCurrentTime(formatTime(progress.playedSeconds));
  //   console.log("formatTime(progress.playedSeconds",formatTime(progress.playedSeconds))
  // };
const handleProgress = (e) => {
  const progress = {
    playedSeconds: e.target.currentTime,
  };

  setPlayingVideoCurrentTime(
    formatTime(progress.playedSeconds)
  );
};

  const handleEnded = () => {
    setIsPlaying(false);
    setIsVisible(true);
     if (playerRef.current) {
    playerRef.current.currentTime = 0;
  }
  };

  const formatTime = (seconds) => {
    const pad = (value) => String(value).padStart(2, "0");
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  const handlePlay = async (data) => {
    try {
      setIsPlaying(true);
      setIsVisible(false);
      if (!data) return !data;
      await trackUserAction(data?.id, "Symposium-video", `${data?.title}`);
      if (!presentCall.current) {
        presentCall.current = 1;
        const result = await postData(ENDPOINT.VIDEOTRACKING, {
          article_id: data?.id,
          video_start_time: playingVideoCurrentTime,
          symposium_id: data?.symposium_id,
          action: "Symposium Highlights Video",
          timeline_action: data.title,
        });
        setTracking(result?.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVideoModalClose = () => {
    setShowVideoModal(false);
    setIsPlaying(false);
    setIsVisible(true);
    setDisableEvents(false);
 if (playerRef.current) {
    playerRef.current.currentTime = 0;
  }
  };

  const handleClickDivFunction = (index, item) => {
    if (!item) return !item;

    handleClickDiv(index);
    symposiumHighlightTracking({
      action: "Symposium Highlights",
      article_id: symposiumId,
      video_id: item?.id,
      timeline_action: heading,
      clickedData: {
        [`videoClicked_${item?.id}`]: item?.id,
      },
    });
    trackUserAction(item?.id, "symposium-video", `${item.title}`);
    if (type === "symposium") setDisableEvents(false);
  };

  const handlePlayer = () => {
    presentCall.current = null;
    handlePlay(expertOpinion?.[selectIndex]);
    scrollToSection("expertPlayer");
    handlePlayPause(expertOpinion?.[selectIndex]);
  };
  const [showInitialPoster, setShowInitialPoster] = useState(true);

  useEffect(() => {
    setShowInitialPoster(true);
  }, [selectIndex]);
  return (
    <div className="expert-opinion-content">
      <div className="opinion-content-detail d-flex">
        {isExpertNotLoaded ? (
          <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
            <div className="opinion-content-detail-left">
              <h5>
                <Skeleton height={35} width={760} />
              </h5>
              <p>
                <Skeleton height={25} width={760} />
              </p>
              <div className="expert-openion-video">
                <Skeleton height={340} width={750} />
              </div>
            </div>
          </SkeletonTheme>
        ) : (
          <>
            <div className="opinion-content-detail-left">
              <div className="video-title-description">
                <h6>{expertOpinion?.[selectIndex]?.title}</h6>
                <p>{expertOpinion?.[selectIndex]?.subtitle}</p>
                <span className="article-post-date">
                  {expertOpinion?.[selectIndex]?.created_at}
                </span>
              </div>

              <div
                className={`expert-openion-video ${
                  showVideoModal ? "show" : ""
                } ${!isVisible ? "play" : ""}`}
              >
                {showVideoModal && type === "symposium" && (
                  <VideoConfirmationModal
                    show={showVideoModal}
                    onClose={handleVideoModalClose}
                    popupMessage="To watch the full video click below"
                    videoLinkId={videoLinkId}
                    handleIframeFun={(link) => handleIframe(link, true)}
                  />
                )}

                {expertOpinion?.[selectIndex]?.video && (
                  <div className="expertPlayer">
                    <ReactPlayer
                      key={
                        type === "symposium" && firstTimeLoaded
                          ? "player1"
                          : playerKey
                      }
                      ref={playerRef}
                      className="expertPlayer1"
                      src={expertOpinion?.[selectIndex]?.video}
                      playing={
                        type === "symposium" && firstTimeLoaded
                          ? false
                          : isPlaying
                      }
                      playsInline={
                        type === "symposium" && firstTimeLoaded
                          ? false
                          : isPlaying
                      }
                      muted={active != 0}
                      // light={expertOpinion?.[selectIndex]?.poster}
                      controlsList={
                        type === "symposium" && firstTimeLoaded
                          ? "nodownload noseeking"
                          : undefined
                      }
                      preload="metadata"
                      onPlay={() => handlePlay(expertOpinion?.[selectIndex])}
                      controls={!isVisible}
                      onPause={handlePlayerPause}
                      onTimeUpdate={handleProgress}
                      onDuration={(duration) =>
                        handleDuration(selectIndex, duration)
                      }
                      onEnded={handleEnded}
                      width="640"
                      height="360"
                    />

                    {isVisible && !disableEvents && (
                      <div
                        onClick={() => {
                          if (type === "symposium" && firstTimeLoaded) {
                            setFirstTimeLoaded(false);
                            clearInterval(timeOutId.current);
                          }
                          setShowInitialPoster(false);
                          handlePlayer();
                        }}
                      >
                        <div className="video-btn-play">
                          <img
                            className="video_btn"
                            src={path_image + "play-button.png"}
                            alt="Play Icon"
                          />
                        </div>
                      </div>
                    )}

                    {isVisible && (
                      <>
                        {showInitialPoster && (
                          <img
                            className="thumbnail"
                            src={expertOpinion?.[selectIndex]?.poster}
                            alt="poster"
                          />
                        )}
                        <div className="video-time">
                          {expertOpinion?.[selectIndex]?.video_duration ||
                            "00:00:00"}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {forceCount && (
                <>
                  {expertOpinion?.[selectIndex]?.show_rating &&
                    !expertOpinion?.[selectIndex]?.has_rated && (
                      <div className="video-rating">
                        <div className="video-rating-feed">
                          <p>
                            How relevant was this expert video to your clinical
                            practice?
                          </p>
                          <Rating
                            id={"rating_" + expertOpinion?.[selectIndex]?.id}
                            onClick={handleRating}
                            ratingValue={rating}
                            initialValue={0}
                            size={34}
                            label
                            fillColor="blue, red, green"
                            emptyColor="#b8bec9"
                            className="feedback"
                          />
                          {loading ? (
                            <img
                              className="loading_image"
                              src="/images/loading-gif.gif"
                              alt="loading_image"
                            />
                          ) : (
                            <Button
                              className={rating ? "btn" : "btn-disabled"}
                              onClick={() =>
                                submitRating(
                                  expertOpinion?.[selectIndex]?.id,
                                  expertOpinion?.[selectIndex]?.heading,
                                  expertOpinion?.[selectIndex]?.symposium_id,
                                )
                              }
                            >
                              Submit
                            </Button>
                          )}
                        </div>
                      </div>
                    )}

                  {apiFlag && (
                    <div className="video-rating">
                      <div className="video-rating-feed">
                        <p className="success_msg">
                          Thank you for your feedback
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}

        <div className="opinion-content-detail-right">
          <div className="expert-opinion-video-list">
            {isExpertNotLoaded
              ? [...Array(5)].map((_, index) => (
                  <SkeletonTheme
                    color="#5e6c77"
                    highlightColor="#a9b7c1"
                    key={`skeleton_${index}`}
                  >
                    <div className="expert-opinion-video-list-box">
                      <div className="expert-opinion-video-thumbnail">
                        <div>
                          <Skeleton height={60} width={80} />
                        </div>
                      </div>
                      <div className="expert-opinion-video-discription">
                        <Skeleton height={10} width={300} />
                        <Skeleton height={10} width={200} />
                      </div>
                    </div>
                  </SkeletonTheme>
                ))
              : expertOpinion?.map(
                  (item, index) =>
                    index !== selectIndex && (
                      <div
                        className="expert-opinion-video-list-box"
                        key={index}
                        onClick={() => handleClickDivFunction(index, item)}
                      >
                        <div className="expert-opinion-video-thumbnail">
                          <div>
                            <ReactPlayer
                              src={item?.video}
                              controls={false}
                              light={
                                <img
                                  className="webinarImg"
                                  src={item?.poster}
                                  alt="Thumbnail"
                                />
                              }
                              onDuration={(duration) =>
                                handleDuration(index, duration)
                              }
                              playIcon={
                                <div className="video-play-nex">
                                  <img
                                    className="video_btn"
                                    src={path_image + "play-button.png"}
                                    alt="Play Icon"
                                  />
                                </div>
                              }
                              width="640"
                              height="360"
                            />
                            <div className="video-time">
                              {videoDurations?.[index] || item?.video_duration}
                            </div>
                          </div>
                        </div>
                        <div className="expert-opinion-video-discription">
                          <p>{item.title}</p>
                          <span>{item.subtitle}</span>
                          <span className="video-date">{item.created_at}</span>
                        </div>
                      </div>
                    ),
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertSymposium;
