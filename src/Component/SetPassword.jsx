import React, { useEffect, useRef,useState } from "react";
import {  Container, Row, Form, Button, Col } from 'react-bootstrap';
import { setPasswordValidation } from "./CommonComponent/Validations";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINT } from "../axios/apiConfig";
import {postData} from "../axios/apiHelper";
import { loader } from "./CommonComponent/Loader";
import VideoModal from "./CommonComponent/VideoModal";

let path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
const SetPassword = () => {
    const videoEl = useRef(null);
    const navigate = useNavigate();
    const [apiHit, setApiHit] = useState(false);
    const [active, setActive] = useState(false);
    const [apiErrorStatus, setApiErrorStatus] = useState('');
    const [apiMessage,setApiMessage] = useState('');
    const [apiCallStatus,setApiCallStatus] = useState(0);
    const [confirmClicked,setConfirmClicked] = useState(false)
    const [passwordClicked,setpasswordClicked] = useState(false)
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);
    const [showVideo, setShowVideo] = useState(false);
    const [user,setUser] =useState({
        password:"",
        confirmPassword:""
    })
    const [error, setError] = useState({
        password:"",
        confirmPassword:""
    });

    useEffect(() => {
         attemptPlay();
         activeLink();
    }, []);

    const attemptPlay = () => {
      videoEl &&
        videoEl.current &&
        videoEl.current.play().catch(error => {
          console.error("Error attempting to play", error);
        });
    };

    const handleChange = (e)=>{
       setUser({...user,[e.target.name]:e.target.value})
    }

    const activeLink = async () => {
      loader("show");
      try{
        let token = queryParams.get('hthhsdfhsfh').substring(0,queryParams.get('hthhsdfhsfh').length - 4);
        let body = {
           email: queryParams.get('email').trim().replace(" ", "+"),
           token: token,
           LangCode: queryParams.get('LangCode'),
        };
        const res = await postData(ENDPOINT.CHECKPASSLINK, body);
        setActive(res.data.success);
        setApiHit(true);
        setApiErrorStatus('');
        loader("hide");
        setTimeout(() =>{
            attemptPlay();
        },1000)
      }catch(err){
        setTimeout(() =>{
            attemptPlay();
        },1000)
        setApiHit(true);
        setApiErrorStatus(err?.response?.data?.message);
        console.log(err);
        loader("hide");
      }
    };

    const handleSubmit = async(e)=>{
      e.preventDefault()
      setApiMessage("");
      const error =  setPasswordValidation(user)
       if(Object.keys(error).length){
           setError(error)
           return ;
       }else{
         setError({password:"",confirmPassword:""})
           try{
           loader("show");
           let token = queryParams.get('hthhsdfhsfh').substring(0,queryParams.get('hthhsdfhsfh').length - 4);
           let body = {
              email: queryParams.get('email').trim().replace(" ", "+"),
              token: token,
              password: user?.password,
            };
            const setPass = await postData(ENDPOINT.SETPASSWORD, body);
            loader("hide");
            if(setPass?.data?.success){
              setApiCallStatus(1);
              setApiMessage(setPass?.data?.message);
              setUser({
                password:"",
                confirmPassword:""
              });
              setTimeout(function(){
                  navigateToLogin();
              }, 2000);
            }else{
              setApiMessage(setPass?.data?.message);
              setApiCallStatus(2);
            }
            loader("hide");
          }catch(err){
            setApiMessage("Something went wrong.");
            loader("hide");
          }
       }
    }

    const navigateToLogin = () => {
      navigate('/login');
    }
  const handleShowVideo = (newShowRequest) => {
    setShowVideo(newShowRequest);
    };
  return (
    <>
      {
        active == true ? (
          <div className="front-page set_password">
           <Container fluid>
               <Row>
                 <Col sm={6}>
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
                 <Col sm={6}>
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
                           <h5>Please set your password</h5>
                            <Form className="d-flex flex-wrap row" onSubmit={handleSubmit}>
                               <Form.Group className="form-group pass">
                                   <Form.Label>New Password <span>*</span></Form.Label>
                                   <Form.Control
                                     type={passwordClicked ? "text" : "password"}
                                     className={error?.password || error?.prepassword ? "validationErrors" : null}

                                   placeholder="Enter your new password" name="password" onChange={handleChange} />
                                   <span className="password_icon" onClick={()=>setpasswordClicked(!passwordClicked)}><img
                                      src={
                                      passwordClicked == true
                                       ? path_image + "password-eye.png"
                                       : path_image + "Union.png"
                                     }
                                    alt=""
                                      /></span>
                                   {error?.password ? (
                                    <div className="login-validation">{error?.password}</div>
                                     ) : ""}

                               </Form.Group>
                               <Form.Group className="form-group pass">
                                   <Form.Label>Confirm new password <span>*</span></Form.Label>
                                   <Form.Control
                                     className={error?.confirmPassword ? "validationErrors" : null}
                                   type={confirmClicked ? "text" : "password"}
                                   placeholder="Confirm your new password" name="confirmPassword" onChange={handleChange} />

                                   <span className="password_icon" onClick={()=>setConfirmClicked(!confirmClicked)}> <img
                                      src={
                                      confirmClicked == true
                                       ? path_image + "password-eye.png"
                                       : path_image + "Union.png"
                                     }
                                    alt=""
                                      /></span>
                                     {error?.confirmPassword ? (
                                    <div className="login-validation">{error?.confirmPassword}</div>
                                     ) : ""}
                               </Form.Group>
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

                               <Button variant="primary" type="submit">
                                  Save
                               </Button>
                           </Form>
                       </div>
                   </div>
                 </Col>
               </Row>
           </Container>
           {showVideo && (
          <VideoModal
            handleShowVideo={handleShowVideo}
          />
        )}
           </div>
        ):apiHit == true ? (
          <div className="link-expire">
            {
              apiErrorStatus != "" ?
              <h3>{apiErrorStatus}</h3>
              :
              <h3>The link is expired</h3>
            }
          </div>
        ) : null
      }
    </>
  )
}

export default SetPassword
