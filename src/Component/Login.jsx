import React, { useEffect, useRef, useState } from "react";
import CryptoJS from "crypto-js";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "./CommonComponent/Validations";
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import { loader } from "./CommonComponent/Loader";
import VideoModal from "./CommonComponent/VideoModal";
import Modal from "react-bootstrap/Modal";
import { db, auth } from "../config/firebaseConfig";
import eventConfig from "../config/eventconfig.json";
import eventConfigUSA from "../config/eventconfigUSA.json";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import useCheckLinkValidity from "../hooks/useCheckLinkValidity";

const Login = () => {
  const videoEl = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [eyeClicked, setEyeClicked] = useState(false);
  const [cookieShow, setCookieShow] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [redirectionPath, setRedirectionPath] = useState();

  const userCountry = localStorage.getItem("country");
  const isUSA =  localStorage.getItem("un") == "2147541916" && (
    userCountry === "United States" ||
    userCountry === "USA" ||
    userCountry === "United States Minor Outlying Islands");

  const activeEventConfig = isUSA ? eventConfigUSA : eventConfig;
  // const validOrExpireLink = useCheckLinkValidity();

  const [user, setUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;

  const location = useLocation();
  useEffect(() => {
    const { qrToken } = location.state || {};
    setRedirectionPath("/home/share/" + qrToken || "/home");
  }, [location]);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  const passwordIconClicked = () => {
    setEyeClicked(!eyeClicked);
  };

  const handleShowVideo = (newShowRequest) => {
    setShowVideo(newShowRequest);
  };

  function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 3600 * 1000); // Convert hours to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const err = login(user);
      if (Object.keys(err)?.length) {
        setError(err);
        return;
      }
      loader("show");
      if (user?.rememberMe) {
        const encryptedEmail = CryptoJS.AES.encrypt(
          user?.email,
          import.meta.env.VITE_REACT_APP_CRYPTO_SECURITY_KEY
        ).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(
          user?.password,
          import.meta.env.VITE_REACT_APP_CRYPTO_SECURITY_KEY
        ).toString();
        // Store encrypted email and password in local storage
        localStorage.setItem("encryptedEmail", encryptedEmail);
        localStorage.setItem("encryptedPassword", encryptedPassword);
      } else {
        localStorage.removeItem("encryptedEmail");
        localStorage.removeItem("encryptedPassword");
      }
      setError({});
      const isLogin = await postData(`${ENDPOINT?.LOGIN}`, {
        email: user?.email,
        password: user?.password,
      });

      if (Object.keys(isLogin?.data?.data?.registered_event).length === 0) {
        localStorage.setItem("register", 0);
      } else {
        // if(isLogin?.data?.event_id!=undefined && isLogin?.data?.event_id!=0){
        let checkEventExist = Object.hasOwn(
          isLogin?.data?.data?.registered_event,
          isLogin?.data?.event_id
        );
        // let checkEventExist = Object.hasOwn(isLogin?.data?.data?.registered_event,eventConfig?.eventId)
        let exist = checkEventExist ? 1 : 0;
        localStorage.setItem("register", exist);
        // }else{
        //   localStorage.setItem("register",0);
        // }
      }

      let firebaseId = isLogin?.data?.data?.firebase_id;
      if (!firebaseId || firebaseId == "" || firebaseId == null) {
        const firebaseId = await checkAndCreateUser(user?.email);
        localStorage.setItem("fireud", firebaseId);

        const storeFireBase = await postData(`${ENDPOINT?.STORE_FIREBASE}`, {
          user_id: isLogin?.data?.data?.user_id,
          firebase_id: firebaseId,
        });
        //update firebase id in mysql
      } else {
        localStorage.setItem("fireud", firebaseId);
      }
      loader("hide");
      localStorage.setItem(
        "evd",
        isLogin?.data?.event_id ? isLogin?.data?.event_id : activeEventConfig?.eventId
      );
      localStorage.setItem(
        "eventCode",
        isLogin?.data?.event_code
          ? isLogin?.data?.event_code
          : activeEventConfig?.eventCode
      );
      localStorage.setItem("dhdjdluytt", isLogin?.data?.token);
      localStorage.setItem("bhdkdlolepk", "pastrara6789943dcgbh");
      localStorage.setItem("dhdjdluytp", "01245a4sd045");
      localStorage.setItem("un", isLogin?.data?.data?.user_id);
      localStorage.setItem("name", isLogin?.data?.data?.name);
      localStorage.setItem("ec", isLogin?.data?.data?.encryped_id);
      if (isLogin?.data?.data?.country != "0") {
        localStorage.setItem("country", isLogin?.data?.data?.country);
      }
      localStorage.setItem("email", isLogin?.data?.data?.username);
      localStorage.setItem("ct", isLogin?.data?.data?.consent);
      // if (redirectionPath.startsWith("/home/share/")) navigate(redirectionPath);
      // else navigate("/home");
      navigate("/home", {
        state: {
          urlParam: redirectionPath,
        },
      });

      if (isLogin.status === 200) {
        const token = isLogin?.data?.token;
        if (token.length > 0) {
          setCookie("timeLeft", token, 3);
        }
      }
    } catch (err) {
      console.log("err", err);
      loader("hide");
    }
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]:
        e.target.name == "rememberMe" ? e.target.checked : e.target.value,
    });
  };

  const hideCookieModal = () => setCookieShow(false);
  const showCookieModal = () => setCookieShow(true);

  const rememberMeFun = () => {
    if (localStorage.getItem("encryptedEmail")) {
      const decryptedEmail = CryptoJS.AES.decrypt(
        localStorage.getItem("encryptedEmail"),
        import.meta.env.VITE_REACT_APP_CRYPTO_SECURITY_KEY
      ).toString(CryptoJS.enc.Utf8);
      const decryptedPassword = CryptoJS.AES.decrypt(
        localStorage.getItem("encryptedPassword"),
        import.meta.env.VITE_REACT_APP_CRYPTO_SECURITY_KEY
      ).toString(CryptoJS.enc.Utf8);

      setUser({
        email: decryptedEmail,
        password: decryptedPassword,
        rememberMe: true,
      });
    }
  };

  const initalFun = async () => {
    try {
      const result = await postData(`${ENDPOINT?.VISITOR}`, {
        medium: "Web",
      });
    } catch (err) {
      console.log("-er", err);
    }
  };

  const checkAndCreateUser = async (email) => {
    try {
      const userId = await createUserIfNotExists(email);
      return userId;
    } catch (error) {
      console.error("Error in component:", error.message);
    }
  };

  const createUserIfNotExists = async (email) => {
    try {
      const userId = await checkUserExists(email);
      if (!userId) {
        // User does not exist, create a new user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          "12345678"
        );
        const user = userCredential.user;
        // Save additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          // Add any other user data you want to store
        });
        return user.uid;
      }
      // User already exists, return their ID
      return userId;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  };

  const checkUserExists = async (email) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        "12345678"
      );
      const user = userCredential.user;
      return user.uid;
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        // User does not exist, return null
        return null;
      } else {
        // Handle other errors
        console.error("Error checking user existence:", error.message);
        throw error;
      }
    }
  };

  useEffect(() => {
    loader("hide");
    initalFun();
    rememberMeFun();
    attemptPlay();
  }, []);
  return (
    <>
      <div className="front-page">
        <Container fluid>
          <Row>
            <Col sm={6} className="left-cont">
              <div className="login-left-side">
                <p>
                  <strong>To learn more about One Source</strong>{" "}
                  <span
                    className="video_pop"
                    onClick={() => handleShowVideo(true)}
                  >
                    CLICK HERE
                  </span>
                  <br />
                  <span>One Source</span> is a free service from Octapharma for
                  Health Care Professionals only.
                  <br />
                  The information in this asset has been developed for an
                  international audience. Accordingly, it may contain
                  information on products and/or indications that are not
                  approved in your country. Please consult your local
                  prescribing information.
                </p>
                <div className="copyright-links">
                  <Link to="/octapharma-privacy" target="_blank">
                    Octapharma Privacy Statement
                  </Link>
                  <Link to="/docintel-privacy" target="_blank">
                    Docintel Privacy Policy
                  </Link>
                  <Link to="/terms_of_use" target="_blank">
                    Term of Use
                  </Link>
                </div>
              </div>
            </Col>
            <Col sm={6} className="right-cont">
              <div className="login-page">
                <div className="one-source-logo">
                  <a href="https://onesource.octapharma.com/">
                    <video
                      playsInline
                      muted
                      // loop
                      alt="One Source Logo"
                      src="https://docintel.s3.eu-west-1.amazonaws.com/image/one_Source_logg.mp4"
                      ref={videoEl}
                    />
                  </a>
                </div>
                <div className="login-content log">
                  <Form className="login_form" onSubmit={handleSubmit}>
                    <Form.Group
                      className="form-group"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>
                        Email <span>*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={user?.email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                        className={error?.email ? "validationErrors" : null}
                      />
                      {error?.email ? (
                        <div className="login-validation">{error?.email}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group
                      className="form-group pass"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>
                        Password <span>*</span>
                      </Form.Label>
                      <Form.Control
                        type={eyeClicked ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        value={user?.password}
                        onChange={handleChange}
                        className={error?.password ? "validationErrors" : null}
                      />
                      <span
                        className="password_icon"
                        onClick={passwordIconClicked}
                      >
                        <img
                          src={
                            eyeClicked == true
                              ? path_image + "password-eye.png"
                              : path_image + "Union.png"
                          }
                          alt=""
                        />
                      </span>
                      {error?.password ? (
                        <div className="login-validation">
                          {error?.password}
                        </div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="form-group radio">
                      <input
                        type="checkbox"
                        value="remember-me"
                        checked={user?.rememberMe}
                        name="rememberMe"
                        onChange={handleChange}
                        id="checkbox-box"
                      />
                      <label htmlFor="checkbox-box">Remember me</label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Text className="form-group forgot-link">
                        <Link to="/forgot">Forget password?</Link>
                      </Form.Text>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                    <Form.Group>
                      <Form.Text>
                        Don't have an account?&nbsp;&nbsp;
                        <Link to="/register">Register</Link>
                      </Form.Text>
                    </Form.Group>
                  </Form>
                </div>
                <div className="page-copyright">
                  <p>
                    We only use essential cookies and no data is shared with 3rd
                    party.{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        showCookieModal();
                      }}
                    >
                      {" "}
                      Click here
                    </a>{" "}
                    to see the specifics.
                  </p>
                  <div className="copyright-links">
                    <Link to="/octapharma-privacy" target="_blank">
                      Octapharma Privacy Statement
                    </Link>
                    {/* <Link to="/docintel-privacy" target="_blank">
                      Docintel Privacy Policy
                    </Link>
                    <Link to="/terms_of_use" target="_blank">
                      Terms of Use
                    </Link> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <Modal
          show={cookieShow}
          onHide={hideCookieModal}
          className="cookieadd"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Used cookies</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>
              Essential cookies exclusively enhance your experience with us
              ensuring our system runs smoothly whilst recognising you for
              seamless recurring use. Be confident we never share your
              information with any commercial cookie company.
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
                        This cookie is used for storing the last seek time of
                        user for the particular video.
                      </td>
                    </tr>
                    <tr>
                      <td>name_use</td>
                      <td>
                        Used to autofill name of the user to help with
                        repetitive task. Only used in some circumstances where
                        user have been directed to the site based on previous
                        consent.{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>email_use</td>
                      <td>
                        Used to autofill email of the user to help with
                        repetitive task. Only used in some circumstances where
                        user have been directed to the site based on previous
                        consent.
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

        {showVideo && <VideoModal handleShowVideo={handleShowVideo} />}
      </div>
    </>
  );
};

export default Login;
