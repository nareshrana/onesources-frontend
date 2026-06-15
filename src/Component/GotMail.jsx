import React, { useEffect, useRef,useState } from "react";
import {  Container, Row, Form, Button, Col } from 'react-bootstrap';
import { forgetValidation } from "./CommonComponent/Validations";
import { Link, useNavigate } from "react-router-dom";
import VideoModal from "./CommonComponent/VideoModal";
import { loader } from "./CommonComponent/Loader";

const GotMail = () => {
    const videoEl = useRef(null);
    const navigate = useNavigate();
    const [confirmClicked,setConfirmClicked] = useState(false)
    const [passwordClicked,setpasswordClicked] = useState(false)
    const [showVideo, setShowVideo] = useState(false);
    const [user,setUser] =useState({
        password:"",
        confirmPassword:""
    })
    const [error, setError] = useState({
        password:"",
        confirmPassword:""
    });

    let path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
    const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };

        useEffect(() => {
          loader("hide")
         attemptPlay();
    }, []);
    const handleShowVideo = (newShowRequest) => {
    setShowVideo(newShowRequest);
    };
  return (
    <>
       <div className="front-page">
        <Container fluid>
            <Row>
              <Col sm={6} className="left-cont">
                <div className="login-left-side">
                  <p><strong>To learn more about One Source</strong> <span className="video_pop" onClick={() =>
                  handleShowVideo(true)
                }>CLICK HERE</span><br/><span>One Source</span> is a free service from Octapharma for Health Care Professionals only.<br/>
                The information in this asset has been developed for an international audience. Accordingly, it may contain information on products and/or indications that are not approved in your country. Please consult your local prescribing information.
                </p>
                <div className="copyright-links">
                    <Link to="/octapharma-privacy" target="_blank">Octapharma Privacy Statement</Link>
                    <Link to="/docintel-privacy" target="_blank">Docintel Privacy Policy</Link>
                    <Link to="/terms_of_use" target="_blank">Term of Use</Link>
                </div>
                </div>
              </Col>
              <Col sm={6} className="right-cont">
                <div className="forgot-page">
                  <div className="one-source-logo">
                    <a href="https://onesource.octapharma.com/">
                        <video
                        playsInline
                        muted
                        alt="One Source Logo"
                        src="https://docintel.s3.eu-west-1.amazonaws.com/image/one_Source_logg.mp4"
                        ref={videoEl}
                      />
                    </a>
              </div>
                    <div className="set-password">
                        <h5 className="forgot_pass">You've got an email</h5>
                        <h6>Please check your email to complete the reset of your password</h6>

                            <Link to="/login">
                               Go to login page
                            </Link>

                    </div>
                </div>
               {/* <div className="login-page thanks-register">
                    <div className="one-source-logo">
                        <video playsInline muted loop alt="All the devices" src="https://docintel.s3.eu-west-1.amazonaws.com/image/one_Source_logg.mp4" ref={videoEl}/>
                    </div>
                    <div className="success-messages">
                      <h5>Thank you for registering!</h5>
                      <h6>An email was sent to you with your one source login details</h6>
                      <Link to="/login">Continue</Link>
                    </div>
                </div> */}
              </Col>
            </Row>
        </Container>
        {showVideo && (
          <VideoModal
            handleShowVideo={handleShowVideo}
          />
        )}
        </div>
    </>
  )
}

export default GotMail
