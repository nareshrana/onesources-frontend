import { Button, Col, Collapse, Row } from "react-bootstrap";
import { useState, useEffect, useMemo, useRef } from "react";
import { loader } from "./CommonComponent/Loader";
import ReactPlayer from "react-player";
import VideoPlayerModal from "./VideoPlayerModal";
import {
  data,
  data1,
  agenda_details,
  oral_communication,
  scientific_development,
} from "./data/isth2026Data";
import useTrackingHandlers from "../hooks/useTrackingHandlers";
const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";

const ISTH2026Promo = ({ section, noVideoPlay = false, id }) => {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const userId = searchParams.get("user-id");
  const contentRef = useRef(null);
  const [sectionDiv, setSectionDiv] = useState("event-list-card-" + section);

  const {
    handleInit,
    handleClick,
    handleVideoInteraction,
    handleDownload,
    handleEventInteraction,
  } = useTrackingHandlers();

  const [openStates, setOpenStates] = useState({});
  const [currentIndex, setCurrentIndex] = useState(null);
  const currentData = useMemo(
    () => agenda_details[currentIndex],
    [currentIndex],
  );
  const [videoData, setVideoData] = useState({
    show: false,
    url: "",
    poster: "",
    videoPlayIcon: "",
    videoText: "",
    isFirstTime: false,
  });
  const isFirstTime = useRef(true);
  const [isFirst, setIsFirst] = useState(true);
  const sectionMapping = {
    0: "ultra8",
    1: "VWD",
    2: "CC",
  };
  useEffect(() => {
    if (isFirstTime.current) {
      const sessionId = crypto.randomUUID();
      localStorage.setItem("session_id", sessionId);
      if (userId) {
        localStorage.setItem("user_id", userId);
      }
      handleInit({}, "ISTH2026");
      loader("show");
      if (!section && !noVideoPlay) {
        isFirstTime.current = false;
        // setVideoData({
        //   show: true,
        //   url: "https://docintel.s3.eu-west-1.amazonaws.com/video/video/ISTH_2025_Agenda_video_Joint_out.mp4",
        //   poster: path_image + "isth-agenda-poster.jpg",
        //   videoPlayIcon: `${path_image}play_button_green.svg`,
        //   videoText: "",
        //   isFirstTime: true,
        // });
      } else if (!section) {
        isFirstTime.current = false;
        setVideoData((prev) => ({ ...prev, show: false }));
        setIsFirst(false);
      }
    }

    document.body.classList.add("isth2025");
    loader("hide");

    return () => {
      document.body.classList.remove("isth2025");
    };
  }, []);

  useEffect(() => {
    if (section) {
      setCurrentIndex(section);
      setOpenStates((prev) => ({
        [section]: true,
      }));
    }
    loader("hide");
  }, []);

  useEffect(() => {
    const divId = document.getElementById(sectionDiv);
    if (divId) {
      divId.scrollIntoView({ behavior: "instant" });
    }
    if (section && currentData && isFirstTime.current) {
      isFirstTime.current = false;
      // setVideoData({
      //   show: true,
      //   url: currentData.agenda_play_video_url,
      //   poster: path_image + "isth-agenda-poster.jpg",
      //   videoPlayIcon: `${path_image}play_button_green.svg`,
      //   videoText: currentData.symposium_agenda_heading,
      //   isFirstTime: true,
      // });
    }
  }, [currentIndex, sectionDiv]);

  useEffect(() => {
    const divId = document.getElementById(id);
    if (divId) {
      divId.scrollIntoView({ behavior: "instant" });
    }
  }, [id]);
  const handleToggle = (index) => {
    setCurrentIndex(index);
    setOpenStates((prev) => ({
      //   ...prev,
      [index]: !prev[index],
    }));
  };
  const handleClosed = (index) => {
    setCurrentIndex(-1);
    setOpenStates((prev) => ({
      //   ...prev,
      [index]: false,
    }));
  };
  const openModal = (url, poster, videoPlayIcon, videoText) => {
    const eventData = {
      url,
      poster,
      videoPlayIcon,
      videoText,
      section_key: sectionMapping[currentData?.id],
    };
    handleEventInteraction("view", eventData);
    setVideoData({ show: true, url, poster, videoPlayIcon, videoText });
  };

  const closeModal = () => {
    setVideoData((prev) => ({ ...prev, show: false }));
    setIsFirst(false);
  };
  const downloadIcs = (url, trackingName) => {
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <Helmet>
        <title>ISTH 2026 - Octapharma</title>
        <link rel="icon" href="/isth2026-favicon.ico" />
        <meta name="description" content="ISTH 2026 - Octapharma" />
        <link
          rel="apple-touch-icon"
          href="https://onesource.octapharma.com/images/isth2026-favicon.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ISTH 2026 - Octapharma" />
        <meta
          property="og:description"
          content="Join us, Advancing Bleeding Solutions for Personalized Care at ISTH 2026, at ISTH, Paris I 11-15 July 2026"
        />
        <meta
          property="og:url"
          content="https://onesource.octapharma.com/ISTH2026"
        />
        <meta
          property="og:image"
          content="https://onesource.octapharma.com/images/isth2026-favicon.png"
        />
        <link
          rel="prefetch"
          href="https://onesource.octapharma.com/images/isth2026-favicon.png"
        />
      </Helmet>

      <div className="promotion-page isth25 isth26">
        <div className="custom-container">
          <div className="isth-banner-section">
            <div className="isth-banner-section-inset">
              <Row>
                <Col md={5} className="isth-detail">
                  <div className="isth-banner-section-left">
                    <h2>
                      <span>{data.title}</span>
                    </h2>
                    <h2>{data.title1}</h2>
                    <h3 className="add-space">
                      <span>{data.location}</span>
                    </h3>
                    {/* <h3>{data.date}</h3> */}
                  </div>
                </Col>
                <Col md={7} className="isth-video p-0">
                  <div className="isth-banner-section-right">
                    <div className="agenda-video">
                      <div className="one_source_video">
                        <img
                          src={path_image + "isth2026-banner-img.png"}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="isth-bottom-outline">
                  <div className="paris-outline">
                    {/* <img src={path_image + "paris-skyline-outline.png"} alt="" /> */}
                    <picture>
                      <source
                        media="(max-width: 480px)"
                        srcSet={path_image + "paris-skyline-mobile-outline.png"}
                      />

                      <img
                        src={path_image + "paris-skyline-outline.png"}
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="octapharma-logo">
                    <img
                      src={path_image + "octapharma-white-logo.svg"}
                      alt="Octapharma"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <section className="isth-event-list">
            <Row className="justify-content-md-between" id="main-section">
              {data1.map((item, index) => (
                <>
                  <Col key={"data1" + index}>
                    <div
                      className={"event-list-card" + " " + item.className}
                      id={"event-list-card-" + index}
                    >
                      <div className="event-card">
                        <div className="card-header">
                          <p className="card-title">{item.card_title}</p>
                          <h6
                            dangerouslySetInnerHTML={{
                              __html: item.card_heading,
                            }}
                          />

                          <p
                            dangerouslySetInnerHTML={{
                              __html: item.card_dis,
                            }}
                          ></p>
                        </div>
                        <div className="card-body">
                          <div>
                            <div>
                              <img src={item.event_calander_img} />
                              <p>{item.event_date}</p>
                            </div>
                            <div>
                              <img src={item.event_clock_img} />{" "}
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item.event_time,
                                }}
                              />
                            </div>
                            <div>
                              <img src={item.event_location_img} />
                              {item.event_location ? (
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: item.event_location,
                                  }}
                                />
                              ) : (
                                <p>
                                  Room W03-04 <br /> Online:{" "}
                                  <a
                                    target="_blank"
                                    onClick={() =>
                                      handleEventInteraction("view", {
                                        title: item.card_heading,
                                        id: item.id,
                                        action: "register",
                                        section_key:
                                          sectionMapping[item?.id],
                                      })
                                    }
                                    href="https://events.docintel.app/event-registration?event=isth2026"
                                  >
                                    Click Here To Register
                                  </a>
                                </p>
                              )}{" "}
                            </div>
                          </div>

                          <div className="isth-event-btn">
                            <Button
                              variant="primary"
                              onClick={(e) => {
                                downloadIcs(
                                  item.event_ics_file,
                                  item.card_title,
                                );
                                handleDownload(
                                  {
                                    ...item,
                                    action: "download_ics",
                                    section_key:
                                      sectionMapping[item?.id],
                                  },
                                  window.location.origin + item.event_ics_file,
                                );
                              }}
                            >
                              Add To Your Calendar
                              <img
                                src={path_image + "isth_plus_icon.svg"}
                                alt=""
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="close-btn"
                        onClick={(e) => {
                          setSectionDiv("event-list-card-" + index);
                          handleClick({
                            ...item,
                            action: openStates[index]
                              ? "close_collapse"
                              : "open_collapse",
                            section_key: sectionMapping[item?.id],
                          });
                          handleToggle(index);
                        }}
                        aria-controls={`event-details-collapse-${index}`}
                        aria-expanded={!!openStates[index]}
                      >
                        {" "}
                        Click here to find out more{" "}
                        <img
                          src={path_image + "isth_drop_black_icon.svg"}
                          alt=""
                        />
                      </Button>
                    </div>
                  </Col>
                  {currentData &&
                    currentData.id === item.id &&
                    openStates[currentData.id] && (
                      <Collapse in={openStates[currentData.id]}>
                        <div
                          id={`event-details-data-${currentData.id}`}
                          className="event-details-collapse"
                        >
                          <div className="event-details-view">
                            <div
                              className="event-details-view-inset"
                              key={currentData.id}
                            >
                              <h3>{currentData.agenda_heading}</h3>
                              <p>{currentData.agenda_dis}</p>
                              <img
                                className="close-btn"
                                src={path_image + "close-arrow-icon.svg"}
                                alt=""
                                onClick={(e) => {
                                  handleClosed(currentData.id);
                                  handleClick({
                                    ...item,
                                    action: "close_collapse",
                                    section_key:
                                      sectionMapping[currentData?.id],
                                  });
                                }}
                              />
                              <div className="event-details-agenda">
                                <div className="event-details-agenda-inset">
                                  <Row>
                                    <Col
                                      md={3}
                                      className="event-details-agenda-details"
                                    >
                                      <h3>Agenda</h3>
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: currentData.agenda_details,
                                        }}
                                      />
                                    </Col>

                                    <Col
                                      md={9}
                                      className="event-details-agenda-speakers"
                                    >
                                      <div className="d-flex justify-content-between">
                                        {currentData.speakers.map(
                                          (speaker, index) => (
                                            <div
                                              className="event-agenda-speaker"
                                              key={"speaker" + index}
                                            >
                                              <div className="">
                                                <img src={speaker.img} alt="" />
                                                {speaker.intro && (
                                                  <p className="introduction">
                                                    {speaker.intro}
                                                  </p>
                                                )}
                                                <p
                                                  dangerouslySetInnerHTML={{
                                                    __html: speaker.details,
                                                  }}
                                                />
                                              </div>
                                              <p className="chair-person">
                                                {speaker.name}
                                              </p>
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                              <div className="event-agenda-list">
                                <div>
                                  <img
                                    src={path_image + "calendar-black-icon.svg"}
                                    alt=""
                                  />
                                  {/* <img src={path_image + "calendar-white.svg"} alt="" /> */}
                                  <p>{currentData.event_Date}</p>
                                </div>
                                <div>
                                  <img
                                    src={path_image + "clock-black-icon.svg"}
                                    alt=""
                                  />
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: currentData.event_time,
                                    }}
                                  />
                                </div>
                                <div>
                                  <img
                                    src={path_image + "location-black-icon.svg"}
                                    alt=""
                                  />
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: currentData.event_location,
                                    }}
                                  />
                                </div>
                                <div className="agenda-btn">
                                  <a
                                    download
                                    href={currentData.event_agenda_link}
                                    onClick={() => {
                                      handleDownload(
                                        {
                                          ...item,
                                          card_heading:
                                            currentData.agenda_heading,
                                          action: "download_agenda",
                                          section_key:
                                            sectionMapping[currentData?.id],
                                        },
                                        window.location.origin +
                                        item.event_ics_file,
                                      );
                                    }}
                                  >
                                    Download the Agenda here
                                  </a>
                                </div>
                              </div>
                              {currentData.show_symposium_agenda_heading_section && (
                                <div className="agenda-video">
                                  <div className="agenda-video-box d-flex align-items-center">
                                    <Row>
                                      <Col md={6} className="agenda-video-img">
                                        <div className="agenda-video-viewer">
                                          <img
                                            src={
                                              currentData.symposium_agenda_video_poster
                                            }
                                            alt=""
                                          />
                                          <div
                                            className="mobile_viewer"
                                            style={{ display: "none" }}
                                          >
                                            <img
                                              src={
                                                currentData.symposium_agenda_video_poster_mobile
                                              }
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div
                                          className="video-agenda-play"
                                          onClick={() =>
                                            openModal(
                                              currentData.agenda_play_video_url,
                                              currentData.symposium_agenda_video_poster,
                                              currentData.agenda_play_icon,
                                              currentData.symposium_agenda_heading,
                                            )
                                          }
                                        >
                                          <img
                                            src={currentData.agenda_play_icon}
                                            alt=""
                                          />
                                        </div>
                                      </Col>
                                      <Col
                                        md={6}
                                        className="agenda-video-details"
                                      >
                                        <div className="symposium-agenda">
                                          <h3 className="symposium-agenda-heading">
                                            {
                                              currentData.symposium_agenda_heading
                                            }{" "}
                                          </h3>

                                          <h3
                                            className="symposium-agenda-title"
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                currentData.symposium_agenda_sub_heading,
                                            }}
                                          />
                                          <h3
                                            className="symposium-agenda-subtitle"
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                currentData.symposium_agenda_sub_title,
                                            }}
                                          />
                                        </div>
                                      </Col>
                                      <div className="paris-outline-right">
                                        <img
                                          src={currentData.agenda_bottom_img}
                                          alt=""
                                        />
                                      </div>
                                    </Row>
                                  </div>
                                </div>
                              )}
                              {currentData.uniqueId === 102 && (
                                <div className="live-stream-wrapper">
                                  <div className="live-stream-banner">
                                    <div class="live-stream-left">
                                      <div class="live-icon">
                                        <img
                                          src={
                                            path_image + "livestream-icon.svg"
                                          }
                                          alt=""
                                        />
                                      </div>

                                      <div class="live-content">
                                        <h3>
                                          Watch the ISTH 2026 Octapharma
                                          Symposium Live Stream
                                        </h3>

                                        <div class="live-meta">
                                          <div class="meta-item">
                                            <img
                                              src={
                                                path_image +
                                                "calendar-black-icon.svg"
                                              }
                                              alt=""
                                            />
                                            Monday, 13 July. 2026
                                          </div>

                                          <div class="meta-item">
                                            <img
                                              src={
                                                path_image +
                                                "clock-black-icon.svg"
                                              }
                                              alt=""
                                            />
                                            12:15 - 13:30 CEST
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div class="live-stream-right">
                                      <a
                                        target="_blank"
                                        onClick={() =>
                                          handleEventInteraction("view", {
                                            title: item.card_heading,
                                            id: item.id,
                                            action: "register",
                                            section_key:
                                              sectionMapping[currentData?.id],
                                          })
                                        }
                                        href="https://events.docintel.app/event-registration?event=isth2026"
                                      >
                                        Register Now
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="disclamer-text">
                                <p>{currentData.disclamer_text}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Collapse>
                    )}
                </>
              ))}
            </Row>
          </section>
          <section className="oral-communication">
            <div className="oral-communication-inset">
              <h3>Selected Oral Communication Sessions</h3>
              <Row>
                {oral_communication.map((item, index) => (
                  <Col md={6} key={"oral_communication" + index}>
                    <div className="oral-communication-card">
                      <div>
                        <h6>{item.session_heading}</h6>
                        <p>{item.session_time}</p>
                      </div>
                      <div className="oral-communication-box d-flex align-items-start">
                        <div className="speaker-img">
                          <img src={item.speaker_img} alt="" />
                        </div>
                        <div className="session-details">
                          <h6>{item.session_subtitle}</h6>
                          <p>{item.session_details}</p>
                          <span>{item.speaker_name}</span>
                          <div className="session-venue">
                            <div className="d-flex align-items-center">
                              <div className="session-time d-flex align-items-center">
                                <img
                                  src={path_image + "event-clock1.svg"}
                                  alt=""
                                />
                                <p>{item.session_time_1}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </section>
          <section className="isth_promo_img">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={path_image + "paris-skyline-mobile.png"}
              />
              <img src={path_image + "paris-skyline-center.png"} alt="" />
            </picture>
          </section>
          <section className="scientific-development">
            <div className="scientific-development-inset">
              <h3>
                Learn more about clinical & scientific development by visiting
                the following posters
              </h3>
              <Row>
                {scientific_development.map((item, index) => (
                  <Col md={6} key={"scientific_development" + index}>
                    <div className="oral-communication-card">
                      <div className="oral-communication-box d-flex align-items-start">
                        <div className="speaker-img">
                          <img src={item.clinical_img} alt="" />
                        </div>
                        <div className="session-details">
                          <h6>{item.session_code}</h6>
                          <p>{item.session_details}</p>
                          <span>{item.scientific_name}</span>
                          <div className="session-venue">
                            <div className="d-flex align-items-center">
                              <div className="session-date d-flex align-items-center">
                                <img
                                  src={path_image + "event-calendar-u.svg"}
                                  alt=""
                                />
                                <p>{item.session_date}</p>
                              </div>
                              <div className="session-time d-flex align-items-center">
                                <img
                                  src={path_image + "event-clock1.svg"}
                                  alt=""
                                />
                                <p>{item.session_time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </section>
          <div className="disclaimer-text">
            <p>
              These sessions are for healthcare professionals only and are
              organised and sponsored by Octapharma. These include promotional
              sessions and products will be discussed. Prescribing information
              may vary depending on local approval in each country. Before
              prescribing any product, always refer to local materials such as
              the prescribing information and/or the summary of product
              characteristics.
            </p>
            <p>1016_HAEPAG_ISTH_2026. Date of preparation: April 2026</p>
          </div>
        </div>
      </div>
      <VideoPlayerModal
        videoData={videoData}
        onClose={closeModal}
        isFirst={isFirst}
      />
    </>
  );
};

export default ISTH2026Promo;
