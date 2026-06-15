import React, { useEffect, useRef, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Navbar } from "react-bootstrap";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import ScrollContext from "../ScrollContext";
import "intersection-observer";
import { database } from "../../config/firebaseConfig";
import { ref, onValue, onDisconnect, set } from "firebase/database";
import useUserTracking from "../../hooks/useUserTracking";



const Header = () => {
  const navigate = useNavigate();
  const videoEl = useRef(null);
  const trackUserAction = useUserTracking();
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        // console.error("Error attempting to play", error);
      });
  };

  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }



  const userActivity = () => {
    let obj = {
      user_id: localStorage.getItem('un'),
      event_id: localStorage.getItem('evd')
    };
    if (obj.user_id && obj.event_id) {
      postData(`${ENDPOINT.LOGOUT}`, obj);
    }
    // const result = await getData(`${ENDPOINT.CHECK_LIVE}?status=0`)
    localStorage.removeItem("dhdjdluytt");
    localStorage.removeItem("bhdkdlolepk");
    localStorage.removeItem("dhdjdluytp");
    localStorage.removeItem("un");
    localStorage.removeItem("evd");
    localStorage.removeItem("name");
    localStorage.removeItem("country");
    localStorage.removeItem("email");
    localStorage.removeItem("ct");
    localStorage.removeItem("ec");
    localStorage.removeItem("questionArray");
    localStorage.removeItem("fireud");
    localStorage.removeItem("register");
    localStorage.removeItem("speed");

    deleteCookie("timeLeft");
    navigate("/login")
  }

  const {
    logoutBtnRef1,
    logoutBtnRef2
  } = useContext(ScrollContext);

  useEffect(() => {
    attemptPlay();
    if (logoutBtnRef1.current) {
      logoutBtnRef1.current.addEventListener('click', handleUserDisconnected);
    }
    if (logoutBtnRef2.current) {

      logoutBtnRef2.current.addEventListener('click', handleUserDisconnected);
    }
  }, [logoutBtnRef1, logoutBtnRef2]);


  const userId = localStorage.getItem('fireud');
  const sqlId = localStorage.getItem('un');
  const myConnectionsRef = ref(database, 'users/' + userId + '/connections');
  // const lastOnlineRef = ref(database, 'users/' + userId + '/lastOnline');
  const userStatusRef = ref(database, `users/${userId}/status`);
  const userIdRef = ref(database, `users/${userId}/user_id`);
  const connectedRef = ref(database, '.info/connected');

  const handleUserConnected = useCallback(() => {
    // const con = push(myConnectionsRef);
    // onDisconnect(con).remove();
    // set(con, true);

    // onDisconnect(lastOnlineRef).set(serverTimestamp());
    set(userStatusRef, 'online');
    set(userIdRef, sqlId);
    onDisconnect(userStatusRef).set('offline');
  }, [myConnectionsRef, userStatusRef, userIdRef, sqlId]);

  const handleUserDisconnected = useCallback(async () => {
    // await trackUserAction(0,`profile-setting`,""); 
    // set(lastOnlineRef, { timestamp: serverTimestamp() });
    set(userStatusRef, 'offline');
  }, [userStatusRef]);


  useEffect(() => {
    const unsubscribe = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        handleUserConnected();
      } else {
        handleUserDisconnected();
      }
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleUserConnected();
      } else {
        if (localStorage.getItem('evd') != 0) {
          updateLeftTime();
        }
        handleUserDisconnected();
      }
    };

    // document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      unsubscribe();
      // document.removeEventListener('visibilitychange', handleVisibilityChange);
    };

  }, [handleUserConnected, handleUserDisconnected, connectedRef]);




  const updateLeftTime = () => {
    let obj = {
      user_id: localStorage.getItem('un'),
      event_id: localStorage.getItem('evd')
    };
    if (obj.user_id && obj.event_id) {
      postData(`${ENDPOINT.LOGOUT}`, obj);
    }
  }


  let path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;

  return (
    <>
      <Navbar
        className={`header d-flex align-items-center justify-content-between `}
      >
        <div className="logo">
          <a href="https://onesource.octapharma.com/">
            <video
              playsInline
              muted
              loop
              alt="One Source Logo"
              src="https://docintel.s3.eu-west-1.amazonaws.com/image/one_Source_logg.mp4"
              ref={videoEl}
            />
          </a>
          {/* <img src={path_image + "one-source-logo.svg"} alt="" /> */}
        </div>
        <div className="login-status">
          <div className="logout-link">
            {/* <Link> */}
            <span
              onClick={() => {
                // alert("hi")
                handleUserDisconnected()
                userActivity()
                // localStorage.clear();
              }}
            >
              Log out <img src={path_image + "logout.svg"} alt="" />
            </span>
            {/* </Link> */}
          </div>
          <div className="login-date">{moment().format("DD MMMM YYYY")}</div>
        </div>
      </Navbar>

    </>
  );
};

export default Header;