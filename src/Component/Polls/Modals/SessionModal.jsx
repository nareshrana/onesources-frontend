import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import axios from "axios";
import { getData, postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../CommonComponent/Loader";
import { useLocation, useParams, useSearchParams } from 'react-router';
import eventConfig from "../../../config/eventconfig.json";
import eventConfigUSA from "../../../config/eventconfigUSA.json";

const SessionModel = ({ show, onClose, data, eventData, designData }) => {
  const [searchParams] = useSearchParams();
  let parms = searchParams.get('evnt');
  const [user, setUser] = useState([]);
  const [userValid, setUserValid] = useState({});
  const [userSpeaker, setSpeaker] = useState({});
  const [comment, setComment] = useState("")
  const [error, setError] = useState({});
  const [userRequired, setUserRequired] = useState({});
  const [answerComment, setAnswerComment] = useState({});
  const userCountry = localStorage.getItem("country");
  const isUSA = localStorage.getItem("un") == "2147541916" && 
    (userCountry === "United States" ||
    userCountry === "USA" ||
    userCountry === "United States Minor Outlying Islands");

  const activeEventConfig = isUSA ? eventConfigUSA : eventConfig;

  const initiFun = () => {
    try {
      setUser(data?.questionListing);
      setUserValid(data?.totalQuestion);
      setUserRequired(data?.totalQuestion);
      setSpeaker(data?.speakerData);

    } catch (err) {
      console.log("-err", err);
    }
  };

  const handleChangeCheckbox = (questionId, data, type = "") => {
    try {
      if (typeof data === 'string') {
        if (data?.trim() === '') {
          data = 0;
        }
      }

      if (type) {
        setUserValid({
          ...userValid,
          [questionId]: data ? [data] : userRequired[questionId],
        });
        return;
      }

      if (Array.isArray(userValid[questionId])) {
        const updatedArray = [...userValid[questionId]];

        if (updatedArray.includes(data)) {
          updatedArray.splice(updatedArray.indexOf(data), 1);
        } else {
          updatedArray.push(data);
        }

        setUserValid({
          ...userValid,
          [questionId]: updatedArray,
        });
      } else {
        setUserValid({
          ...userValid,
          [questionId]: [data],
        });
      }
    } catch (err) {
      console.log("-err", err);
    }
  };

  const handleChange = (questionId, data, type = "") => {
    try {
      if (typeof data === 'string') {
        if (data?.trim() === '') {
          data = 0;
        }
      }

      if (type) {
        setUserValid({
          ...userValid,
          [questionId]: data ? [data] : userRequired[questionId],
        });
        setComment(data?.trim())
        return;
      }

      setUserValid((prevUserValid) => {
        const updatedValue = data === prevUserValid[questionId] ? null : data;
        return {
          ...prevUserValid,
          [questionId]: updatedValue,
        };
      });

    } catch (err) {
      console.log("-err", err);
    }
  };

  const handleAnswerCommentChange=(e,answerId,type)=>{
    if(type=="MULTIPLE"){
      setAnswerComment((prev)=>({...prev,[answerId]:e?.target?.value}))
    }else{
      setAnswerComment({[answerId]:e?.target?.value})
    }

  }

  const handleSubmit = async () => {
    try {
      const errorValue = Object.values(userValid);

      if (errorValue?.includes(0)) {
        setError({ msg: "This field is required" });
        return;
      }
      let getIp = localStorage.getItem('ip');
      let ipaddress = '';
      if (getIp) {
        ipaddress = getIp;
      } else {
        try {
          const response = await axios.get('https://api.ipify.org?format=json');
          ipaddress = response?.data?.ip ? response?.data?.ip : '';
          localStorage.setItem('ip', ipaddress);
        } catch (err) {
          console.log("Error fetching IP address:", err);
          ipaddress = "0.0.0.0";
        }
      }
      let newAr = [];
      const keys = Object.keys(userValid);

      keys.forEach((item) => {
        let obj = {};

        if (typeof userValid[item] !== "number" && userValid[item]?.length > 0) {
          obj = {
            speakerName: userSpeaker[item],
            poll_question_id: item,
            // poll_answer_ids: userValid[item],
            poll_answer_id: user[0]?.canCustomAnswer == 1 ? "" : userValid[item].join(','),
            user_answer: comment,
            guest_id: Cookies.get("events"),
            user_id: localStorage.getItem('un'),
            "ipAddress": ipaddress,
            answer_comment:answerComment

          };
        }

        if (typeof userValid[item] === "number" && userValid[item]) {
          obj = {
            speakerName: userSpeaker[item],
            poll_question_id: item,
            poll_answer_id: userValid[item],
            user_answer: comment,
            guest_id: Cookies.get("events"),
            "ipAddress": ipaddress,
            user_id: localStorage.getItem('un'),
            answer_comment:answerComment

          };
        }

        if (Object.keys(obj)?.length) {
          newAr.push(obj);
        }
      });
      loader("show");
      await postData(ENDPOINT.ADD_EVENT_DATA, {
        eventData: newAr,
        eventId: activeEventConfig?.eventId,
        poll_question_id: eventData?.question_id,
      });
      let userResetCounter
      let eventQuestion
      if (Object.keys(user).length > 0) {
        userResetCounter = user && Object.keys(user).length > 0 ? user[0]?.resetCounter : 0;
        eventQuestion = Cookies.get("eventQuestionOneSource" + eventData?.event_id + '_' + userResetCounter);
      }

      if (!eventQuestion?.includes(eventData?.question_id)) {

        let newAr = eventQuestion?.length ? JSON.parse(eventQuestion) : [];
        newAr.push(eventData?.question_id);
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        Cookies.set("eventQuestionOneSource" + eventData?.event_id + '_' + userResetCounter, JSON.stringify(newAr), {
          expires: expirationDate,
        });
      }

      setError({});
      onClose(false);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };



  useEffect(() => {
    initiFun();
    setError({});
  }, [show]);
  const shouldAddClass = parms && parms.includes("eahad_2024");

  return (
    <Modal
      id="pollModel"
      show={show}
      // onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      // className="session-modal"
      className={`session-modal ${shouldAddClass ? "eahad_2024" : ""}`}
      centered
    >
      <Modal.Header style={{ background: designData?.headerBackgroundColor }}>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* <img
            // src="https://webinar.docintel.app/Event/webinar-assets/images/octa-logo.svg"
            src={path_image+'FVIII_logo.png'} 
            alt="logo"
          /> */}
          {/* <img  src={designData?.logoImageUrl} alt="logo"/> */}
          <img src={"https://onesourcedoc.s3.eu-west-1.amazonaws.com/images/3BOf8GjoyBykieysOxBPUPNfeXFV4YBT1i3M3T01.png"} alt="logo" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="popup-content">
          {user?.map((item, index) => (
            <>
              {/* {
                item?.groupId == 0 && item?.canCustomAnswer == 1 ?
                <p className="event_sub_heading">Please consider the overall meeting when answering the following questions</p>
                :
                <p className="event_sub_heading">Thank you for attending the Factor VIII Relevance Academy. We would be very grateful if you would complete and return this evaluation form. Your feedback will help us in our efforts to provide high-quality scientific meetings in the future.</p>
              } */}
              <h4
                style={{ color: item?.questionColor }}
                dangerouslySetInnerHTML={{
                  __html: item?.parentQuestion,
                }}
              ></h4>

              {item?.groupId == 0 && item?.canCustomAnswer == 1 ? (
                <>
                  <textarea
                    className="custom-answer-area"
                    onChange={(e) =>
                      handleChange(item?.parentId, e.target.value, "input")
                    }
                    style={{
                      borderColor: item?.answerColor,
                    }}
                    name="w3review"
                    rows="4"
                    cols="50"
                  />
                  {
                    userValid?.[item?.parentId] === 0 ?
                      error?.msg ? <span className="error">{error.msg}</span> : ""
                      : null
                  }
                </>
              ) : (
                ""
              )}

              {item?.childData?.map((value, index) => {
                return (
                  <>
                    {value?.answerData?.length > 0 &&
                      (index == 0 ||
                        item?.childData?.[index]?.answerData?.[0].answer !=
                        item?.childData?.[index - 1]?.answerData?.[0]
                          ?.answer) ? (
                      <div className={item?.hasParent ? "form-group head" : "form-group head no_child"}>
                        <label></label>
                        {/* <div className="check-group">
                          {value?.answerData?.map((newitem, index) => {
                            return (
                              <>
                                <span
                                style={{ color: item?.questionColor }}
                                dangerouslySetInnerHTML={{
                                  __html: newitem?.answer
                                }}
                                ></span>
                              </>
                            );
                          })}
                        </div> */}
                      </div>
                    ) : null}

                    <div className={item?.hasParent ? "form-group" : "form-group no_child"}>
                      {
                        item?.hasParent ?
                          <label
                            style={{ color: item?.questionColor }}
                            dangerouslySetInnerHTML={{ __html: value?.question }}
                          />
                          : null
                      }

                      <div className="check-group">
                        {value?.answerData?.length ? (
                          value?.answerData?.map((childValue, index) => {
                            return (
                              <>
                                {value?.groupId == 0 &&
                                  value?.canCustomAnswer == 1 ? (
                                  <textarea
                                    className="custom-answer-area"
                                    name="w3review"
                                    rows="4"
                                    cols="50"
                                    style={{
                                      borderColor: item?.answerColor,
                                    }}
                                  />
                                ) : (
                            

                                  <div className="check-values">
                                    {value?.answerType === 'MULTIPLE' ? (
                                        <input
                                          type="checkbox"
                                          onChange={(e) => handleChangeCheckbox(value?.id, childValue.id)}
                                          name={value?.question}
                                          value={childValue?.answer}
                                          id={"ans_" + index}
                                        />
                                                                              
                                      ) : (
                                        <input
                                          type="radio"
                                          onChange={(e) => handleChange(value?.id, childValue.id)}
                                          name={value?.question}
                                          value={childValue?.answer}
                                          id={"ans_" + index}
                                        />
                                      )}
                                    <span
                                      className="checkmark"
                                      style={{
                                        background: item?.answerColor,
                                        borderColor: item?.answerColor,
                                      }}
                                    ></span>
                                    {!item?.hasParent ? (
                                      <label style={{ color: item?.answerColor }} htmlFor={"ans_" + index}>
                                        {childValue?.answer}
                                      </label>
                                    ) : null}
                                     {(childValue?.is_custom_answer == 1 &&
                                          ((typeof userValid[value?.id] == "object" && userValid[value?.id]?.includes(childValue?.id))
                                        ||(userValid[value?.id]==childValue?.id))) ?
                                          <textarea
                                            className="custom-answer-area"
                                            placeholder="Enter your comment"
                                            onChange={(e) => handleAnswerCommentChange(e,childValue?.id,value?.answerType)
                                            }
                                            style={{
                                              borderColor: item?.answerColor,
                                            }}
                                            name="w3review"
                                            rows="4"
                                            cols="50"
                                          />
                                          : null}
                                  </div>

                                )}
                              </>
                            );
                          })
                        ) : value?.groupId == 0 &&
                          value?.canCustomAnswer == 1 ? (
                          <textarea
                            className="custom-answer-area"
                            onChange={(e) =>
                              handleChange(value?.id, e.target.value, "input")
                            }
                            name="w3review"
                            rows="4"
                            cols="50"
                            style={{
                              borderColor: item?.answerColor,
                            }}
                          />
                        ) : (
                          ""
                        )}

                      </div>
                      {
                        userValid?.[value?.id] === 0 ?
                          error?.msg ? <span className="error">{error.msg}</span> : ""
                          : null
                      }
                    </div>
                  </>
                );
              })}
              {item?.addComment == 1 ? (
                <textarea
                  className="custom-answer-area"
                  placeholder="Enter your comment"
                  onChange={(e) => setComment(e?.target?.value?.trim())
                  }
                  style={{
                    borderColor: item?.answerColor,
                  }}
                  name="w3review"
                  rows="4"
                  cols="50"
                />
              ) : ""}
            </>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}
        // style={{ background: designData?.buttonColor }}
        >Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionModel;
