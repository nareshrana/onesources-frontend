import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { loader } from "./CommonComponent/Loader";
import { useLocation } from "react-router-dom";
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import ReactPlayer from "react-player";
import CokkieModal from "./CokkieModal";
import { Helmet } from "react-helmet-async";

const WFH2026PromoPage = () => {
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const location = useLocation();
  const [posterImages, setPosterImages] = useState({
    video1: path_image + "wfh2026thumbvideo1.png",
    video2: path_image + "wfh2026thumbvideo2.png",
  });
  const [isFirstTimeVideo, setIsFirstTimeVideo] = useState({
    video1: true,
    video2: true,
    video3: true,
    video4: true,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1441) {
        setPosterImages({
          video1: path_image + "wfh2026thumbvideo1-small.png",
          video2: path_image + "wfh2026thumbvideo2-small.png",
        });
      } else {
        setPosterImages({
          video1: path_image + "wfh2026thumbvideo1.png",
          video2: path_image + "wfh2026thumbvideo2.png",
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);
  const showPop = searchParams.get("video");
  const agendaSectionRef = useRef(null);
  const [isMobileSrceen, setIsMobileSrceen] = useState(
    window.innerWidth <= 767,
  );
  const mobilePlayer1 = useRef(null);
  const mobilePlayer2 = useRef(null);
  const [isPlaying, setIsPlaying] = useState({
    p1: false,
    p2: false,
    p3: false,
    p4: false,
    p5: false,
    p6: false,
  });
  const [isScrollDownShown, setIsScrollDownShown] = useState(false);
  const [id, setId] = useState(-1);
  const [url, setUrl] = useState(
    "https://docintel.app/one_source/videos/MAIC.mp4",
  );

  const [popupVideoCurrentTimeV1, setPopUpVideoCurrentTimeV1] = useState(0);
  const [popupVideoCurrentTimeV2, setPopUpVideoCurrentTimeV2] = useState(0);
  const [currentMedium, setCurrentMedium] = useState("web");
  const [cookieShow, setCookieShow] = useState(false);

  useEffect(() => {
    if (!mobilePlayer1.current || !mobilePlayer2.current) return;
    mobilePlayer1?.current?.children[0]?.classList?.toggle(
      "playing",
      isPlaying?.p5,
    );
    mobilePlayer2?.current?.children[0]?.classList?.toggle(
      "playing",
      isPlaying?.p6,
    );
  }, [isPlaying]);

  useEffect(() => {
    let body = document.getElementsByTagName("body");
    body[0].classList.add("eahad-2026");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsScrollDownShown(false);
        } else {
          setIsScrollDownShown(true);
        }
      },
      { threshold: 0.5 },
    );

    if (agendaSectionRef.current) {
      observer.observe(agendaSectionRef.current);
    }

    return () => {
      if (agendaSectionRef.current) {
        observer.unobserve(agendaSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const med = searchParams.get("med");
    if (med) {
      setCurrentMedium(med);
      trackingData(
        {
          calendarClicked: 0,
          downloadClicked: 0,
          linkClicked: 0,
          visitedMedium: med,
          type: location.pathname.replaceAll("/", "").toLowerCase(),
        },
        id,
      );
    }
  }, [searchParams]);

  useEffect(() => {
    trackingData(
      {
        calendarClicked: 0,
        downloadClicked: 0,
        linkClicked: 0,
        visitedMedium: currentMedium,
        type: location.pathname.replaceAll("/", "").toLowerCase(),
      },
      id,
    );
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSrceen(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hideCookieModal = () => setCookieShow(false);

  const handleProgressV1 = (progress) => {
    let currentTime = formatTime(progress?.target?.currentTime ||0);
    setPopUpVideoCurrentTimeV1(currentTime);
  };

  const handleProgressV2 = (progress) => {
    let currentTime = formatTime(progress?.target?.currentTime ||0);
    setPopUpVideoCurrentTimeV2(currentTime);
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

  const isIOS = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const handleInplaceVideoClose = (defaultKey = null) => {
    trackingData(
      {
        calendarClicked: 0,
        downloadClicked: 0,
        studeyDesignVideoClicked: 0,
        linkClicked: 0,
        cookiesClicked: 0,
        userChecked: "",
        type: location.pathname.replaceAll("/", "").toLowerCase(),
        [(defaultKey || url?.videoName) + "_PopUpVideo_VideoEndTime"]:
          defaultKey === "studyDesign"
            ? popupVideoCurrentTimeV2 || "00:00:00"
            : popupVideoCurrentTimeV1 || "00:00:00",
      },
      id,
      1,
    );
  };

  const trackingData = async (payload, id) => {
    try {
      if (id != -1) {
        payload.id = id;
      }
      const response = await postData(`${ENDPOINT.WFH_TRACKING}`, payload);
      setId(response.data.id);
    } catch (err) {
      console.error("Error fetching event ID:", err);
    } finally {
      loader("hide");
    }
  };

  const smoothScroll = () => {
    if (agendaSectionRef.current) {
      agendaSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInplaceVideoPlay = (defaultKey = null) => {
    trackingData(
      {
        calendarClicked: 0,
        downloadClicked: 0,
        profVogalVideoClicked: 0,
        clinicalEfficacyVideoClicked: 0,
        linkClicked: 0,
        cookiesClicked: 0,
        userChecked: "",
        type: location.pathname.replaceAll("/", "").toLowerCase(),
        [(defaultKey || url?.videoName) + "_PopUpVideo_VideoStartTime"]:
          "00:00:00",
      },
      id,
      1,
    );
  };

  const downloadIcs = async (url, trackingName) => {
    const checkdevice = isIOS();
    const payload = {
      [trackingName]: 1,
      downloadClicked: 0,
      profVogalVideoClicked: 0,
      clinicalEfficacyVideoClicked: 0,
      linkClicked: 0,
      cookiesClicked: 0,
      type: location.pathname.replaceAll("/", "").toLowerCase(),
    };
    if (checkdevice) {
      await trackingData(payload, id);
      window.location.href = url;
    } else {
      trackingData(payload, id);
      const link = document.createElement("a");
      link.href = url;
      link.download = "WFH 2026.ics";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadWithTracking = async (url, payload, id, trackingDataFn) => {
    if (isIOS()) {
      await trackingDataFn(payload, id);
      window.location.href = url;
    } else {
      const link = document.createElement("a");
      link.href = url;
      link.download = url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      trackingDataFn(payload, id);
    }
  };

  return (
    <>
      <Helmet>
        <title>WFH 2026</title>
        <link rel="icon" href="/images/wfh2026-favicon.ico" />
        <meta
          name="description"
          content="Beyond Replacement: Redefining Factor VIII and Inhibitor C
                  are in Haemophilia A"
        />
        <link
          rel="apple-touch-icon"
          href="https://onesource.octapharma.com/images/wfh2026-favicon.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WFH 2026" />
        <meta
          property="og:description"
          content="Beyond Replacement: Redefining Factor VIII and Inhibitor C
                   are in Haemophilia A"
        />
        <meta
          property="og:url"
          content="https://onesource.octapharma.com/WFH2026promopage"
        />
        <meta
          property="og:image"
          content="https://onesource.octapharma.com/images/wfh2026-thumbnail.png"
        />
        <link
          rel="prefetch"
          href="https://onesource.octapharma.com/images/wfh2026-favicon.png"
        />
      </Helmet>
      <div className="promotion-page wfh2026">
        {isScrollDownShown && (
          <div className="scroll-btn">
            <div className="scroll-btn-content">
              <a onClick={smoothScroll}>
                <span className="chevron">&#60;</span>
                <span className="chevron">&#60;</span>
                <span className="chevron">&#60;</span> Scroll down
              </a>
            </div>
          </div>
        )}
        <div className="promotion-page-inset">
          <div className="promotion-page-header">
            <div className="header-video">
              <div className="underspotlight">
                <div className="header-event-info">
                  <h2>Join us at WFH 2026</h2>
                  <p>Kuala Lumpur, Malaysia</p>
                </div>

                <div className="header-symposium">
                  <h6>Symposium</h6>
                  <h1>
                    Beyond Replacement:
                    <br />
                    <span>
                      Redefining Factor VIII and Inhibitor Care in Haemophilia A
                    </span>
                  </h1>
                </div>
              </div>
              <div className="bannerimg-box">
                <img src={path_image + "wfh2026img.png"} alt="wfh2026" />
              </div>
            </div>
          </div>

          <div className="header-event">
            <Col>
              <img src={path_image + "calendar-icon.svg"} alt="" />
              <h3>
                Monday, <br />
                April 20. 2026
              </h3>
            </Col>
            <Col>
              <img src={path_image + "clock-icon.svg"} alt="" />
              <h3 className="time">17:30-18:30 MYT</h3>
            </Col>
            <Col>
              <img src={path_image + "maps-and-flags-icon.svg"} alt="" />
              <h3>Room: Banquet Hall</h3>
            </Col>
            <Col>
              <div className="calender-btn">
                <Button
                  variant="primary"
                  className="btn-filled"
                  onClick={() =>
                    downloadIcs(path_image + "WFH2026.ics", "calenderClicked")
                  }
                >
                  Add To Your Calendar
                </Button>
              </div>
            </Col>
          </div>
          {/*-- Video show here close--*/}
          <div className="agenda-wrap">
            <div className="agenda-section" id="agenda-section">
              <div className="agenda-speakers">
                <div className="wfh2026-agenda-section">
                  <h2 className="agenda-title">Agenda</h2>

                  <p className="agenda-desc">
                    Join us to explore current challenges and evolving
                    strategies in haemophilia A management, with a focus on the
                    role of Factor VIII in the modern treatment landscape.
                    Expert faculty will discuss individualised treatment
                    decisions, genetic risk factors for inhibitor development,
                    and modern approaches to inhibitor eradication.
                  </p>

                  <div className="agenda-divider" />

                  <div className="agenda-list">
                    <div className="agenda-item">
                      <div className="agenda-avatar">
                        <img
                          src={path_image + "alok-wfh.png"}
                          alt="Alok Srivastava"
                        />
                      </div>
                      <div className="agenda-content">
                        <p className="agenda-intro">Welcome and Introduction</p>
                        <h4>
                          Evolving Care for All: The Expanding Role of Factor
                          VIII in Haemophilia A
                        </h4>
                        <span>Alok Srivastava (IN)</span>
                      </div>
                    </div>

                    <div className="agenda-item">
                      <div className="agenda-avatar">
                        <img
                          src={path_image + "anna-wfh.png"}
                          alt="Anna Pavlova (DE)"
                        />
                      </div>
                      <div className="agenda-content">
                        <h4>
                          Genetics and Inhibitors: How F8 Mutations Shape Risk
                          and Outcomes
                        </h4>
                        <span>Anna Pavlova (DE)</span>
                      </div>
                    </div>

                    <div className="agenda-item">
                      <div className="agenda-avatar">
                        <img
                          src={path_image + "robert-wfh.png"}
                          alt="Robert Sidonio"
                        />
                      </div>
                      <div className="agenda-content">
                        <h4>
                          Modern Inhibitor Management: Strategies for Sustained
                          Eradication
                        </h4>
                        <span>Robert F. Sidonio Jr. (US)</span>
                      </div>
                    </div>
                    <div className="agenda-item">
                      <div className="agenda-avatar">
                        <img
                          src={path_image + "wfhq&a-icon.png"}
                          alt="wfhq&a-icon"
                        />
                      </div>
                      <div className="agenda-content">
                        <h4>Panel Discussion and Audience Q&A</h4>
                      </div>
                    </div>
                  </div>

                  <div className="agenda-footer-logo">
                    <img
                      src={path_image + "octapharma-white.png"}
                      alt="wfh-logo"
                    />
                  </div>
                </div>
                <div className="download-agenda-file">
                  <h5>Symposium agenda</h5>
                  <div className="download-btn" style={{ cursor: "pointer" }}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        downloadWithTracking(
                          path_image + "WFH 2026 Agenda.pdf",
                          {
                            calendarClicked: 0,
                            downloadClicked: 1,
                            profVogalVideoClicked: 0,
                            clinicalEfficacyVideoClicked: 0,
                            linkClicked: 0,
                            cookiesClicked: 0,
                            type: location.pathname
                              .replaceAll("/", "")
                              .toLowerCase(),
                          },
                          id,
                          trackingData,
                        );
                      }}
                      href={path_image + "WFH 2026 Agenda.pdf"}
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
              <div className="speaker-quotes">
                <div className="speaker-quotes-box">
                  {!isMobileSrceen ? (
                    <div className="video-card-desktop">
                      <ReactPlayer
                        key={posterImages.video1}
                        className="react-player"
                        playing={isPlaying?.p5}
                        muted={showPop == 1}
                        // config={{
                        //     attributes: {
                        //         poster: posterImages.video1,
                        //         play: isPlaying?.p5,
                        //     },
                        // }}
                        // poster={posterImages.video1}
                        src="https://docintel.s3.eu-west-1.amazonaws.com/video/8895_VIDEO_1_MOTIVATE_video_US_07_video.mp4"
                        controls={!isPlaying?.p5 ? false : true}
                        width="100%"
                        height="100%"
                        onTimeUpdate={handleProgressV1}
                        onEnded={() =>
                          handleInplaceVideoClose("studyRationale")
                        }
                        onPause={() => {
                          handleInplaceVideoClose("studyRationale");
                          setIsPlaying({ ...isPlaying, p5: false });
                        }}
                        onPlay={() => {
                          setIsFirstTimeVideo((prev) => ({
                            ...prev,
                            video1: false,
                          }));
                          handleInplaceVideoPlay("studyRationale");
                          setIsPlaying({ ...isPlaying, p5: true });
                        }}
                      />
                      {isFirstTimeVideo.video1 && (
                        <img
                          className="thumbnail"
                          src={posterImages.video1}
                          alt="poster"
                        />
                      )}
                      {!isPlaying?.p5 && (
                        <div className="desktop-overlay">
                          <img
                            src={path_image + "wfh-playbutton.png"}
                            className="play-icon"
                            alt="Play"
                            onClick={() => {
                              const isPlay = isPlaying["p5"];
                              setUrl({ videoName: "studyRationale" });
                              setIsPlaying({ ...isPlaying, p5: !isPlay });
                            }}
                          />
                          <p className="overlay-title">
                            MOTIVATE study rationale <br />
                            <span>by Robert F. Sidonio, Jr.</span>
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div ref={mobilePlayer1} className="video-card-mobile">
                      <ReactPlayer
                        className="react-player"
                        playing={isPlaying?.p5}
                        muted={showPop == 1}
                        // config={{
                        //     attributes: {
                        //         poster:
                        //             path_image + "wfh2026thumbvideo1.png",
                        //         play: isPlaying?.p5,
                        //     },
                        // }}
                        // poster= {path_image + "wfh2026thumbvideo1.png"}
                        src="https://docintel.s3.eu-west-1.amazonaws.com/video/8895_VIDEO_1_MOTIVATE_video_US_07_video.mp4"
                        controls={isPlaying?.p5 ? true : false}
                        width="100%"
                        height="100%"
                        onTimeUpdate={handleProgressV1}
                        onEnded={() =>
                          handleInplaceVideoClose("studyRationale")
                        }
                        onPause={() => {
                          handleInplaceVideoClose("studyRationale");
                          setIsPlaying({ ...isPlaying, p5: false });
                        }}
                        onPlay={() => {
                          setIsFirstTimeVideo((prev) => ({
                            ...prev,
                            video2: false,
                          }));

                          handleInplaceVideoPlay("studyRationale");
                          setIsPlaying({ ...isPlaying, p5: true });
                        }}
                      />
                      {isFirstTimeVideo.video2 && (
                        <img
                          className="thumbnail"
                          src={path_image + "wfh2026thumbvideo1.png"}
                          alt="poster"
                        />
                      )}
                      {!isPlaying?.p5 && (
                        <>
                          {" "}
                          <div className="mobile-play">
                            <img
                              src={path_image + "wfh-playbutton.png"}
                              className="play-icon"
                              alt="Play"
                              onClick={() => {
                                const isPlay = isPlaying["p5"];
                                setUrl({ videoName: "studyRationale" });

                                setIsPlaying({ ...isPlaying, p5: !isPlay });
                              }}
                            />
                          </div>
                        </>
                      )}
                      <p className="overlay-title">
                        MOTIVATE study rationale <br />
                        <span>by Robert F. Sidonio, Jr.</span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="speaker-quotes-box">
                  {!isMobileSrceen ? (
                    <div className="video-card-desktop">
                      <ReactPlayer
                        key={posterImages.video2}
                        className="react-player"
                        playing={isPlaying?.p6}
                        muted={showPop == 1}
                        // config={{
                        //     attributes: {
                        //         poster: posterImages.video2,
                        //         play: isPlaying?.p6,
                        //     },
                        // }}
                        // poster= {posterImages.video2}
                        src="https://docintel.s3.eu-west-1.amazonaws.com/video/8895_VIDEO_2_MOTIVATE_video_US_07_video.mp4"
                        controls={!isPlaying?.p6 ? false : true}
                        width="100%"
                        height="100%"
                        onTimeUpdate={handleProgressV2}
                        onEnded={() => handleInplaceVideoClose("studyDesign")}
                        onPause={() => {
                          handleInplaceVideoClose("studyDesign");
                          setIsPlaying({ ...isPlaying, p6: false });
                        }}
                        onPlay={() => {
                          setIsFirstTimeVideo((prev) => ({
                            ...prev,
                            video3: false,
                          }));

                          handleInplaceVideoPlay("studyDesign");
                          setIsPlaying({ ...isPlaying, p6: true });
                        }}
                      />
                      {isFirstTimeVideo.video3 && (
                        <img
                          className="thumbnail"
                          src={posterImages.video2}
                          alt="poster"
                        />
                      )}
                      {!isPlaying?.p6 && (
                        <>
                          {" "}
                          <div className="desktop-overlay">
                            <img
                              src={path_image + "wfh-playbutton.png"}
                              className="play-icon"
                              alt="Play"
                              onClick={() => {
                                const isPlay = isPlaying["p6"];
                                setUrl({ videoName: "studyDesign" });
                                setIsPlaying({ ...isPlaying, p6: !isPlay });
                              }}
                            />
                            <p className="overlay-title">
                              MOTIVATE study design
                              <br />
                              <span>by Robert F. Sidonio, Jr.</span>
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="video-card-mobile" ref={mobilePlayer2}>
                      <ReactPlayer
                        className="react-player"
                        playing={isPlaying?.p6}
                        muted={showPop == 1}
                        // config={{
                        //     attributes: {
                        //         poster: path_image + "wfh2026thumbvideo2.png",
                        //         play: isPlaying?.p6,
                        //     },
                        // }}
                        // poster= {path_image + "wfh2026thumbvideo2.png"}
                        src="https://docintel.s3.eu-west-1.amazonaws.com/video/8895_VIDEO_2_MOTIVATE_video_US_07_video.mp4"
                        controls={isPlaying?.p6 ? true : false}
                        width="100%"
                        height="100%"
                        onTimeUpdate={handleProgressV2}
                        onEnded={() => handleInplaceVideoClose("studyDesign")}
                        onPause={() => {
                          handleInplaceVideoClose("studyDesign");
                          setIsPlaying({ ...isPlaying, p6: false });
                        }}
                        onPlay={() => {
                          setIsFirstTimeVideo((prev) => ({
                            ...prev,
                            video4: false,
                          }));

                          handleInplaceVideoPlay("studyDesign");
                          setIsPlaying({ ...isPlaying, p6: true });
                        }}
                      />
                      {isFirstTimeVideo.video4 && (
                        <img
                          className="thumbnail"
                          src={path_image + "wfh2026thumbvideo2.png"}
                          alt="poster"
                        />
                      )}
                      {!isPlaying?.p6 && (
                        <>
                          {" "}
                          <div className="mobile-play">
                            <img
                              src={path_image + "wfh-playbutton.png"}
                              className="play-icon"
                              alt="Play"
                              onClick={() => {
                                const isPlay = isPlaying["p6"];
                                setUrl({ videoName: "studyDesign" });
                                setIsPlaying({ ...isPlaying, p6: !isPlay });
                              }}
                            />
                          </div>
                        </>
                      )}

                      <p className="overlay-title">
                        MOTIVATE study design
                        <br />
                        <span>by Robert F. Sidonio, Jr.</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div ref={agendaSectionRef}>
              <div className="promotion-page-footer">
                <div className="expert-insights">
                  <h3>
                    Do not miss these new insights in haemophilia A and VWD
                    research
                  </h3>
                </div>
                <div className="orcal-comm">
                  <div className="orcal-heading">
                    <h3>Oral communications</h3>
                  </div>
                  <div className="orcal-comm-list">
                    <div className="speaker-img">
                      <img src={path_image + "robert-wfh.png"} alt="speaker" />
                    </div>

                    <div className="speaker-details">
                      <h3>
                        Immune Tolerance Induction in Haemophilia A Patients
                        with Inhibitors: Updated Analysis from MOTIVATE
                      </h3>

                      <p className="speaker-name">
                        Robert F. Sidonio, Jr. et al
                      </p>

                      <div className="speaker-meta">
                        <span className="meta-item">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M34.8233 2.35156H31.2939V5.88097C31.2939 6.58686 30.7057 7.05744 30.1174 7.05744C29.5292 7.05744 28.941 6.58686 28.941 5.88097V2.35156H10.1174V5.88097C10.1174 6.58686 9.52921 7.05744 8.94098 7.05744C8.35274 7.05744 7.7645 6.58686 7.7645 5.88097V2.35156H4.23509C2.47039 2.35156 1.17627 3.88097 1.17627 5.88097V10.1163H38.8233V5.88097C38.8233 3.88097 36.7057 2.35156 34.8233 2.35156ZM1.17627 12.5869V34.1163C1.17627 36.2339 2.47039 37.6457 4.35274 37.6457H34.941C36.8233 37.6457 38.941 36.1163 38.941 34.1163V12.5869H1.17627ZM11.6469 32.3516H8.82333C8.35274 32.3516 7.88215 31.9986 7.88215 31.4104V28.4692C7.88215 27.9986 8.23509 27.528 8.82333 27.528H11.7645C12.2351 27.528 12.7057 27.881 12.7057 28.4692V31.4104C12.588 31.9986 12.2351 32.3516 11.6469 32.3516ZM11.6469 21.7633H8.82333C8.35274 21.7633 7.88215 21.4104 7.88215 20.8222V17.881C7.88215 17.4104 8.23509 16.9398 8.82333 16.9398H11.7645C12.2351 16.9398 12.7057 17.2927 12.7057 17.881V20.8222C12.588 21.4104 12.2351 21.7633 11.6469 21.7633ZM21.0586 32.3516H18.1174C17.6469 32.3516 17.1763 31.9986 17.1763 31.4104V28.4692C17.1763 27.9986 17.5292 27.528 18.1174 27.528H21.0586C21.5292 27.528 21.9998 27.881 21.9998 28.4692V31.4104C21.9998 31.9986 21.6469 32.3516 21.0586 32.3516ZM21.0586 21.7633H18.1174C17.6469 21.7633 17.1763 21.4104 17.1763 20.8222V17.881C17.1763 17.4104 17.5292 16.9398 18.1174 16.9398H21.0586C21.5292 16.9398 21.9998 17.2927 21.9998 17.881V20.8222C21.9998 21.4104 21.6469 21.7633 21.0586 21.7633ZM30.4704 32.3516H27.5292C27.0586 32.3516 26.588 31.9986 26.588 31.4104V28.4692C26.588 27.9986 26.941 27.528 27.5292 27.528H30.4704C30.941 27.528 31.4116 27.881 31.4116 28.4692V31.4104C31.4116 31.9986 31.0586 32.3516 30.4704 32.3516ZM30.4704 21.7633H27.5292C27.0586 21.7633 26.588 21.4104 26.588 20.8222V17.881C26.588 17.4104 26.941 16.9398 27.5292 16.9398H30.4704C30.941 16.9398 31.4116 17.2927 31.4116 17.881V20.8222C31.4116 21.4104 31.0586 21.7633 30.4704 21.7633Z"
                              fill="white"
                            />
                          </svg>
                          Tuesday, 21 April, 2026
                        </span>

                        <span className="meta-item">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.9998 1.66797C16.3739 1.66797 12.8293 2.7432 9.81439 4.75769C6.79949 6.77219 4.44966 9.63546 3.06205 12.9854C1.67445 16.3354 1.31139 20.0216 2.01878 23.578C2.72618 27.1343 4.47226 30.401 7.03622 32.9649C9.60018 35.5289 12.8669 37.275 16.4232 37.9824C19.9795 38.6898 23.6657 38.3267 27.0157 36.9391C30.3657 35.5515 33.229 33.2017 35.2435 30.1868C37.2579 27.1719 38.3332 23.6273 38.3332 20.0013C38.3274 15.1408 36.3941 10.4809 32.9571 7.04401C29.5202 3.60709 24.8604 1.6737 19.9998 1.66797ZM26.1782 26.1796C25.8656 26.4921 25.4418 26.6676 24.9998 26.6676C24.5579 26.6676 24.1341 26.4921 23.8215 26.1796L18.8215 21.1796C18.5089 20.8671 18.3333 20.4433 18.3332 20.0013V10.0013C18.3332 9.55928 18.5088 9.13535 18.8213 8.82279C19.1339 8.51023 19.5578 8.33464 19.9998 8.33464C20.4419 8.33464 20.8658 8.51023 21.1784 8.82279C21.4909 9.13535 21.6665 9.55928 21.6665 10.0013V19.3113L26.1782 23.823C26.4906 24.1355 26.6662 24.5594 26.6662 25.0013C26.6662 25.4432 26.4906 25.8671 26.1782 26.1796Z"
                              fill="white"
                            />
                          </svg>
                          09:15 - 09:30 MYT
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="agenda-divider1" />
                <div className="poster-box">
                  <div className="orcal-heading">
                    <h3>Posters</h3>
                  </div>

                  <div className="poster-list">
                    <div className="poster-item">
                      <div className="poster-icon">
                        <img
                          src={path_image + "wfh-poster-icon1.png"}
                          alt="icon"
                        />
                      </div>

                      <div className="poster-content">
                        <h4>PP-084</h4>
                        <p>
                          Results from the IMPROVE Study: Complex Co-inheritance
                          of VWD Type 2N, VWD Type 1, and Mild Haemophilia A in
                          a Large Multigenerational Family – Diagnostic and
                          Therapeutic Implications
                        </p>
                        <span>Anna Pavlova et al</span>
                      </div>
                    </div>

                    <div className="poster-item">
                      <div className="poster-icon">
                        <img
                          src={path_image + "wfh-poster-icon2.png"}
                          alt="icon"
                        />
                      </div>

                      <div className="poster-content">
                        <h4>PO-386</h4>
                        <p>
                          Global Utilisation and Impact of VWDtest.com: A
                          Multilingual Digital Platform to Improve Awareness and
                          Early Identification of von Willebrand Disease
                        </p>
                        <span>Fernando F. Corrales-Medina et al</span>
                      </div>
                    </div>

                    <div className="poster-item">
                      <div className="poster-icon">
                        <img
                          src={path_image + "wfh-poster-icon3.png"}
                          alt="icon"
                        />
                      </div>

                      <div className="poster-content">
                        <h4>MP-372</h4>
                        <p>
                          Plasma-Derived VWF/FVIII Prophylaxis in Children Under
                          6 With VWD: First Results From WIL-33
                        </p>
                        <span>Akshat Jain et al</span>
                      </div>
                    </div>

                    <div className="poster-item">
                      <div className="poster-icon">
                        <img
                          src={path_image + "wfh-poster-icon4.png"}
                          alt="icon"
                        />
                      </div>

                      <div className="poster-content">
                        <h4>MP-396</h4>
                        <p>
                          Females Affected by Hemophilia A: Data From the U.S.
                          8CHECK Program
                        </p>
                        <span>Barbara Konkle et al</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-des-text">
                <p>
                  This symposium is for healthcare professionals attending the
                  WFH congress only and is organised and sponsored by
                  Octapharma. Prescribing information may vary depending on the
                  local approval in each country. Before prescribing any
                  product, always refer to local materials such as the
                  prescribing information and/or the summary of product
                  characteristics. This is a promotional symposium and products
                  will be discussed.
                </p>
              </div>
              <div className="footer-copy-right">
                <div className="copyright-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="207"
                    height="33"
                    viewBox="0 0 207 33"
                    fill="none"
                  >
                    <path
                      d="M90.2949 5.98828C93.1237 5.98833 95.5385 6.989 97.5049 8.99023C99.4713 10.9916 100.472 13.3727 100.472 16.2021C100.472 19.2387 99.5058 21.7922 97.6084 23.8281C95.6765 25.8295 93.2617 26.831 90.2949 26.8311C88.6735 26.8311 87.1898 26.4511 85.8789 25.7266C84.5679 24.9674 83.4644 23.8972 82.5674 22.4824C82.6364 23.4831 82.6706 24.3808 82.7051 25.209C82.7396 26.0025 82.7734 26.5895 82.7734 26.9346V32.835H80.1865V6.47168H82.6699L82.5674 10.3359C83.4643 8.92137 84.5681 7.85185 85.8789 7.09277C87.1899 6.33362 88.6735 5.98828 90.2949 5.98828ZM10.2803 6.04688C13.2471 6.04688 15.7315 7.04727 17.7324 9.08301C19.7678 11.0844 20.7685 13.5002 20.7686 16.3643C20.7686 19.4009 19.7675 21.9205 17.7666 23.9219C15.7657 25.9575 13.3163 26.958 10.3496 26.958C7.45175 26.958 5.00189 25.9577 3.00098 23.9219C1.00003 21.886 0 19.4009 0 16.4678C2.67708e-05 13.6038 1.00073 11.154 3.03613 9.11816C5.07147 7.08236 7.48604 6.04699 10.2803 6.04688ZM32.2656 5.98828C34.8183 5.98836 36.9913 6.67876 38.7852 8.02441C40.5791 9.37019 41.7524 11.2333 42.3389 13.6143H37.4404V13.6836C36.8539 12.6484 36.1633 11.8542 35.3008 11.3711C34.4385 10.8537 33.4383 10.6124 32.2656 10.6123C30.7132 10.6123 29.4015 11.164 28.332 12.3027C27.2972 13.4414 26.7804 14.8562 26.7803 16.5469C26.7803 18.2032 27.3322 19.6184 28.3672 20.7227C29.4366 21.8268 30.782 22.3789 32.4033 22.3789C33.6452 22.3789 34.7144 22.1025 35.5078 21.585C36.3358 21.0329 36.9571 20.2396 37.3711 19.1699H42.3047C41.7527 21.5508 40.6141 23.4485 38.8203 24.8633C37.061 26.2435 34.9564 26.9335 32.4727 26.9336C29.5402 26.9336 27.056 25.9327 25.0205 23.8623C23.0197 21.8264 21.9844 19.3767 21.9844 16.5127C21.9844 13.6142 22.9851 11.1641 25.0205 9.09375C27.0559 7.02339 29.4712 5.98828 32.2656 5.98828ZM63.1963 6.11719C64.4726 6.11719 65.6458 6.35851 66.6807 6.87598C67.7155 7.39352 68.6815 8.15312 69.5439 9.22266L69.4404 6.60059H73.9258V26.373H69.4766L69.5439 23.6816C69.4621 23.8153 69.3773 23.9453 69.2891 24.0713C68.6713 24.9533 67.9016 25.6438 67.0264 26.0967C66.151 26.5496 65.0902 26.7914 63.8682 26.8447C63.6937 26.8523 63.5159 26.8564 63.335 26.8564C63.1516 26.8564 62.9697 26.8516 62.79 26.8438C60.0976 26.7264 57.8298 25.7298 55.9863 23.8535C54.0199 21.8521 53.0195 19.3676 53.0195 16.4346C53.0196 13.5361 53.9851 11.086 55.917 9.11914C57.8489 7.1178 60.264 6.11724 63.1963 6.11719ZM131.56 5.94141C133.146 5.94141 134.63 6.32066 135.941 7.11426C137.252 7.94243 138.321 9.01295 139.149 10.4277L138.908 6.4248H141.461V26.3008H138.908L139.115 22.4355C138.322 23.8503 137.252 24.955 135.941 25.6797C134.63 26.4388 133.077 26.7842 131.353 26.7842C128.42 26.7841 126.005 25.7826 124.039 23.7812C122.107 21.78 121.142 19.3303 121.142 16.3975C121.142 13.3954 122.142 10.9103 124.108 8.94336C126.109 6.94221 128.593 5.94149 131.56 5.94141ZM197.099 5.94141C198.685 5.94142 200.169 6.32083 201.479 7.11426C202.79 7.94243 203.861 9.01295 204.688 10.4277L204.447 6.4248H207V26.3008H204.447L204.654 22.4355C203.861 23.8503 202.79 24.955 201.479 25.6797C200.169 26.4387 198.616 26.7842 196.892 26.7842C193.994 26.7842 191.545 25.7826 189.578 23.7812C187.646 21.7799 186.68 19.3304 186.68 16.3975C186.68 13.3954 187.68 10.9103 189.646 8.94336C191.647 6.94196 194.132 5.94141 197.099 5.94141ZM48.9512 6.72266H55.1602L52.332 10.8291L48.9512 10.7949V26.4951H44.3281V0.304688H48.9512V6.72266ZM162.925 5.97266C164.443 5.97266 165.823 6.28284 167.065 6.93848C168.411 7.6286 169.376 8.45766 169.997 9.52734C170.825 8.35411 171.826 7.49092 172.999 6.9043C174.206 6.31773 175.518 6.00684 177.001 6.00684C179.485 6.00687 181.382 6.76656 182.728 8.31934C184.073 9.83764 184.729 12.0464 184.729 14.876V26.2969H182.245V15.083C182.245 12.8401 181.796 11.1833 180.864 10.0791C179.967 9.00953 178.553 8.45706 176.69 8.45703C175.587 8.45703 174.586 8.69893 173.724 9.14746C172.861 9.59604 172.17 10.2513 171.688 11.1484C171.377 11.7004 171.17 12.3217 171.032 13.0117C170.894 13.7019 170.825 14.9104 170.825 16.6357V26.2969H168.41V15.1514C168.41 12.874 167.962 11.1833 167.03 10.0791C166.099 8.975 164.685 8.4229 162.753 8.42285C161.58 8.42285 160.579 8.66469 159.717 9.11328C158.854 9.56187 158.164 10.2171 157.646 11.1143C157.336 11.6663 157.095 12.322 156.957 13.0811C156.819 13.8057 156.75 14.9789 156.75 16.6006V26.2627H154.266V6.38672H156.784V8.62988C157.543 7.7327 158.441 7.07652 159.476 6.62793C160.51 6.17952 161.649 5.97269 162.925 5.97266ZM104.997 8.76465C105.722 7.8675 106.619 7.1771 107.619 6.72852C108.654 6.27998 109.827 6.03906 111.104 6.03906C113.691 6.03908 115.692 6.79789 117.037 8.35059C118.417 9.86887 119.107 12.0774 119.107 14.9414V26.2939H116.589V15.1143C116.589 12.8369 116.14 11.1459 115.209 10.0762C114.278 9.00646 112.863 8.4541 110.931 8.4541C109.792 8.45414 108.757 8.69598 107.86 9.14453C106.998 9.59306 106.308 10.2486 105.791 11.1455C105.481 11.6975 105.273 12.3188 105.135 13.0088C104.997 13.6989 104.928 14.9075 104.928 16.6328V26.2939H102.41V0H104.997V8.76465ZM152.159 8.87793C150.572 9.01596 149.399 9.49899 148.709 10.3271C148.019 11.1208 147.674 12.4672 147.674 14.2959V26.2695H145.121V6.39355H147.502V8.70508C148.157 7.80813 148.847 7.15234 149.571 6.73828C150.33 6.3242 151.193 6.11719 152.159 6.11719V8.87793ZM131.491 8.35742C129.352 8.35742 127.523 9.15096 126.04 10.7383C124.557 12.291 123.798 14.2576 123.798 16.5693C123.798 18.7778 124.557 20.676 126.04 22.1943C127.558 23.7126 129.352 24.4717 131.422 24.4717C133.457 24.4717 135.217 23.6783 136.7 22.0566C138.184 20.4348 138.942 18.502 138.942 16.2246C138.942 14.1197 138.184 12.2904 136.666 10.7031C135.183 9.15042 133.458 8.3575 131.491 8.35742ZM197.029 8.35742C194.89 8.35748 193.062 9.15105 191.579 10.7383C190.096 12.291 189.336 14.2575 189.336 16.5693C189.336 18.7778 190.096 20.676 191.579 22.1943C193.097 23.7125 194.891 24.4717 196.961 24.4717C198.996 24.4716 200.756 23.6783 202.239 22.0566C203.723 20.4348 204.481 18.502 204.481 16.2246C204.481 14.1197 203.723 12.2904 202.239 10.7031C200.721 9.15031 198.996 8.35742 197.029 8.35742ZM90.0879 8.33496C88.1214 8.33496 86.3959 9.1285 84.8779 10.7158C83.3946 12.2686 82.6357 14.1325 82.6357 16.2373C82.6358 18.5145 83.3605 20.4812 84.8438 22.0684C86.3271 23.6556 88.0865 24.4491 90.1562 24.4492C92.2261 24.4492 94.0201 23.6901 95.5381 22.1719C97.056 20.6537 97.7812 18.7561 97.7812 16.5479C97.7812 14.2014 97.0215 12.269 95.5381 10.6816C94.0547 9.12891 92.2267 8.33501 90.0879 8.33496ZM10.1768 10.6016C8.59002 10.6017 7.27901 11.1537 6.24414 12.2578C5.20917 13.362 4.72656 14.7773 4.72656 16.5371C4.7266 18.2969 5.24436 19.7116 6.2793 20.7812C7.31422 21.8508 8.69382 22.4033 10.3496 22.4033C12.0746 22.4033 13.4204 21.851 14.4209 20.7812C15.4213 19.6771 15.9384 18.1933 15.9385 16.3301C15.9385 14.6393 15.3867 13.2933 14.3174 12.2236C13.2479 11.1194 11.8672 10.6016 10.1768 10.6016ZM63.1777 10.748C61.7182 10.8126 60.4687 11.3604 59.4014 12.3633C58.2976 13.433 57.7461 14.779 57.7461 16.3662C57.7462 18.0569 58.2981 19.472 59.4365 20.5762C60.5038 21.6112 61.8137 22.161 63.3945 22.2256C63.4998 22.2299 63.6062 22.2324 63.7139 22.2324C63.811 22.2324 63.9074 22.2299 64.0029 22.2256C65.4337 22.1608 66.681 21.6111 67.7158 20.5762C68.8198 19.472 69.3721 18.1257 69.3721 16.6074C69.3721 14.9511 68.8201 13.5359 67.6816 12.4316C66.6144 11.3642 65.3346 10.8129 63.7861 10.748C63.6828 10.7437 63.5784 10.7412 63.4727 10.7412C63.3735 10.7412 63.2751 10.7437 63.1777 10.748Z"
                      fill="white"
                      fillOpacity="0.8"
                    />
                  </svg>
                  <span>949_HAEPAG_WFH 2026</span>
                </div>
                <div className="page-copyright">
                  <p className="copyright-text">
                    We only use essential cookies and no data is shared with 3rd
                    party.{" "}
                    <Button
                      className="click-here"
                      onClick={() => {
                        setCookieShow(true);
                        trackingData(
                          {
                            calendarClicked: 0,
                            downloadClicked: 0,
                            profVogalVideoClicked: 0,
                            clinicalEfficacyVideoClicked: 0,
                            linkClicked: 0,
                            cookiesClicked: 1,
                          },
                          id,
                          1,
                        );
                      }}
                    >
                      Click here
                    </Button>{" "}
                    to see the specifics.
                  </p>

                  <div className="copyright-links">
                    <a
                      href="/octapharma-privacy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Octapharma Privacy Statement
                    </a>
                    <a
                      href="/docintel-privacy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Docintel Privacy Policy
                    </a>
                    <a href="/terms_of_use" target="_blank" rel="noreferrer">
                      Terms of Use
                    </a>
                  </div>
                  <p>Date of preparation: February 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CokkieModal cookieShow={cookieShow} hideCookieModal={hideCookieModal} />
    </>
  );
};

export default WFH2026PromoPage;
