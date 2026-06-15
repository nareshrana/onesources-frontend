import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Modal } from "react-bootstrap";
import { loader } from "./CommonComponent/Loader";
import { useLocation } from "react-router-dom";
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import ReactPlayer from "react-player";
import CokkieModal from "./CokkieModal";
import { Helmet } from "react-helmet-async";
const EAHAD2026PromoPage = () => {
  //   const searchParams = new URLSearchParams(search);
  const location = useLocation();
  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  // const userId = searchParams.get("user-id");
  const showPop = searchParams.get("video");
  // const isFirstTime = useRef(1);
  const [isMobileSrceen, setIsMobileSrceen] = useState(
    window.innerWidth <= 767,
  );
  const mobilePlayer1 = useRef(null);
  const mobilePlayer2 = useRef(null);
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
    p6: false,
  });
  const [isFirstTimeVideo, setIsFirstTimeVideo] = useState({
    video1: true,
    video2: true,
    video3: true,
    video4: true,
  });

  const [isScrollDownShown, setIsScrollDownShown] = useState(false);
  const agendaSectionRef = useRef(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [id, setId] = useState(-1);
  const [url, setUrl] = useState(
    "https://docintel.app/one_source/videos/MAIC.mp4",
  );

  const [popupVideoCurrentTime, setPopUpVideoCurrentTime] = useState(0);
  // const [modalVideoShow, setModalVideoShow] = useState(false);

  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const [currentMedium, setCurrentMedium] = useState("web");
  const [showAgenda, setShowAgenda] = useState(false);
  // const [showImage, setShowImage] = useState(false);
  const [cookieShow, setCookieShow] = useState(false);

  const [show, setShow] = useState(false);
  // const handleShow4 = () => setShow(true);
  // const [modalShow, setModalShow] = useState(false);

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
          videoClicked: 0,
          linkClicked: 0,
          visitedMedium: med,
          type: location.pathname,
        },
        id,
      );
    }
  }, [
    searchParams,
    // location.pathname
  ]);

  useEffect(() => {
    trackingData(
      {
        calendarClicked: 0,
        downloadClicked: 0,
        videoClicked: 0,
        linkClicked: 0,
        visitedMedium: currentMedium,
        type: location.pathname,
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

  const isIOS = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
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
    // setModalVideoShow(false);
    // setModalShow(true);
  };

  const handleInplaceVideoClose = (defaultKey = null) => {
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
        [(defaultKey || url?.videoName) + "_VideoEndTime"]:
          popupVideoCurrentTime,
      },
      id,
      1,
    );
    // setModalVideoShow(false);
    // setModalShow(true);
  };

  const handleShow = () => setShowAgenda(true);

  // const handlePlayPause = (type, whichVideoClicked = "") => {
  //     const trackingParams = {
  //         calendarClicked: 0,
  //         downloadClicked: 0,
  //         profVogalVideoClicked: type === "p3" ? 1 : 0,
  //         clinicalEfficacyVideoClicked: type === "p2" ? 1 : 0,
  //         videoClicked: type === "p1" ? 1 : 0,
  //         linkClicked: 0,
  //         cookiesClicked: 0,
  //     };

  //     if (whichVideoClicked !== "") {
  //         trackingParams[whichVideoClicked] = 1;
  //     } else if (url?.videoName) {
  //         trackingParams[url?.videoName] = 1;
  //     }

  //     trackingData(trackingParams, id);
  //     setIsVisible((prevState) => ({
  //         ...prevState,
  //         [type]: !prevState[type],
  //     }));
  //     setIsPlaying((prevState) => ({
  //         ...prevState,
  //         [type]: !prevState[type],
  //     }));
  // };

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

  const handleClose = (type) => {
    setIsVisible({ ...isVisible, [type]: true });
    setIsPlaying({ ...isPlaying, [type]: false });
    setShow(false);
    setShowAgenda(false);
    // setShowImage(false);
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
      videoUrl:
        "https://onesourcedoc.s3.eu-west-1.amazonaws.com/videos/EAHAD_2026_agenda_video.mp4",
    });
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

  // const handleImageShow = () => {
  //     setShowImage(true);
  // };

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
        videoClicked: 0,
        linkClicked: 0,
        cookiesClicked: 0,
        userChecked: "",
        [(defaultKey || url?.videoName) + "_VideoStartTime"]: "00:00:00",
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
      videoClicked: 0,
      linkClicked: 0,
      cookiesClicked: 0,
    };
    if (checkdevice) {
      await trackingData(payload, id);
      window.location.href = url;
    } else {
      trackingData(payload, id);
      const link = document.createElement("a");
      link.href = url;
      link.download = "EAHAD 2026.ics";
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
        <title>EAHAD 2026</title>
        <link rel="icon" href="/images/eahad2026_favicon.ico" />
        <meta
          name="description"
          content="Join us at EAHAD 2026 in Dublin for the symposium:  “Tailored to the Patient, Driven by Data: Optimising Prophylaxis in VWD.”"
        />
        <link
          rel="apple-touch-icon"
          href="https://onesource.octapharma.com/images/eahad2026_favicon.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="EAHAD 2026" />
        <meta
          property="og:description"
          content="Join us at EAHAD 2026 in Dublin for the symposium:  “Tailored to the Patient, Driven by Data: Optimising Prophylaxis in VWD.”"
        />
        <meta
          property="og:url"
          content="https://onesource.octapharma.com/EAHAD2026_demo"
        />
        <meta
          property="og:image"
          content="https://onesource.octapharma.com/images/eahad2026_preview.png"
        />
        <link
          rel="prefetch"
          href="https://onesource.octapharma.com/images/eahad2026_favicon.png"
        />
      </Helmet>
      <div className="promotion-page-e26 eahad26">
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
          <div className="promotion-footer-content">
            <div className="footer-text-box">
              <p className="footer-text">
                This symposium is for healthcare professionals attending the
                EAHAD congress only and is organised and sponsored by
                Octapharma. It has been approved in line with Irish regulations
                for an international audience. Prescribing information may vary
                depending on local approval in each country. Before prescribing
                any product, always refer to local materials such as the
                prescribing information and/or the summary of product
                characteristics. This is a promotional symposium and products
                will be discussed.
              </p>
              <p className="footer-text">
                wilate® (von Willebrand Factor/Coagulation Factor VIII Complex)
                is indicated for the prevention and treatment of haemorrhage or
                surgical bleeding in von Willebrand disease (VWD), when
                desmopressin (DDAVP) treatment alone is ineffective or
                contra-indicated. The SmPC for wilate® (von Willebrand
                Factor/Coagulation Factor VIII Complex) is available at&nbsp;
                <a
                  href="https://www.medicines.ie/medicines/wilate-powder-and-solvent-for-solution-for-injection-34230/spc"
                  target="_blank"
                >
                  https://www.medicines.ie/medicines/wilate-powder-and-solvent-for-solution-for-injection-34230/spc
                </a>
                .
              </p>
              <div className="footer-dashed-box">
                <div className="footer-dashed-text">
                  <p>
                    Prescribing information is available at the symposium from
                    any member of the Octapharma team or by scanning or clicking
                    the QR code. Further information is available at{" "}
                    <a href="mailto:Medinfo.uk@octapharma.com">
                      Medinfo.uk@octapharma.com.
                    </a>
                  </p>
                  <p style={{ margin: "0" }}>
                    Adverse events should be reported. Reporting forms and
                    information can be found at{" "}
                    <a href="https://www.hpra.ie/" target="_blank">
                      hpra.ie
                    </a>
                    . Adverse events should also be reported to Octapharma by
                    telephoning +44 1483 212 151.
                  </p>
                </div>

                <div className="e26-footer-qr">
                  <a
                    href="https://www.medicines.ie/medicines/wilate-powder-and-solvent-for-solution-for-injection-34230/spc"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open link from QR code"
                  >
                    <img src={path_image + "eahad26-qr.png"} alt="QR Code" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="promotion-page-header">
            <div className="header-video">
              <img
                className="eahad-desktop-img"
                src={path_image + "eahad2026_banner.png"}
                alt=""
              />
              <img
                className="eahad-mobile-img"
                src={path_image + "eahad2026_mobile_banner1.png"}
                alt=""
                style={{ display: "none" }}
              />
              <div className="underspotlight">
                <div className="header-event-info">
                  <h2>Join us at EAHAD 2026</h2>
                  <p>Dublin, Ireland</p>
                </div>

                <div className="header-symposium">
                  <h6>Symposium</h6>
                  <h1>
                    Tailored to the Patient, Driven by Data:
                    <br />
                    <span>Optimising Prophylaxis in VWD</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="header-event">
            <Col>
              <img src={path_image + "calendar-icon.svg"} alt="" />
              <h3>Wednesday, February 4. 2026</h3>
            </Col>
            <Col>
              <img src={path_image + "clock-icon.svg"} alt="" />
              <h3>17:30-18:30 GMT</h3>
            </Col>
            <Col>
              <img src={path_image + "maps-and-flags-icon.svg"} alt="" />
              <h3>Room: Liffey A</h3>
            </Col>
            <Col>
              <div className="calender-btn">
                <Button
                  variant="primary"
                  className="btn-filled"
                  onClick={() =>
                    downloadIcs(
                      path_image + "EAHAD-2026.ics",
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
                <img src={path_image + "eahad26_video_img.png"} alt="" />
                <img
                  src={path_image + "eahad26_mobile_video_img.png"}
                  alt=""
                  className="video-mobile-img"
                  style={{ display: "none" }}
                />
                <div className="video-agenda-over-text d-flex justify-content-between align-items-center">
                  <div className="col video-col">&nbsp;</div>
                  <div className="video-agenda-play col">
                    <div
                      className="video-btn-play"
                      // onClick={handleShow}
                      onClick={openModelVideo}
                    >
                      <img
                        className="video_btn"
                        src={path_image + "e26-play-btn.png"}
                        alt="Play Icon"
                      />
                    </div>
                  </div>
                  <div className="video-agenda-heading col">
                    <h2>Symposium Video Agenda</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*-- Video show here close--*/}
          <div className="agenda-wrap">
            <div className="agenda-section" id="agenda-section">
              <div className="agenda-speakers">
                <div className="e26-agenda-section">
                  <h2 className="agenda-title">Agenda</h2>

                  <p className="agenda-desc">
                    Despite advances, patients with von Willebrand disease still
                    face significant treatment gaps. In this interactive
                    symposium, leading experts will share new insights from
                    clinical studies and real-world practice, showing how
                    data-driven and PopPK-guided approaches can transform
                    prophylaxis. Join us to explore the future of truly
                    personalised VWD care.
                  </p>

                  <div className="agenda-divider" />

                  <div className="agenda-list">
                    <div className="agenda-item">
                      <div className="agenda-avatar">
                        <img
                          src={path_image + "michelle-lavin.png"}
                          alt="Michelle Lavin"
                        />
                      </div>
                      <div className="agenda-content">
                        <p className="agenda-intro">Welcome and Introduction</p>
                        <h4>
                          Still Bleeding, Still Waiting: Understanding the Gaps
                          in VWD Management
                        </h4>
                        <span>Michelle Lavin, IE</span>
                      </div>
                    </div>

                    <div className="agenda-item">
                      <div className="agenda-avatar">
                        <img
                          src={path_image + "robert-f-sidonio.png"}
                          alt="Robert Sidonio"
                        />
                      </div>
                      <div className="agenda-content">
                        <h4>
                          Bringing Personalised Prophylaxis into Practice:
                          Real-World Perspectives and Patient Impact
                        </h4>
                        <span>Robert F. Sidonio Jr, US</span>
                      </div>
                    </div>

                    <div className="agenda-item">
                      <div className="agenda-avatar">
                        <img
                          src={path_image + "ron-mathot.png"}
                          alt="Ron Mathot"
                        />
                      </div>
                      <div className="agenda-content">
                        <h4>
                          Leveraging Population PK Models Towards Individualized
                          Dosing in VWD
                        </h4>
                        <span>Ron Mathot, NL</span>
                      </div>
                    </div>
                  </div>

                  <div className="agenda-footer-logo">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="152"
                      height="24"
                      viewBox="0 0 152 24"
                      fill="none"
                    >
                      <path
                        d="M65.9824 4.38281C68.0498 4.38281 69.8149 5.114 71.252 6.57617C72.6891 8.0385 73.4209 9.77828 73.4209 11.8457C73.4209 14.0644 72.7148 15.9304 71.3281 17.418C69.9162 18.8803 68.1507 19.6113 65.9824 19.6113C64.7977 19.6113 63.7137 19.334 62.7559 18.8047C61.7978 18.25 60.9905 17.4683 60.335 16.4346C60.3854 17.1655 60.4113 17.8208 60.4365 18.4258C60.4617 19.0054 60.4863 19.4344 60.4863 19.6865V23.998H58.5957V4.73535H60.4111L60.335 7.55957C60.9905 6.52586 61.7978 5.74413 62.7559 5.18945C63.7138 4.63494 64.7977 4.38287 65.9824 4.38281ZM7.91602 4.42285C9.90725 4.50867 11.5881 5.23839 12.959 6.63281C14.4464 8.09503 15.1776 9.85971 15.1777 11.9521C15.1777 14.1709 14.4467 16.0123 12.9844 17.4746C11.5221 18.962 9.73162 19.6924 7.56348 19.6924C5.44583 19.6923 3.65559 18.962 2.19336 17.4746C0.73104 15.9871 1.48948e-05 14.1714 0 12.0283C0 9.93572 0.731264 8.14573 2.21875 6.6582C3.61335 5.26361 5.25167 4.51138 7.13379 4.42285C7.25923 4.41695 7.38606 4.41406 7.51367 4.41406C7.64917 4.41407 7.78328 4.41713 7.91602 4.42285ZM23.5723 4.38281C25.4377 4.38287 27.026 4.88701 28.3369 5.87012C29.648 6.85341 30.505 8.21541 30.9336 9.95508H27.3535V10.0049C26.925 9.24888 26.421 8.66934 25.791 8.31641C25.1608 7.93826 24.4294 7.76176 23.5723 7.76172C22.4377 7.76172 21.4789 8.16506 20.6973 8.99707C19.9412 9.82897 19.5635 10.8625 19.5635 12.0977C19.5635 13.3078 19.9664 14.3417 20.7227 15.1484C21.5042 15.9552 22.4879 16.3584 23.6729 16.3584C24.5805 16.3584 25.3625 16.1575 25.9424 15.7793C26.5474 15.3759 27.0012 14.7952 27.3037 14.0137H30.9092C30.5058 15.7533 29.6733 17.1401 28.3623 18.1738C27.0766 19.1823 25.5388 19.6865 23.7236 19.6865C21.5807 19.6865 19.7648 18.9559 18.2773 17.4434C16.815 15.9558 16.0586 14.1649 16.0586 12.0723C16.0587 9.95466 16.79 8.16497 18.2773 6.65234C19.7649 5.13959 21.53 4.38281 23.5723 4.38281ZM46.1875 4.47656C47.1204 4.47656 47.978 4.65306 48.7344 5.03125C49.4907 5.40944 50.1969 5.96455 50.8271 6.74609L50.751 4.8291H54.0293V19.2764H50.7773L50.8271 17.3096C50.3481 18.0911 49.7174 18.696 48.9863 19.0742C48.2553 19.4524 47.3478 19.6289 46.2891 19.6289C44.146 19.6289 42.3551 18.8979 40.918 17.4355C39.481 15.9733 38.75 14.1576 38.75 12.0146C38.7501 9.897 39.4564 8.10693 40.8682 6.66992C42.28 5.20779 44.0446 4.47662 46.1875 4.47656ZM96.1377 4.33594C97.2975 4.33594 98.3818 4.61348 99.3398 5.19336C100.298 5.79841 101.08 6.57972 101.685 7.61328L101.508 4.68848H103.374V19.2109H101.508L101.659 16.3877C101.079 17.4213 100.298 18.2284 99.3398 18.7578C98.3818 19.3125 97.247 19.5645 95.9863 19.5645C93.8434 19.5644 92.0787 18.8332 90.6416 17.3711C89.2297 15.9088 88.5235 14.1185 88.5234 11.9756C88.5234 9.78214 89.2543 7.9664 90.6914 6.5293C92.1537 5.06697 93.9694 4.33594 96.1377 4.33594ZM144.036 4.33594C145.196 4.33594 146.28 4.61348 147.238 5.19336C148.196 5.79841 148.978 6.57972 149.583 7.61328L149.406 4.68848H151.272V19.2109H149.406L149.558 16.3877C148.978 17.4213 148.196 18.2284 147.238 18.7578C146.28 19.3125 145.145 19.5645 143.885 19.5645C141.767 19.5644 139.977 18.8332 138.54 17.3711C137.128 15.9088 136.422 14.1185 136.422 11.9756C136.422 9.78214 137.153 7.9664 138.59 6.5293C140.052 5.06697 141.868 4.33594 144.036 4.33594ZM35.7773 4.9043H40.3154L38.248 7.9043L35.7773 7.87988V19.3516H32.3984V0.214844H35.7773V4.9043ZM119.055 4.36328C120.164 4.36328 121.172 4.59039 122.08 5.06934C123.063 5.57356 123.77 6.17843 124.224 6.95996C124.829 6.10283 125.56 5.47253 126.417 5.04395C127.299 4.61533 128.258 4.38867 129.342 4.38867C131.157 4.38869 132.544 4.94358 133.527 6.07812C134.51 7.18747 134.989 8.80098 134.989 10.8682V19.2139H133.174V11.0195C133.174 9.38072 132.846 8.17008 132.165 7.36328C131.51 6.58204 130.476 6.1788 129.115 6.17871C128.308 6.17871 127.577 6.35485 126.946 6.68262C126.316 7.01038 125.812 7.49001 125.459 8.14551C125.232 8.54885 125.08 9.00269 124.979 9.50684C124.879 10.0111 124.829 10.8939 124.829 12.1543V19.2139H123.063V11.0693C123.063 9.40558 122.736 8.17 122.056 7.36328C121.375 6.55648 120.341 6.15332 118.929 6.15332C118.072 6.15334 117.34 6.32949 116.71 6.65723C116.08 6.98499 115.575 7.46459 115.197 8.12012C114.97 8.52337 114.794 9.00224 114.693 9.55664C114.593 10.0861 114.542 10.9439 114.542 12.1289V19.1885H112.727V4.66602H114.567V6.30469C115.122 5.64939 115.777 5.17051 116.533 4.84277C117.29 4.51504 118.122 4.36331 119.055 4.36328ZM76.7227 6.4043C77.2521 5.74884 77.9076 5.24378 78.6387 4.91602C79.395 4.58826 80.2527 4.41212 81.1855 4.41211C83.0765 4.41211 84.5392 4.967 85.5225 6.10156C86.5308 7.2109 87.0351 8.8245 87.0352 10.917V19.2119H85.1943V11.043C85.1943 9.37901 84.8663 8.14387 84.1855 7.3623C83.5048 6.58075 82.4714 6.17676 81.0596 6.17676C80.2276 6.17676 79.471 6.35388 78.8154 6.68164C78.1852 7.0094 77.6809 7.48814 77.3027 8.14355C77.0759 8.54687 76.9251 9.00076 76.8242 9.50488C76.7234 10.0091 76.6729 10.8918 76.6729 12.1523V19.2119H74.832V0H76.7227V6.4043ZM111.19 6.49316C110.031 6.59401 109.173 6.94763 108.669 7.55273C108.165 8.13264 107.913 9.11601 107.913 10.4521V19.2012H106.047V4.67871H107.786V6.36719C108.265 5.71186 108.77 5.23323 109.299 4.93066C109.854 4.62811 110.484 4.47656 111.19 4.47656V6.49316ZM96.0869 6.10059C94.5239 6.10067 93.1876 6.68112 92.1035 7.84082C91.0195 8.97535 90.4648 10.4124 90.4648 12.1016C90.4649 13.715 91.0195 15.1016 92.1035 16.2109C93.2129 17.3203 94.5244 17.875 96.0371 17.875C97.5245 17.8749 98.8105 17.2953 99.8945 16.1104C100.979 14.9254 101.533 13.5135 101.533 11.8496C101.533 10.3117 100.978 8.97519 99.8691 7.81543C98.785 6.68086 97.524 6.10059 96.0869 6.10059ZM143.985 6.10059C142.422 6.10067 141.086 6.68112 140.002 7.84082C138.918 8.97535 138.363 10.4124 138.363 12.1016C138.363 13.715 138.918 15.1016 140.002 16.2109C141.111 17.3203 142.423 17.875 143.936 17.875C145.423 17.8749 146.709 17.2953 147.793 16.1104C148.877 14.9254 149.432 13.5135 149.432 11.8496C149.432 10.3117 148.877 8.97517 147.793 7.81543C146.684 6.68086 145.422 6.10059 143.985 6.10059ZM65.832 6.09766C64.3949 6.09766 63.1338 6.67714 62.0244 7.83691C60.9403 8.97148 60.3857 10.3331 60.3857 11.8711C60.3858 13.535 60.915 14.9721 61.999 16.1318C63.0831 17.2916 64.3691 17.8711 65.8818 17.8711C67.3946 17.8711 68.7061 17.3164 69.8154 16.207C70.9245 15.0977 71.4541 13.7111 71.4541 12.0977C71.4541 10.3833 70.8995 8.97125 69.8154 7.81152C68.7314 6.67707 67.395 6.09777 65.832 6.09766ZM7.22266 7.74707C6.15903 7.79434 5.27257 8.19582 4.56348 8.95215C3.8071 9.75895 3.4541 10.7933 3.4541 12.0791C3.45418 13.3647 3.83257 14.3982 4.58887 15.1797C5.29789 15.9123 6.22829 16.3131 7.33887 16.3604C7.41294 16.3635 7.48782 16.3652 7.56348 16.3652C7.64225 16.3652 7.72026 16.3635 7.79688 16.3604C8.94634 16.3132 9.85358 15.9124 10.5391 15.1797C11.2701 14.373 11.6484 13.289 11.6484 11.9277C11.6484 10.6923 11.2445 9.70835 10.4629 8.92676C9.73026 8.17068 8.79831 7.79064 7.66699 7.74609C7.59147 7.74312 7.5148 7.74219 7.4375 7.74219C7.3651 7.74219 7.29349 7.74392 7.22266 7.74707ZM46.3896 7.85547C45.2299 7.85547 44.2461 8.25845 43.4141 9.04004C42.6074 9.8216 42.2041 10.8051 42.2041 11.9648C42.2041 13.2002 42.6075 14.2342 43.4395 15.041C44.2714 15.8477 45.3058 16.251 46.5664 16.251C47.7006 16.2509 48.6836 15.8475 49.4902 15.041C50.2969 14.2343 50.7011 13.2508 50.7012 12.1416C50.7012 10.9316 50.2976 9.89756 49.4658 9.09082C48.6339 8.25885 47.625 7.85552 46.3896 7.85547Z"
                        fill="white"
                        fillOpacity="0.5"
                      />
                    </svg>
                  </div>
                </div>
                <div className="download-agenda-file">
                  <h5>EAHAD 2026 agenda </h5>
                  <div className="download-btn" style={{ cursor: "pointer" }}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        downloadWithTracking(
                          path_image + "EAHAD-2026-agenda-general.pdf",
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
                          trackingData,
                        );
                      }}
                      href={path_image + "EAHAD-2026-agenda-general.pdf"}
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
              <div className="speaker-quotes">
                <div
                  className="wilprophy-box speaker-quotes-box"
                  onClick={() => {
                    const trackingParams = {
                      calendarClicked: 0,
                      downloadClicked: 0,
                      linkClicked: 0,
                      cookiesClicked: 0,
                      wilProphyPosterClicked: 1,
                    };

                    trackingData(trackingParams, id);
                    setShowImageModal(true);
                  }}
                >
                  <img
                    src={path_image + "eahad2026-wilprophy-study.png"}
                    alt=""
                  />
                </div>
                <div className="speaker-quotes-box">
                  <img
                    src={path_image + "eahad2026-poster-2.png"}
                    alt=""
                    className="poster-large"
                  />
                  <img
                    src={path_image + "eahad2026-poster-small.jpg"}
                    alt=""
                    className="poster-small"
                  />
                </div>
              </div>
            </div>
            <div className="promotion-page-footer">
              <div className="expert-insights" ref={agendaSectionRef}>
                <h3>Expert Insights</h3>
              </div>
              <div className="promotion-footer">
                {!isMobileSrceen ? (
                  <div className="desktop-only desktop-videos">
                    {/* ---------------------- DESKTOP VERSION ---------------------- */}
                    <div className="video-card-desktop">
                      <ReactPlayer
                        className="react-player"
                        playing={isPlaying?.p5}
                        muted={showPop == 1}
                        // poster={path_image + "predrag-miljica-thumbnail.png"}
                        src="https://onesourcedoc.s3.eu-west-1.amazonaws.com/videos/Predrag_Miljica_Q1_v1.mp4"
                        controls={!isPlaying?.p5 ? false : true}
                        width="100%"
                        height="100%"
                        onTimeUpdate={handleProgress}
                        onEnded={handleInplaceVideoClose}
                        onPause={() => {
                          handleInplaceVideoClose();
                          setIsPlaying({ ...isPlaying, p5: false });
                        }}
                        onPlay={() => {
                          setIsFirstTimeVideo((prev) => ({
                            ...prev,
                            video1: false,
                          }));
                          handleInplaceVideoPlay();
                          setIsPlaying({ ...isPlaying, p5: true });
                        }}
                      />
                      {isFirstTimeVideo.video1 && (
                        <img
                          className="thumbnail"
                          src={path_image + "predrag-miljica-thumbnail.png"}
                          alt="poster"
                        />
                      )}

                      {!isPlaying?.p5 && (
                        <div className="desktop-overlay">
                          <img
                            src={path_image + "e26-play-btn.png"}
                            className="play-icon"
                            alt="Play"
                            onClick={() => {
                              const isPlay = isPlaying["p5"];
                              setUrl({ videoName: "footer_1" });
                              setIsPlaying({ ...isPlaying, p5: !isPlay });
                            }}
                          />
                          <p className="overlay-title">
                            Prophylaxis Treatment Approaches for VWD with Dr.
                            Predrag Miljić
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="video-card-desktop">
                      <ReactPlayer
                        className="react-player"
                        playing={isPlaying?.p6}
                        muted={showPop == 1}
                        // poster={path_image + "michelle-lavin-thumbnail.png"}
                        src="https://onesourcedoc.s3.eu-west-1.amazonaws.com/videos/Michelle_Lavin_v1.mp4"
                        controls={!isPlaying?.p6 ? false : true}
                        width="100%"
                        height="100%"
                        onTimeUpdate={handleProgress}
                        onEnded={handleInplaceVideoClose}
                        onPause={() => {
                          handleInplaceVideoClose();
                          setIsPlaying({ ...isPlaying, p6: false });
                        }}
                        onPlay={() => {
                          setIsFirstTimeVideo((prev) => ({
                            ...prev,
                            video2: false,
                          }));
                          handleInplaceVideoPlay();
                          setIsPlaying({ ...isPlaying, p6: true });
                        }}
                      />
                      {isFirstTimeVideo.video2 && (
                        <img
                          className="thumbnail"
                          src={path_image + "michelle-lavin-thumbnail.png"}
                          alt="poster"
                        />
                      )}
                      {!isPlaying?.p6 && (
                        <div className="desktop-overlay">
                          <img
                            src={path_image + "e26-play-btn.png"}
                            className="play-icon"
                            alt="Play"
                            onClick={() => {
                              const isPlay = isPlaying["p6"];
                              setUrl({ videoName: "footer_2" });

                              setIsPlaying({ ...isPlaying, p6: !isPlay });
                            }}
                          />
                          <p className="overlay-title">
                            Closing the Gaps in VWD Guidelines with Dr. Michelle
                            Lavin
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mobile-only mobile-videos">
                    {/* ---------------------- MOBILE VERSION ---------------------- */}
                    {/* MOBILE VIDEO 1 */}
                    <div ref={mobilePlayer1} className="video-card-mobile">
                      <ReactPlayer
                        className="react-player"
                        playing={isPlaying?.p5}
                        muted={showPop == 1}
                        // poster={path_image + "predrag-miljica-thumbnail.png"}
                        src="https://onesourcedoc.s3.eu-west-1.amazonaws.com/videos/Predrag_Miljica_Q1_v1.mp4"
                        controls={isPlaying?.p5 ? true : false}
                        width="100%"
                        height="100%"
                        onTimeUpdate={handleProgress}
                        onEnded={handleInplaceVideoClose}
                        onPause={() => {
                          handleInplaceVideoClose();
                          setIsPlaying({ ...isPlaying, p5: false });
                        }}
                        onPlay={() => {
                          setIsFirstTimeVideo((prev) => ({
                            ...prev,
                            video1: false,
                          }));
                          handleInplaceVideoPlay();
                          setIsPlaying({ ...isPlaying, p5: true });
                        }}
                      />
                      {isFirstTimeVideo.video1 && (
                        <img
                          className="thumbnail"
                          src={path_image + "predrag-miljica-thumbnail.png"}
                          alt="poster"
                        />
                      )}
                      {!isPlaying?.p5 && (
                        <div className="mobile-play">
                          <img
                            src={path_image + "e26-play-btn.png"}
                            className="play-icon"
                            alt="Play"
                            onClick={() => {
                              const isPlay = isPlaying["p5"];
                              setUrl({ videoName: "footer_1" });

                              setIsPlaying({ ...isPlaying, p5: !isPlay });
                            }}
                          />
                        </div>
                      )}
                      <p className="mobile-title">
                        Prophylaxis Treatment Approaches for VWD with Dr.
                        Predrag Miljić
                      </p>
                    </div>
                    <div
                      className="video-card-mobile"
                      style={{ marginTop: "40px" }}
                      ref={mobilePlayer2}
                    >
                      <ReactPlayer
                        className="react-player"
                        playing={isPlaying?.p6}
                        muted={showPop == 1}
                        // poster= {path_image + "michelle-lavin-thumbnail.png"}
                        src="https://onesourcedoc.s3.eu-west-1.amazonaws.com/videos/Michelle_Lavin_v1.mp4"
                        controls={isPlaying?.p6 ? true : false}
                        width="100%"
                        height="100%"
                        onTimeUpdate={handleProgress}
                        onEnded={handleInplaceVideoClose}
                        onPause={() => {
                          handleInplaceVideoClose();
                          setIsPlaying({ ...isPlaying, p6: false });
                        }}
                        onPlay={() => {
                          setIsFirstTimeVideo((prev) => ({
                            ...prev,
                            video2: false,
                          }));
                          handleInplaceVideoPlay();
                          setIsPlaying({ ...isPlaying, p6: true });
                        }}
                      />
                      {isFirstTimeVideo.video2 && (
                        <img
                          className="thumbnail"
                          src={path_image + "michelle-lavin-thumbnail.png"}
                          alt="poster"
                        />
                      )}
                      {!isPlaying?.p6 && (
                        <div className="mobile-play">
                          <img
                            src={path_image + "e26-play-btn.png"}
                            className="play-icon"
                            alt="Play"
                            onClick={() => {
                              const isPlay = isPlaying["p6"];
                              setUrl({ videoName: "footer_2" });
                              setIsPlaying({ ...isPlaying, p6: !isPlay });
                            }}
                          />
                        </div>
                      )}

                      <p className="mobile-title">
                        Closing the Gaps in VWD Guidelines with Dr. Michelle
                        Lavin
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="footer-copy-right">
              <div className="page-copyright">
                <p>
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
                          videoClicked: 0,
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
                  <a href="/docintel-privacy" target="_blank" rel="noreferrer">
                    Docintel Privacy Policy
                  </a>
                  <a href="/terms_of_use" target="_blank" rel="noreferrer">
                    Terms of Use
                  </a>
                </div>
                <p>Date of preparation: November 2025</p>
              </div>
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
                <span>Document ID: IE-WIL-2500003</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              // poster= {url?.posterUrl
              //       ? url?.posterUrl
              //       : path_image + "e26-video-agenda-poster.png"}
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
                setIsFirstTimeVideo((prev) => ({ ...prev, video3: false }));
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
                    : path_image + "e26-video-agenda-poster.png"
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
                  src={path_image + "e26-play-btn.png"}
                  alt="Play Icon"
                />
              </div>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={show}
        backdrop="static"
        onHide={() => handleClose("p1")}
        centered
        className={`wilphopy-modal ${url?.iconClass}`}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ReactPlayer
            className="one_source_video"
            playing={isPlaying?.p1}
            //playIcon={<button>Play</button>}
            //light={path_image + "play-button.png"}
            // poster= {url?.posterUrl
            //       ? url?.posterUrl
            //       : path_image + "eahad25-wilprophy.jpg"}
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
              setIsFirstTimeVideo((prev) => ({ ...prev, video4: false }));
              handleVideoPlay();
              setIsVisible({ ...isVisible, p1: false });
              setIsPlaying({ ...isPlaying, p1: true });
            }}
          />
          {isFirstTimeVideo.video4 && (
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
              <img className="video_btn" src={url?.iconImage} alt="Play Icon" />
            </div>
          ) : null}
        </Modal.Body>
      </Modal>
      <Modal
        show={showImageModal}
        backdrop="static"
        onHide={() => setShowImageModal(false)}
        centered
        className={`wilphopy-modal poster-agenda-modal ${url?.iconClass}`}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img src={path_image + "eahad2026-wilprophy-study3.png"} alt="" />
        </Modal.Body>
      </Modal>
      <CokkieModal cookieShow={cookieShow} hideCookieModal={hideCookieModal} />
    </>
  );
};

export default EAHAD2026PromoPage;
