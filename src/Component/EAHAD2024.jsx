import ReactPlayer from "react-player";
import { Button, Col} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import React, { useState,useEffect, useRef } from 'react';
import { postData } from "../axios/apiHelper";
import { loader } from "./CommonComponent/Loader";
import { ENDPOINT } from "../axios/apiConfig";

const EAHAD2024 = () => {
    const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
    const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrollDownShown, setIsScrollDownShown] = useState(false);
  const agendaSectionRef = useRef(null);
  const [isFirstTime,setIsFirstTime] = useState({video1:true,video2:true});

  const [id, setId] = useState(-1);

  useEffect(() => {
  

    // trackingData({   
    //     calendarClicked :0,
    //     downloadClicked:0,
    //     videoClicked:0,
    //     linkClicked:0},
    //     "65bb8cb35e1d3e5c48033685");

    let body=document.getElementsByTagName("body");
      body[0].classList.add("eahad-promo");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
    setIsScrollDownShown(false)
        }
        else{
            setIsScrollDownShown(true)

        }
      },
      { threshold: 0.5 } 
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

  useEffect(()=>{
    trackingData({   calendarClicked :0,
        downloadClicked:0,
        videoClicked:0,
        linkClicked:0},id);
  },[])
  const trackingData = async (payload,id) => {
    try {
      loader("show");
    //   let payload = { id:'65bb8cb35e1d3e5c48033685',
    //    calendarClicked :0,
    //    downloadClicked:0,
    //    videoClicked:0,
    //    linkClicked:0
    //   }
    if(id!= -1){
        payload.id = id
    }
      const response = await postData(
        `${ENDPOINT.EAHAD_TRACKING}`,
        payload
      );
      setId(response.data.id);
      loader("hide");
    } catch (err) {
      loader("hide"); 
      console.error("Error fetching event ID:", err);
    }
   }

  const handlePlayPause =  () => {

    // trackingData({   calendarClicked :0,
    //     downloadClicked:0,
    //     videoClicked:1,
    //     linkClicked:0},-1);

    trackingData({
        calendarClicked :0,
        downloadClicked:0,
        videoClicked:1,
        linkClicked:0},
        id);

    setIsVisible(false)
    setIsPlaying(!isPlaying); 
  };
    const [show, setShow] = useState(false);
    const [cookieShow, setCookieShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const hideCookieModal = () => setCookieShow(false);
    const showCookieModal = () => setCookieShow(true);

    const downloadIcs =() => {
       trackingData({
        calendarClicked :1,
        downloadClicked:0,
        videoClicked:0,
        linkClicked:0},
       id);

        const url = path_image + "EAHAD_2024.ics";
    
        // Create a dynamic link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Calendar.ics'; // Add the download attribute
    
        // Append the link to the document body and trigger the click event
        document.body.appendChild(link);
        link.click();
    
        // Clean up by removing the link
        document.body.removeChild(link);
    };

    const download = () => {
        trackingData({   
            calendarClicked :0,
            downloadClicked:1,
            videoClicked:0,
            linkClicked:0},
          id);
    }

    const link = () => {
        trackingData({   
            calendarClicked :0,
            downloadClicked:0,
            videoClicked:0,
            linkClicked:1},
            id);
    }

    const smoothScroll = () => {
        if (agendaSectionRef.current) {
          agendaSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };

    const data = [
        {
          image:`${path_image}astermark.png`,
          title:"Challenging the Status Quo: <br/>Re-evaluating Prophylaxis in VWD",
          speaker:"Chair: Jan Astermark, SE",
        }, {
          image:`${path_image}sidonio.png`,
          title:"Insights from the WIL-31 Study<br/> Child Living with VWD",
          speaker:"Robert F. Sidonio Jr., US",
        }
        , {
          image:`${path_image}boban.png`,
          title:"Adult Living with Frequent Nose Bleeds",
          speaker:"Ana Boban, HR",
        }, {
          image:`${path_image}kiss.png`,
          title:"Female Experiencing Heavy <br/>Menstrual Bleeding",
          speaker:"Csongor Kiss, HU",
        }, {
          image:`${path_image}qa-demo.png`,
          title:"Q&A",
          speaker:"Speakers and Audience",
        }
      ]
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
          <div className="promotion-page-header">
            <div className="header-video">
              <div className="underspotlight">
                <img src={path_image + "underspotlight.svg"} alt="" />
                <h5>Join us at EAHAD 2024, Frankfurt, DE</h5>
                <h1>Shifting Prophylaxis Paradigms in VWD</h1>
                <h2>The WIL-31 Study in Focus</h2>
              </div>
              <div className="agenda-video">
                <ReactPlayer
                  className="one_source_video"
                  playing={true}
                  // poster={path_image + "eahad-video-poster.jpg"}
                  src={path_image + "EAHAD-2024-agenda-video_07.mp4"}
                  controls={true}
                  width="100%"
                  height="auto"
                  onPlay={() => setIsFirstTime({...isFirstTime, video1: false})}
                  autoplay={true}
                  muted={true}
                  loop={true}
                />
                {isFirstTime.video1 && (
                  <img
                    className="thumbnail"
                    src={path_image + "eahad-video-poster.jpg"}
                    alt="poster"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="header-event">
            <Col>
              <img src={path_image + "calendar-icon.svg"} alt="" />
              <h3>Wednesday, February 7. 2024</h3>
            </Col>
            <Col>
              <img src={path_image + "clock-icon.svg"} alt="" />
              <h3>17:30-18:45 </h3>
            </Col>
            <Col>
              <img src={path_image + "maps-and-flags-icon.svg"} alt="" />
              <h3>Panorama Room 2</h3>
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
                <div className="agenda-speakers-listed">
                  <h3>AGENDA & SPEAKERS</h3>
                  <div className="speakers-list">
                    {data.map((item, index) => (
                      <div key={item.id || index} className="speakers-quotes">
                        <img src={item.image} alt="" />
                        <div className="agenda-content-detail">
                          <p
                            className="quotes"
                            dangerouslySetInnerHTML={{ __html: item.title }}
                          ></p>
                          <span className="spaker-name">{item.speaker}</span>
                          <span className="blank_dash">&nbsp;</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="octapharma-logo">
                    <img src={path_image + "octapharma_rgb.png"} alt="" />
                  </div>
                </div>
                <div className="download-agenda-file">
                  <h5>Under spotlight EAHAD 2024 agenda </h5>
                  <div className="download-btn">
                    <a
                      download
                      href={path_image + "SPOTLIGHT_EAHAD.pdf"}
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
                      <img src={path_image + "sidonio.png"} alt="" />
                      <p>Robert F. Sidonio Jr.</p>
                      <p>
                        <span>
                          Hemophiloa of Georgia Center for Bleeding and Clotting{" "}
                          <br />
                          Disorders, US
                        </span>
                      </p>
                    </div>
                    <div className="speaker-quote-block">
                      <h2>
                        “Why do our von Willebrand disease patients put up with
                        so much bleeding?”
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="wilprophy-box">
                  <div className="wilprophy-box-inset" onClick={handleShow}>
                    <img src={path_image + "wilphopy-img.png"} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="promotion-page-footer">
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
                      playing={isPlaying}
                      //playIcon={<button>Play</button>}
                      //light={path_image + "play-button.png"}
                      // poster={path_image + "video_md_logo.png"}
                      src="https://docintel.s3.eu-west-1.amazonaws.com/onesource_videos/img_1685517635.mp4"
                      controls={true}
                      width="640"
                      height="360"
                      onPause={() => {}}
                      onPlay={() => setIsFirstTime({...isFirstTime, video2: false})}
                    />
                    {isFirstTime.video2 && (
                      <img
                        className="thumbnail"
                        src={path_image + "video_md_logo.png"}
                        alt="poster"
                      />
                    )}
                    {isVisible ? (
                      <div className="video-btn-play" onClick={handlePlayPause}>
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
                <span>589_HAEPAG_EAHAD 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="wilphopy-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img src={path_image + "wilphopy-img.png"} alt="" />
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
}

export default EAHAD2024