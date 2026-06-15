import ReactPlayer from "react-player";
import { Button, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect, useRef } from "react";
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import { loader } from "./CommonComponent/Loader";
import CokkieModal from "./CokkieModal";
import { useLocation, useSearchParams } from "react-router";
const EAHAD2025 = () => {
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const [isVisible, setIsVisible] = useState({
    p1: true,
    p2: true,
    p3: true,
    p4: true,
    p5: true,
  });
  const [isPlaying, setIsPlaying] = useState({
    p1: false,
    p2: false,
    p3: false,
    p4: false,
    p5: false,
  });
  const [isFirstTimeVideo, setIsFirstTimeVideo] = useState({
    video1: true,
    video2: true,
    video3: true,
  });

  const [isScrollDownShown, setIsScrollDownShown] = useState(false);
  const agendaSectionRef = useRef(null);
  const [id, setId] = useState(-1);
  const isFirstTime = useRef(1);
  const [url, setUrl] = useState(
    "https://docintel.app/one_source/videos/MAIC.mp4",
  );
  const [popupVideoCurrentTime, setPopUpVideoCurrentTime] = useState(0);
  const [modalVideoShow, setModalVideoShow] = useState(false);

  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const userId = searchParams.get("user-id");
  const showPop = searchParams.get("video");

  const storeTimelineTracking = async (payload) => {
    try {
      payload.userId = userId;
      payload.action = "EAHAD2025";
      const response = await postData(
        `${ENDPOINT.STORE_TIMELINE_TRACKING}`,
        payload,
      );
    } catch (err) {
      console.error("Error hitting store-timeline-tracking API:", err);
    }
  };

  useEffect(() => {
    loader("hide");
    const payload = {};
    if (showPop == 1) {
      openModelVideo();
      setIsVisible({ ...isVisible, p2: false });
      setIsPlaying({ ...isPlaying, p2: true });
    }
    if (userId) {
      searchParams.delete("user-id");
      const newUrl = `${window.location.pathname}${searchParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
      storeTimelineTracking(payload);
    }

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

  const trackingData = async (payload, id) => {
    try {
      if (id != -1) {
        payload.id = id;
      }
      payload.userId = userId ? userId : 0;
      payload.type = "EAHAD2025";
      const response = await postData(`${ENDPOINT.WFH_TRACKING}`, payload);
      setId(response.data.id);

      // loader("hide");
    } catch (err) {
      // loader("hide");
      console.error("Error fetching event ID:", err);
    }
  };

  const handlePlayPause = (type, whichVideoClicked = "") => {
    const trackingParams = {
      calendarClicked: 0,
      downloadClicked: 0,
      profVogalVideoClicked: type === "p3" ? 1 : 0,
      clinicalEfficacyVideoClicked: type === "p2" ? 1 : 0,
      videoClicked: type === "p1" ? 1 : 0,
      linkClicked: 0,
      cookiesClicked: 0,
    };

    if (whichVideoClicked !== "") {
      trackingParams[whichVideoClicked] = 1;
    } else if (url?.videoName) {
      trackingParams[url?.videoName] = 1;
    }

    trackingData(trackingParams, id);

    setIsVisible((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));

    setIsPlaying((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };
  const [showImage, setShowImage] = useState(false);
  const [cookieShow, setCookieShow] = useState(false);

  const [show, setShow] = useState(false);
  const [showAgenda, setShowAgenda] = useState(false);
  const handleShow = () => setShowAgenda(true);
  const handleImageShow = () => {
    setShowImage(true);
  };

  const handleShow4 = () => setShow(true);
  const download = () => {
    trackingData(
      {
        calendarClicked: 0,
        downloadClicked: 1,
        profVogalVideoClicked: 0,
        clinicalEfficacyVideoClicked: 0,
        videoClicked: 0,
        linkClicked: 0,
        cookiesClicked: 0,
      },
      id,
    );
  };
  const [modalShow, setModalShow] = useState(false);
  // const handleProgress = (progress) => {
  //   let currentTime = formatTime(progress.playedSeconds);
  //   console.log("currentTime",currentTime)
  //   setPopUpVideoCurrentTime(currentTime);
  // };
  const handleProgress = (e) => {
  const currentTime = formatTime(e?.target?.currentTime || 0);
  setPopUpVideoCurrentTime(currentTime);
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
  const handleClose = (type) => {
    setIsVisible({ ...isVisible, [type]: true });
    setIsPlaying({ ...isPlaying, [type]: false });
    setShow(false);
    setShowAgenda(false);
    setShowImage(false);
  };
  const handleVideoClose = (defaultKey = null) => {
    trackingData(
      {
        calendarClicked: 0,
        downloadClicked: 0,
        profVogalVideoClicked: 0,
        clinicalEfficacyVideoClicked: 0,
        videoClicked: 0,
        linkClicked: 0,
        cookiesClicked: 0,
        userChecked: "",
        [(defaultKey || url?.videoName) + "PopUpVideoEndTime"]:
          popupVideoCurrentTime,
      },
      id,
      1,
    );
    //setModalVideoShow(false)
    setModalVideoShow(false);
    setModalShow(true);
  };

  const handleVideoPlay = (defaultKey = null) => {
    trackingData(
      {
        calendarClicked: 0,
        downloadClicked: 0,
        profVogalVideoClicked: 0,
        clinicalEfficacyVideoClicked: 0,
        videoClicked: 0,
        linkClicked: 0,
        cookiesClicked: 0,
        userChecked: "",
        [(defaultKey || url?.videoName) + "PopUpVideoStartTime"]: "00:00:00",
      },
      id,
      1,
    );
  };
  const link = () => {
    trackingData(
      {
        calendarClicked: 0,
        downloadClicked: 0,
        profVogalVideoClicked: 0,
        clinicalEfficacyVideoClicked: 0,
        videoClicked: 0,
        linkClicked: 1,
        cookiesClicked: 0,
      },
      id,
    );
  };
  const hideCookieModal = () => setCookieShow(false);
  const showCookieModal = () => {
    trackingData(
      {
        calendarClicked: 0,
        downloadClicked: 0,
        profVogalVideoClicked: 0,
        clinicalEfficacyVideoClicked: 0,
        videoClicked: 0,
        linkClicked: 0,
        cookiesClicked: 1,
      },
      id,
    );
    setCookieShow(true);
  };

  const downloadIcs = (url, trackingName) => {
    trackingData(
      {
        [trackingName]: 1,
        downloadClicked: 0,
        profVogalVideoClicked: 0,
        clinicalEfficacyVideoClicked: 0,
        videoClicked: 0,
        linkClicked: 0,
        cookiesClicked: 0,
      },
      id,
    );

    // Create a dynamic link element
    const link = document.createElement("a");
    link.href = url;
    link.download = "Calendar.ics"; // Add the download attribute

    // Append the link to the document body and trigger the click event
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link
    document.body.removeChild(link);
  };

  const smoothScroll = () => {
    if (agendaSectionRef.current) {
      agendaSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const openModelVideo = () => {
    handleShow();
    const trackingParams = {
      calendarClicked: 0,
      downloadClicked: 0,
      linkClicked: 0,
      cookiesClicked: 0,
      symposiumAgendaVideoClicked: 1,
    };

    trackingData(trackingParams, id);
    setUrl({
      videoName: "symposiumAgendaVideoClicked",
      // iconImage: path_image + "play-button-org.png",
      // iconClass: "wilate-model",
      // posterUrl: path_image + "eahad25-wilprophy.jpg",
      videoUrl:
        // "https://docintel.s3.eu-west-1.amazonaws.com/video/EAHAD-2025-Agenda-Video_0.mp4",
        "https://onesourcedoc.s3.eu-west-1.amazonaws.com/videos/EAHAD_2025_Agenda_Video.mp4",
    });
  };
  return (
    <>
      <div className="promotion-page wilate24 eahad25">
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
          <div className="disclaimer-text" id="wilate-sec">
            <p>
              This symposium is for healthcare professionals only and is
              organised and sponsored by Octapharma. Prescribing information may
              vary depending on local approval in each country. Before
              prescribing any product, always refer to local materials such as
              the prescribing information and/or the summary of product
              characteristics. Product information is available online at{" "}
              <a href="https://www.octapharma.com/products/product-overview/wilate/">
                https://www.octapharma.com/products/product-overview/wilate/
              </a>
              . Products will be discussed. wilate® is indicated for the
              prevention and treatment of haemorrhage or surgical bleeding in
              von Willebrand disease (VWD), when desmopressin (DDAVP) treatment
              alone is ineffective or contra-indicated. This is a promotional
              symposium and products will be discussed.
            </p>
          </div>
          <div className="promotion-page-header">
            <div className="header-video">
              <img src={path_image + "eahad25-header-img.jpg"} alt="" />
              <img
                className="eahad-mobile-img"
                src={path_image + "eahad25-header-img-mobile.png"}
                alt=""
                style={{ display: "none" }}
              />
              <div className="underspotlight">
                <h2>Join us at EAHAD 2025, Milan, Italy</h2>
                <div className="eahad-header-title">
                  <h1>
                    Is it time for equity in the treatment of severe VWD and
                    severe haemophilia A?
                  </h1>
                </div>

                <h6>This symposium is for HCPs only</h6>
              </div>
            </div>
          </div>
          <div className="header-event">
            <Col>
              <img src={path_image + "calendar-icon.svg"} alt="" />
              <h3>
                Wednesday,
                <br /> February 5. 2025
              </h3>
            </Col>
            <Col>
              <img src={path_image + "clock-icon.svg"} alt="" />
              <h3>17:15 - 18:30 CET</h3>
            </Col>
            <Col>
              <img src={path_image + "maps-and-flags-icon.svg"} alt="" />
              <h3>Room Ocean 1&2</h3>
            </Col>
            <Col>
              <div className="calender-btn">
                <Button
                  variant="primary"
                  className="btn-filled"
                  onClick={() =>
                    downloadIcs(
                      path_image + "EAHAD-2025.ics",
                      "calenderClicked",
                    )
                  }
                >
                  Add To Your Calendar
                </Button>
              </div>
            </Col>
          </div>

          {/*-- Video will show here--*/}
          <div className="agenda-video-section" id="agenda-video-play">
            <div className="agenda-video">
              <div className="wilprophy-box-inset-view">
                <img src={path_image + "symposium-video-agenda.jpg"} alt="" />
                <img
                  src={path_image + "symposium-video-agenda-mobile.jpg"}
                  alt=""
                  className="video-mobile-img"
                  style={{ display: "none" }}
                />
                <div className="video-agenda-over-text d-flex justify-content-between align-items-center">
                  <div className="video-agenda-heading col">
                    <h2>
                      Symposium Video <span>Agenda</span>
                    </h2>
                  </div>
                  <div className="video-agenda-play col">
                    CLICK
                    <div
                      className="video-btn-play"
                      // onClick={handleShow}
                      onClick={openModelVideo}
                    >
                      <img
                        className="video_btn"
                        src={path_image + "play-button-org.png"}
                        alt="Play Icon"
                      />
                    </div>
                    HERE
                  </div>

                  <div className="col">&nbsp;</div>
                </div>
              </div>
            </div>
          </div>
          {/*-- Video show here close--*/}
          <div className="agenda-wrap" ref={agendaSectionRef}>
            <div className="agenda-section" id="agenda-section">
              <div className="speaker-quotes">
                <div className="wilprophy-box speaker-quotes-box">
                  <div
                    className="wilprophy-box-inset"
                    onClick={handleImageShow}
                  >
                    {/* <img src={path_image + "eahad25-wilprophy.jpg"} alt="" /> */}
                    <div
                      className="wilprophy-box-inset-view"
                      //   onClick={() => {
                      //     const trackingParams = {
                      //       calendarClicked: 0,
                      //       downloadClicked: 0,
                      //       linkClicked: 0,
                      //       cookiesClicked: 0,
                      //       wilProphyVideoClicked: 1,
                      //     };

                      //     trackingData(trackingParams, id);
                      //     handleShow4();
                      //     setUrl({
                      //       videoName: "wilProphyVideoClicked",
                      //       iconImage: path_image + "play-button-org.png",
                      //       iconClass: "wilate-model",
                      //       posterUrl: path_image + "eahad25-wilprophy.jpg",
                      //       videoUrl:
                      //         "https://docintel.app/one_source/videos/2024_WIL-31.mp4",
                      //     });
                      //   }
                      // }
                    >
                      <img src={path_image + "eahad25-wilprophy.jpg"} alt="" />
                      <div
                        className="video-btn-play"
                        onClick={() => {
                          const trackingParams = {
                            calendarClicked: 0,
                            downloadClicked: 0,
                            linkClicked: 0,
                            cookiesClicked: 0,
                            wilProphyVideoClicked: 1,
                          };

                          trackingData(trackingParams, id);
                          handleShow4();
                          setUrl({
                            videoName: "wilProphyVideoClicked",
                            iconImage: path_image + "play-button-org.png",
                            iconClass: "wilate-model",
                            posterUrl: path_image + "eahad25-wilprophy.jpg",
                            videoUrl:
                              "https://docintel.app/one_source/videos/2024_WIL-31.mp4",
                          });
                        }}
                      >
                        <img
                          className="video_btn"
                          src={path_image + "play-button-org.png"}
                          alt="Play Icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="speaker-quotes-box d-flex align-items-center flex-row-reverse">
                  <div className="speaker-quotes-left">
                    <div
                      className="wilprophy-box-inset"
                      //   onClick={() => {
                      //     const trackingParams = {
                      //       calendarClicked: 0,
                      //       downloadClicked: 0,
                      //       linkClicked: 0,
                      //       cookiesClicked: 0,
                      //       KerriVideoClicked: 1,
                      //     };

                      //     trackingData(trackingParams, id);
                      //     handleShow4();
                      //     setUrl({
                      //       videoName: "KerriVideoClicked",
                      //       iconImage: path_image + "play-button-org.png",
                      //       iconClass: "wilate-model",
                      //       posterUrl:
                      //         path_image + "eahad25-patient-testimonial.jpg",
                      //       videoUrl:
                      //         "https://docintel.app/one_source/videos/EAHAD2024_Kerri_short_16_9_720_proof.mp4",
                      //     });
                      //   }}
                    >
                      <img
                        src={path_image + "eahad25-patient-testimonial.jpg"}
                        alt=""
                      />
                      <div
                        className="video-btn-play"
                        onClick={() => {
                          // handlePlayPause("p4")}
                          // handlePlayPause("p4")}
                          const trackingParams = {
                            calendarClicked: 0,
                            downloadClicked: 0,
                            linkClicked: 0,
                            cookiesClicked: 0,
                            KerriVideoClicked: 1,
                          };

                          trackingData(trackingParams, id);
                          handleShow4();
                          setUrl({
                            videoName: "KerriVideoClicked",
                            iconImage: path_image + "play-button-org.png",
                            iconClass: "wilate-model",
                            posterUrl:
                              path_image + "eahad25-patient-testimonial.jpg",
                            videoUrl:
                              "https://docintel.app/one_source/videos/EAHAD2024_Kerri_short_16_9_720_proof.mp4",
                          });
                        }}
                      >
                        <img
                          className="video_btn"
                          src={path_image + "play-button-org.png"}
                          alt="Play Icon"
                        />
                      </div>
                      <div className="patient-testimonail-title">
                        <h6>
                          Patient testimonial:{" "}
                          <span>Living With Type 3 VWD</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="agenda-speakers">
                <img src={path_image + "eahad25-agenda.png"} alt="" />
                <div className="download-agenda-file">
                  <h5>Wilate EAHAD 2025 agenda</h5>
                  <div className="download-btn">
                    <a
                      download
                      href={
                        path_image + "Octapharma-EAHAD-symposium-agenda.pdf"
                      }
                      onClick={download}
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="promotion-page-footer flex-row-reverse">
              <div className="promotion-footer-left">
                <div className="d-flex align-items-center footer-box">
                  <div className="footer-logo">
                    <img
                      src="https://docintel.app/img/octa/e-templates/one-source/onesource-logo-org.gif"
                      alt=""
                    />
                  </div>
                  <div className="footer-content">
                    <p>
                      <strong>Visit One Source</strong>, Octapharma’s online
                      heamatology platform for healthcare professionals, to keep
                      up to date with the latest news and events, and to hear
                      leading experts share their opinions about treating
                      patients with bleeding disorders.
                    </p>
                  </div>
                </div>
                <div className="footer-qr">
                  <div className="footer-qr-text">
                    <p>
                      To visit One source scan the QR code or click the
                      link:{" "}
                    </p>
                    <p>
                      <span>
                        <a
                          target="_blank"
                          href="https://onesource.octapharma.com"
                          onClick={link}
                        >
                          https://onesource.octapharma.com
                        </a>
                      </span>
                    </p>
                    <p className="small">
                      One Source platform is for healthcare professionals only.
                    </p>
                  </div>
                  <div className="footer-qr-img">
                    <img src={path_image + "qr-code-img.png"} alt="" />
                  </div>
                </div>
              </div>
              <div className="promotion-footer-right">
                <div className="footer-video">
                  <div className="one_source_video">
                    <ReactPlayer
                      className="one_source_video1"
                      playing={isPlaying?.p5} //playIcon={<button>Play</button>}
                      //light={path_image + "play-button.png"}
                      // poster={path_image + "video_md_logo.png"}
                      src="https://docintel.s3.eu-west-1.amazonaws.com/onesource_videos/img_1685517635.mp4"
                      controls={true}
                      width="640"
                      height="360"
                      onTimeUpdate={handleProgress}
                      onPause={() => {
                        setIsVisible({ ...isVisible, p5: true });
                        setIsPlaying({ ...isPlaying, p5: false });
                        handleVideoClose("footerVideoClicked");
                      }}
                      onPlay={() => {
                        setIsFirstTimeVideo({
                          ...isFirstTimeVideo,
                          video1: false,
                        });
                        setIsVisible({ ...isVisible, p5: false });
                        setIsPlaying({ ...isPlaying, p5: true });
                        handleVideoPlay("footerVideoClicked");
                      }}
                    />
                    {isFirstTimeVideo.video1 && (
                      <img
                        className="thumbnail"
                        src={path_image + "video_md_logo.png"}
                        alt="poster"
                      />
                    )}
                    {isVisible?.p5 ? (
                      <div
                        className="video-btn-play"
                        onClick={() =>
                          handlePlayPause("p5", "footerVideoClicked")
                        }
                      >
                        <img
                          className="video_btn"
                          src={path_image + "play-button-org.png"}
                          alt="Play Icon"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-copy-right flex-row-reverse">
              <div className="page-copyright">
                <p>
                  We only use essential cookies and no data is shared with 3rd
                  party.{" "}
                  <a href="javascript:void(0)" onClick={showCookieModal}>
                    Click here
                  </a>{" "}
                  to see the specifics.
                </p>
                <div className="copyright-links">
                  <a href="/octapharma-privacy" target="_blank">
                    Octapharma Privacy Statement
                  </a>
                  <a href="/docintel-privacy" target="_blank">
                    Docintel Privacy Policy
                  </a>
                  <a href="/terms_of_use" target="_blank">
                    Terms of Use
                  </a>
                </div>
              </div>
              <div className="copyright-right">
                <img src={path_image + "octapharma-grey.svg"} alt="" />
                <span>768_HAEVID_EAHAD 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        backdrop="static"
        onHide={() => handleClose("p1")}
        centered
        className={`wilphopy-modal ${url?.iconClass}`}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="one_source_video">
            <ReactPlayer
              className="one_source_video1"
              playing={isPlaying?.p1}
              //playIcon={<button>Play</button>}
              //light={path_image + "play-button.png"}
              //  poster={
              //   url?.posterUrl
              //     ? url?.posterUrl
              //     : path_image + "eahad25-wilprophy.jpg"
              // }
              src={url?.videoUrl}
              controls={true}
              width="640"
              height="360"
              onTimeUpdate={handleProgress}
              onEnded={handleVideoClose}
              onPause={() => {
                handleVideoClose();
                setIsVisible({ ...isVisible, p1: true });
                setIsPlaying({ ...isPlaying, p1: false });
              }}
              onPlay={() => {
                setIsFirstTimeVideo({ ...isFirstTimeVideo, video2: false });
                handleVideoPlay();
                setIsVisible({ ...isVisible, p1: false });
                setIsPlaying({ ...isPlaying, p1: true });
              }}
            />
            {isFirstTimeVideo.video2 && (
              <img
                className="thumbnail"
                src={
                  url?.posterUrl
                    ? url?.posterUrl
                    : path_image + "eahad25-wilprophy.jpg"
                }
                alt="poster"
              />
            )}
            {isVisible?.p1 ? (
              <div
                className="video-btn-play"
                onClick={() => {
                  setIsVisible({ ...isVisible, p1: false });
                  setIsPlaying({ ...isPlaying, p1: true });
                }}
              >
                <img
                  className="video_btn"
                  src={url?.iconImage}
                  alt="Play Icon"
                />
              </div>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showAgenda}
        backdrop="static"
        onHide={() => handleClose("p2")}
        centered
        className={`wilphopy-modal video-agenda-modal ${url?.iconClass}`}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="one_source_video">
            <ReactPlayer
              className="one_source_video1"
              playing={isPlaying?.p2}
              muted={showPop == 1 && true}
              //playIcon={<button>Play</button>}
              //light={path_image + "play-button.png"}
              // poster={
              //   url?.posterUrl
              //     ? url?.posterUrl
              //     : path_image + "video-agenda-poster.png"
              // }
              src={url?.videoUrl}
              // url="https://docintel.s3.eu-west-1.amazonaws.com/video/EAHAD_2025_Agenda_Video_05.mp4"
              controls={true}
              width="640"
              height="360"
              onTimeUpdate={handleProgress}
              onEnded={handleVideoClose}
              onPause={() => {
                handleVideoClose();
                setIsVisible({ ...isVisible, p2: true });
                setIsPlaying({ ...isPlaying, p2: false });
              }}
              onPlay={() => {
                setIsFirstTimeVideo({ ...isFirstTimeVideo, video3: false });
                handleVideoPlay();
                setIsVisible({ ...isVisible, p2: false });
                setIsPlaying({ ...isPlaying, p2: true });
              }}
            />
            {isFirstTimeVideo.video3 && (
              <img
                className="thumbnail"
                src={
                  url?.posterUrl
                    ? url?.posterUrl
                    : path_image + "video-agenda-poster.png"
                }
                alt="poster"
              />
            )}
            {isVisible?.p2 ? (
              <div
                className="video-btn-play"
                onClick={() => {
                  setIsVisible({ ...isVisible, p2: false });
                  setIsPlaying({ ...isPlaying, p2: true });
                }}
              >
                <img
                  className="video_btn"
                  src={path_image + "play-button-org.png"}
                  alt="Play Icon"
                />
              </div>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
      <CokkieModal cookieShow={cookieShow} hideCookieModal={hideCookieModal} />
    </>
  );
};

export default EAHAD2025;
