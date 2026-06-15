import ReactPlayer from "react-player";
import { Button, Col, Form, FormGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect, useRef } from "react";
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import { loader } from "./CommonComponent/Loader";

const WFH2024 = () => {
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const [isVisible, setIsVisible] = useState({
    p1: true,
    p2: true,
    p3: true,
    p4: true,
  });
  const [isPlaying, setIsPlaying] = useState({
    p1: false,
    p2: false,
    p3: false,
    p4: false,
  });
  const [isFirstTimeVideo, setIsFirstTimeVideo] = useState({
    video1: true,
    video2: true,
    video3: true,
    video4: true,
    video5: true,
  });
  const [isScrollDownShown, setIsScrollDownShown] = useState(false);
  const agendaSectionRef = useRef(null);

  const [id, setId] = useState(-1);
  const isFirstTime = useRef(1);

  const [popupVideoCurrentTime, setPopUpVideoCurrentTime] = useState(0);

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

    let body = document.getElementsByTagName("body");
    body[0].classList.add("wfh-promo");

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
      payload.type = "wfh";
      if (selectedOption === "Yes" || defaultFlag == 1) {
        const response = await postData(`${ENDPOINT.WFH_TRACKING}`, payload);
        setId(response.data.id);
      }

      // loader("hide");
    } catch (err) {
      // loader("hide");
      console.error("Error fetching event ID:", err);
    }
  };

  const handlePlayPause = (type) => {
    // trackingData({   calendarClicked :0,
    //     downloadClicked:0,
    //     videoClicked:1,
    //     linkClicked:0},-1);
    trackingData(
      {
        calendarClicked: 0,
        downloadClicked: 0,
        profVogalVideoClicked: type == "p3" ? 1 : 0,
        clinicalEfficacyVideoClicked: type == "p2" ? 1 : 0,
        videoClicked: type == "p1" ? 1 : 0,
        linkClicked: 0,
        cookiesClicked: 0,
      },
      id,
    );

    setIsVisible({ ...isVisible, [type]: !isVisible[type] });
    setIsPlaying({ ...isPlaying, [type]: !isPlaying[type] });
  };
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalVideoShow, setModalVideoShow] = useState(false);
  const [hcp, setHcp] = useState(false);
  const [show1, setShow1] = useState(false);

  const [cookieShow, setCookieShow] = useState(false);
  const handleClose = () => setShow(false);
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
        popUpVideoEndTime: popupVideoCurrentTime,
      },
      id,
      1,
    );
    setModalVideoShow(false);
    setModalShow(true);
  };

  const handleVideoPlay = () => {
    setIsFirstTimeVideo((prev) => ({ ...prev, video4: false }));
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
        popUpVideoStartTime: "00:00:00",
      },
      id,
      1,
    );
  };
  const handleShow = () => setShow(true);

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

  const downloadIcs = () => {
    trackingData(
      {
        calendarClicked: 1,
        downloadClicked: 0,
        profVogalVideoClicked: 0,
        clinicalEfficacyVideoClicked: 0,
        videoClicked: 0,
        linkClicked: 0,
        cookiesClicked: 0,
      },
      id,
    );

    const url = path_image + "WFH_2024.ics";

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

  // const data = [
  //     {
  //         image: `${path_image}astermark.png`,
  //         title: "Challenging the Status Quo: <br/>Re-evaluating Prophylaxis in VWD",
  //         speaker: "Chair: Jan Astermark, SE",
  //     }, {
  //         image: `${path_image}sidonio.png`,
  //         title: "Insights from the WIL-31 Study<br/> Child Living with VWD",
  //         speaker: "Robert F. Sidonio Jr., US",
  //     }
  //     , {
  //         image: `${path_image}boban.png`,
  //         title: "Adult Living with Frequent Nose Bleeds",
  //         speaker: "Ana Boban, HR",
  //     }, {
  //         image: `${path_image}kiss.png`,
  //         title: "Female Experiencing Heavy <br/>Menstrual Bleeding",
  //         speaker: "Csongor Kiss, HU",
  //     }, {
  //         image: `${path_image}qa-demo.png`,
  //         title: "Q&A",
  //         speaker: "Speakers and Audience",
  //     }
  // ]
  useEffect(() => {
    // setModalShow(true);
    setModalVideoShow(true);
    // if (hcpUserConfirmation === "Yes"){
    //     setModalShow(false);
    // }
  }, []);

  // let hcpUserConfirmation = localStorage.getItem("hcpConfirmation")
  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     trackingData({
  //         calendarClicked: 0,
  //         downloadClicked: 0,
  //         profVogalVideoClicked: 0,
  //         clinicalEfficacyVideoClicked: 0,
  //         videoClicked: 0,
  //         linkClicked: 0,
  //         cookiesClicked: 0,
  //         userChecked:selectedOption,

  //     }, id);
  //     handleModalClose();
  //     // localStorage.setItem('hcpConfirmation', selectedOption);
  //    if (selectedOption === 'No') {
  //         handleNoHcp();
  //     }
  // };

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
      }
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleProgress = (event) => {
  const currentTime = event?.target?.currentTime || 0;
  setPopUpVideoCurrentTime(formatTime(currentTime));
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

  // const handleDuration = (duration) => {
  //     const totalDuration = parseInt(duration)/60;
  //     var truncatedMinutes = Math.trunc(totalDuration * 100) / 100;
  //     console.log(totalDuration, "durations", truncatedMinutes);
  // };

  const formatTime = (seconds) => {
    const pad = (value) => {
      return String(value).padStart(2, "0");
    };

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  return (
    <>
      <div className="promotion-page">
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
              This is a promotional symposium organized and sponsored by
              Octapharma and products will be discussed. Prescribing information
              may vary depending on local approval in each country. Before
              prescribing any product, always refer to local materials such as
              the prescribing information and/or the summary of product
              characteristics.{" "}
              <a
                target="_blank"
                href="https://docintel.app/Haematology_Octapharma/rkzhQyMx"
              >
                PRESCRIBING INFORMATION (PI): Nuwiq®
              </a>{" "}
            </p>
          </div>
          <div className="promotion-page-header">
            <div className="header-video">
              <div className="underspotlight">
                <img src={path_image + "under-spotlight-wfh.svg"} alt="" />
                <h5>Join us at WFH 2024, Madrid, ES</h5>
                <h1>Must-have Insights on Prophylaxis</h1>
                <h2>in Haemophilia A and von Willebrand Disease</h2>
              </div>
              <div className="agenda-video">
                <ReactPlayer
                  className="one_source_video"
                  playing={isPlaying?.p2}
                  // config={{
                  //     attributes: {
                  //         poster: path_image + "wfh-poster.png",
                  //         play: isPlaying?.p2
                  //     }
                  // }}
                  // poster={path_image + "wfh-poster.png"}
                  // url={path_image + "EAHAD-2024-agenda-video_07.mp4"}
                  src={
                    "https://docintel.s3.eu-west-1.amazonaws.com/image/WFH_2024_Agenda_video_08.mp4"
                  }
                  controls={true}
                  width="100%"
                  height="auto"
                  onPlay={() =>
                    setIsFirstTimeVideo((prev) => ({ ...prev, video1: false }))
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
                        src={path_image + "wfh-poster.png"}
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
          <div className="header-event">
            <Col>
              <img src={path_image + "calendar-icon.svg"} alt="" />
              <h3>
                Monday,
                <br /> April 22, 2024
              </h3>
            </Col>
            <Col>
              <img src={path_image + "clock-icon.svg"} alt="" />
              <h3>18:30-19:30</h3>
            </Col>
            <Col>
              <img src={path_image + "maps-and-flags-icon.svg"} alt="" />
              <h3>Room 3</h3>
            </Col>
            <Col>
              <div className="calender-btn">
                <Button
                  variant="primary"
                  className="btn-filled"
                  onClick={downloadIcs}
                >
                  Add To Your Calendar
                </Button>
              </div>
            </Col>
          </div>
          <div className="agenda-wrap" ref={agendaSectionRef}>
            <div className="agenda-section" id="agenda-section">
              <div className="agenda-speakers">
                {/*<div className="agenda-speakers-listed">
                                     <h3>AGENDA & SPEAKERS</h3>
                                    <div className="speakers-list">
                                        {
                                            data.map((item, index) => (
                                                <div className="speakers-quotes">
                                                    <img src={item.image} alt="" />
                                                    <div className='agenda-content-detail'>
                                                        <p className="quotes" dangerouslySetInnerHTML={{ __html: item.title }}></p>
                                                        <span className='spaker-name'>{item.speaker}</span>
                                                        <span className="blank_dash">&nbsp;</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="octapharma-logo">
                                        <img src={path_image + "octapharma_rgb.png"} alt="" />
                                    </div> 
                                </div>*/}
                <img src={path_image + "wfh_agenda_new.png"} alt="" />
                <div className="download-agenda-file">
                  <h5>Under spotlight WFH 2024 agenda</h5>
                  <div className="download-btn">
                    <a
                      download
                      href={path_image + "Spotlight_wfh_2024_Agenda.pdf"}
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
                <div className="speaker-quotes-box">
                  <div className="speaker-quotes-inset">
                    <div className="speaker-img-block">
                      <img src={path_image + "voglel-img.png"} alt="" />
                      {/* <p>Robert F. Sidonio Jr.</p>
                                            <p><span>
                                                Hemophiloa of Georgia Center for Bleeding and Clotting <br />Disorders, US
                                            </span></p> */}
                    </div>
                    <div className="speaker-quote-block">
                      <h3>
                        To learn more about
                        <br />
                        <span>
                          Prof. Vogel (ETH) about their research <br />
                          on platelets-FVIII signaling
                        </span>
                      </h3>
                    </div>
                    <div className="speaker-btn">
                      <Button onClick={() => setShow1(true)}>Click Here</Button>
                    </div>
                  </div>
                </div>
                <div className="wilprophy-box">
                  <div className="wilprophy-box-inset">
                    <img src={path_image + "wfh-graph-img.png"} alt="" />
                    <div className="wilprophy-box-title">
                      <h6>
                        To learn more about the data from the publication{" "}
                        <span>
                          Kessler CM et al. Eur J Haematol 2023; 111:757–6
                        </span>
                      </h6>
                      <div className="download-btn">
                        <Button onClick={handleShow}>Click Here</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="promotion-page-footer">
              <div className="promotion-footer-left">
                <div className="d-flex align-items-center footer-box">
                  <div className="footer-logo">
                    <img src={path_image + "one_source_wfh.svg"} alt="" />
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
                    <img src={path_image + "qr-code-wfh.png"} alt="" />
                  </div>
                </div>
              </div>
              <div className="promotion-footer-right">
                <div className="footer-video">
                  <div className="one_source_video">
                    <ReactPlayer
                      className="one_source_video1"
                      playing={isPlaying?.p1}
                      //playIcon={<button>Play</button>}
                      //light={path_image + "play-button.png"}
                      // config={{
                      //     attributes: {
                      //         poster: path_image + "video_md_logo.png",
                      //         play: isPlaying?.p1
                      //     }
                      // }}
                      // poster= {path_image + "video_md_logo.png"}
                      src="https://docintel.s3.eu-west-1.amazonaws.com/onesource_videos/img_1685517635.mp4"
                      controls={true}
                      width="640"
                      height="360"
                      onPause={() => {
                        console.log("Video paused");
                      }}
                      onPlay={() => {
                        setIsFirstTimeVideo((prev) => ({
                          ...prev,
                          video2: false,
                        }));
                        console.log("Video play");
                      }}
                    />
                    {isVisible?.p1 ? (
                      <>
                        {isFirstTimeVideo.video2 && (
                          <img
                            className="thumbnail"
                            src={path_image + "video_md_logo.png"}
                            alt="poster"
                          />
                        )}
                        <div
                          className="video-btn-play"
                          onClick={() => handlePlayPause("p1")}
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
            <div className="footer-copy-right">
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
                <span>617_HAEPAG_WFH 2024</span>
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
        onHide={handleClose}
        centered
        className="wilphopy-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="one_source_video">
            <ReactPlayer
              className="one_source_video1"
              playing={isPlaying?.p2}
              //playIcon={<button>Play</button>}
              //light={path_image + "play-button.png"}
              // config={{
              //     attributes: {
              //         poster: path_image + "wfh-graph-img.png",
              //         play: isPlaying?.p2
              //     }
              // }}
              //   poster={path_image + "wfh-graph-img.png"}
              src="https://docintel.app/one_source/videos/MAIC.mp4"
              controls={true}
              width="640"
              height="360"
              onPause={() => {
                console.log("Video paused");
              }}
              onPlay={() => {
                setIsFirstTimeVideo((prev) => ({ ...prev, video3: false }));
              }}
            />
            {isVisible?.p2 ? (
              <>
                {isFirstTimeVideo.video3 && (
                  <img
                    className="thumbnail"
                    src={path_image + "wfh-graph-img.png"}
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
            {/* <img src={path_image + "wfh-graph-img.png"} alt="" /> */}
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={modalVideoShow}
        onHide={handleVideoClose}
        centered
        className="wilphopy-modal wfh-video"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="one_source_video">
            <ReactPlayer
              className="one_source_video1"
              playing={isPlaying?.p4}
              // config={{
              //     file: {
              //         attributes: {
              //             poster: path_image + "wfh-poster1.jpg"
              //         }
              //     }
              // }}
              //   poster={path_image + "wfh-poster1.jpg"}
              src="https://docintel.s3.eu-west-1.amazonaws.com/image/WFH_2024_Agenda_video_08.mp4"
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
                {isFirstTimeVideo.video4 && (
                  <img
                    className="thumbnail"
                    src={path_image + "wfh-poster1.jpg"}
                    alt="poster"
                  />
                )}
                <div
                  className="video-btn-play"
                  onClick={() => handlePlayPause("p4")}
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
            // config={{
            //     attributes: {
            //         poster: path_image + "FVIII-cover.png",
            //         play: isPlaying?.p3
            //     }
            // }}
            // poster={path_image + "FVIII-cover.png"}
            src="https://docintel.app/one_source/videos/FVIII_Academy_Viola_proof.mp4"
            controls={true}
            width="640"
            height="360"
            onPause={() => {
              console.log("Video paused");
            }}
            onPlay={() => {
              setIsFirstTimeVideo((prev) => ({ ...prev, video5: false }));
              console.log("Video play");
            }}
          />
          {isVisible?.p3 ? (
            <>
              {isFirstTimeVideo.video5 && (
                <img
                  className="thumbnail"
                  src={path_image + "FVIII-cover.png"}
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
    </>
  );
};

export default WFH2024;
