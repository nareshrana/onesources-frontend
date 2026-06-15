import ReactPlayer from "react-player";
import { Button, Col, Form, FormGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect, useRef } from "react";
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import { loader } from "./CommonComponent/Loader";

const ISTH2 = () => {
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
    video4: true,
    video5: true,
    video6: true,
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
  useEffect(() => {
    loader("hide");
    // trackingData({
    //     calendarClicked :0,
    //     downloadClicked:0,
    //     profVogalVideoClicked:0,
    //     clinicalEfficacyVideoClicked:0,
    //     videoClicked:0,
    //     linkClicked:0},
    //     id);

    // let body = document.getElementsByTagName("body");
    // body[0].classList.add("wfh-promo");

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
    // setModalShow(true);
    if (!urlContains) {
      setModalShow(true);
    }
    if (isFirstTime.current == 1) {
      isFirstTime.current = 0;
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
        },
        id,
      );
    }
  }, []);
  useEffect(() => {
    setModalVideoShow(true);
  }, []);
  const trackingData = async (payload, id, defaultFlag = 0) => {
    try {
      // loader("show");
      //   let payload = { id:'65bb8cb35e1d3e5c48033685',
      //    calendarClicked :0,
      //    downloadClicked:0,
      //    videoClicked:0,
      //    linkClicked:0
      //   }

      if (id != -1) {
        payload.id = id;
      }
      payload.type = "ISTH2024_2";
      // if (selectedOption === "Yes" || defaultFlag == 1) {
      if (
        selectedOption === "Yes" ||
        selectedOption === "No" ||
        defaultFlag == 1
      ) {
        const response = await postData(`${ENDPOINT.WFH_TRACKING}`, payload);
        setId(response.data.id);
      }

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
      // clinicalEfficacyVideoClicked: type === "p2" ? 1 : 0,
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

  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  //const [modalVideoShow, setModalVideoShow] = useState(false);
  const [hcp, setHcp] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const [cookieShow, setCookieShow] = useState(false);
  const handleClose = (type) => {
    setIsVisible({ ...isVisible, [type]: true });
    setIsPlaying({ ...isPlaying, [type]: false });
    setShow(false);
    setShowImage(false);
  };
  const handleVideoClose = () => {
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
        [url?.videoName + "PopUpVideoEndTime"]: popupVideoCurrentTime,
      },
      id,
      1,
    );
    //setModalVideoShow(false)
    setModalVideoShow(false);
    setModalShow(true);
  };

  const handleVideoPlay = () => {
    setIsFirstTimeVideo((prev) => ({ ...prev, video6: false }));

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
        [url?.videoName + "PopUpVideoStartTime"]: "00:00:00",
      },
      id,
      1,
    );
  };
  const handleShow = () => setShow(true);
  const handleImageShow = () => {
    setShowImage(true);
  };

  const handleShow1 = () => setShow(true);
  const handleShow2 = () => setShow(true);
  const handleShow3 = () => setShow(true);
  const handleShow4 = () => setShow(true);
  const handleShow5 = () => setShow(true);

  const handleModalClose = () => setModalShow(false);
  const handleNoHcp = () => {
    setHcp(true);
  };
  const [selectedOption, setSelectedOption] = useState(null);

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

  const smoothScroll = () => {
    if (agendaSectionRef.current) {
      agendaSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption) {
      trackingData(
        {
          calendarClicked: 0,
          downloadClicked: 0,
          profVogalVideoClicked: 0,
          clinicalEfficacyVideoClicked: 0,
          videoClicked: 0,
          linkClicked: 0,
          cookiesClicked: 0,
          userChecked: selectedOption,
        },
        id,
      );
      handleModalClose();
      if (selectedOption === "No") {
        handleNoHcp();
      } else {
        const targetDiv = document.getElementById("wilate-sec");
        if (targetDiv) {
          targetDiv.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleProgress = (e) => {
  const currentTime = formatTime(e?.target?.currentTime || 0);
  setPopUpVideoCurrentTime(currentTime);
};

  const handlePlayerPause = async () => {
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
        popUpVideoEndTime: popupVideoCurrentTime,
      },
      id,
      1,
    );
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

  const registerLink = (type) => {
    if (type == "nuwiq") {
      trackingData(
        {
          calendarClicked: 0,
          downloadClicked: 0,
          profVogalVideoClicked: 0,
          clinicalEfficacyVideoClicked: 0,
          videoClicked: 0,
          linkClicked: 0,
          cookiesClicked: 0,
          nuwiqRegistration: 1,
        },
        id,
      );
    } else if (type == "wilate") {
      trackingData(
        {
          calendarClicked: 0,
          downloadClicked: 0,
          profVogalVideoClicked: 0,
          clinicalEfficacyVideoClicked: 0,
          videoClicked: 0,
          linkClicked: 0,
          cookiesClicked: 0,
          wilateRegistration: 1,
        },
        id,
      );
    }
  };

  const urlContains = window.location.href.includes("mailAgenda");

  return (
    <>
      <div className="promotion-page isth24">
        {/* <Container>
                <Row>
                    <div className="promotion-section">
                        <h1>UNDER CONSTRUCTION</h1>
                        <h3>We're building a Octapharma EAHAD 2024 page here - can't wait to show it to you.</h3>
                        <img src="https://docintel.app/img/octa/e-templates/one-source/onesource-logo.gif" alt="One Source"/>
                    </div>
                </Row>
            </Container> */}
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
          <div className="disclaimer-text">
            <p>
              Nuwiq is licensed in the European Union for treatment and
              prophylaxis of bleeding in patients with haemophilia A (congenital
              factor VIII deficiency). Nuwiq can be used for all age groups.
              This information is intended for health care professionals only.
              Octapharma medicines are approved in individual countries and
              regions for specific uses. The licensed indications and other
              information presented here may vary from the approved use of
              Nuwiq® in other countries. Please refer to the approved Product
              Information relevant to your country.
              <br />
              Nuwiq is not registered in Thailand.{" "}
              <a
                target="_blank"
                href="https://docintel.app/Haematology_Octapharma/rkzhQyMx"
              >
                product information (PI): Nuwiq®
              </a>{" "}
            </p>
          </div>
          <div className="promotion-page-header">
            <div className="header-video">
              <div className="underspotlight">
                <img src={path_image + "under-spotlight-wfh.svg"} alt="" />
                <h5>Join us at ISTH 2024, Bangkok, TH</h5>
                <h1>Learn About Tomorrow's Advances Today</h1>
                <h2>Breakthroughs in All-Round Bleed Protection</h2>
                <h6>This symposium is for HCPs only</h6>
              </div>
              <div className="agenda-video">
                <div className="one_source_video">
                  <ReactPlayer
                    className="one_source_video1"
                    playing={isPlaying?.p2}
                    // poster={path_image + "isth-nuwiq-video-poster.jpg"}
                    // url={path_image + "EAHAD-2024-agenda-video_07.mp4"}
                    src={
                      "https://docintel.s3-eu-west-1.amazonaws.com/video/Haematology_Octapharma/161717581139705.mp4"
                    }
                    controls={true}
                    width="100%"
                    height="auto"
                    onPlay={() =>
                      setIsFirstTimeVideo((prev) => ({
                        ...prev,
                        video1: false,
                      }))
                    }
                    // autoplay={true}
                    // muted={true}
                    // loop={true}
                    playsInline
                  />

                  {isVisible?.p2 ? (
                    <>
                      {isFirstTimeVideo.video1 && (
                        <img
                          className="thumbnail"
                          src={path_image + "isth-nuwiq-video-poster.jpg"}
                          alt="poster"
                        />
                      )}
                      <div
                        className="video-btn-play"
                        onClick={() => handlePlayPause("p2")}
                      >
                        <img
                          className="video_btn"
                          src={path_image + "play-button-wfh.png"}
                          alt="Play Icon"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="header-event">
            <Col>
              <img src={path_image + "calendar-icon.svg"} alt="" />
              <h3>
                Sunday,
                <br /> June 23. 2024
              </h3>
            </Col>
            <Col>
              <img src={path_image + "clock-icon.svg"} alt="" />
              <h3>12:15-13:30 ICT</h3>
            </Col>
            <Col>
              <img src={path_image + "maps-and-flags-icon.svg"} alt="" />
              <h3>Room 208</h3>
            </Col>
            <Col>
              <div className="calender-btn">
                <Button
                  variant="primary"
                  className="btn-filled"
                  onClick={() =>
                    downloadIcs(
                      path_image + "ISTH-2024-nuwiq.ics",
                      "nuwiqCalenderClicked",
                    )
                  }
                >
                  Add To Your Calendar
                </Button>
              </div>
            </Col>
          </div>
          <div className="agenda-wrap" ref={agendaSectionRef}>
            <div className="agenda-section" id="agenda-section">
              <div className="agenda-speakers">
                <img src={path_image + "eahad-agenda1.jpg"} alt="" />
                <div className="download-agenda-file">
                  <h5>
                    Symposium Agenda: Learn About Tomorrow's Advances Today
                  </h5>
                  <div className="download-btn">
                    <a
                      download
                      href={
                        path_image + "spotlight-ISTH-2024-Agenda(nuwiq).pdf"
                      }
                      onClick={download}
                    >
                      Download
                    </a>
                    {/* <Button variant="primary" className="btn-filled">
                                        <a download href={path_image + "SPOTLIGHT_EAHAD.pdf"} 
                                        Download
                                        />
                                    </Button> */}
                  </div>
                </div>
              </div>
              <div className="speaker-quotes">
                <div className="speaker-quotes-box d-flex align-items-center">
                  <div className="speaker-quotes-left">
                    <div
                      className="wilprophy-box-inset"
                      onClick={() => {
                        const trackingParams = {
                          calendarClicked: 0,
                          downloadClicked: 0,
                          linkClicked: 0,
                          cookiesClicked: 0,
                          profVogalVideoClicked: 1,
                        };

                        trackingData(trackingParams, id);
                        handleShow2();
                        setUrl({
                          videoName: "profVogalVideoClicked",
                          iconImage: path_image + "play-button-wfh.png",
                          iconClass: "nuwiq-modal",
                          posterUrl: path_image + "isth-video-placeholder1.jpg",
                          videoUrl:
                            "https://docintel.app/one_source/videos/Viola_Vogel.mp4",
                        });
                      }}
                    >
                      <img
                        src={path_image + "isth-video-placeholder1.jpg"}
                        alt=""
                      />
                      <div
                        className="video-btn-play"
                        // onClick={() => handlePlayPause("p2")
                        onClick={() => {
                          const trackingParams = {
                            calendarClicked: 0,
                            downloadClicked: 0,
                            linkClicked: 0,
                            cookiesClicked: 0,
                            profVogalVideoClicked: 1,
                          };

                          trackingData(trackingParams, id);
                          handleShow2();
                          setUrl({
                            videoName: "profVogalVideoClicked",
                            iconImage: path_image + "play-button-wfh.png",
                            iconClass: "nuwiq-modal",
                            posterUrl:
                              path_image + "isth-video-placeholder1.jpg",
                            videoUrl:
                              "https://docintel.app/one_source/videos/Viola_Vogel.mp4",
                          });
                        }}
                      >
                        <img
                          className="video_btn"
                          src={path_image + "play-button-wfh.png"}
                          alt="Play Icon"
                        />
                      </div>
                    </div>
                    {/* <ReactPlayer
                                            className="one_source_video"
                                            playing={isPlaying?.p1}
                                            //playIcon={<button>Play</button>}
                                            //light={path_image + "play-button.png"}
                                            config={{
                                                attributes: {
                                                    poster: path_image + "isth-video-placeholder1.jpg",
                                                    play: isPlaying?.p1
                                                }
                                            }}
                                            url="https://docintel.app/one_source/videos/Viola_Vogel.mp4"
                                            controls={true}
                                            width="640"
                                            height="360"
                                            onPause={() => {
                                                                }}
                                            onPlay={() => {
                                                                }}
                                        />
                                        {isVisible?.p1 ? (
                                            <div className="video-btn-play" onClick={() => handlePlayPause("p1")}>
                                                <img
                                                    className="video_btn"
                                                    src={path_image + "play-button-wfh.png"}
                                                    alt="Play Icon"
                                                />
                                            </div>
                                        ) : null} */}
                  </div>
                  <div className="speaker-quotes-right">
                    <h6>
                      Meet Prof.{" "}
                      <span>Viola Vogel ETH, Zurich Switzerland</span>
                    </h6>
                  </div>
                </div>
                <div className="speaker-quotes-box d-flex align-items-center">
                  <div className="speaker-quotes-left">
                    <div
                      className="wilprophy-box-inset"
                      onClick={() => {
                        const trackingParams = {
                          calendarClicked: 0,
                          downloadClicked: 0,
                          linkClicked: 0,
                          cookiesClicked: 0,
                          propAntoniaFollenziVideoClicked: 1,
                        };

                        trackingData(trackingParams, id);
                        handleShow3();
                        setUrl({
                          videoName: "propAntoniaFollenziVideoClicked",
                          iconImage: path_image + "play-button-wfh.png",
                          iconClass: "nuwiq-modal",
                          posterUrl: path_image + "isth-video-placeholder2.jpg",
                          videoUrl:
                            "https://docintel.app/one_source/videos/Antonia_Follenzi.mp4",
                        });
                      }}
                    >
                      <img
                        src={path_image + "isth-video-placeholder2.jpg"}
                        alt=""
                      />
                      <div
                        className="video-btn-play"
                        onClick={
                          () => {
                            const trackingParams = {
                              calendarClicked: 0,
                              downloadClicked: 0,
                              linkClicked: 0,
                              cookiesClicked: 0,
                              propAntoniaFollenziVideoClicked: 1,
                            };

                            trackingData(trackingParams, id);
                            handleShow3();
                            setUrl({
                              videoName: "propAntoniaFollenziVideoClicked",
                              iconImage: path_image + "play-button-wfh.png",
                              iconClass: "nuwiq-modal",
                              posterUrl:
                                path_image + "isth-video-placeholder2.jpg",
                              videoUrl:
                                "https://docintel.app/one_source/videos/Antonia_Follenzi.mp4",
                            });
                          }
                          // () => handlePlayPause("p2")
                        }
                      >
                        <img
                          className="video_btn"
                          src={path_image + "play-button-wfh.png"}
                          alt="Play Icon"
                        />
                      </div>
                    </div>
                    {/* <ReactPlayer
                                            className="one_source_video"
                                            playing={isPlaying?.p2}
                                            //playIcon={<button>Play</button>}
                                            //light={path_image + "play-button.png"}
                                            config={{
                                                attributes: {
                                                    poster: path_image + "isth-video-placeholder2.jpg",
                                                    play: isPlaying?.p2
                                                }
                                            }}
                                            url="https://docintel.app/one_source/videos/Antonia_Follenzi.mp4"
                                            controls={true}
                                            width="640"
                                            height="360"
                                            onPause={() => {
                                                                }}
                                            onPlay={() => {
                                                                }}
                                        />
                                        {isVisible?.p2 ? (
                                            <div className="video-btn-play" onClick={() => handlePlayPause("p2")}>
                                                <img
                                                    className="video_btn"
                                                    src={path_image + "play-button-wfh.png"}
                                                    alt="Play Icon"
                                                />
                                            </div>
                                        ) : null} */}
                  </div>
                  <div className="speaker-quotes-right">
                    <h6>
                      Meet Prof.{" "}
                      <span>
                        Antonia Follenzi Università del Piemonte Orientale,
                        Italy
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="symposium-register">
            <div className="symposium-register-inset d-flex align-items-center">
              <h3>To register for this symposium live stream</h3>
              <div className="download-btn">
                <a
                  target="_blank"
                  href="https://events.docintel.app/event-registration?event=ISTH2024-NU"
                  onClick={() => registerLink("nuwiq")}
                >
                  Click Here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {hcp === true ? (
        <div className="hcp_verify_outer">
          <div className="hcp-not-verify">
            <div className="hcp-not-verify-inset">
              <img src={path_image + "under-spotlight-wfh.svg"} alt="" />
              <h2>Thank you for your interest</h2>
              <h5>This symposium is for HCPs only</h5>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/*promotion page wilate*/}
      <div className="promotion-page wilate24">
        {/* <Container>
                <Row>
                    <div className="promotion-section">
                        <h1>UNDER CONSTRUCTION</h1>
                        <h3>We're building a Octapharma EAHAD 2024 page here - can't wait to show it to you.</h3>
                        <img src="https://docintel.app/img/octa/e-templates/one-source/onesource-logo.gif" alt="One Source"/>
                    </div>
                </Row>
            </Container> */}

        <div className="promotion-page-inset">
          <div className="disclaimer-text" id="wilate-sec">
            <p>
              Wilate is licensed in the European Union for prevention and
              treatment of haemorrhage or surgical bleeding in von Willebrand
              disease (VWD), when desmopressin (DDAVP) treatment alone is
              ineffective or contra-indicated. This information is intended for
              health care professionals only. Octapharma medicines are approved
              in individual countries and regions for specific uses. The
              licensed indications and other information presented here may vary
              from the approved use of wilate® in other countries. Please refer
              to the approved Product Information relevant to your country.
              wilate is not registered in Thailand.{" "}
              <a
                target="_blank"
                href="https://docintel.app/Haematology_Octapharma/WJkovfIe"
              >
                {" "}
                product information (PI): Wilate®
              </a>{" "}
            </p>
          </div>
          <div className="promotion-page-header">
            <div className="header-video">
              <div className="underspotlight">
                <img src={path_image + "underspotlight.svg"} alt="" />
                <h5>Join us at ISTH 2024, Bangkok, TH</h5>
                <h1>
                  Next-Level Insights on Prophylaxis in von Willebrand Disease
                </h1>
                <h3>Are you Addressing Your Patients' Needs?</h3>
                <h6>This symposium is for HCPs only</h6>
              </div>
              <div className="agenda-video">
                <div className="one_source_video">
                  <ReactPlayer
                    className="one_source_video1"
                    // playing={true}
                    playing={isPlaying?.p1}
                    // poster={path_image + "isth-wilate-video-poster.jpg"}
                    src={
                      "https://docintel.s3-eu-west-1.amazonaws.com/video/Haematology_Octapharma/281717581778545.mp4"
                    }
                    controls={true}
                    width="100%"
                    height="auto"
                    onPlay={() =>
                      setIsFirstTimeVideo((prev) => ({
                        ...prev,
                        video2: false,
                      }))
                    }
                    // autoplay={false}
                    // muted={true}
                    // loop={true}
                    playsInline
                  />

                  {isVisible?.p1 ? (
                    <>
                      {isFirstTimeVideo.video2 && (
                        <img
                          className="thumbnail"
                          src={path_image + "isth-wilate-video-poster.jpg"}
                          alt="poster"
                        />
                      )}
                      <div
                        className="video-btn-play"
                        onClick={() => handlePlayPause("p1")}
                      >
                        <img
                          className="video_btn"
                          src={path_image + "play-button-org.png"}
                          alt="Play Icon"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="header-event">
            <Col>
              <img src={path_image + "calendar-icon.svg"} alt="" />
              <h3>
                Monday,
                <br /> June 24. 2024
              </h3>
            </Col>
            <Col>
              <img src={path_image + "clock-icon.svg"} alt="" />
              <h3>12:15-13:30 ICT</h3>
            </Col>
            <Col>
              <img src={path_image + "maps-and-flags-icon.svg"} alt="" />
              <h3>Room 210</h3>
            </Col>
            <Col>
              <div className="calender-btn">
                <Button
                  variant="primary"
                  className="btn-filled"
                  onClick={() =>
                    downloadIcs(
                      path_image + "ISTH-2024-wilate.ics",
                      "wilateCalenderClicked",
                    )
                  }
                >
                  Add To Your Calendar
                </Button>
              </div>
            </Col>
          </div>

          <div className="agenda-wrap" ref={agendaSectionRef}>
            <div className="agenda-section" id="agenda-section">
              {/* <div className="speaker-quotes">
                                <div className="speaker-quotes-box">
                                    <div className="speaker-quotes-inset">
                                        <div className="speaker-img-block">
                                            <img src={path_image + "sidonio.png"} alt="" />
                                            <p>Robert F. Sidonio Jr.</p>
                                            <p><span>
                                                Hemophiloa of Georgia Center for Bleeding and Clotting <br />Disorders, US
                                            </span></p>
                                        </div>
                                        <div className="speaker-quote-block">
                                            <h2>“Why do our von Willebrand disease patients put up with so much bleeding?”</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="wilprophy-box">
                                    <div className="wilprophy-box-inset" onClick={handleShow}>
                                        <img src={path_image + "wilphopy-img.png"} alt="" />
                                    </div>
                                </div>
                            </div> */}
              <div className="speaker-quotes">
                <div className="wilprophy-box speaker-quotes-box">
                  <div
                    className="wilprophy-box-inset"
                    onClick={handleImageShow}
                  >
                    <img src={path_image + "ISTH2024-wilprophy.jpg"} alt="" />
                  </div>
                </div>
                <div className="speaker-quotes-box d-flex align-items-center flex-row-reverse">
                  <div className="speaker-quotes-left">
                    <div
                      className="wilprophy-box-inset"
                      onClick={() => {
                        const trackingParams = {
                          calendarClicked: 0,
                          downloadClicked: 0,
                          linkClicked: 0,
                          cookiesClicked: 0,
                          propChristanVideoClicked: 1,
                        };

                        trackingData(trackingParams, id);
                        handleShow4();
                        setUrl({
                          videoName: "propChristanVideoClicked",
                          iconImage: path_image + "play-button-org.png",
                          iconClass: "wilate-model",
                          posterUrl: path_image + "isth-video-placeholder3.jpg",
                          videoUrl:
                            "https://docintel.app/one_source/videos/Kristen_patient_video_teaser.mp4",
                        });
                      }}
                    >
                      <img
                        src={path_image + "isth-video-placeholder3.jpg"}
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
                            propChristanVideoClicked: 1,
                          };

                          trackingData(trackingParams, id);
                          handleShow4();
                          setUrl({
                            videoName: "propChristanVideoClicked",
                            iconImage: path_image + "play-button-org.png",
                            iconClass: "wilate-model",
                            posterUrl:
                              path_image + "isth-video-placeholder3.jpg",
                            videoUrl:
                              "https://docintel.app/one_source/videos/Kristen_patient_video_teaser.mp4",
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
                    {/* <ReactPlayer
                                            className="one_source_video"
                                            playing={isPlaying?.p3}
                                            //playIcon={<button>Play</button>}
                                            //light={path_image + "play-button.png"}
                                            config={{
                                                attributes: {
                                                    poster: path_image + "isth-video-placeholder3.jpg",
                                                    play: isPlaying?.p3
                                                }
                                            }}
                                            url="https://docintel.app/one_source/videos/Kristen_patient_video_teaser.mp4"
                                            controls={true}
                                            width="640"
                                            height="360"
                                            onPause={() => {
                                                                }}
                                            onPlay={() => {
                                                                }}
                                        />
                                        {isVisible?.p3 ? (
                                            <div className="video-btn-play" onClick={() => handlePlayPause("p3")}>
                                                <img
                                                    className="video_btn"
                                                    src={path_image + "play-button-org.png"}
                                                    alt="Play Icon"
                                                />
                                            </div>
                                        ) : null} */}
                  </div>
                  <div className="speaker-quotes-right">
                    <h6>
                      Patient Story:{" "}
                      <span>"Living with heavy menstrual bleeding"</span>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="agenda-speakers">
                <img src={path_image + "eahad-agenda3.jpg"} alt="" />
                <div className="download-agenda-file">
                  <h5>
                    Symposium Agenda: Next-Level Insights on Prophylaxis in VWD
                  </h5>
                  <div className="download-btn">
                    <a
                      download
                      href={path_image + "SPOTLIGHT_WFH 2024_Agenda_Wilate.pdf"}
                      onClick={download}
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="symposium-register">
              <div className="symposium-register-inset d-flex align-items-center">
                <h3>To register for this symposium live stream</h3>
                <div className="download-btn">
                  <a
                    target="_blank"
                    href="https://events.docintel.app/event-registration?event=ISTH2024-NU"
                    onClick={() => registerLink("wilate")}
                  >
                    Click Here
                  </a>
                </div>
              </div>
            </div>
            <div className="promotion-page-footer flex-row-reverse">
              <div className="promotion-footer-left">
                <div className="d-flex align-items-center footer-box">
                  <div className="footer-logo">
                    <img
                      src={
                        path_image +
                        "ONE-SOURCE-logo-animation-white-orange.gif"
                      }
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
                      onPause={() => {
                        setIsVisible({ ...isVisible, p5: true });
                        setIsPlaying({ ...isPlaying, p5: false });
                      }}
                      onPlay={() => {
                        setIsFirstTimeVideo((prev) => ({
                          ...prev,
                          video3: false,
                        }));

                        setIsVisible({ ...isVisible, p5: false });
                        setIsPlaying({ ...isPlaying, p5: true });
                      }}
                    />

                    {isVisible?.p5 ? (
                      <>
                        {" "}
                        {isFirstTimeVideo.video3 && (
                          <img
                            className="thumbnail"
                            src={path_image + "video_md_logo.png"}
                            alt="poster"
                          />
                        )}
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
                      </>
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
                <img src={path_image + "octa-logo.svg"} alt="" />
                <span>694_HAEWEB_ISTH 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*promotion page wilate end*/}

      <Modal show={modalShow} centered className="hcp-verify">
        <Modal.Body>
          <div className="hcp-verify-box">
            <h4>This symposium is for HCPs only</h4>
            <Form onSubmit={handleSubmit}>
              <div className="hcp-verify-check">
                <FormGroup>
                  <p>I do hereby confirm I am an HCP:</p>
                  <div className="d-flex justify-content-center">
                    <Form.Check
                      type="radio"
                      id="hcp-yes"
                      label="Yes"
                      name="hcp-check"
                      value="Yes"
                      onChange={handleOptionChange}
                    />
                    <Form.Check
                      type="radio"
                      id="hcp-no"
                      label="No"
                      name="hcp-check"
                      value="No"
                      onChange={handleOptionChange}
                    />
                  </div>
                </FormGroup>
              </div>
              <Button
                variant="primary"
                type="submit"
                className={!selectedOption ? "disabled" : ""}
              >
                Submit
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={show}
        onHide={() => handleClose("p2")}
        centered
        className={`wilphopy-modal ${url?.iconClass}`}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="one_source_video">
            <ReactPlayer
              className="one_source_video"
              playing={isPlaying?.p2}
              //playIcon={<button>Play</button>}
              //light={path_image + "play-button.png"}
              // poster= {url?.posterUrl ? url?.posterUrl : path_image + "wfh-graph-img.png"}
              src={url?.videoUrl}
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
                setIsFirstTimeVideo((prev) => ({ ...prev, video4: false }));

                handleVideoPlay();
                setIsVisible({ ...isVisible, p2: false });
                setIsPlaying({ ...isPlaying, p2: true });
              }}
            />

            {isVisible?.p2 ? (
              <>
                {isFirstTimeVideo.video4 && (
                  <img
                    className="thumbnail"
                    src={
                      url?.posterUrl
                        ? url?.posterUrl
                        : path_image + "wfh-graph-img.png"
                    }
                    alt="poster"
                  />
                )}
                <div
                  className="video-btn-play"
                  onClick={() => {
                    setIsVisible({ ...isVisible, p2: false });
                    setIsPlaying({ ...isPlaying, p2: true });
                  }}
                >
                  <img
                    className="video_btn"
                    src={url?.iconImage}
                    alt="Play Icon"
                  />
                </div>
              </>
            ) : null}
          </div>
          {/* <img src={path_image + "wfh-graph-img.png"} alt="" /> */}
        </Modal.Body>
      </Modal>

      <Modal
        show={show1}
        onHide={() => setShow1(false)}
        centered
        className="wilphopy-modal vogle-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ReactPlayer
            className="one_source_video"
            playing={isPlaying?.p3}
            //playIcon={<button>Play</button>}
            //light={path_image + "play-button.png"}
            // poster= {path_image + "FVIII-cover.png"}
            src="https://docintel.app/one_source/videos/FVIII_Academy_Viola_proof.mp4"
            controls={true}
            width="640"
            height="360"
            onPause={() => {
              setIsVisible({ ...isVisible, p3: true });
              setIsPlaying({ ...isPlaying, p3: false });
            }}
            onPlay={() => {
              setIsFirstTimeVideo((prev) => ({ ...prev, video5: false }));

              setIsVisible({ ...isVisible, p3: false });
              setIsPlaying({ ...isPlaying, p3: true });
            }}
          />

          {isVisible?.p3 ? (
            <>
              {isFirstTimeVideo.video5 && (
                <img
                  className="thumbnail"
                  src={
                    url?.posterUrl
                      ? url?.posterUrl
                      : path_image + "FVIII-cover.png"
                  }
                  alt="poster"
                />
              )}
              <div
                className="video-btn-play"
                onClick={() => handlePlayPause("p3")}
              >
                <img
                  className="video_btn"
                  src={path_image + "play-button-wfh.png"}
                  alt="Play Icon"
                />
              </div>
            </>
          ) : null}
        </Modal.Body>
      </Modal>
      <Modal show={cookieShow} className="cookieadd" centered>
        <Modal.Header>
          <Modal.Title>Used cookies</Modal.Title>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={hideCookieModal}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Essential cookies exclusively enhance your experience with us
            ensuring our system runs smoothly whilst recognising you for
            seamless recurring use. Be confident we never share your information
            with any commercial cookie company.
          </h6>
          <div className="used-cookies-table-top">
            <div className="used-cookies-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CAKEPHP</td>
                    <td>
                      Framework default cookie for cache of all component.
                    </td>
                  </tr>
                  <tr>
                    <td>dynamic_number (ex 1210)</td>
                    <td>
                      This cookie is used for storing the status of consent
                      given or not for the article.
                    </td>
                  </tr>
                  <tr>
                    <td>video_track</td>
                    <td>
                      This cookie is used for storing the last seek time of user
                      for the particular video.
                    </td>
                  </tr>
                  <tr>
                    <td>name_use</td>
                    <td>
                      Used to autofill name of the user to help with repetitive
                      task. Only used in some circumstances where user have been
                      directed to the site based on previous consent.{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>email_use</td>
                    <td>
                      Used to autofill email of the user to help with repetitive
                      task. Only used in some circumstances where user have been
                      directed to the site based on previous consent.
                    </td>
                  </tr>
                  <tr>
                    <td>country_use</td>
                    <td>
                      Used to autofill country of the user to help with
                      repetitive task. Only used in some circumstances where
                      user have been directed to the site based on previous
                      consent.
                    </td>
                  </tr>
                  <tr>
                    <td>consent_type</td>
                    <td>
                      Used to detect if use have given full or limited consent
                      to be sure tracking of usage is handled correctly.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {urlContains ? (
        <Modal
          show={modalVideoShow}
          onHide={handleVideoClose}
          centered
          className="wilphopy-modal wfh-video"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <ReactPlayer
              className="one_source_video"
              playing={isPlaying?.p4}
              // poster={path_image + "isth-wilate-video-poster.jpg"}
              src={
                "https://docintel.s3-eu-west-1.amazonaws.com/video/Haematology_Octapharma/281717581778545.mp4"
              }
              controls={true}
              width="640"
              height="360"
              onPause={handlePlayerPause}
              onTimeUpdate={handleProgress}
              onEnded={handleVideoClose}
              onPlay={handleVideoPlay}
              loop={false}
              playsInline
            />

            {isVisible?.p4 ? (
              <>
                {isFirstTimeVideo.video6 && (
                  <img
                    className="thumbnail"
                    src={
                      url?.posterUrl
                        ? url?.posterUrl
                        : path_image + "FVIII-cover.png"
                    }
                    alt="poster"
                  />
                )}
                <div
                  className="video-btn-play"
                  onClick={() => handlePlayPause("p4")}
                >
                  <img
                    className="video_btn"
                    src={path_image + "isth-wilate-video-poster.png"}
                    alt="Play Icon"
                  />
                </div>
              </>
            ) : null}
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      <Modal
        show={showImage}
        onHide={handleClose}
        centered
        className="wilphopy-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img src={path_image + "wilphopy-img.png"} alt="" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ISTH2;
