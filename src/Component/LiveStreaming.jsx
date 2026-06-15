import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useReducer,
  memo,
  use,
} from "react";
import { contactForm } from "./CommonComponent/Validations";
import { loader } from "./CommonComponent/Loader";
import { docintelExternal, getData, postData } from "../axios/apiHelper";
import { Button } from "react-bootstrap";
import { ENDPOINT } from "../axios/apiConfig";
import ScrollContext from "./ScrollContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestoredb } from "../config/informedfirebaseconfig";
import eventConfig from "../config/eventconfig.json";
import eventConfigUSA from "../config/eventconfigUSA.json";

import moment from "moment";
import WebinarPolls from "./WebinarPolls";
import { speed } from "../util/speedUtils";
import StreamPlayer from "./StreamPlayer/StreamPlayer";
import StreamPlayerWithTracking from "./StreamPlayer/StreamPlayerWithTracking";

const initialState = {
  flag: 0,
  title: "",
  url: "",
  time: "",
  endDate: "",
  endTime: "",
  real_event_id: "",
  posterUrl: "",
  company_id: "",
  // endDate:result?.data?.data?.upcoming_event?.end_date,
  // endTime:result?.data?.data?.upcoming_event?.end_time
};
const reducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        flag: action.payload.flag,
        url: action.payload.url,
        title: action.payload.title,
        time: action.payload.time,
        endDate: action.payload.endDate,
        endTime: action.payload.endTime,
        real_event_id: action.payload.real_event_id,
        poster_url: action.payload.poster_url,
        company_id: action.payload.company_id,
      };
    case "EVENT":
      return {
        flag: action.payload.flag,
      };
    case "RESET":
      return {
        flag: action.payload.flag,
      };
    default:
      return initialState;
  }
};
const LiveStreaming = ({ handleEvent, eventData }) => {
  const { webinarRef } = useContext(ScrollContext);
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const videoEl = useRef(null);
  const isFirstTime = useRef(true);

  const [liveObj, setLiveObj] = useState({
    flag: 0,
    title: "",
    url: "",
    real_event_id: "",
  });

  const [state, dispatch] = useReducer(reducer, initialState);
  const hasSeenActiveState = useRef(false);
  const {
    flag,
    title,
    url,
    time,
    endDate,
    endTime,
    real_event_id,
    poster_url,
    company_id,
  } = state;

  const [sectionLoader, setSectionLoader] = useState(false);

  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("");

  const [questionList, setQuestionList] = useState([]);
  const [error, setError] = useState({});
  const [user, setUser] = useState({
    email: "",
    phone: "",
    message: "",
  });
  const [successFlag, setSuccessFlag] = useState({
    contactStatus: 0,
    pollStataus: 0,
    chatStatus: 0,
  });
  const [DD, setDD] = useState(null);
  const [HH, setHH] = useState(null);
  const [MM, setMM] = useState(null);
  const [SS, setSS] = useState(null);
  const [endd, setEndd] = useState("");
  const [apiCallMsg, setApiCallMsg] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [timezone, setTimezone] = useState("Europe/Berlin");
  const newTimestamp = useRef(0);

  const userCountry = localStorage.getItem("country");

  const isUSA =  localStorage.getItem("un") == "2147541916" && (
    userCountry === "United States" ||
    userCountry === "USA" ||
    userCountry === "United States Minor Outlying Islands");

  const activeEventConfig = isUSA ? eventConfigUSA : eventConfig;

  const [displayPopup, setDsplayPopup] = useState(
    window.innerWidth >= 1200 ? "" : "chat"
  );
  const [displayPopupStatus, setDsplayPopupStatus] = useState(
    window.innerWidth >= 1200 ? false : true
  );
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  const EventDataFun = async () => {
    try {
      loader("show");
      const result = await postData(ENDPOINT.EVENT_ID, {
        id: eventData?.id,
        eventCode: activeEventConfig?.eventCode,
        userId: localStorage.getItem("un"),
        method: "zoom",
        // eventCode: 'cl1_case_2024'
      });
      // setEvent(result.data.data);
      handleEvent({ ...eventData, ...result.data.data });
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };

  useEffect(() => {
    const delayedFunction = async () => {
      const getlocalspeed = localStorage.getItem("speed");

      if (!getlocalspeed) {
        const getSpeed = await speed();
        let obj = {
          user_id: localStorage.getItem("un"),
          event_id: localStorage.getItem("evd"),
          speed: getSpeed,
        };

        if (obj.user_id && obj.event_id) {
          postData(`${ENDPOINT.LOGOUT}`, obj);
        }
        localStorage.setItem("speed", getSpeed);
      } else {
      }
    };
    const timeoutId = setTimeout(delayedFunction, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // var date = "2023-03-13";
    // var time = "18:00:00";

    var now = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");
    if (endd !== "") {
      // let ab =  moment.utc(endd).local('America/Montreal').format('YYYY-MM-DD HH:mm:ss');
      let end = moment(endd);
      // moment("2023-06-27T17:47:00.000Z").tz('America/Montreal')

      // moment(endd);
      let duration = moment.duration(end.diff(now)); // Difference between end and now

      let totalSeconds = duration.asSeconds();

      if (totalSeconds > 0) {
        let days = Math.floor(duration.asDays());
        let hours = duration.hours();
        let minutes = duration.minutes();
        let seconds = duration.seconds();
        let formattedHours = ("0" + Math.max(hours, 0)).slice(-2);
        let formattedMinutes = ("0" + Math.max(minutes, 0)).slice(-2);
        let formattedSeconds = ("0" + Math.max(seconds, 0)).slice(-2);

        setTimeout(() => {
          setDD(days);
          setHH(formattedHours);
          setMM(formattedMinutes);
          setSS(formattedSeconds);
        }, 1000);
      } else {
        // If the duration is negative, set all values to 0
        setDD(0);
        setHH("00");
        setMM("00");
        setSS("00");
      }
    }
  }, [SS, endd]);

  useEffect(() => {
    attemptPlay();
    // eventStart();
    EventDataFun();
    const existingArray =
      JSON.parse(localStorage.getItem("questionArray")) || [];
    setQuestionList(existingArray);
  }, []);

  const openStreamPopup = (type) => {
    setDsplayPopup(type);
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const contactSubmit = async (e) => {
    e.preventDefault();
    const err = contactForm(user);
    if (Object.keys(err)?.length) {
      setError(err);
      return;
    } else {
      setError({});
      // //loader("show");
      setLoading(true);
      try {
        let body = {
          company_id: company_id,
          event_id: real_event_id ? real_event_id : activeEventConfig?.eventId,
          user_id: localStorage.getItem("un"),
          detail: user?.message,
          email: user?.email,
          phone: user?.phone,
        };
        const result = await docintelExternal(
          import.meta.env.VITE_REACT_APP_API_KEY + "save_contact",
          "post",
          body
        );
        setLoading(false);

        if (result?.data?.status == 1) {
          setUser({
            email: "",
            phone: "",
            message: "",
          });
          setApiCallMsg("We have recieved your details.");
          setSuccessFlag({
            ...successFlag,
            ["contactStatus"]: 1,
          });

          setTimeout(function () {
            setSuccessFlag({
              ...successFlag,
              ["contactStatus"]: 0,
            });
          }, 4000);
        } else {
          setApiCallMsg("Something went wrong.");
          setSuccessFlag({
            ...successFlag,
            ["contactStatus"]: 2,
          });

          setTimeout(function () {
            setSuccessFlag({
              ...successFlag,
              ["contactStatus"]: 0,
            });
          }, 4000);
        }
        //loader("hide");
      } catch (err) {
        setApiCallMsg("Something went wrong");
        setSuccessFlag({
          ...successFlag,
          ["contactStatus"]: 2,
        });

        setTimeout(function () {
          setSuccessFlag({
            ...successFlag,
            ["contactStatus"]: 0,
          });
        }, 4000);
        setLoading(false);
      }
    }
  };

  const handleQuestionChange = (e) => {
    // setUserQuestion(e.target.value);
    let input = e.target.value;
    if (input.length > 500) {
      input = input.slice(0, 500);
    }
    setUserQuestion(input);
  };

  const questionSubmit = async (e) => {
    e.preventDefault();
    if (userQuestion.trim() == "") {
      setError({ question: "Please enter your question" });
      return;
    } else {
      // //loader("show");
      setLoading(true);
      setError({});
      try {
        let body = {
          company_id: company_id,
          event_id: real_event_id ? real_event_id : activeEventConfig?.eventId,
          user_id: localStorage.getItem("un"),
          question: userQuestion,
          portal: "onesource",
          name: localStorage.getItem("name"),
        };

        const result = await docintelExternal(
          import.meta.env.VITE_REACT_APP_API_KEY + "save_question",
          "post",
          body
        );
        setLoading(false);
        if (result?.data?.status == 1) {
          const existingArray =
            JSON.parse(localStorage.getItem("questionArray")) || [];
          const newItem = userQuestion;
          existingArray.push(newItem);
          localStorage.setItem("questionArray", JSON.stringify(existingArray));

          const updatedArray = [...questionList, userQuestion];
          setQuestionList(updatedArray);
          setUserQuestion("");
          setSuccessFlag({
            ...successFlag,
            ["chatStatus"]: 1,
          });

          setTimeout(function () {
            setSuccessFlag({
              ...successFlag,
              ["chatStatus"]: 0,
            });
          }, 4000);
          //loader("hide");
        } else {
          setSuccessFlag({
            ...successFlag,
            ["chatStatus"]: 2,
          });

          setTimeout(function () {
            setSuccessFlag({
              ...successFlag,
              ["chatStatus"]: 0,
            });
          }, 4000);
          //loader("hide");
        }
      } catch (err) {
        setLoading(false);
        setSuccessFlag({
          ...successFlag,
          ["chatStatus"]: 2,
        });
        setTimeout(function () {
          setSuccessFlag({
            ...successFlag,
            ["chatStatus"]: 0,
          });
        }, 4000);
        //loader("hide");
        console.log(err);
      }
    }
  };
  const eventStart = async () => {
    try {
      const user_id = localStorage.getItem("un");
      const result = await getData(
        import.meta.env.VITE_REACT_APP_API_URL_LUMEN +
          ENDPOINT.CHECK_LIVE +
          "?status=1&uid=" +
          user_id
      );

      if (result?.data?.data) {
        const upcoming_event = result.data.data.upcoming_event;
        if (upcoming_event) {
          const {
            eventDate,
            start_time,
            timezone_name,
            currentTime,
            streaming_url,
            title,
            real_event_id,
            poster_url,
            company_id,
            live_status,
          } = upcoming_event;

          const date = new Date(`${eventDate} ${start_time}`);
          setEndd(date.toISOString());
          if (timezone_name) setTimezone(timezone_name);
          if (currentTime) newTimestamp.current = Date.parse(currentTime);

          dispatch({
            type: "START",
            payload: {
              flag: result.data.code,
              url: streaming_url,
              title: title,
              time: currentTime,
              endDate: eventDate,
              endTime: start_time,
              real_event_id: real_event_id,
              poster_url: poster_url,
              company_id: company_id,
            },
          });
          if (live_status == 2 || live_status == 4) {
            const result = await postData(ENDPOINT.STORELOGINDATA, {
              user_id: localStorage.getItem("un"),
              speed: localStorage.getItem("speed"),
              real_event_id: real_event_id,
            });
            let data = result?.data?.data;
            if (eventData?.id == 0 || eventData?.companyId == 0) {
              handleEvent({
                id: data?.event_id,
                companyId: data?.company_id,
                eventDate: data?.eventDate,
                speed: localStorage.getItem("speed"),
              });
            }
            if ((live_status == 2 || live_status == 4) && !isFirstTime.current) {
              location.reload();
            } else {
              isFirstTime.current = false;
            }
            localStorage.setItem("evd", activeEventConfig?.eventId);
            localStorage.setItem("eventCode", activeEventConfig?.eventCode);
          } else if (live_status == 3) {
            let obj = {
              user_id: localStorage.getItem("un"),
              event_id: activeEventConfig?.eventId,
            };
            const logout = postData(`${ENDPOINT.LOGOUTFROMLIVE}`, obj);
          }
        } else {
          dispatch({
            type: "START",
            payload: initialState,
          });
        }
      }
    } catch (err) {
      console.log("-er", err);
    }
  };

  let currentEventId = localStorage.getItem("evd");
  useEffect(() => {
    // if(real_event_id){
    let previousData;
    let ev_id = activeEventConfig?.eventId;
    // let ev_id = eventConfig?.eventId;
    const q = query(
      collection(firestoredb, "webinar_settings"),
      where("event_id", "==", ev_id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const newData = doc.data();

        if (newData) {
          eventStart();
          previousData = newData;
          // }
        }
      });
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
    // }
  }, []);

  useEffect(() => {
    if (liveObj?.flag != flag) {
      if (flag) {
        if ((flag == 2 || flag == 4) && url != liveObj?.url) {
          setLiveObj({
            title: title,
            url: url,
            flag: flag,
            real_event_id: real_event_id,
          });
          return;
        }
        let date = new Date(`${endDate} ${endTime}`);
        setEndd(date.toISOString());
        setStartTime(time);
        setLiveObj({ title: title, flag: flag, real_event_id: real_event_id });
      } else {
        if (liveObj?.flag != 0) {
          setLiveObj({
            flag: 0,
          });
        }
      }
    }
  }, [flag]);

  useEffect(() => {
    if (flag !== 0) {
      hasSeenActiveState.current = true;
    }

    if (poster_url && poster_url.includes("thanks-watch.jpg") && flag == 3) {
      const hasReloaded = localStorage.getItem("thanks_watch_reloaded");
      if (!hasReloaded) {
        const timer = setTimeout(() => {
          localStorage.setItem("thanks_watch_reloaded", "true");
          window.location.reload();
        }, 2000);
        return () => clearTimeout(timer);
      }
    } else if (hasSeenActiveState.current) {
      localStorage.removeItem("thanks_watch_reloaded");
    }
  }, [poster_url, flag]);

  //flag checked

  const liverStreamFun = () => {
    return (
      <>
        <div className="webinar-popup">
          <WebinarPolls 
          eventData={eventData}
          />
        </div>

        {/*https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/hls/de3f6ca7-2db3-4689-8160-0f574a5996ad/playlist.m3u8*/}

        <div
          className={`live-streaming section-left-side section-layout ${
            liveObj?.flag == 4 ? "preview-video" : ""
          } `}
          ref={webinarRef}
          data-section=""
        >
          <input type="hidden" id="change_flag" value="0" />
          <div className="section-title">
            <p dangerouslySetInnerHTML={{ __html: liveObj?.title }} />
          </div>
          <div className="view-portal">
            {
              <div
                className={
                  displayPopupStatus != ""
                    ? "webinar-video active"
                    : "webinar-video"
                }
              >
                {liveObj.flag == 1 ? (
                  <div className="webinar-live">
                    <div className="webinar-live-inset">
                      <div className="event-status webinar-portal">
                        <div className="upcoming-event-cal">
                          <div id="dayLive" className="days">
                            {endd != "" ? DD : "00"}
                          </div>
                          <span>DAY</span>
                        </div>
                        <div className="upcoming-event-cal">
                          <div id="hourLive" className="hours">
                            {endd != "" ? HH : "00"}
                          </div>
                          <span>HRS</span>
                        </div>
                        <div className="upcoming-event-cal">
                          <div id="minuteLive" className="mins">
                            {endd != "" ? MM : "00"}
                          </div>
                          <span>MIN</span>
                        </div>
                        <div className="upcoming-event-cal">
                          <div id="secondLive" className="mins">
                            {endd != "" ? SS : "00"}
                          </div>
                          <span>SEC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : liveObj.flag == 2 ? (
                  <div className="video-play">
                    {liveObj?.url &&
                    (liveObj?.url.endsWith("mp4") ||
                      liveObj?.url.endsWith("m3u8")) ? (
                      <StreamPlayer streamingUrl={liveObj?.url} />
                    ) : (
                      <iframe
                        title=" "
                        src={liveObj?.url}
                        allowFullScreen={true}
                        allow="autoplay; fullscreen; picture-in-picture"
                        width="900"
                        height="420"
                      ></iframe>
                    )}
                  </div>
                ) : liveObj.flag == 4? (
                  <div className="video-play">
                    <StreamPlayerWithTracking
                      streamingUrl={liveObj?.url}
                      previewVideo={true}
                    />
                  </div>
                ) : liveObj.flag == 3 ? (
                  <div className="video-poster webinar-live">
                    {real_event_id ? (
                      <img
                        alt="Thank You"
                        src={
                          poster_url
                            ? poster_url
                            : real_event_id == "383"
                            ? "/images/wilate-banner.png"
                            : real_event_id == "384"
                            ? "/images/newiq-banner.png"
                            : null
                        }
                      />
                    ) : null}
                  </div>
                ) : null}

                {(() => {
                  const streamingFeature = eventData?.streaming_features || "";
                  const streamingFeatureArray = streamingFeature
                    .split("~")
                    .map((f) => f.trim());
                  const hasQuestionsWindow =
                    streamingFeatureArray.includes("Questions window") &&
                    liveObj?.flag != 4;

                  if (!hasQuestionsWindow) return null;

                  return (
                    <div className="chat-option-view">
                      <div className="chat-option-list-inset">
                        <ul className="close-chat">
                          <li>
                            <button id="close-chat-button">
                              <img
                                className="close_popup"
                                src={path_image + "close-icon.png"}
                                alt="Close-popup"
                                onClick={(e) => {
                                  setDsplayPopup("");
                                  setDsplayPopupStatus(false);
                                  setError({});
                                }}
                              />
                            </button>
                          </li>
                        </ul>
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item nav-item-question">
                            <a
                              className={
                                displayPopup == "chat"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-toggle="tab"
                              href="#question"
                              role="tab"
                              aria-selected="true"
                            >
                              Your questions
                            </a>
                          </li>
                          <li className="nav-item nav-item-contact">
                            <a
                              className={
                                displayPopup == "contact"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-toggle="tab"
                              href="#contact"
                              role="tab"
                              aria-selected="false"
                            >
                              Contact
                            </a>
                          </li>
                          <li className="nav-item nav-item-call">
                            <a
                              className={
                                displayPopup == "poll"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-toggle="tab"
                              href="#call"
                              role="tab"
                            >
                              Poll
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div
                            className={
                              displayPopup == "poll"
                                ? "tab-pane active"
                                : "tab-pane"
                            }
                            id="poll"
                          >
                            <div className="poll-popup-middle">
                              <div className="contact-popup-text">
                                <p>
                                  During the Symposia you will be able to cast
                                  your vote on various topics from this screen.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className={
                              displayPopup == "chat"
                                ? "tab-pane active"
                                : "tab-pane"
                            }
                            id="question"
                          >
                            {/*<div className="open-chat-popup-view">
  
                          questionList?.length > 0 ?
                          questionList?.map((item,index)=>{
                            return(<div className="chat_view right"><p>{item}</p></div>)
                          })
                          : <p className="no_question">No questions</p>
  
                      </div>*/}
                            <div className="open-chat-popup-textarea">
                              <p>Please enter your questions below:</p>
                              <textarea
                                id="qmessage"
                                name="qmessage"
                                className={error?.question ? "input_error" : ""}
                                value={userQuestion}
                                onChange={handleQuestionChange}
                                placeholder="Type your question here..."
                              ></textarea>
                              <span id="char-count">
                                {userQuestion.length}/500 Characters
                              </span>
                              {error?.question ? (
                                <div className="login-validation-error">
                                  {error?.question}
                                </div>
                              ) : null}

                              {successFlag?.chatStatus == 1 ? (
                                <p className="success">
                                  Question sent successfully
                                </p>
                              ) : successFlag?.chatStatus == 2 ? (
                                <p className="error">Question not submit</p>
                              ) : null}
                              {loading ? (
                                <img
                                  className="loading_image"
                                  src="/images/loading-gif.gif"
                                />
                              ) : (
                                <button
                                  className="submit"
                                  onClick={questionSubmit}
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          </div>

                          <div
                            className={
                              displayPopup == "contact"
                                ? "tab-pane active"
                                : "tab-pane"
                            }
                            id="contact"
                          >
                            <div className="contact-popup-middle">
                              <div className="contact-popup-text">
                                <p>
                                  Please leave any questions you may have ask
                                  from Octapharma representative will reach out
                                  to you:
                                </p>
                              </div>
                            </div>
                            <div className="open-chat-popup-textarea">
                              <textarea
                                id="message"
                                name="message"
                                placeholder="Type your message here.."
                                onChange={handleInputChange}
                                className={error?.message ? "input_error" : ""}
                                value={user?.message}
                              ></textarea>
                              {error?.message ? (
                                <div className="login-validation-error">
                                  {error?.message}
                                </div>
                              ) : null}

                              <div className="field">
                                <label>Email </label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={user?.email}
                                  className={error?.email ? "input_error" : ""}
                                  onChange={handleInputChange}
                                  placeholder="Please reach me on my email"
                                ></input>
                                {error?.email ? (
                                  <div className="login-validation-error">
                                    {error?.email}
                                  </div>
                                ) : null}
                              </div>
                              <div className="field cont_number">
                                <label>Phone number (optional)</label>
                                <input
                                  type="text"
                                  id="number"
                                  name="phone"
                                  min="0"
                                  className={error?.phone ? "input_error" : ""}
                                  onChange={handleInputChange}
                                  value={user?.phone}
                                  placeholder="Please reach me on my phone"
                                ></input>
                                {error?.phone ? (
                                  <div className="login-validation-error">
                                    {error?.phone}
                                  </div>
                                ) : null}
                              </div>
                              {successFlag?.contactStatus == 1 ? (
                                <p className="success">{apiCallMsg}</p>
                              ) : successFlag?.contactStatus == 2 ? (
                                <p className="error">{apiCallMsg}</p>
                              ) : null}
                              {loading ? (
                                <img
                                  className="loading_image"
                                  src="/images/loading-gif.gif"
                                />
                              ) : (
                                <button
                                  className="submit"
                                  onClick={contactSubmit}
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="chat-option">
                  <ul className="open-chat">
                    {/*
                        <li className = {displayPopup == "contact" ? "active_box" : ""}><Button id="open-contact-btn" onClick={(e) => openStreamPopup("contact")}>Open Contact</Button></li>
                        <li className = {displayPopup == "poll" ? "union-pop-btn-outer active_box" : "union-pop-btn-outer"}><Button className="union-pop-btn" onClick={(e) => openStreamPopup("poll")}><img className="union-image" src={path_image+"Union-half.png"} /><img className="union-image-hover" src={path_image+"pie-chart 2.png"} /></Button></li>
                        */}

                    {(() => {
                      const streamingFeature =
                        eventData?.streaming_features || "";
                      const streamingFeatureArray = streamingFeature
                        .split("~")
                        .map((f) => f.trim());
                      const hasQuestionsWindow =
                        streamingFeatureArray.includes("Questions window") &&
                        liveObj?.flag != 4;

                      if (!hasQuestionsWindow) return null;

                      return (
                        <li
                          className={
                            displayPopup === "chat" ? "active_box" : ""
                          }
                        >
                          <Button
                            id="open-contact-btn"
                            onClick={() => {
                              openStreamPopup("chat");
                              setDsplayPopupStatus(true);
                            }}
                          >
                            Your questions
                          </Button>
                        </li>
                      );
                    })()}
                  </ul>
                </div>
              </div>
            }
          </div>
          <div className="accordion-loader">
            <div
              className={"loader tab-inside " + (sectionLoader ? "show" : "")}
              id="custom_loader"
            >
              <div className="loader_show">
                <span className="loader-view"> </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{liveObj?.flag ? liverStreamFun() : null}</>;
  // return <>
  // <div className="webinar-popup">
  //   <WebinarPolls/>
  //   </div>{liveObj?.flag ? liverStreamFun() : null}</>;
};

export default memo(LiveStreaming);
