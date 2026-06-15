import React, { useEffect, useRef, useState } from "react";
import SessionModel from "./Polls/Modals/SessionModal";
import DisplayAnswer from "./Polls/Modals/DisplayAnswer";
import Cookies from "js-cookie";
import { getData, postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import { loader } from "./CommonComponent/Loader";
import { firestoredb } from "../config/informedfirebaseconfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import eventConfig from "../config/eventconfig.json";
import eventConfigUSA from "../config/eventconfigUSA.json";

export default function WebinarPolls({ eventData }) {
  const [data, setData] = useState(0);
  const [value, setValue] = useState({});

  const [show, setShow] = useState(false);
  const [sessionShow, setSessionShow] = useState(false);

  const [apiData, setApiData] = useState([]);
  const [answerPop, setAnswerPopup] = useState(false);
  const [totalReaders, setTotalReaders] = useState(0);
  const [customAnswer, setCustomAnswer] = useState(0);
  const [graphType, setGraphType] = useState(0);

  const [dynamicContent, setDynamicContent] = useState({});
  const [formData, setFormData] = useState({});
  const [logo, setLogo] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [eventId, setEvent] = useState({
    id: eventConfig?.eventId,
    eventCode: eventConfig?.eventCode,
  });

  const userCountry = localStorage.getItem("country");
  const isUSA =  localStorage.getItem("un") == "2147541916" && (
    userCountry === "United States" ||
    userCountry === "USA" ||
    userCountry === "United States Minor Outlying Islands");

  const activeEventConfig = isUSA ? eventConfigUSA : eventConfig;
  const q = query(
    collection(firestoredb, "chat"),
    where("triggered", "!=", 0),
    where("event_id", "==", activeEventConfig?.eventId)
  );
  const videoRef = useRef(null);

  useEffect(() => {
    EventDataFun();
    fetchApiData();
  }, []);

  // let currentEventCode = localStorage.getItem("eventCode")
  let currentEventCode = activeEventConfig?.eventCode;

  const fetchApiData = async () => {
    try {
      loader("show");
      const response = await getData(
        `${ENDPOINT.GETCHATLINKDATA}/${currentEventCode}`
        // `${ENDPOINT.GETCHATLINKDATA}/${'cl1_case_2024'}`
      );
      const { chatLinkData } = response?.data?.data;

      if (chatLinkData && Object.keys(chatLinkData).length !== 0) {
        setDynamicContent(chatLinkData);
        setFormData(chatLinkData);
        setLogo(chatLinkData?.logoImageUrl);
      } else {
        setLogo(dynamicContent?.logoImageUrl);
      }
      setIsDataLoaded(true);
    } catch (error) {
      setLogo(dynamicContent?.logoImageUrl);

      console.error("Error fetching settings:", error);
    } finally {
      loader("hide");
    }
  };

  const EventDataFun = async () => {
    try {
      loader("show");
      const result = await postData(ENDPOINT.EVENT_ID, {
        eventCode: currentEventCode,
        // eventCode: 'cl1_case_2024'
      });
      setEvent(result.data.data);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };

  onSnapshot(q, (querySnapshot) => {
    let newData = {};
    querySnapshot.forEach((doc) => {
      if (doc.data()) {
        newData = doc.data();
      }
    });
    if (Object.keys(newData)?.length) {
      let userResetCounter = newData?.resetFlag ? newData?.resetFlag : 0;
      let eventQuestion = Cookies.get(
        "eventQuestionOneSource" + newData?.event_id + "_" + userResetCounter
      );

      if (
        eventQuestion?.includes(newData?.question_id) &&
        newData?.triggered == 1
      ) {
        if (data) {
          setData(0);
        }
        if (show) {
          setShow(false);
        }
        if (answerPop) {
          setAnswerPopup(false);
        }
        if (sessionShow) {
          setSessionShow(false);
        }

        if (Object.keys(value)?.length) {
          setValue({});
        }
        return;
      }
      if (eventData) {
        const requireAnswer = eventData.require_answer_to_view_result ?? false;
        if (
          newData?.triggered == 2 &&
          requireAnswer &&
          !eventQuestion?.includes(newData?.question_id)
        ) {
          newData.triggered = 1;
        }
      }

      if (newData?.triggered == 1) {
        if (Object.keys(value)?.length) {
          if (
            (newData?.question_id != value?.question_id &&
              newData?.event_id != value?.event_id) ||
            newData?.triggered != value?.triggered
          ) {
            setValue(newData);
            setData(newData?.triggered);
          }
        } else {
          setValue(newData);
          setData(newData?.triggered);
        }
      } else if (newData?.triggered == 2) {
        if (Object.keys(value)?.length) {
          if (
            (newData?.question_id != value?.question_id &&
              newData?.event_id != value?.event_id) ||
            newData?.triggered != value?.triggered
          ) {
            setValue(newData);
            setData(newData?.triggered);
          }
        } else {
          setValue(newData);
          setData(newData?.triggered);
        }
      } else if (newData?.triggered == 3) {
        if (Object.keys(value)?.length) {
          if (
            (newData?.question_id != value?.question_id &&
              newData?.event_id != value?.event_id) ||
            newData?.triggered != value?.triggered
          ) {
            setValue(newData);
            setData(newData?.triggered);
          }
        } else {
          setValue(newData);
          setData(newData?.triggered);
        }
      } else {
        if (show) {
          setShow(false);
        }
        if (answerPop) {
          setAnswerPopup(false);
        }
        setValue({});
        setData(0);
        setSessionShow(false);
      }
    } else {
      if (show) {
        setValue({});
        setData(0);
        setShow(false);
      }
      if (answerPop) {
        setAnswerPopup(false);
      }
      setSessionShow(false);
    }
  });

  const handleEvent = async () => {
    try {
      if (data == 1) {
        if (Object.keys(value)?.length) {
          const result = await postData(ENDPOINT.SESSION_LIST, {
            id: value?.question_id,
          });
          setApiData(result?.data?.data);
          setAnswerPopup(false);
          setShow(true);
          setData(0);
        }
      } else if (data == 2) {
        const result = await postData(ENDPOINT.POLL_ANSWER, {
          eventId: value?.event_id,
          companyId: value?.question_id,
        });
        setApiData(result?.data?.data);
        setTotalReaders(result?.data?.totalReader);
        setCustomAnswer(result?.data?.custom_answer);
        setGraphType(result?.data?.graphType);
        setAnswerPopup(true);
        setShow(false);
        setData(0);
        setSessionShow(false);
      } else if (data == 3) {
        const result = await postData(ENDPOINT.SESSION_LIST, {
          id: value?.question_id,
        });
        setApiData(result?.data?.data);
        setAnswerPopup(false);
        setShow(false);
        setSessionShow(true);
        setData(0);
      }
    } catch (err) {
      console.log("-er", err);
    }
  };

  useEffect(() => {
    let events = Cookies.get("events");
    if (!events) {
      const unique_id = crypto.randomUUID();
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      Cookies.set("events", `${unique_id}`, { expires: expirationDate });
    }
    if (data) {
      handleEvent();
    }
  }, [data]);
  return (
    <>
      {show && (
        <SessionModel
          show={show}
          onClose={setShow}
          data={apiData}
          eventData={value}
          designData={formData}
        />
      )}

      {answerPop && (
        <DisplayAnswer
          show={answerPop}
          data={apiData}
          readerCount={totalReaders}
          customAnswer={customAnswer}
          graphType={graphType}
          designData={formData}
          onClose={() => setAnswerPopup(false)}
        />
      )}
    </>
  );
}
