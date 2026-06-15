import React, { useEffect, useRef,useState } from "react";
import {  Container, Row, Form, Button, Col } from 'react-bootstrap';
import { forgetValidation } from "./CommonComponent/Validations";
import { Link, useNavigate } from "react-router-dom";
import { externalApi } from "../axios/apiHelper";
import { loader } from "./CommonComponent/Loader";
import VideoModal from "./CommonComponent/VideoModal";
import { toast } from "react-toastify";


const Forgot = () => {
    let path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
    const videoEl = useRef(null);
    const navigate = useNavigate();
    const [apiCallStatus,setApiCallStatus] = useState(0);
    const [apiMessage,setApiMessage] = useState('');
    const [user,setUser] =useState({
        email:"",
    })
    const [error, setError] = useState({
        email:"",
    });
  const [showVideo, setShowVideo] = useState(false);
    useEffect(() => {
      loader("hide");
      attemptPlay();
    }, []);

    const attemptPlay = () => {
      videoEl &&
        videoEl.current &&
        videoEl.current.play().catch(error => {
          console.error("Error attempting to play", error);
        });
    };
  const handleShowVideo = (newShowRequest) => {
    setShowVideo(newShowRequest);
  };
    const handleChange = (e)=> {
       setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        setApiMessage("");
        const error =  forgetValidation(user)
        if(Object.keys(error).length){
            setError(error)
            return ;
        }else{
          setError({email:""});
          loader("show");
          try{
            const result = await externalApi(
              import.meta.env.VITE_REACT_APP_API_INDEX_URL+"/frgtpasswordone",
              "post",
              { method: "frgtpasswordone", emailid: user?.email}
            );
            if(result?.data?.success){
            setApiCallStatus(1);
              setApiMessage(result?.data?.frgtpasswordone?.status);
              setUser({...user,['email']:''})
              // setTimeout(function(){
                  navigate('/got-mail');
              // }, 2000);
            }else{
              setApiCallStatus(2);
              setApiMessage(result?.data?.frgtpasswordone?.status);
              toast.error(result?.data?.errors);
            }
            loader("hide");
          }catch(err){
            console.log(err);
            setApiCallStatus(2);
            setApiMessage("Something went wrong");
            loader("hide");
            toast.error("Something went wrong");
          }
        }
    }

    const navigateToLogin = () => {
      navigate('/login');
    }

  return (
    <>
       <div className="front-page forgot">
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
                    <Link to="/terms_of_use" target="_blank">Terms of Use</Link>
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
                        <h5 className="forgot_pass">Forgot your password?</h5>
                        <p>Please enter your email to reset your password</p>
                         <Form className="d-flex flex-wrap row" onSubmit={handleSubmit}>
                            <Form.Group className="form-group" controlId="formBasicEmail">
                              <Form.Label>Email <span>*</span></Form.Label>
                              <Form.Control
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                value={user?.email}
                                className={error?.email ? "validationErrors" : null}
                              />
                              {error?.email ? (
                                <div className="login-validation">{error?.email}</div>
                              ) : null}

                              {

                                apiCallStatus == 1 && (
                                  <p className="success">{apiMessage}</p>
                                )

                              }
                              {
                                apiCallStatus == 2 && (
                                  <p className="danger">{apiMessage}</p>
                                )
                              }
                            </Form.Group>
                            <Button variant="primary" type="submit">
                               Send
                            </Button>
                            <Button variant="primary" className="btn-bordered" onClick={navigateToLogin}>
                               Cancel
                            </Button>
                        </Form>
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

export default Forgot
