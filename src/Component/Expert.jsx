import React, { useState, useEffect, useContext, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rating } from "react-simple-star-rating";
import { Button } from "react-bootstrap";
import ReactPlayer from "react-player";
import { getData, postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ScrollContext from "./ScrollContext";
import useUserTracking from "../hooks/useUserTracking";
function moviePropsAreEqual(prevMovie, nextMovie) {
  return prevMovie.data?.expand === nextMovie.data?.expand;
}

const Expert = ({ data, refer, active }) => {
  const { expertOpinionRef } = useContext(ScrollContext);
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const [isVisible, setIsVisible] = useState(true);
  const [expertOpinion, setExpertOpinion] = useState([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [apiFlag, setApiFlag] = useState(false);
  const [videoDurations, setVideoDurations] = useState({});
  const [trackingId, setTracking] = useState("");
  const [rating, setRating] = useState(0);
  const [playingVideoCurrentTime, setPlayingVideoCurrentTime] = useState(0);
  const [forceCount, setForceCount] = useState(1);
  const isPlaying = useRef(false);
  const [loading, setLoading] = useState(false);
  const secondLoader = false;
  const playerRef = useRef(null);
  const [playerKey, setPlayerKey] = useState(0);
  const trackUserAction = useUserTracking();

  const [selected, setSelected] = useState({
    expand: data?.expand,
    flag: data?.flag,
  });

  const [isExpertNotLoaded, setIsExpertNotLoaded] = useState(true);
  useEffect(() => {
    handleApiFun();
  }, []);

  useEffect(() => {
    if (expertOpinion?.length < 1) return;
    let currentIndex =
      expertOpinion?.findIndex((item) => item.id == active) || 0;
    if (currentIndex < 0) {
      currentIndex = 0;
    }

    setSelectIndex(currentIndex);
    setIsExpertNotLoaded(false);
    if (active) {
      setTimeout(() => {
        handlePlay(expertOpinion?.[currentIndex]);
      }, 1000);
    }
  }, [active, expertOpinion]);

const handleApiFun = async () => {
  try {
    const user_id = localStorage.getItem("un");
    const expert = await getData(
        import.meta.env.VITE_REACT_APP_API_URL_LUMEN +
          ENDPOINT.EXPERTS +
          "?uid=" +
          user_id
    );
    setExpertOpinion(expert?.data?.data);
  } catch (err) {
    console.log("-er", err);
  } finally {
    setIsExpertNotLoaded(false);
  }
};

  const handlePlayPause = async (data) => {
    try {
      setIsVisible(false);
      // await postData(ENDPOINT.TRACKING, {
      //   article_id: data.id,
      //   flag: 2,
      //   action: "Expert opinions",
      // });
      await trackUserAction(
        data?.id,
        "Expert-opinions-play",
        `${data?.title}`,
        2
      );
    } catch (err) {
      console.log("-=er", err);
    }
  };

  const handlePlayerPause = async () => {
    try {
      // setIsVisible(true);
      if (trackingId) {
        await postData(ENDPOINT.UPDATE_VIDEO_TRACKING, {
          id: trackingId,
          video_end_time: playingVideoCurrentTime,
        });
      }
      isPlaying.current = false;
      setTracking("");
    } catch (err) {
      console.log("-err", err);
    }
  };

  const handleDuration = (index, duration) => {
    setVideoDurations((prevDurations) => ({
      ...prevDurations,
      [index]: formatDuration(duration),
    }));
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const submitRating = async (id, title) => {
    try {
      let body = {
        video_id: id,
        rating: rating,
      };
      setLoading(true);
      await trackUserAction(
        id,
        "Expert-opinion-rating",
        `${title} ~ ${rating}`
      );
      const res = await postData(ENDPOINT.VIDEORATING, body);
      setLoading(false);
      if (expertOpinion?.[selectIndex]) {
        expertOpinion[selectIndex].has_rated = true;
        setExpertOpinion(expertOpinion);
        setForceCount(forceCount + 1);
        setApiFlag(true);
        setTimeout(() => {
          setApiFlag(false);
        }, 3000);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const handleClickDiv = (index) => {
    isPlaying.current = false;
    setPlayerKey((prevKey) => prevKey + 1);
    setIsVisible(true);
    setRating(0);
    handleRating(0);
    setPlayingVideoCurrentTime(0);
    setSelectIndex(index);
    setForceCount(forceCount + 1);
  };

  const formatDuration = (duration) => {
    const time = new Date(duration * 1000).toISOString().substr(11, 8);
    return time;
  };

  useEffect(() => {
    setSelected({
      expand: data?.expand,
      flag: data?.flag,
    });
  }, [data?.flag]);

  // const handleProgress = (progress) => {
  //   let currentTime = formatTime(progress.playedSeconds);
  //   setPlayingVideoCurrentTime(currentTime);
  // };
  const handleProgress = (e) => {
  const progress = {
    playedSeconds: e.target.currentTime,
  };
  let currentTime = formatTime(progress.playedSeconds);
  setPlayingVideoCurrentTime(currentTime);
};

  const formatTime = (seconds) => {
    const pad = (value) => {
      return String(value).padStart(2, "0");
    };

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  };
  const trackingStart = async (data) => {
    try {
      // await postData(ENDPOINT.TRACKING, {
      //   article_id: data.id,
      //   flag: 1,
      //   action: "Expert opinions",
      // });
      await trackUserAction(data?.id, "Expert opinions", `${data?.title}`, 1);
    } catch (err) {
      console.log("-=er", err);
    }
  };
  const handlePlay = async (data) => {
    try {
      isPlaying.current = true;
      setIsVisible(false);
      const result = await postData(ENDPOINT.VIDEOTRACKING, {
        article_id: data?.id,
        video_start_time: playingVideoCurrentTime,
        action: "Expert opinions",
        timeline_action: data?.title,
      });
      setTracking(result?.data?.id);
    } catch (err) {
      console.log("-er", err);
    }
  };
  const handleEnded = (link = "") => {
    if (link != "") {
      isPlaying.current = false;
      setIsVisible(true);
      if (playerRef.current) {
       playerRef.current.currentTime = 0;
       }
    }
  };
  return (
    <>
      <div ref={expertOpinionRef} data-section="expertOpinion">
        <div
          className={`expert-opinion section-left-side ${
            selected?.expand && selected?.flag == 5 ? "show" : "hide"
          }`}
          id="secondDiv"
          ref={refer}
        >
          <div className="expert-opinion-title">
            <p>Expert opinions</p>
          </div>

          {isExpertNotLoaded || (expertOpinion && expertOpinion.length) ? (
            <div className="expert-opinion-content">
              <div className="opinion-content-detail d-flex">
                {isExpertNotLoaded ? (
                  <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
                    <div className="opinion-content-detail-left">
                      <div className="video-title-description">
                        <h6>
                          <Skeleton height={30} width={760} />
                        </h6>
                        <p>
                          <Skeleton height={22} width={760} />
                        </p>
                        <span className="article-post-date">
                          <Skeleton height={15} width={67} />
                        </span>
                      </div>
                      <div className="expert-openion-video">
                        <Skeleton height={447} width={795} />
                      </div>
                      <div className="video-rating">
                        <div className="video-rating-feed">
                          <p>
                            <Skeleton height={22} width={360} />
                          </p>

                          <span
                            className="style-module_starRatingWrap__q-lJC"
                            style={{ direction: "ltr" }}
                          >
                            <Skeleton height={22} width={80} inline />
                          </span>
                          <Skeleton height={22} width={80} />
                        </div>
                      </div>
                    </div>
                  </SkeletonTheme>
                ) : (
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
                        !isVisible ? "play" : ""
                      }`}
                    >
                      <div
                        className={`loader ${secondLoader ? "show" : ""}`}
                        id="custom_loader"
                      >
                        <div className="loader_show">
                          <span className="loader-view"> </span>
                        </div>
                      </div>

                      {expertOpinion?.[selectIndex]?.video && (
                        <div className="expertPlayer">
                          <ReactPlayer
                            key={playerKey}
                            ref={playerRef}
                            className={`expertPlayer1`}
                            src={expertOpinion?.[selectIndex]?.video}
                            playing={isPlaying.current}
                            muted={active != 0}
                            // poster={expertOpinion?.[selectIndex]?.poster}
                            preload="metadata"
                            onPlay={() =>
                              handlePlay(expertOpinion?.[selectIndex])
                            }
                            controls={isVisible ? false : true}
                            onPause={handlePlayerPause}
                            onTimeUpdate={handleProgress}
                            onDuration={(duration) =>
                              handleDuration(selectIndex, duration)
                            }
                            onEnded={() =>
                              handleEnded(
                                expertOpinion?.[selectIndex]?.video_linked_link
                              )
                            }
                            width="640"
                            height="360"
                          />
                         

                          {isVisible ? (
                            <div
                              onClick={() => {
                                handlePlay(expertOpinion?.[selectIndex]);
                                handlePlayPause(expertOpinion?.[selectIndex]);
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
                          ) : null}

                          {isVisible ? (
                            <div className="video-time">
                              <>
                                {expertOpinion?.[selectIndex]?.video_duration
                                  ? expertOpinion?.[selectIndex]?.video_duration
                                  : "00:00:00"}
                              </>
                            </div>
                          ) : null}
                          {isVisible ? (
                           <img
                            className="thumbnail"
                            src={expertOpinion?.[selectIndex]?.poster}
                            alt="poster"
                          />
                          ) : null}
                        </div>
                      )}
                    </div>
                    {forceCount ? (
                      <>
                        {expertOpinion.length &&
                        !expertOpinion?.[selectIndex]?.has_rated ? (
                          <>
                            {
                              <div className="video-rating">
                                <div className="video-rating-feed">
                                  <p>
                                    How relevant was this expert video to your
                                    clinical practice?
                                  </p>
                                  <Rating
                                    id={
                                      "rating_" +
                                      expertOpinion?.[selectIndex]?.id
                                    }
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
                                      a
                                      alt=""
                                    />
                                  ) : (
                                    <Button
                                      className={
                                        rating ? "btn" : "btn-disabled"
                                      }
                                      onClick={() =>
                                        submitRating(
                                          expertOpinion?.[selectIndex]?.id,
                                          expertOpinion?.[selectIndex]?.title
                                        )
                                      }
                                    >
                                      Submit
                                    </Button>
                                  )}
                                </div>
                              </div>
                            }
                          </>
                        ) : null}

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
                    ) : null}
                  </div>
                )}

                <div className="opinion-content-detail-right">
                  <div className="expert-opinion-video-list">
                    {isExpertNotLoaded
                      ? [...Array(5)].map((_, index) => (
                          <SkeletonTheme
                            color="#5e6c77"
                            highlightColor="#a9b7c1"
                            key={`skeleton_expert_video_${index}`}
                            inline={true}
                          >
                            <div className="expert-opinion-video-list-box">
                              <div className="expert-opinion-video-thumbnail">
                                <div>
                                  <Skeleton height={74} width={143} />
                                </div>
                              </div>
                              <div className="expert-opinion-video-discription">
                                <Skeleton height={20} width={449} />
                                <Skeleton height={16} width={200} />
                                <span className="video-date">
                                  <Skeleton height={12} width={53} />
                                </span>
                              </div>
                            </div>
                          </SkeletonTheme>
                        ))
                      : expertOpinion?.map((item, index) => (
                          <React.Fragment key={`video_${index}`}>
                            {index != selectIndex ? (
                              <div
                                className="expert-opinion-video-list-box"
                                onClick={() => {
                                  handleClickDiv(index);
                                  trackingStart(item);
                                }}
                              >
                                <div className="expert-opinion-video-thumbnail">
                                  <div>
                                    <ReactPlayer
                                      id={"video_" + index}
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
                                      {videoDurations?.[index]
                                        ? videoDurations?.[index]
                                        : item?.video_duration}
                                    </div>
                                  </div>
                                </div>
                                <div className="expert-opinion-video-discription">
                                  <p>{item.title}</p>
                                  <span>{item.subtitle}</span>
                                  <span className="video-date">
                                    {item.created_at}
                                  </span>
                                </div>
                              </div>
                            ) : null}
                          </React.Fragment>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-data">
              <h4>No expert opinion live yet</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default React.memo(Expert, moviePropsAreEqual);
