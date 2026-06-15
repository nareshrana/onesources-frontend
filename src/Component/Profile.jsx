import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Form, FormGroup, Row, Col, Accordion } from "react-bootstrap";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import { changePasswordValidation } from "./CommonComponent/Validations";
import { userInfo } from "./CommonComponent/Validations";
import { externalApi, postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import RequestModal from "./CommonComponent/RequestModal";
import ShareModal from "./CommonComponent/ShareModal";
import ThankModal from "./CommonComponent/ThankModal";
import DeleteModal from "./CommonComponent/DeleteModal";
import ConfirmationPopup from "./CommonComponent/ConfirmationPopup";
import DeleteConsent from "./CommonComponent/DeleteConsent";
import DisplayText from "./CommonComponent/DisplayText";
import { getData } from "../axios/apiHelper";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { createEvent } from "ics";
import ical from "ical-generator";
import { saveAs } from "file-saver";
import ScrollContext from "./ScrollContext";
import { useContext } from "react";
import Select from "react-select";
import { database } from "../config/firebaseConfig";
import { ref as fireref, set } from "firebase/database";
import eventConfig from "../config/eventconfig.json";
import eventConfigUSA from "../config/eventconfigUSA.json";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import useUserTracking from "../hooks/useUserTracking";
import { loader } from "./CommonComponent/Loader";
import { toast } from "react-toastify";
import { delayedFunction } from "../util/utils";

const Profile = ({
  expertFunction,
  firstExpand,
  onStateChange,
  profileUpdate,
  deleteMyContent,
  learnMore,
  showProfile,
  handleShowProfile,
  code,
  urlParamData,
}) => {
  const navigate = useNavigate();
  const [editClicked, setEditClicked] = useState(false);
  const [showContactBox, setShowContactBox] = useState(false);
  const [consentValues, setConsentValues] = useState([]);
  const [formSubmit, setFormSubmit] = useState(false);
  const [localContentClose, setLocalContentClose] = useState(false);
  const [settingPageFlag, setSettingPageFlag] = useState(false);
  const [areaExpend, setAreaExpend] = useState(false);
  const [displayFilters, setDisplayFilters] = useState({});
  const [filterCounter, setFilterCounter] = useState(1);
  const [encrUser, setencrUser] = useState("JUFCJTEzJUNEWSVBNCVEOCVEREQ");
  const [trackingMore, setTrackingMore] = useState({
    seeMore: "",
    setting: "",
  });
  const trackUserAction = useUserTracking();

  const userId = localStorage.getItem("fireud");
  const userStatusRef = fireref(database, `users/${userId}/status`);
  const [articleOptions, setArticleOptions] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [DD, setDD] = useState(null);
  const [HH, setHH] = useState(null);
  const [MM, setMM] = useState(null);
  const [SS, setSS] = useState(null);
  const [endd, setEndd] = useState("");
  const [timezone, setTimezone] = useState("Europe/Berlin");

  const userCountry = localStorage.getItem("country");
  const isUSA = localStorage.getItem("un") == "2147541916" && (
    userCountry === "United States" ||
    userCountry === "USA" ||
    userCountry === "United States Minor Outlying Islands");

  const activeEventConfig = isUSA ? eventConfigUSA : eventConfig;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorChangePassword, setErrorChangePassword] = useState({});
  const [errorUserInfo, setErrorUserInfo] = useState({});
  const [contentData, setContentData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState([]);
  const [confirmPasswordEyeClicked, setConfirmPasswordEyeClicked] =
    useState(false);
  const [newPasswordEyeClicked, setNewPasswordEyeClicked] = useState(false);
  const [oldPasswordEyeClicked, setOldPasswordEyeClicked] = useState(false);
  const [contactErrorStatus, setContactErrorStatus] = useState(false);
  const [passwordErrorStatus, setPasswordErrorStatus] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showThank, setShowThank] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [delConsent, setDelConsent] = useState(false);
  const [isRegisteredNotLoaded, setIsRegisteredNotLoaded] = useState(true);
  const [message, setMessage] = useState({});
  const [data, setData] = useState({});
  const [activeLink, setActiveLink] = useState("user-info");

  const [libraryData, setLibraryData] = useState({});
  const [sortType, setSortType] = useState("Activated_dateD");
  const newTimestamp = useRef(0);

  const [filterData, setFilterData] = useState({});
  const [filterApply, setFilterApply] = useState(false);
  const [userFilterApply, setUserFilterApply] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [iframeLoader, setIframeLoader] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [pdfId, setPdfId] = useState(0);
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const [eventData, setEventData] = useState({ status: 0 });
  const [registeredEventData, setRegisteredEventData] = useState([{}]);
  const [isUpComingEventNotLoaded, setIsUpComingEventNotLoaded] =
    useState(true);
  const [isMyContentNotLoaded, setIsMyContentNotLoaded] = useState(true);
  const [userInputs, setAddReaderInputs] = useState({
    country: localStorage.getItem("country"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
  });
  const [loading, setLoading] = useState(false);

  const [successFlag, setSuccessFlag] = useState({
    profile: "",
    password: "",
    consent: "",
  });
  const { setShouldObserveElements } = useContext(ScrollContext);
  useEffect(() => {
    var now = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");
    if (endd !== "") {
      let end = moment(endd);
      let duration = moment.duration(end.diff(now));

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
    // Condition to run after prop change
    if (showProfile == true) {
      handleParentChange(true);
      setSelected({
        expand: true,
        flag: 3,
      });
    } else {
      setEditClicked(false);
    }
  }, [showProfile]);

  useEffect(() => {
    setFilterData({});
    setDisplayFilters({});
    setSearch("");
    setDeleteClicked(false);
    closeAllAccordions();
    setFilterApply(false);
    selectDefaultConsent();
  }, [profileUpdate]);

  useEffect(() => {
    if (urlParamData.loaded && !urlParamData.data) handleApiFun();
  }, [profileUpdate, urlParamData]);

  useEffect(() => {
    if (code != "" && apiCallStatus) {
      let defaultData =
        data?.data?.[data?.data.findIndex((el) => el.code == code)];
      if (defaultData) {
        setTimeout(() => {
          var element = document.getElementById("my_content_section_focus");
          if (element)
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
        }, 2000);
        setIframeLoader(true);
        setSelectedArticle(defaultData);
        setAreaExpend(true);
        setLocalContentClose(true);
      }
    }
  }, [code, apiCallStatus]);

  const buttonRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    let encUser = localStorage.getItem("ec");
    if (encUser) {
      setencrUser(encUser);
    }

    function handleOutsideClick(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setFilterApply(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleAddToCalender = async (data) => {
    loader("show");
    await trackUserAction(
      data?.id,
      "Registered-events-add-to-calendar",
      `${data?.title}`
    );
    let newData = data?.end_date ? data?.end_date : data?.eventDate;
    const calendar = ical({ name: data?.title });
    // Convert times to moment objects using timezone
    const startMoment = moment.tz(
      `${data?.eventDate} ${data?.start_time}`,
      data?.timezone
    );
    const endMoment = moment.tz(`${newData} ${data?.end_time}`, data?.timezone);

    // Convert moments to Date objects
    const startDate = startMoment.toDate();
    const endDate = endMoment.toDate();
    const event = {
      title: data?.title,
      summary: data?.title,
      description: ` `,
      start: startDate,
      end: endDate,
      location: data?.address,
      // url:data?.link,
      startInputType: "utc",
      endInputType: "utc",
      organizer: {
        name: "ASPHO@docintel.app",
        email: "ASPHO@docintel.app",
        sentBy: "ASPHO@docintel.app",
      },
    };

    let fileName = "",
      downlaodFileName = "";

    if (data?.id == 27) {
      fileName = "/Nuwiq Symposium ISTH 2023 (1).ics";
      downlaodFileName = "Nuwiq Symposium ISTH 2023.ics";
    } else if (data?.id == 26) {
      fileName = "/Wilate Symposium ISTH 2023 (1).ics";
      downlaodFileName = "Wilate Symposium ISTH 2023.ics";
    } else {
      calendar.createEvent({ ...event });
      const blob = new Blob([calendar.toString()], {
        type: "text/calendar;charset=utf-8",
      });
      saveAs(blob, "event-schedule.ics");
      loader("hide");
      return;
    }

    const downloadLink = document.createElement("a");
    downloadLink.href = fileName; // Replace with the actual file path
    downloadLink.download = downlaodFileName; // Replace with the desired file name
    downloadLink.click();
    loader("hide");
  };

  const selectDefaultConsent = () => {
    if (localStorage.getItem("ct") != "" && localStorage.getItem("ct") != 0) {
      let selected_string = localStorage.getItem("ct");
      const removedTildes = selected_string.replace(/~/g, "");
      const regex = /checkbox\d+/g;
      const checkboxes = removedTildes.match(regex);
      setConsentValues(checkboxes);
    } else {
      // const checkboxes = ['checkbox3', 'checkbox4', 'checkbox5'];
      const checkboxes = ["checkbox3"];
      setConsentValues(checkboxes);
    }
  };

  const handleIframeLoad = () => {
    setTimeout(() => {
      setIframeLoader(false);
    }, 2000);
  };

  const handleAccordionClick = (accordionKey) => {
    setActiveKey((prevKey) => (prevKey === accordionKey ? "" : accordionKey));
  };

  const closeAllAccordions = () => {
    setActiveKey("");
  };

  const handleApiFun = async () => {
    try {
      const result = await externalApi(
        import.meta.env.VITE_REACT_APP_API_INDEX_URL + "/OneSourceMyLibrary",
        "post",
        { method: "OneSourceMyLibrary", user_id: localStorage.getItem("un") }
      );

      const countries = await externalApi(
        import.meta.env.VITE_REACT_APP_API_INDEX_URL + "/get_country_all",
        "post",
        { method: "get_country_all" }
      );

      const user_id = localStorage.getItem("un");
      const event = await getData(
        import.meta.env.VITE_REACT_APP_API_URL_LUMEN +
          ENDPOINT.UPCOMINGEVENT +
          "?uid=" +
          user_id
      );
      if (event?.data?.data?.upcoming_event?.timezone_name) {
        setTimezone(event?.data?.data?.upcoming_event?.timezone_name);
      }

      if (event?.data?.data?.upcoming_event?.currentTime) {
        newTimestamp.current = Date.parse(
          event?.data?.data?.upcoming_event?.currentTime
        );
      }
      setEventData({ status: 1, event: event?.data?.data?.upcoming_event });
      setRegisteredEventData(event?.data?.data?.registered_events);

      if (
        event?.data?.data?.upcoming_event?.length ||
        Object.keys(event?.data?.data?.upcoming_event)?.length
      ) {
        let date = new Date(
          `${event?.data?.data?.upcoming_event?.eventDate} ${event?.data?.data?.upcoming_event?.start_time}`
        );
        setEndd(date.toISOString());
      }

      setApiCallStatus(true);

      setData({
        library: result?.data?.data?.data,
        data: result?.data?.data?.data,
      });
      setLibraryData({
        format: result?.data?.data?.format,
        product: result?.data?.data?.product,
        tags: result?.data?.data?.tags,
      });
      setIsMyContentNotLoaded(false);
      setContentData(result?.data?.data?.data);
      const formatCountriesData = Object.entries(
        countries?.data?.data?.all
      ).map(([value, label]) => ({
        value,
        label,
      }));
      setCountries(formatCountriesData);
    } catch (err) {
      setApiCallStatus(false);
      console.log("err", err);
    } finally {
      setIsUpComingEventNotLoaded(false);
      setIsRegisteredNotLoaded(false);
    }
  };

  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const [selected, setSelected] = useState({
    expand: firstExpand?.expand,
    flag: firstExpand?.flag,
  });

  const ref = useRef(null);
  useEffect(() => {
    const userDetail = JSON.parse(localStorage.getItem("onesource"));
    setSelected(
      firstExpand?.expand == 1 || firstExpand?.expand == 0
        ? selected
        : {
            expand: firstExpand?.expand,
            flag: firstExpand?.flag,
          }
    );
  }, [firstExpand?.flag]);

  useEffect(() => {
    if (selected?.flag == 3) {
      setTimeout(() => {
        expertFunction(ref.current.clientHeight + 32, true, 3);
      }, 760);
    } else if (selected?.flag == 0) {
      expertFunction(0, false, 0);
    }
  }, [selected]);
  const handleChange = (e, isSelectedName) => {
    setAddReaderInputs((prevInputs) => ({
      ...prevInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    }));
  };
  const changePasswordClicked = async () => {
    const user = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    const err = changePasswordValidation(user);
    if (Object.keys(err)?.length) {
      setErrorChangePassword(err);
      return;
    } else {
      //loader("show");
      setErrorChangePassword({});
      try {
        await trackUserAction(0, "Change-password", "");
        let body = {
          old_password: oldPassword,
          new_password: newPassword,
          confirmPassword: confirmPassword,
          email: userInputs?.email,
          method: "change_password_doc",
          Device_used: "Web",
          App_used: "OneSource",
          Build_number: 1.0,
          LangCode: "en",
        };
        const result = await externalApi(
          import.meta.env.VITE_REACT_APP_API_INDEX_URL + "/change_password_doc",
          "post",
          body
        );

        if (result?.data?.success) {
          setSuccessFlag({
            ...successFlag,
            ["password"]: true,
          });
          //loader("hide");

          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setPasswordErrorStatus(false);
        } else {
          setSuccessFlag({
            ...successFlag,
            ["password"]: true,
          });
          setPasswordErrorStatus(true);
          //loader("hide");
        }
        setTimeout(function () {
          setSuccessFlag({
            ...successFlag,
            ["password"]: false,
          });
          setPasswordErrorStatus(false);
        }, 2000);
      } catch (err) {
        //loader("hide");
      }
    }
    setErrorChangePassword(err);
  };

  const saveUserInfoClicked = async (e, type) => {
    e.preventDefault();
    const err = userInfo(userInputs);
    if (Object.keys(err)?.length) {
      setErrorUserInfo(err);
      return;
    } else {
      //loader("show");
      setErrorUserInfo({});
      try {
        let udpateConsent = 0;
        if (consentValues?.length > 1) {
          udpateConsent = consentValues.join("~");
        } else if (consentValues?.length == 1) {
          udpateConsent = consentValues[0];
        }
        let body = {};
        setLoading(true);
        if (type == "profile") {
          await trackUserAction(0, "User-information", "");
          body = {
            name: userInputs?.name,
            country: userInputs?.country.value || userInputs?.country,
            emailid: userInputs?.email,
            consent: localStorage.getItem("ct"),
            method: "edit_profile_albert",
            Device_used: "Web",
            App_used: "OneSource",
            Build_number: 1.0,
            LangCode: "en",
          };
        } else {
          await trackUserAction(0, "Consent-setting", "");
          body = {
            name: localStorage.getItem("name"),
            country: localStorage.getItem("country"),
            emailid: userInputs?.email,
            consent: udpateConsent,
            method: "edit_profile_albert",
            Device_used: "Web",
            App_used: "OneSource",
            Build_number: 1.0,
            LangCode: "en",
          };
        }

        const result = await externalApi(
          import.meta.env.VITE_REACT_APP_API_INDEX_URL + "/edit_profile_albert",
          "post",
          body
        );

        if (type == "profile") {
          setSuccessFlag({
            ...successFlag,
            ["profile"]: true,
          });
        } else if (type == "consent") {
          setSuccessFlag({
            ...successFlag,
            ["consent"]: true,
          });
        }
        setLoading(false);

        if (type == "profile") {
          deleteMyContent();
          localStorage.setItem("name", userInputs?.name);
          localStorage.setItem(
            "country",
            userInputs?.country.value || userInputs?.country
          );
        } else {
          localStorage.setItem("ct", udpateConsent);
        }
        //loader("hide");
        setTimeout(function () {
          if (type === "profile") {
            setSuccessFlag((prevState) => ({
              ...prevState,
              profile: false,
            }));
          } else if (type === "consent") {
            setSuccessFlag((prevState) => ({
              ...prevState,
              consent: false,
            }));
          }
          location.reload();
          // setShowMessage(false); // Hide the message after the timeout
        }, 1000);
      } catch (err) {
        //loader("hide");
        console.log(err);
      }
    }
    setErrorUserInfo(err);
  };

  const dynamicContentCheckboxClicked = (e, value) => {
    if (e.target.checked == true) {
      const checkboxes = [...consentValues];

      if (value == "checkbox5") {
        checkboxes.push("checkbox5");
        setConsentValues(checkboxes);
      } else if (value == "checkbox3") {
        checkboxes.push("checkbox3");
        setConsentValues(checkboxes);
      } else if (value == "checkbox4") {
        checkboxes.push("checkbox4");
        setConsentValues(checkboxes);
      }
    } else {
      let constentValue = [...consentValues];
      if (value == "checkbox5") {
        const indexValue = constentValue.indexOf("checkbox5");
        if (indexValue > -1) {
          constentValue.splice(indexValue, 1);
          setConsentValues(constentValue);
        }
      } else if (value == "checkbox3") {
        handleShowConfirm(true);
        // const indexValue = constentValue.indexOf("checkbox3")
        // if(indexValue >-1){
        // constentValue.splice(indexValue,1)
        // setConsentValues(constentValue);
        // }
      } else if (value == "checkbox4") {
        const indexValue = constentValue.indexOf("checkbox4");
        if (indexValue > -1) {
          constentValue.splice(indexValue, 1);
          setConsentValues(constentValue);
        }
      }
    }
  };

  const handleParentChange = (flag) => {
    // const newState = event.target.value;
    setLocalContentClose(flag);
    onStateChange(flag);
  };

  const contactUs = (e) => {
    e.preventDefault();
    setShowContactBox(true);
  };

  const sendContact = async (e) => {
    e.preventDefault();
    //loader("show");
    try {
      await trackUserAction(0, "Contact-us", ``);
      const contacUs = await postData(`${ENDPOINT?.CONTACTUS}`, {
        content: textareaValue,

        event_id: activeEventConfig?.eventId,
        // event_id: eventId,
      });
      setShowContactBox(false);
      setFormSubmit(true);
      setTextareaValue("");
      //loader("hide");
      setContactErrorStatus(false);
      setTimeout(() => {
        setFormSubmit(false);
      }, 3000);
    } catch (err) {
      setShowContactBox(false);
      setFormSubmit(true);
      setContactErrorStatus(true);
      setTextareaValue("");
      //loader("hide");
      setTimeout(() => {
        setFormSubmit(false);
      }, 3000);
      //loader("hide");
    }
  };

  const handleTextareaChange = (event) => {
    if (event.target.value.trim() != "") {
      setTextareaValue(event.target.value);
    } else {
      setTextareaValue("");
    }
  };

  const handleShowRequest = (newShowRequest, pdfId) => {
    setMessage({
      heading: "Thank You ",
      body: "Your request has been submitted successfully!",
    });
    setShowRequest(newShowRequest);
    setPdfId(pdfId);

    setShowShare(false);
  };
  const handleShowShare = (newShowRequest, pdfId) => {
    setMessage({
      heading: "Thank You ",
      body: "The content has been shared successfully!",
    });
    setShowShare(newShowRequest);
    setPdfId(pdfId);
    setShowRequest(false);
  };

  const handleShowThankYou = (newShowRequest) => {
    setShowThank(newShowRequest);
  };

  const handleShowDelete = (newShowRequest, pdfId) => {
    setShowDelete(newShowRequest);
    setPdfId(pdfId);
  };

  const handleShowConfirm = async (newShowRequest, status = "") => {
    if (status == "del") {
      deleteConsentShowConfirm(true);
    }
    setShowConfirm(newShowRequest);
  };

  const deleteConsentShowConfirm = async (newShowRequest, status = "") => {
    if (status == "del") {
      try {
        let constentValue = [...consentValues];
        let udpateConsent = "";
        const indexValue = constentValue.indexOf("checkbox3");
        if (indexValue > -1) {
          constentValue.splice(indexValue, 1);
          setConsentValues(constentValue);

          if (constentValue.length > 1) {
            udpateConsent = constentValue.join("~");
          } else if (constentValue.length == 1) {
            udpateConsent = constentValue[0];
          }
        }
        //loader("show");
        try {
          const body = {
            name: localStorage.getItem("name"),
            country: localStorage.getItem("country"),
            emailid: userInputs?.email,
            consent: udpateConsent,
            method: "edit_profile_albert",
            Device_used: "Web",
            App_used: "OneSource",
            Build_number: 1.0,
            LangCode: "en",
          };
          setDelConsent(newShowRequest);
          const result = await externalApi(
            import.meta.env.VITE_REACT_APP_API_INDEX_URL +
              "/edit_profile_albert",
            "post",
            body
          );
          const contacUs = await postData(`${ENDPOINT?.DELETECONSENT}`);
          localStorage.setItem("ct", udpateConsent);
          //loader("hide");
          setMessage({
            heading: "Thank You ",
            body: "A request to deactivate your One Source account has been sent.",
          });
          handleShowThankYou(true);
        } catch (err) {
          setDelConsent(newShowRequest);
          //loader("hide");
        }
      } catch (err) {
        console.log(err);
        //loader("hide");
        setDelConsent(newShowRequest);
      }
    } else {
      setDelConsent(newShowRequest);
    }
  };

  const deleteContent = async () => {
    //loader("show");
    try {
      let body = {
        method: "delete_pdf_albert",
        user_id: localStorage.getItem("un"),
        pdf_id: pdfId,
      };
      const result = await externalApi(
        import.meta.env.VITE_REACT_APP_API_INDEX_URL + "/delete_pdf_albert",
        "post",
        body
      );
      setShowDelete(false);
      // if(result?.data?.delete_pdf?.success){
      const filteredContent = contentData.filter(
        (item) => item.pdf_id !== pdfId
      );
      setData({ ...data, data: filteredContent, library: filteredContent });
      setShowThank(true);
      setMessage({
        heading: "Done!",
        body: "The content has been deleted from your content space successfully",
      });
      setPdfId("");
      deleteMyContent();
      //loader("hide");
    } catch (err) {
      //loader("hide");
      console.log(err);
    }
  };
  const handleClear = (e) => {
    var parentElement = document.getElementById("libraryFilters");
    if (parentElement) {
      var checkboxes = parentElement.querySelectorAll("input[type='checkbox']");
      if (checkboxes) {
        checkboxes.forEach(function (checkbox) {
          checkbox.checked = false;
        });
      }
    }
    if (filterData.hasOwnProperty("search")) {
      setFilterData({ search: filterData.search });
    } else {
      setFilterData({});
    }
    setSortType("Activated_dateD");
    setData({ ...data, library: data.data });
    setUserFilterApply(false);
    if (filterData.hasOwnProperty("search")) {
      let obj = { search: filterData.search };
      handleClick(e, "search", 1, obj);
    } else {
      sortArr(data.data, "Activated_dateD");
    }
    closeAllAccordions();
  };

  const handleClick = (e, type = "", clear = 0, obj = "") => {
    e.preventDefault();
    closeAllAccordions();
    if (type == "") {
      setFilterApply(!filterApply);
    }
    let newData = [];
    let filterAr = [];
    if (clear == 1) {
      filterAr = Object.keys(obj);
    } else if (clear == 2) {
      setUserFilterApply(true);
      setFilterCounter(filterCounter + 1);
      filterAr = Object.keys(obj);
    } else {
      setUserFilterApply(true);
      setFilterCounter(filterCounter + 1);
      filterAr = Object.keys(filterData);
      setDisplayFilters(filterData);
    }

    let FilterObj = {
      category: [],
      product: [],
      tags: [],
    };
    filterAr.forEach((x) => {
      if (filterData[x] == "category") {
        FilterObj.category.push(x);
      }
      if (filterData[x] == "product") {
        FilterObj.product.push(x);
      }
      if (filterData[x] == "topic") {
        FilterObj.tags.push(x);
      }
    });

    data?.data.forEach((item) => {
      let flags = -1;
      if (FilterObj?.category?.length) {
        if (FilterObj?.category.includes(item.format)) {
          if (flags != 0) {
            flags = 1;
          }
        } else {
          flags = 0;
        }
      }
      if (FilterObj?.product?.length) {
        if (FilterObj?.product.includes(item.product)) {
          if (flags != 0) {
            flags = 1;
          }
        } else {
          flags = 0;
        }
      }
      if (FilterObj?.tags?.length) {
        let myArray = item.tags.split(",").map((newitem) => newitem.trim());
        let resultArray = myArray.filter((arr) =>
          arr.includes(FilterObj?.tags?.[0])
        );
        if (resultArray.length > 0) {
          if (flags != 0) {
            flags = 1;
          }
        } else {
          flags = 0;
        }
      }
      if (filterData?.search) {
        if (
          item.pdf_title.toLowerCase().includes(filterData.search.toLowerCase())
        ) {
          if (flags != 0) {
            flags = 1;
          }
        } else {
          flags = 0;
        }
      }
      if (flags) {
        newData.push(item);
      }
    });

    if (clear == 1) {
      sortArr(data?.data, "Activated_dateD");
    } else {
      sortArr(newData, sortType);
    }
  };

  const removeFilter = (e, type, value) => {
    if (type == "category" && value == "All") {
      let newObj = { ...displayFilters };
      const filteredObj = Object.entries(newObj).reduce((acc, [key, value]) => {
        if (value !== type) {
          acc[key] = value;
        }
        return acc;
      }, {});
      setDisplayFilters(filteredObj);
      setFilterData(filteredObj);
      handleClick(e, "", 2, filteredObj);
    } else {
      let newObj = { ...displayFilters };
      if (newObj[value] === type) {
        delete newObj[value];
        setDisplayFilters(newObj);
        setFilterData(newObj);
        handleClick(e, "", 2, newObj);
      }
    }
  };

  const sortArr = (sdata, type = "") => {
    const searchValue = type ? type : "";
    let sortAr = sdata;
    switch (searchValue) {
      case "Activated_dateD":
        sortAr.sort((a, b) => (a.activated_date > b.activated_date ? -1 : 1));
        break;
      case "Activated_dateA":
        sortAr.sort((a, b) => (a.activated_date > b.activated_date ? 1 : -1));
        break;

      case "titleA":
        sortAr.sort(
          (a, b) =>
            (a.pdf_title.toLowerCase() > b.pdf_title.toLowerCase()) * 2 - 1
        );
        break;
      case "titleD":
        sortAr.sort((a, b) =>
          a.pdf_title.toLowerCase() > b.pdf_title.toLowerCase() ? -1 : 1
        );
        break;
      default:
        break;
    }
    setData({ ...data, library: sortAr });
  };

  const searchChange = (e) => {
    setSearch(e?.target?.value);
    if (e?.target?.value === "") {
      delete filterData.search;
      // setFilterData(filterData)
      handleClick(e, "search");
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    filterData.search = search;
    setFilterData(filterData);
    handleClick(event, "search");
  };

  const handleFilterChange = (data, name) => {
    let newData = JSON.parse(JSON.stringify(filterData));
    if (newData.hasOwnProperty(data)) {
      if (data == "all" || data == "All") {
        for (let key in newData) {
          if (newData[key] === "category") {
            delete newData[key];
          }
        }
      } else if (name === "category") {
        if (newData.hasOwnProperty("All")) {
          delete newData["All"];
        }
        delete newData[data];
      } else {
        delete newData[data];
      }
      setFilterData(newData);
    } else {
      if (data == "all" || data == "All") {
        let objKyes = createObjectWithSameValue(name, libraryData?.format);
        newData = {
          ...newData,
          ...objKyes,
        };
      } else {
        const valuesArray = Object.values(newData);
        if (valuesArray.includes(name)) {
          let previoudVal = Object.keys(newData).find(
            (key) => newData[key] === name
          );
          if (previoudVal) {
            delete newData[previoudVal];
          }
          newData = {
            ...newData,
            [data]: name,
          };
        } else {
          newData = {
            ...newData,
            [data]: name,
          };
        }
        // newData = {
        //   ...newData,
        //   [data]: name,
        // };
      }
      setFilterData(newData);
    }
  };

  const createObjectWithSameValue = (keys, value) => {
    const obj = {};
    value.forEach((item) => {
      obj[item] = keys;
    });
    return obj;
  };

  const handleClickTrack = async (data) => {
    try {
      // const result = await postData(ENDPOINT.TRACKING, {
      //   action: data,
      // });
      const result = await trackUserAction(0, `${data}`, "");
      if (data == "profile-setting") {
        setTrackingMore({ ...trackingMore, setting: result?.data?.id });
      } else {
        setTrackingMore({ ...trackingMore, seeMore: result?.data?.id });
      }
    } catch (err) {
      console.log("-err", err);
    }
  };
  const handleCloseTrack = async (data) => {
    try {
      if (data == "profile-setting") {
        await postData(ENDPOINT.UPDATETRACKING, {
          id: trackingMore?.setting,
        });
        setTrackingMore({ ...trackingMore, setting: "" });
      } else {
        await postData(ENDPOINT.UPDATETRACKING, {
          id: trackingMore?.seeMore,
        });
        setTrackingMore({ ...trackingMore, seeMore: "" });
      }
    } catch (err) {
      console.log("-err", err);
    }
  };

  const handleUserDisconnected = useCallback(() => {
    set(userStatusRef, "offline");
  }, [userStatusRef]);

  const userLogout = () => {
    let obj = {
      user_id: localStorage.getItem("un"),
      event_id: localStorage.getItem("evd"),
      event_code: localStorage.getItem("eventCode"),
    };
    if (obj.user_id && obj.event_id) {
      postData(`${ENDPOINT.LOGOUT}`, obj);
    }
    localStorage.removeItem("dhdjdluytt");
    localStorage.removeItem("bhdkdlolepk");
    localStorage.removeItem("dhdjdluytp");
    localStorage.removeItem("un");
    localStorage.removeItem("ec");
    localStorage.removeItem("evd");
    localStorage.removeItem("name");
    localStorage.removeItem("country");
    localStorage.removeItem("email");
    localStorage.removeItem("ct");
    localStorage.removeItem("questionArray");
    localStorage.removeItem("fireud");
    localStorage.removeItem("register");
    localStorage.removeItem("speed");
    navigate("/login");
  };

  return (
    <>
      <div
        className={`user-right-box ${
          selected?.expand && selected?.flag == 3 ? "show" : ""
        }`}
        ref={ref}
      >
        <div
          className={`user-title ${
            selected?.expand && selected?.flag == 3 ? "show" : ""
          }`}
        >
          <div className="user-title-header">
            <div className="user-detail">
              <h3>
                <strong>Hi</strong>,&nbsp;
                {
                  // user?.name?user?.name:"Lina Aires"
                  localStorage.getItem("name") != ""
                    ? localStorage.getItem("name")
                    : ""
                }
              </h3>
              {/*user?.country?user?.country:"Switzerland"*/}
              <p>
                {localStorage.getItem("country") != ""
                  ? localStorage.getItem("country")
                  : ""}
              </p>
              {showProfile && (
                <p className="login-date">{moment().format("DD MMMM YYYY")}</p>
              )}
            </div>
            <div className="right-symbol-action">
              {selected?.expand && selected?.flag == 3 && editClicked ? (
                <>
                  {!showProfile ? (
                    <img
                      className="close"
                      src={path_image + "close-icon1.png"}
                      alt="1"
                      onClick={() => {
                        handleCloseTrack("profile-setting");
                        // setName("");
                        // setCountry("");
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setEditClicked(false);
                        setSettingPageFlag(false);
                        setErrorChangePassword({});
                        setErrorUserInfo({});
                        setConfirmPasswordEyeClicked(false);
                        setNewPasswordEyeClicked(false);
                        setOldPasswordEyeClicked(false);
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setPasswordErrorStatus(false);
                        setSelected({
                          expand: false,
                          flag: 0,
                        });
                      }}
                    />
                  ) : (
                    <>
                      <div className="logout-link">
                        <span
                          onClick={() => {
                            handleUserDisconnected();
                            userLogout();
                          }}
                        >
                          <img src={path_image + "logout.svg"} alt="" />
                        </span>
                      </div>

                      <img
                        // className="close"
                        src={path_image + "close-icon1.png"}
                        alt="1"
                        onClick={() => {
                          // setName("");
                          // setCountry("");
                          setOldPassword("");
                          setNewPassword("");
                          setConfirmPassword("");
                          setEditClicked(false);
                          setSettingPageFlag(false);
                          setErrorChangePassword({});
                          setErrorUserInfo({});
                          setSelected({
                            expand: false,
                            flag: 0,
                          });
                        }}
                      />
                    </>
                  )}
                </>
              ) : (
                ""
              )}

              {editClicked == false && !showProfile ? (
                <>
                  <img
                    style={{ cursor: "pointer" }}
                    src={path_image + "setting.svg"}
                    alt="setting"
                    onClick={() => {
                      handleClickTrack("profile-setting");
                      setSelected({ expand: true, flag: 3 });
                      setSettingPageFlag(true);
                      setEditClicked(true);
                      handleParentChange(true);
                      setAddReaderInputs({
                        country: localStorage.getItem("country"),
                        name: localStorage.getItem("name"),
                        email: localStorage.getItem("email"),
                      });
                      setOldPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setPasswordErrorStatus(false);
                    }}
                  />
                  {localContentClose ? (
                    <img
                      className="close"
                      src={path_image + "close-icon1.png"}
                      alt="cros_icon"
                      onClick={() => {
                        if (trackingMore?.seeMore) {
                          handleCloseTrack("profile-seeMore");
                        }
                        setSelected({
                          expand: false,
                          flag: 0,
                        });
                        handleParentChange(false);
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setEditClicked(false);
                        setErrorChangePassword({});
                        setErrorUserInfo({});
                        setConfirmPasswordEyeClicked(false);
                        setNewPasswordEyeClicked(false);
                        setOldPasswordEyeClicked(false);
                      }}
                    />
                  ) : null}
                </>
              ) : (
                editClicked == false && (
                  <>
                    <div className="logout-link">
                      <span
                        onClick={() => {
                          handleUserDisconnected();
                          userLogout();
                        }}
                      >
                        <img src={path_image + "logout.svg"} alt="" />
                      </span>
                    </div>

                    <img
                      style={{ cursor: "pointer" }}
                      src={path_image + "setting.svg"}
                      alt="setting2"
                      onClick={() => {
                        setSelected({ expand: true, flag: 3 });
                        setSettingPageFlag(true);
                        setEditClicked(true);
                        handleParentChange(true);
                        setAddReaderInputs({
                          country: localStorage.getItem("country"),
                          name: localStorage.getItem("name"),
                          email: localStorage.getItem("email"),
                        });
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setPasswordErrorStatus(false);
                      }}
                    />
                  </>
                )
              )}
            </div>
          </div>
          {editClicked == true ? (
            <div className="main-wrapper">
              <div className="form-main-wrapper">
                <div className="mobile-nav-links">
                  <ul>
                    <li
                      className={activeLink === "user-info" ? "active" : ""}
                      onClick={() => {
                        setActiveLink("user-info");
                        document.getElementById("user-info").scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                    >
                      User information
                    </li>
                    <li
                      className={
                        activeLink === "change-password" ? "active" : ""
                      }
                      onClick={() => {
                        // {handleMobileView("change-password")
                        setActiveLink("change-password");

                        document
                          .getElementById("change-password")
                          .scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                      }}
                    >
                      Change password
                    </li>
                    <li
                      className={
                        activeLink === "consent-setting" ? "active" : ""
                      }
                      onClick={() => {
                        // {handleMobileView("consent-setting")
                        setActiveLink("consent-setting");

                        document
                          .getElementById("consent-setting")
                          .scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                      }}
                    >
                      Consent setting
                    </li>
                  </ul>
                </div>
                <Form autoComplete="off">
                <input type="text" name="fake-email" autoComplete="username" hidden />
                <input type="password" name="fake-password" autoComplete="new-password" hidden />
                  <div className="form-top" id="user-info">
                    <h4>User information</h4>
                    <Row>
                      <Col md={4}>
                        <div className="form-group">
                          <label>Name </label>
                          <input
                            type="text"
                            name="name"
                            className={
                              errorUserInfo?.name ? "validationErrors" : null
                            }
                            placeholder="Enter your name"
                            value={userInputs?.name}
                            autoComplete="new-password"
                            onInput={(e) => handleChange(e)}
                          />
                          {errorUserInfo?.name ? (
                            <div className="login-validation error">
                              {errorUserInfo?.name}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="form-group">
                          <label>Country</label>
                          <div className="select">
                            <Form.Group className="mb-3 col-6 form-group">
                            <Select
                              inputId="country-select"
                              name="country-select"
                              className={
                                errorUserInfo?.country
                                  ? "dropdown-basic-button split-button-dropup validationErrors"
                                  : "dropdown-basic-button split-button-dropup"
                              }
                              options={countries}
                              value={countries.find(
                                (c) => c.value === userInputs.country
                              )}
                              onChange={(val) => handleChange(val, "country")}
                              placeholder="Select Country"
                              isSearchable
                              autoComplete="off"
                            />
                            </Form.Group>
                            {errorUserInfo?.country ? (
                              <div className="login-validation error">
                                {errorUserInfo?.country}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                      <Col md={12}>
                        {successFlag?.profile && (
                          <p className="success">
                            Profile updated successfully
                          </p>
                        )}
                        <div className="form-group btn-wrapper">
                          {loading ? (
                            <img className="loading_image" src="/images/loading-gif.gif" />
                          ) : (
                            <Button
                              className="save-btn"
                              onClick={(e) => saveUserInfoClicked(e, "profile")}
                            >
                              Save changes
                            </Button>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="form-top middle" id="change-password">
                    <h4>Change password</h4>
                    <Row>
                      <Col md={4}>
                        <div className="form-group">
                          <label>Old password </label>
                          <input
                            type={
                              oldPasswordEyeClicked == true
                                ? "text"
                                : "password"
                            }
                            placeholder="Enter your old password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className={
                              errorChangePassword?.oldPassword
                                ? "validationErrors"
                                : null
                            }
                          />
                          <span
                            className="password-eye"
                            onClick={() =>
                              setOldPasswordEyeClicked(!oldPasswordEyeClicked)
                            }
                          >
                            {oldPasswordEyeClicked == true ? (
                              <img
                                src={path_image + "passwordeyeclicked.svg"}
                                alt=""
                              />
                            ) : (
                              <img src={path_image + "Union.png"} alt="" />
                            )}
                          </span>
                          {errorChangePassword?.oldPassword ? (
                            <div className="login-validation error">
                              {errorChangePassword?.oldPassword}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="form-group">
                          <label>New password </label>
                          <input
                            className={
                              errorChangePassword?.newPassword
                                ? "validationErrors"
                                : null
                            }
                            type={
                              newPasswordEyeClicked == true
                                ? "text"
                                : "password"
                            }
                            value={newPassword}
                            placeholder="Enter your new password"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <span
                            className="password-eye"
                            onClick={() =>
                              setNewPasswordEyeClicked(!newPasswordEyeClicked)
                            }
                          >
                            {newPasswordEyeClicked == true ? (
                              <img
                                src={path_image + "passwordeyeclicked.svg"}
                                alt=""
                              />
                            ) : (
                              <img src={path_image + "Union.png"} alt="" />
                            )}
                          </span>
                          {errorChangePassword?.newPassword ? (
                            <div className="login-validation error">
                              {errorChangePassword?.newPassword}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="form-group">
                          <label>Confirm password </label>
                          <input
                            className={
                              errorChangePassword?.confirmPassword
                                ? "validationErrors"
                                : null
                            }
                            type={
                              confirmPasswordEyeClicked == true
                                ? "text"
                                : "password"
                            }
                            value={confirmPassword}
                            placeholder="Enter your password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <span
                            className="password-eye"
                            onClick={() =>
                              setConfirmPasswordEyeClicked(
                                !confirmPasswordEyeClicked
                              )
                            }
                          >
                            {confirmPasswordEyeClicked == true ? (
                              <img
                                src={path_image + "passwordeyeclicked.svg"}
                                alt=""
                              />
                            ) : (
                              <img src={path_image + "Union.png"} alt="" />
                            )}
                          </span>
                          {errorChangePassword?.confirmPassword ? (
                            <div className="login-validation error">
                              {errorChangePassword?.confirmPassword}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={12}>
                        {successFlag?.password && (
                          <>
                            {passwordErrorStatus ? (
                              <p className="password_error">
                                Your old password did not matched
                              </p>
                            ) : (
                              <p className="success">
                                Password updated successfully
                              </p>
                            )}
                          </>
                        )}
                        <div className="form-group btn-wrapper">
                          <Button
                            onClick={changePasswordClicked}
                            className="save-btn change-btn"
                          >
                            Change password
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="form-top bottom" id="consent-setting">
                    <h4>Consent setting</h4>
                    <Row>
                      <Col md={12}>
                        <div className="form-group toggle-btn">
                          <div className="toggle-block">
                            <div className="switch">
                              <label className="switch-light">
                                <input
                                  type="checkbox"
                                  checked={
                                    consentValues?.length > 0
                                      ? consentValues.includes("checkbox3")
                                      : false
                                  }
                                  onChange={(e) =>
                                    dynamicContentCheckboxClicked(
                                      e,
                                      "checkbox3"
                                    )
                                  }
                                />
                                <span>
                                  <span className="switch-btn active">YES</span>
                                  <span className="switch-btn">NO</span>
                                </span>
                                <a className="btn"></a>
                              </label>
                            </div>
                            <p>
                              One Source account and content according to
                              privacy policy of Docintel and privacy statement
                              of Octapharma AG and terms of use
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col md={12}>
                        <div className="form-group toggle-btn">
                          <div className="toggle-block">
                            <div className="switch">
                              <label className="switch-light">
                                <input
                                  type="checkbox"
                                  checked={
                                    consentValues?.length > 0
                                      ? consentValues.includes("checkbox4")
                                      : false
                                  }
                                  onChange={(e) =>
                                    dynamicContentCheckboxClicked(
                                      e,
                                      "checkbox4"
                                    )
                                  }
                                />
                                <span>
                                  <span className="switch-btn active">YES</span>
                                  <span className="switch-btn">NO</span>
                                </span>
                                <a className="btn"></a>
                              </label>
                            </div>
                            <p>
                              Receive One Source updates and new materials from
                              Octapharma.
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col md={12}>
                        <div className="form-group toggle-btn">
                          <div className="toggle-block">
                            <div className="switch">
                              <label className="switch-light">
                                <input
                                  type="checkbox"
                                  checked={
                                    consentValues?.length > 0
                                      ? consentValues.includes("checkbox5")
                                      : false
                                  }
                                  onChange={(e) =>
                                    dynamicContentCheckboxClicked(
                                      e,
                                      "checkbox5"
                                    )
                                  }
                                />
                                <span>
                                  <span className="switch-btn">YES</span>
                                  <span className="switch-btn active">NO</span>
                                </span>
                                <a className="btn"></a>
                              </label>
                            </div>
                            <p>Receive invitations to future events.</p>
                          </div>
                        </div>
                      </Col>

                      <Col md={12}>
                        {successFlag?.consent && (
                          <p className="success">
                            Consent updated successfully
                          </p>
                        )}
                        <div className="form-group btn-wrapper">
                          <Button
                            className="save-btn"
                            onClick={(e) => saveUserInfoClicked(e, "consent")}
                          >
                            Save changes
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
                {selected?.expand && selected?.flag == 3 && editClicked ? (
                  <Button
                    className="close"
                    onClick={() => {
                      handleCloseTrack("profile-setting");
                      setSelected({
                        expand: false,
                        flag: 0,
                      });
                      setOldPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setEditClicked(false);
                      setSettingPageFlag(false);
                      setErrorChangePassword({});
                      setErrorUserInfo({});
                      setConfirmPasswordEyeClicked(false);
                      setNewPasswordEyeClicked(false);
                      setOldPasswordEyeClicked(false);
                    }}
                  >
                    Close
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div className="event-section">
          <div
            className={
              !localContentClose
                ? "event-expand"
                : selected?.flag == 3 || !settingPageFlag
                ? "event-expand active"
                : "event-expand"
            }
          >
            <div className={`next-event ${selected?.expand ? "" : ""}`}>
              <div className="event-title">
                <p>My up coming event</p>
                {selected?.expand && selected?.flag == 3 ? (
                  ""
                ) : (
                  <>
                    {!localContentClose ? (
                      <span
                        onClick={() => {
                          handleClickTrack("profile-seeMore");
                          handleParentChange(true);
                          setSelected({
                            expand: true,
                            flag: 3,
                          });
                        }}
                      >
                        See more &gt;
                      </span>
                    ) : null}
                  </>
                )}
              </div>

              {isUpComingEventNotLoaded ? (
                <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
                  {" "}
                  <div className="upcoming-event-detail">
                    <div className="upcoming-event-detail-list">
                      <>
                        <div>
                          <Skeleton
                            width={230}
                            height={30}
                            style={{
                              marginBottom: "0.5rem",
                            }}
                          />
                        </div>
                        <div className="upcoming-event-date">
                          {/* <img src={path_image + "calendar.svg"} alt="" /> */}
                          <Skeleton width={220} height={25} />
                        </div>
                        <div className="upcoming-event-date">
                          {/* <img src={path_image + "location.svg"} alt="" /> */}
                          <Skeleton width={220} height={25} />
                        </div>
                        <div className="event-status">
                          <div className="upcoming-event-cal">
                            <div className="days">
                              {endd !== "" ? (
                                DD
                              ) : (
                                <Skeleton width={35} height={37} />
                              )}
                            </div>
                            <span>DAY</span>
                          </div>
                          <div className="upcoming-event-cal">
                            <div className="hours">
                              {endd !== "" ? (
                                HH
                              ) : (
                                <Skeleton width={35} height={37} />
                              )}
                            </div>
                            <span>HRS</span>
                          </div>
                          <div className="upcoming-event-cal">
                            <div className="mins">
                              {endd !== "" ? (
                                MM
                              ) : (
                                <Skeleton width={35} height={37} />
                              )}
                            </div>
                            <span>MIN</span>
                          </div>
                          <div className="upcoming-event-cal">
                            <div className="mins">
                              {endd !== "" ? (
                                SS
                              ) : (
                                <Skeleton width={35} height={37} />
                              )}
                            </div>
                            <span>SEC</span>
                          </div>
                        </div>
                        <Button
                          variant="primary"
                          type="submit"
                          className="btn-bordered"
                        >
                          {/* prur9p89 */}
                          <Skeleton width={150} height={33} />
                        </Button>
                      </>
                    </div>
                  </div>{" "}
                </SkeletonTheme>
              ) : (
                <div className="upcoming-event-detail">
                  {eventData?.event?.length === 0 && eventData?.status == 1 ? (
                    <div className="upcoming-event-detail-empty">
                      <p>There are no upcoming events on your event list</p>
                      <p className="event-blue">
                        Please check under <strong>events</strong> what is
                        currently available
                      </p>
                    </div>
                  ) : (
                    <div className="upcoming-event-detail-list">
                      <p>{eventData?.event?.title}</p>
                      <div className="upcoming-event-date">
                        <img src={path_image + "calendar.svg"} alt="" />
                        {eventData?.event?.event_date} <span>&nbsp;</span>
                        {eventData?.event?.start_time} -{" "}
                        {eventData?.event?.end_time}{" "}
                        {eventData?.event?.timezone}
                      </div>
                      <div className="upcoming-event-date">
                        <img src={path_image + "location.svg"} alt="" />
                        {eventData?.event?.address}
                      </div>
                      <div className="event-status">
                        <div className="upcoming-event-cal">
                          <div id="day" className="days">
                            {endd != "" ? DD : "00"}
                          </div>
                          <span>DAY</span>
                        </div>
                        <div className="upcoming-event-cal">
                          <div id="hour" className="hours">
                            {endd != "" ? HH : "00"}
                          </div>
                          <span>HRS</span>
                        </div>
                        <div className="upcoming-event-cal">
                          <div id="minute" className="mins">
                            {endd != "" ? MM : "00"}
                          </div>
                          <span>MIN</span>
                        </div>
                        <div className="upcoming-event-cal">
                          <div id="second" className="mins">
                            {endd != "" ? SS : "00"}
                          </div>
                          <span>SEC</span>
                        </div>
                      </div>
                      {/*eventData?.event ?eventData?.event?.event_status_flag === 1 || (DD == 0 && HH == 0 && MM == 0 && SS == 0) ? (
                          <Button variant="primary" type="submit" className="btn-bordered">
                            Live Now
                          </Button>
                        ) : null:null*/}
                      <Button
                        variant="primary"
                        type="submit"
                        className="btn-bordered"
                        onClick={() => {
                          learnMore(eventData?.event?.id);
                          handleShowProfile(false);
                          setShouldObserveElements(false);
                        }}
                      >
                        Learn more
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <LazyLoadComponent>
              <div
                className={`article-list ${
                  !localContentClose
                    ? "hide"
                    : (selected?.expand && selected?.flag == 3) ||
                      !settingPageFlag
                    ? "show"
                    : "hide"
                }`}
              >
                <div className="event-title">
                  <p>Registered events</p>
                </div>
                <div className="event-view-box-outer">
                  {isRegisteredNotLoaded ? (
                    <>
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="event-view-box skeleton">
                          <SkeletonTheme
                            color="#5e6c77"
                            highlightColor="#a9b7c1"
                          >
                            <div className="event-view-box-inset">
                              <div
                                className="event-img"
                                style={{ height: "128px" }}
                              >
                                <Skeleton
                                  height={125}
                                  width={186}
                                  style={{
                                    marginLeft: "4px",
                                    maxHeight: "126px",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <div className="event-description">
                                <div className="event-title">
                                  <Skeleton height={35} width={437} />
                                </div>
                                <div className="event-title">
                                  <Skeleton height={18} width={150} />
                                </div>
                                <div className="event-title">
                                  <Skeleton height={18} width={200} />
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <Skeleton
                                    height={18}
                                    width={138}
                                    style={{ borderRadius: "4px" }}
                                  />
                                  <Skeleton
                                    height={24}
                                    width={101}
                                    style={{ borderRadius: "4px" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </SkeletonTheme>
                        </div>
                      ))}
                    </>
                  ) : registeredEventData?.length > 0 ? (
                    registeredEventData.map((item, index) => (
                      <div className="event-view-box" key={index}>
                        <div className="event-view-box-inset">
                          <div className="event-img">
                            <img src={item.event_image} alt="" />
                          </div>
                          <div className="event-description">
                            <div className="event-title">
                              <p>{item.title}</p>
                            </div>
                            <div className="upcoming-event-date">
                              <img src={path_image + "calendar.svg"} alt="" />
                              {item?.event_date} | {item?.start_time} -{" "}
                              {item?.end_time} {item?.timezone}
                            </div>
                            <div className="upcoming-event-date">
                              <img src={path_image + "location.svg"} alt="" />
                              {item.address}
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <p
                                onClick={() => handleAddToCalender(item)}
                                className="add_cal"
                              >
                                + Add to your calendar
                              </p>
                              <Button
                                className="btn-bordered"
                                onClick={() => {
                                  learnMore(item?.id);
                                  handleShowProfile(false);
                                  setShouldObserveElements(false);
                                }}
                              >
                                Learn more
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="no_register_event">
                        <p>There are no registered events on your event list</p>
                        <p className="event-blue">
                          Please check under <strong>events</strong> what is
                          currently available
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </LazyLoadComponent>
          </div>

          <div
            className="next-event"
            style={{
              display:
                selected?.expand && selected?.flag == 3 ? "none" : "none",
            }}
          >
            <div className="event-title">
              <p>Got a Minute?</p>
            </div>
            <div className={`my-content-block`}>
              <div className="event-minutes">
                <span>
                  Promoting for a survey Leo alqxam ultc ulricuios quisque
                  nuneque nam dictumst Leo aliqu
                </span>
                <Button
                  variant="primary"
                  type="submit"
                  className="event-minute-button"
                >
                  Take the Survey
                </Button>
              </div>
            </div>
          </div>
          <LazyLoadComponent>
            <div className="next-event my_content_sec">
              <div className="event-title">
                <p>
                  {!localContentClose ? "My content" : ""}
                  {/*selected?.expand && selected?.flag == 3 ? "" : "My content"*/}
                </p>
                {!localContentClose &&
                  (apiCallStatus ? (
                    data?.data?.length > 0 ? (
                      <span
                        onClick={() => {
                          handleClickTrack("profile-seeMore");
                          handleParentChange(true);

                          setSelected({
                            expand: true,
                            flag: 3,
                          });
                        }}
                      >
                        See more &gt;
                      </span>
                    ) : null
                  ) : null)}
              </div>
              <div
                className="my-content-block-empty"
                style={{ display: "none" }}
              >
                <p>There is no material on your content space</p>
                <p className="event-blue">
                  Please check under <strong>One Source library</strong> what is
                  new
                </p>
              </div>
              <div
                className={`my-content-block  ${
                  !localContentClose
                    ? ""
                    : (selected?.expand && selected?.flag == 3) ||
                      !settingPageFlag
                    ? "show"
                    : ""
                }`}
              >
                {isMyContentNotLoaded ? (
                  [...Array(3)].map((_, index) => (
                    <SkeletonTheme
                      color="#5e6c77"
                      highlightColor="#a9b7c1"
                      key={index}
                    >
                      <div className="content-block-box" key={index}>
                        <div className="content-image-box">
                          <Skeleton height={78} width={69} />
                        </div>
                        <div className="my-content-detail">
                          <Skeleton height={22} width={150} />
                          <div className="sub-title">
                            <Skeleton height={20} width={140} />
                          </div>
                          <span className="post-date">
                            <Skeleton height={19} width={120} />
                          </span>
                        </div>
                      </div>
                    </SkeletonTheme>
                  ))
                ) : apiCallStatus ? (
                  data?.library?.length > 0 ? (
                    data?.library?.slice(0, 3).map((item, index) => (
                      <div className="content-block-box" key={index}>
                        <div className="content-image-box">
                          <img src={item?.pdf_thumb} alt="" />
                        </div>
                        <div className="my-content-detail">
                          <div className="p">
                            <DisplayText text={item?.pdf_title} />
                          </div>
                          <div className="sub-title">{item?.pdf_sub_title}</div>
                          <span className="post-date">
                            {" "}
                            {item?.activated_date}
                          </span>
                        </div>
                        <div className="article-options">
                          <img
                            src={path_image + "options.svg"}
                            alt="Options"
                            onClick={() => setArticleOptions(item?.pdf_id)}
                          />
                          <div
                            className={
                              articleOptions == item?.pdf_id
                                ? "options-list show"
                                : "options-list"
                            }
                            style={
                              articleOptions == item?.pdf_id
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            <img
                              src={path_image + "close-arrow.svg"}
                              alt=""
                              className="close_option"
                              onClick={() => setArticleOptions("")}
                            />
                            <ul>
                              <li
                                onClick={() => {
                                  setArticleOptions("");
                                  handleShowShare(true, item?.pdf_id);
                                }}
                              >
                                <img
                                  src={path_image + "share-article-icon.svg"}
                                  alt=""
                                />
                                Share
                              </li>

                              <li
                                onClick={() => {
                                  setArticleOptions("");
                                  handleShowRequest(true, item?.pdf_id);
                                }}
                              >
                                <img
                                  src={path_image + "add-to-content.svg"}
                                  alt=""
                                />
                                Request
                              </li>
                              <li
                                onClick={() => {
                                  if (navigator.clipboard) {
                                    navigator.clipboard
                                      .writeText(item?.share_url)
                                      .then(() => {
                                        toast.success(
                                          "Link is copied to clipboard"
                                        );
                                      })
                                      .catch((err) => {
                                        toast.error(
                                          "Failed to copy PDF ID: ",
                                          err
                                        );
                                      });
                                  } else {
                                    toast.warn("Clipboard API not supported");
                                  }
                                }}
                              >
                                <img
                                  src={path_image + "copy-icon.svg"}
                                  alt=""
                                />
                                Copy Link
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="upcoming-event-detail-empty">
                      <p>There is no material on your content space</p>
                      <p className="event-blue">
                        Please check under&nbsp;<strong>One Source</strong> what
                        is currently available
                      </p>
                    </div>
                  )
                ) : null}
              </div>

              <div
                id="my_content_section_focus"
                className={`expert-opinion-content my-source ${
                  !localContentClose
                    ? "hide"
                    : (selected?.expand && selected?.flag == 3) ||
                      !settingPageFlag
                    ? "show"
                    : "hide"
                }`}
              >
                <div className="onesource-content">
                  <div
                    className={
                      !areaExpend
                        ? "onesource-content-serach user-sec"
                        : "onesource-content-serach user-sec expand_hide"
                    }
                  >
                    <div className="event-title">
                      <p>My content</p>
                      {areaExpend ? (
                        <img
                          src={path_image + "close-icon.png"}
                          alt="2"
                          onClick={() => {
                            setSelectedArticle([]);
                            setAreaExpend(false);
                          }}
                        />
                      ) : null}
                    </div>

                    {apiCallStatus ? (
                      data?.data?.length > 0 ? (
                        <div className="d-flex">
                          <div className="search">
                            <form className="d-flex" onSubmit={submitHandler}>
                              <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={search ? search : ""}
                                onChange={(e) => searchChange(e)}
                              />
                              {!search ? (
                                <button
                                  className="btn btn-outline-success"
                                  type="submit"
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
                                      fill="#001489"
                                    ></path>
                                  </svg>
                                </button>
                              ) : null}
                            </form>
                          </div>
                          <form>
                            <div
                              className={
                                (Object.values(filterData).includes(
                                  "category"
                                ) ||
                                  Object.values(filterData).includes(
                                    "product"
                                  ) ||
                                  Object.values(filterData).includes(
                                    "topic"
                                  )) &&
                                userFilterApply
                                  ? "filter filter_applied"
                                  : "filter"
                              }
                            >
                              <div
                                className={`filter-by nav-item dropdown ${
                                  filterApply ? "show" : ""
                                }`}
                              >
                                <button
                                  ref={buttonRef}
                                  onClick={() => {
                                    setFilterApply(!filterApply);
                                  }}
                                  className={`btn btn-secondary dropdown`}
                                  type="button"
                                  id="dropdownMenuButton2"
                                >
                                  Filter by
                                  {filterApply ? (
                                    <svg
                                      width="16"
                                      height="14"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M7.32166 5.99961L11.8083 1.51278C11.9317 1.38927 11.9998 1.22449 12 1.04878C12 0.872976 11.9319 0.708 11.8083 0.584683L11.4151 0.19161C11.2915 0.0678049 11.1267 0 10.9508 0C10.7752 0 10.6104 0.0678049 10.4868 0.19161L6.0002 4.67815L1.51337 0.19161C1.38995 0.0678049 1.22507 0 1.04927 0C0.873659 0 0.70878 0.0678049 0.585366 0.19161L0.192 0.584683C-0.064 0.840683 -0.064 1.25707 0.192 1.51278L4.67873 5.99961L0.192 10.4862C0.0684878 10.61 0.000487805 10.7747 0.000487805 10.9504C0.000487805 11.1261 0.0684878 11.2909 0.192 11.4145L0.585268 11.8076C0.708683 11.9313 0.873658 11.9992 1.04917 11.9992C1.22498 11.9992 1.38985 11.9313 1.51327 11.8076L6.0001 7.32098L10.4867 11.8076C10.6103 11.9313 10.7751 11.9992 10.9507 11.9992H10.9509C11.1266 11.9992 11.2914 11.9313 11.415 11.8076L11.8082 11.4145C11.9316 11.291 11.9997 11.1261 11.9997 10.9504C11.9997 10.7747 11.9316 10.61 11.8082 10.4863L7.32166 5.99961Z"
                                        fill="white"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      width="16"
                                      height="14"
                                      viewBox="0 0 16 14"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                                        fill="#001489"
                                      />
                                      <path
                                        d="M15.3846 6.15264H11.6923C11.6923 5.47387 11.1403 4.92188 10.4615 4.92188H9.23077C8.552 4.92188 8 5.47387 8 6.15264H0.615385C0.275692 6.15264 0 6.42772 0 6.76803C0 7.10834 0.275692 7.38341 0.615385 7.38341H8C8 8.06218 8.552 8.61418 9.23077 8.61418H10.4615C11.1403 8.61418 11.6923 8.06218 11.6923 7.38341H15.3846C15.7243 7.38341 16 7.10834 16 6.76803C16 6.42772 15.7243 6.15264 15.3846 6.15264Z"
                                        fill="#001489"
                                      />
                                      <path
                                        d="M15.3846 11.0745H6.76923C6.76923 10.3957 6.21723 9.84375 5.53846 9.84375H4.30769C3.62892 9.84375 3.07692 10.3957 3.07692 11.0745H0.615385C0.275692 11.0745 0 11.3496 0 11.6899C0 12.0302 0.275692 12.3053 0.615385 12.3053H3.07692C3.07692 12.9841 3.62892 13.5361 4.30769 13.5361H5.53846C6.21723 13.5361 6.76923 12.9841 6.76923 12.3053H15.3846C15.7243 12.3053 16 12.0302 16 11.6899C16 11.3496 15.7243 11.0745 15.3846 11.0745Z"
                                        fill="#001489"
                                      />
                                    </svg>
                                  )}
                                </button>
                                <div
                                  ref={filterRef}
                                  className="dropdown-menu filter-options"
                                  aria-labelledby="dropdownMenuButton2"
                                  id="libraryFilters"
                                >
                                  <div className="clear-data">
                                    <p onClick={handleClear}>Clear all</p>
                                  </div>
                                  <h4>Filter by</h4>
                                  <Accordion activeKey={activeKey}>
                                    {libraryData?.format?.length ? (
                                      <Accordion.Item
                                        eventKey="0"
                                        className="card"
                                      >
                                        <Accordion.Header
                                          className="card-header"
                                          onClick={() =>
                                            handleAccordionClick("0")
                                          }
                                        >
                                          Categories
                                        </Accordion.Header>
                                        <Accordion.Body className="card-body">
                                          <ul>
                                            {libraryData?.format?.map(
                                              (item, index) => {
                                                return (
                                                  <li key={index}>
                                                    <label className="select-multiple-option">
                                                      <input
                                                        type="checkbox"
                                                        checked={filterData.hasOwnProperty(
                                                          item
                                                        )}
                                                        onChange={() =>
                                                          handleFilterChange(
                                                            item,
                                                            "category"
                                                          )
                                                        }
                                                        className="custom-checkbox-tags"
                                                      />
                                                      {item}
                                                      <span className="checkmark"></span>
                                                    </label>
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </Accordion.Body>
                                      </Accordion.Item>
                                    ) : null}

                                    {libraryData?.product?.length ? (
                                      <Accordion.Item
                                        eventKey="1"
                                        className="card"
                                      >
                                        <Accordion.Header
                                          className="card-header"
                                          onClick={() =>
                                            handleAccordionClick("1")
                                          }
                                        >
                                          Products
                                        </Accordion.Header>
                                        <Accordion.Body className="card-body">
                                          <ul>
                                            {libraryData?.product?.map(
                                              (item, index) => {
                                                return (
                                                  <li key={index}>
                                                    <label className="select-multiple-option">
                                                      <input
                                                        type="checkbox"
                                                        checked={filterData.hasOwnProperty(
                                                          item
                                                        )}
                                                        onChange={() =>
                                                          handleFilterChange(
                                                            item,
                                                            "product"
                                                          )
                                                        }
                                                        className="custom-checkbox-tags-my-content"
                                                      />
                                                      {item}
                                                      <span className="checkmark"></span>
                                                    </label>
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </Accordion.Body>
                                      </Accordion.Item>
                                    ) : null}

                                    {libraryData?.tags?.length ? (
                                      <Accordion.Item
                                        eventKey="2"
                                        className="card"
                                      >
                                        <Accordion.Header
                                          className="card-header"
                                          onClick={() =>
                                            handleAccordionClick("2")
                                          }
                                        >
                                          Topics
                                        </Accordion.Header>
                                        <Accordion.Body className="card-body">
                                          <ul>
                                            {libraryData?.tags?.map(
                                              (item, index) => {
                                                return (
                                                  <li key={index}>
                                                    <label className="select-multiple-option">
                                                      <input
                                                        type="checkbox"
                                                        checked={filterData.hasOwnProperty(
                                                          item
                                                        )}
                                                        onChange={() =>
                                                          handleFilterChange(
                                                            item,
                                                            "topic"
                                                          )
                                                        }
                                                        className="custom-checkbox-tags-my-content"
                                                      />
                                                      {item}
                                                      <span className="checkmark"></span>
                                                    </label>
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </Accordion.Body>
                                      </Accordion.Item>
                                    ) : null}
                                  </Accordion>
                                  <div className="sort_by">
                                    <h4>Sort by</h4>
                                    <div className="sorted-data-by">
                                      <div className="sorted-data-list">
                                        <input
                                          type="radio"
                                          id="sorted-data-new"
                                          name="sorting"
                                          onChange={(e) =>
                                            setSortType("Activated_dateD")
                                          }
                                          checked={
                                            sortType == "Activated_dateD"
                                              ? true
                                              : false
                                          }
                                        />
                                        <div className="sorted-data-list-inset">
                                          <svg
                                            width="20"
                                            height="14"
                                            viewBox="0 0 20 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M12.5 3.6875C12.4994 3.12884 12.2772 2.59324 11.8822 2.1982C11.4871 1.80317 10.9515 1.58097 10.3929 1.58036H10.0128V1.19643C10.0128 1.07803 9.96573 0.964477 9.88201 0.880756C9.79829 0.797034 9.68474 0.75 9.56634 0.75C9.44794 0.75 9.33439 0.797034 9.25067 0.880756C9.16694 0.964477 9.11991 1.07803 9.11991 1.19643V1.58036H3.38045V1.19643C3.38045 1.07803 3.33341 0.964477 3.24969 0.880756C3.16597 0.797034 3.05242 0.75 2.93402 0.75C2.81562 0.75 2.70207 0.797034 2.61835 0.880756C2.53462 0.964477 2.48759 1.07803 2.48759 1.19643V1.58036H2.10714C1.54848 1.58097 1.01288 1.80317 0.617847 2.1982C0.222814 2.59324 0.000614459 3.12884 0 3.6875V11.1429C0.000614459 11.7015 0.222814 12.2371 0.617847 12.6322C1.01288 13.0272 1.54848 13.2494 2.10714 13.25H6.8808H10.3929C10.9515 13.2494 11.4871 13.0272 11.8822 12.6322C12.2772 12.2371 12.4994 11.7015 12.5 11.1429L12.5 10.125V3.6875ZM2.48723 2.47321H2.10714C1.78521 2.47359 1.47657 2.60165 1.24893 2.82929C1.02129 3.05693 0.893235 3.36557 0.892857 3.6875V4.06643H11.6071V3.6875C11.6068 3.36557 11.4787 3.05693 11.2511 2.82929C11.0234 2.60165 10.7148 2.47359 10.3929 2.47321H10.0121V2.8542C10.0121 2.9726 9.96502 3.08615 9.8813 3.16987C9.79758 3.25359 9.68402 3.30062 9.56562 3.30062C9.44722 3.30062 9.33367 3.25359 9.24995 3.16987C9.16623 3.08615 9.1192 2.9726 9.1192 2.8542V2.47321H3.38009V2.8542C3.38009 2.9726 3.33305 3.08615 3.24933 3.16987C3.16561 3.25359 3.05206 3.30062 2.93366 3.30062C2.81526 3.30062 2.70171 3.25359 2.61799 3.16987C2.53427 3.08615 2.48723 2.9726 2.48723 2.8542V2.47321ZM0.892857 4.95929V11.1429C0.893259 11.4648 1.02132 11.7734 1.24896 12.001C1.47659 12.2287 1.78522 12.3567 2.10714 12.3571H6.03732H10.3929C10.7148 12.3567 11.0234 12.2287 11.251 12.001C11.4787 11.7734 11.6067 11.4648 11.6071 11.1429L11.6071 6.78732V4.95929H0.892857Z"
                                              fill="#001489"
                                              fillOpacity="0.4"
                                            />
                                            <path
                                              d="M19.5973 9.17178C19.4918 9.06633 19.3488 9.0071 19.1996 9.0071C19.0505 9.0071 18.9075 9.06633 18.802 9.17178L17.3566 10.7043V1.93748C17.3566 1.7883 17.2974 1.64523 17.1919 1.53974C17.0864 1.43426 16.9433 1.375 16.7942 1.375C16.645 1.375 16.5019 1.43426 16.3964 1.53974C16.2909 1.64523 16.2317 1.7883 16.2317 1.93748V10.7043L14.7032 9.17178C14.5971 9.06932 14.455 9.01263 14.3076 9.01391C14.1601 9.01519 14.019 9.07435 13.9147 9.17863C13.8104 9.28292 13.7513 9.424 13.75 9.57148C13.7487 9.71896 13.8054 9.86104 13.9079 9.96713L16.3965 12.4598C16.4487 12.5121 16.5108 12.5537 16.5791 12.582C16.6475 12.6104 16.7207 12.625 16.7947 12.625C16.8687 12.625 16.942 12.6104 17.0103 12.582C17.0786 12.5537 17.1407 12.5121 17.193 12.4598L19.5984 9.96713C19.7037 9.8615 19.7628 9.71837 19.7626 9.56922C19.7624 9.42007 19.7029 9.27711 19.5973 9.17178Z"
                                              fill="#001489"
                                              fillOpacity="0.4"
                                            />
                                          </svg>
                                          <span className="checkmark"></span>
                                        </div>
                                      </div>
                                      <div className="sorted-data-list">
                                        <input
                                          type="radio"
                                          id="sorted-data-old"
                                          name="sorting"
                                          onChange={(e) =>
                                            setSortType("Activated_dateA")
                                          }
                                          checked={
                                            sortType == "Activated_dateA"
                                              ? true
                                              : false
                                          }
                                        />
                                        <div className="sorted-data-list-inset">
                                          <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M12.5 6.6875C12.4994 6.12884 12.2772 5.59324 11.8822 5.1982C11.4871 4.80317 10.9515 4.58097 10.3929 4.58036H10.0128V4.19643C10.0128 4.07803 9.96573 3.96448 9.88201 3.88076C9.79829 3.79703 9.68474 3.75 9.56634 3.75C9.44794 3.75 9.33439 3.79703 9.25067 3.88076C9.16694 3.96448 9.11991 4.07803 9.11991 4.19643V4.58036H3.38045V4.19643C3.38045 4.07803 3.33341 3.96448 3.24969 3.88076C3.16597 3.79703 3.05242 3.75 2.93402 3.75C2.81562 3.75 2.70207 3.79703 2.61835 3.88076C2.53462 3.96448 2.48759 4.07803 2.48759 4.19643V4.58036H2.10714C1.54848 4.58097 1.01288 4.80317 0.617847 5.1982C0.222814 5.59324 0.000614459 6.12884 0 6.6875V14.1429C0.000614459 14.7015 0.222814 15.2371 0.617847 15.6322C1.01288 16.0272 1.54848 16.2494 2.10714 16.25H6.8808H10.3929C10.9515 16.2494 11.4871 16.0272 11.8822 15.6322C12.2772 15.2371 12.4994 14.7015 12.5 14.1429L12.5 13.125V6.6875ZM2.48723 5.47321H2.10714C1.78521 5.47359 1.47657 5.60165 1.24893 5.82929C1.02129 6.05693 0.893235 6.36557 0.892857 6.6875V7.06643H11.6071V6.6875C11.6068 6.36557 11.4787 6.05693 11.2511 5.82929C11.0234 5.60165 10.7148 5.47359 10.3929 5.47321H10.0121V5.8542C10.0121 5.9726 9.96502 6.08615 9.8813 6.16987C9.79758 6.25359 9.68402 6.30062 9.56562 6.30062C9.44722 6.30062 9.33367 6.25359 9.24995 6.16987C9.16623 6.08615 9.1192 5.9726 9.1192 5.8542V5.47321H3.38009V5.8542C3.38009 5.9726 3.33305 6.08615 3.24933 6.16987C3.16561 6.25359 3.05206 6.30062 2.93366 6.30062C2.81526 6.30062 2.70171 6.25359 2.61799 6.16987C2.53427 6.08615 2.48723 5.9726 2.48723 5.8542V5.47321ZM0.892857 7.95929V14.1429C0.893259 14.4648 1.02132 14.7734 1.24896 15.001C1.47659 15.2287 1.78522 15.3567 2.10714 15.3571H6.03732H10.3929C10.7148 15.3567 11.0234 15.2287 11.251 15.001C11.4787 14.7734 11.6067 14.4648 11.6071 14.1429L11.6071 9.78732V7.95929H0.892857Z"
                                              fill="#001489"
                                              fillOpacity="0.4"
                                            />
                                            <path
                                              d="M19.5973 7.82822C19.4918 7.93367 19.3488 7.9929 19.1996 7.9929C19.0505 7.9929 18.9075 7.93367 18.802 7.82822L17.3566 6.29574V15.0625C17.3566 15.2117 17.2974 15.3548 17.1919 15.4603C17.0864 15.5657 16.9433 15.625 16.7942 15.625C16.645 15.625 16.5019 15.5657 16.3964 15.4603C16.2909 15.3548 16.2317 15.2117 16.2317 15.0625V6.29574L14.7032 7.82822C14.5971 7.93068 14.455 7.98737 14.3076 7.98609C14.1601 7.98481 14.019 7.92565 13.9147 7.82137C13.8104 7.71708 13.7513 7.576 13.75 7.42852C13.7487 7.28104 13.8054 7.13896 13.9079 7.03287L16.3965 4.54025C16.4487 4.48787 16.5108 4.44631 16.5791 4.41795C16.6475 4.3896 16.7207 4.375 16.7947 4.375C16.8687 4.375 16.942 4.3896 17.0103 4.41795C17.0786 4.44631 17.1407 4.48787 17.193 4.54025L19.5984 7.03287C19.7037 7.1385 19.7628 7.28163 19.7626 7.43078C19.7624 7.57993 19.7029 7.72289 19.5973 7.82822Z"
                                              fill="#001489"
                                              fillOpacity="0.4"
                                            />
                                          </svg>
                                          <span className="checkmark"></span>
                                        </div>
                                      </div>
                                      <div className="sorted-data-list">
                                        <input
                                          type="radio"
                                          id="data-list-accending"
                                          name="sorting"
                                          onChange={(e) =>
                                            setSortType("titleA")
                                          }
                                          checked={
                                            sortType == "titleA" ? true : false
                                          }
                                        />
                                        <div className="sorted-data-list-inset">
                                          <svg
                                            width="14"
                                            height="12"
                                            viewBox="0 0 14 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M1.49315 5.30469H0.5L2.01327 0.382812H3.20762L4.71875 5.30469H3.7256L2.62757 1.50754H2.59332L1.49315 5.30469ZM1.43108 3.37006H3.77697V4.18237H1.43108V3.37006Z"
                                              fill="#001489"
                                              fillOpacity="0.4"
                                            />
                                            <path
                                              d="M0.505374 11.6328V11.0152L3.25159 7.5689H0.5V6.71094H4.71338V7.32858L1.96447 10.7748H4.71875V11.6328H0.505374Z"
                                              fill="#001489"
                                              fillOpacity="0.4"
                                            />
                                            <path
                                              d="M13.3473 8.17178C13.2418 8.06633 13.0988 8.0071 12.9496 8.0071C12.8005 8.0071 12.6575 8.06633 12.552 8.17178L11.1066 9.70426V0.937477C11.1066 0.788298 11.0474 0.64523 10.9419 0.539745C10.8364 0.43426 10.6933 0.374999 10.5442 0.374999C10.395 0.374999 10.2519 0.43426 10.1464 0.539745C10.0409 0.64523 9.98168 0.788298 9.98168 0.937477V9.70426L8.45322 8.17178C8.34713 8.06932 8.20505 8.01263 8.05757 8.01391C7.91009 8.01519 7.76901 8.07435 7.66472 8.17863C7.56044 8.28292 7.50128 8.424 7.5 8.57148C7.49872 8.71896 7.55541 8.86104 7.65787 8.96713L10.1465 11.4598C10.1987 11.5121 10.2608 11.5537 10.3291 11.582C10.3975 11.6104 10.4707 11.625 10.5447 11.625C10.6187 11.625 10.692 11.6104 10.7603 11.582C10.8286 11.5537 10.8907 11.5121 10.943 11.4598L13.3484 8.96713C13.4537 8.8615 13.5128 8.71837 13.5126 8.56922C13.5124 8.42007 13.4529 8.27711 13.3473 8.17178Z"
                                              fill="#001489"
                                              fillOpacity="0.4"
                                            />
                                          </svg>
                                          <span className="checkmark"></span>
                                        </div>
                                      </div>
                                      <div className="sorted-data-list">
                                        <input
                                          type="radio"
                                          id="sorted-data-desending"
                                          name="sorting"
                                          onChange={(e) =>
                                            setSortType("titleD")
                                          }
                                          checked={
                                            sortType == "titleD" ? true : false
                                          }
                                        />
                                        <div className="sorted-data-list-inset">
                                          <svg
                                            width="14"
                                            height="12"
                                            viewBox="0 0 14 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M1.49315 5.30469H0.5L2.01327 0.382812H3.20762L4.71875 5.30469H3.7256L2.62757 1.50754H2.59332L1.49315 5.30469ZM1.43108 3.37006H3.77697V4.18237H1.43108V3.37006Z"
                                              fill="#001489"
                                              fillOpacity="0.4"
                                            />
                                            <path
                                              d="M0.505374 11.6328V11.0152L3.25159 7.5689H0.5V6.71094H4.71338V7.32858L1.96447 10.7748H4.71875V11.6328H0.505374Z"
                                              fill="#001489"
                                              fillOpacity="0.4"
                                            />
                                            <path
                                              d="M13.3473 3.82822C13.2418 3.93367 13.0988 3.9929 12.9496 3.9929C12.8005 3.9929 12.6575 3.93367 12.552 3.82822L11.1066 2.29574V11.0625C11.1066 11.2117 11.0474 11.3548 10.9419 11.4603C10.8364 11.5657 10.6933 11.625 10.5442 11.625C10.395 11.625 10.2519 11.5657 10.1464 11.4603C10.0409 11.3548 9.98168 11.2117 9.98168 11.0625V2.29574L8.45322 3.82822C8.34713 3.93068 8.20505 3.98737 8.05757 3.98609C7.91009 3.98481 7.76901 3.92565 7.66472 3.82137C7.56044 3.71708 7.50128 3.576 7.5 3.42852C7.49872 3.28104 7.55541 3.13896 7.65787 3.03287L10.1465 0.540249C10.1987 0.487867 10.2608 0.446308 10.3291 0.417953C10.3975 0.389596 10.4707 0.375 10.5447 0.375C10.6187 0.375 10.692 0.389596 10.7603 0.417953C10.8286 0.446308 10.8907 0.487867 10.943 0.540249L13.3484 3.03287C13.4537 3.1385 13.5128 3.28163 13.5126 3.43078C13.5124 3.57993 13.4529 3.72289 13.3473 3.82822Z"
                                              fill="#001489"
                                              fillOpacity="0.4"
                                            />
                                          </svg>
                                          <span className="checkmark"></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="filter-footer">
                                    <button
                                      onClick={handleClick}
                                      className={
                                        Object.keys(filterData)?.length > 0
                                          ? "btn btn-primary btn-filled"
                                          : "btn btn-primary btn-filled"
                                      }
                                    >
                                      Apply
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        closeAllAccordions();
                                        setFilterApply(
                                          (filterApply) => !filterApply
                                        );
                                      }}
                                      className="btn btn-primary btn-bordered"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>

                          <div className="delete-content">
                            {deleteClicked ? (
                              <span
                                className={`btn btn-outline-danger ${
                                  data?.library?.length <= 0 && "btn-disabled"
                                }`}
                                onClick={() => setDeleteClicked(!deleteClicked)}
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.54193 6.99954L13.7763 1.76491C13.9203 1.62081 13.9998 1.42857 14 1.22358C14 1.01847 13.9206 0.826 13.7763 0.68213L13.3176 0.223545C13.1734 0.0791057 12.9812 0 12.776 0C12.5711 0 12.3788 0.0791057 12.2346 0.223545L7.00023 5.45784L1.76559 0.223545C1.62161 0.0791057 1.42925 0 1.22415 0C1.01927 0 0.826911 0.0791057 0.682927 0.223545L0.224 0.68213C-0.0746667 0.980797 -0.0746667 1.46659 0.224 1.76491L5.45852 6.99954L0.224 12.234C0.0799024 12.3783 0.000569106 12.5705 0.000569106 12.7755C0.000569106 12.9805 0.0799024 13.1727 0.224 13.317L0.682813 13.7755C0.826797 13.9199 1.01927 13.9991 1.22403 13.9991C1.42914 13.9991 1.6215 13.9199 1.76548 13.7755L7.00011 8.54114L12.2345 13.7755C12.3787 13.9199 12.571 13.9991 12.7759 13.9991H12.7761C12.9811 13.9991 13.1733 13.9199 13.3175 13.7755L13.7762 13.317C13.9202 13.1729 13.9997 12.9805 13.9997 12.7755C13.9997 12.5705 13.9202 12.3783 13.7762 12.2341L8.54193 6.99954Z"
                                    fill="white"
                                  />
                                </svg>
                              </span>
                            ) : (
                              <button
                                className={`btn btn-outline-success ${
                                  data?.library?.length <= 0 && "btn-disabled"
                                }`}
                                type="submit"
                                onClick={() => setDeleteClicked(!deleteClicked)}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_1621_16992)">
                                    <path
                                      d="M1.94531 4.6875L2.77559 14.7105C2.83509 15.4333 3.45078 16 4.17634 16H11.8265C12.5521 16 13.1677 15.4333 13.2272 14.7105L14.0575 4.6875H1.94531ZM5.65722 14.125C5.41184 14.125 5.20541 13.9341 5.18984 13.6855L4.72109 6.12303C4.70506 5.86441 4.90144 5.64194 5.15963 5.62591C5.42741 5.60713 5.64028 5.80581 5.65675 6.06444L6.1255 13.6269C6.14209 13.8948 5.93019 14.125 5.65722 14.125ZM8.47016 13.6562C8.47016 13.9153 8.2605 14.125 8.00141 14.125C7.74231 14.125 7.53266 13.9153 7.53266 13.6562V6.09375C7.53266 5.83466 7.74231 5.625 8.00141 5.625C8.2605 5.625 8.47016 5.83466 8.47016 6.09375V13.6562ZM11.2817 6.12306L10.813 13.6856C10.7976 13.9316 10.5925 14.1367 10.3158 14.1241C10.0577 14.1081 9.86128 13.8856 9.87731 13.627L10.3461 6.06447C10.3621 5.80584 10.5887 5.61769 10.8432 5.62594C11.1014 5.64197 11.2978 5.86444 11.2817 6.12306Z"
                                      fill="#00A993"
                                    />
                                    <path
                                      d="M14.0938 1.875H11.2812V1.40625C11.2812 0.630813 10.6504 0 9.875 0H6.125C5.34956 0 4.71875 0.630813 4.71875 1.40625V1.875H1.90625C1.38847 1.875 0.96875 2.29472 0.96875 2.8125C0.96875 3.33022 1.38847 3.75 1.90625 3.75C6.21769 3.75 9.78247 3.75 14.0938 3.75C14.6115 3.75 15.0312 3.33022 15.0312 2.8125C15.0312 2.29472 14.6115 1.875 14.0938 1.875ZM10.3438 1.875H5.65625V1.40625C5.65625 1.14762 5.86637 0.9375 6.125 0.9375H9.875C10.1336 0.9375 10.3438 1.14762 10.3438 1.40625V1.875Z"
                                      fill="#00A993"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1621_16992">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ) : null
                    ) : null}
                  </div>
                  {!areaExpend ? (
                    (Object.values(displayFilters).includes("category") ||
                      Object.values(displayFilters).includes("product") ||
                      Object.values(displayFilters).includes("topic")) &&
                    userFilterApply ? (
                      <div className="apply-filter">
                        <div className="filter-block">
                          <div className="filter-block-left full">
                            {filterCounter ? (
                              Object.values(displayFilters).includes(
                                "category"
                              ) ? (
                                <div className="filter-div">
                                  <div className="filter-div-title">
                                    <span>Category |</span>
                                  </div>
                                  <div className="filter-div-list">
                                    {Object.entries(displayFilters).filter(
                                      ([key, value]) => key.includes("All")
                                    )?.length ? (
                                      <div className="filter-result">
                                        All
                                        <img
                                          src={path_image + "close-icon.png"}
                                          alt="Close-filter"
                                          onClick={(e) =>
                                            removeFilter(e, "category", "All")
                                          }
                                        />
                                      </div>
                                    ) : (
                                      Object.entries(displayFilters)
                                        .filter(([key, value]) =>
                                          value.includes("category")
                                        )
                                        .map(([key, value]) => (
                                          <div className="filter-result">
                                            {key}
                                            <img
                                              src={
                                                path_image + "close-icon.png"
                                              }
                                              alt="Close-filter"
                                              onClick={(e) =>
                                                removeFilter(e, "category", key)
                                              }
                                            />
                                          </div>
                                        ))
                                    )}
                                  </div>
                                </div>
                              ) : null
                            ) : null}

                            {Object.values(displayFilters).includes(
                              "product"
                            ) ? (
                              <div className="filter-div">
                                <div className="filter-div-title">
                                  <span>Product |</span>
                                </div>
                                <div className="filter-div-list">
                                  {Object.entries(displayFilters)
                                    .filter(([key, value]) =>
                                      value.includes("product")
                                    )
                                    .map(([key, value]) => (
                                      <div className="filter-result">
                                        {key}
                                        <img
                                          src={path_image + "close-icon.png"}
                                          alt="Close-filter"
                                          onClick={(e) =>
                                            removeFilter(e, "product", key)
                                          }
                                        />
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ) : null}

                            {Object.values(displayFilters).includes("topic") ? (
                              <div className="filter-div">
                                <div className="filter-div-title">
                                  <span>Topic |</span>
                                </div>
                                <div className="filter-div-list">
                                  {Object.entries(displayFilters)
                                    .filter(([key, value]) =>
                                      value.includes("topic")
                                    )
                                    .map(([key, value]) => (
                                      <div className="filter-result">
                                        {key}
                                        <img
                                          src={path_image + "close-icon.png"}
                                          alt="Close-filter"
                                          onClick={(e) =>
                                            removeFilter(e, "topic", key)
                                          }
                                        />
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                          <div className="clear-filter">
                            <button
                              className="btn btn-outline-primary btn-bordered"
                              onClick={handleClear}
                            >
                              Clear all
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null
                  ) : null}

                  {areaExpend ? (
                    <div className="source-content area_expend">
                      {Object.keys(selectedArticle)?.length ? (
                        <div className="onesource-content-box">
                          <div className="onesource-content-box-inside">
                            <img src={selectedArticle?.pdf_thumb} />
                            <div className="onesource-content-detail">
                              <div className="opinion-content-detail-upper">
                                <h5>
                                  <DisplayText
                                    text={selectedArticle?.pdf_title}
                                  />
                                </h5>
                                <h6 className="sub-title">
                                  {selectedArticle?.pdf_sub_title}
                                </h6>
                                <span className="article-post-date">
                                  {selectedArticle?.article_date}
                                </span>
                              </div>
                              <img
                                src={path_image + "close-icon.png"}
                                alt="2"
                                style={{ width: "16px", height: "16px" }}
                                onClick={() => {
                                  setSelectedArticle([]);
                                  setAreaExpend(false);
                                }}
                              />
                            </div>
                            <div className="iframeOuter">
                              {iframeLoader ? (
                                <div className={`loadspanner show`}>
                                  <div className="loadover">
                                    <div className="globalloader"></div>
                                    <p>
                                      Loading the content, please be patient.
                                    </p>
                                  </div>
                                </div>
                              ) : null}
                              <iframe
                                src={
                                  selectedArticle?.share_url + "_" + encrUser
                                }
                                title=""
                                onLoad={handleIframeLoad}
                                height="1008px"
                                width="100%"
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <Button
                        className="close"
                        onClick={() => {
                          setSelectedArticle([]);
                          setAreaExpend(false);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="onesource-content-view">
                    <div className="onesource-content-view-inside">
                      {apiCallStatus ? (
                        data?.library?.length > 0 ? (
                          data?.library?.map((item, index) => (
                            <div className="onesource-content-box" key={index}>
                              <div
                                className={
                                  selectedArticle?.pdf_id == item?.pdf_id
                                    ? "onesource-content-box-inside active"
                                    : "onesource-content-box-inside"
                                }
                              >
                                <img
                                  src={item?.pdf_thumb}
                                  alt=""
                                  onClick={() => {
                                    if (item?.file_type == "weblink") {
                                      window.open(
                                        item?.pdf_file,
                                        "_blank" // <- This is what makes it open in a new window.
                                      );

                                      return;
                                    }
                                    setIframeLoader(true);
                                    trackUserAction(
                                      item?.pdf_id,
                                      "My-content",
                                      `${item?.pdf_title}`
                                    );
                                    setSelectedArticle(item);
                                    setAreaExpend(true);
                                  }}
                                />
                                <div
                                  className="onesource-content-detail"
                                  onClick={() => {
                                    if (item?.file_type == "weblink") {
                                      window.open(
                                        item?.pdf_file,
                                        "_blank" // <- This is what makes it open in a new window.
                                      );

                                      return;
                                    }
                                    setIframeLoader(true);
                                    trackUserAction(
                                      item?.pdf_id,
                                      "My-content",
                                      `${item?.pdf_title}`
                                    );
                                    setSelectedArticle(item);
                                    setAreaExpend(true);
                                  }}
                                >
                                  <div className="p">
                                    <DisplayText text={item?.pdf_title} />
                                  </div>
                                  <span className="sub-title">
                                    {item?.pdf_sub_title}
                                  </span>
                                  <span className="article-post-date">
                                    {item?.activated_date}
                                  </span>
                                </div>
                                {!deleteClicked ? (
                                  <div className="article-options">
                                    <img
                                      src={path_image + "options.svg"}
                                      alt="Options"
                                      onClick={() =>
                                        setArticleOptions(item?.pdf_id)
                                      }
                                    />
                                    <div
                                      className={
                                        articleOptions == item?.pdf_id
                                          ? "options-list show"
                                          : "options-list"
                                      }
                                      style={
                                        articleOptions == item?.pdf_id
                                          ? { display: "block" }
                                          : { display: "none" }
                                      }
                                    >
                                      <img
                                        src={path_image + "close-arrow.svg"}
                                        alt=""
                                        className="close_option"
                                        onClick={() => setArticleOptions("")}
                                      />
                                      <ul>
                                        <li
                                          onClick={() => {
                                            handleShowShare(true, item?.pdf_id);
                                            setArticleOptions("");
                                          }}
                                        >
                                          <img
                                            src={
                                              path_image +
                                              "share-article-icon.svg"
                                            }
                                            alt=""
                                          />
                                          Share
                                        </li>

                                        <li
                                          onClick={() => {
                                            handleShowRequest(
                                              true,
                                              item?.pdf_id
                                            );
                                            setArticleOptions("");
                                          }}
                                        >
                                          <img
                                            src={
                                              path_image + "add-to-content.svg"
                                            }
                                            alt=""
                                          />
                                          Request
                                        </li>
                                        <li
                                          onClick={() => {
                                            if (navigator.clipboard) {
                                              navigator.clipboard
                                                .writeText(item?.share_url)
                                                .then(() => {
                                                  toast.success(
                                                    "Link is copied to clipboard"
                                                  );
                                                })
                                                .catch((err) => {
                                                  toast.error(
                                                    "Failed to copy PDF ID: ",
                                                    err
                                                  );
                                                });
                                            } else {
                                              toast.warn(
                                                "Clipboard API not supported"
                                              );
                                            }
                                          }}
                                        >
                                          <img
                                            src={path_image + "copy-icon.svg"}
                                            alt=""
                                          />
                                          Copy Link
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                              <div className="article-delete">
                                {deleteClicked && (
                                  <div className="delete-content">
                                    <button
                                      className="btn btn-outline-success"
                                      type="submit"
                                      onClick={() =>
                                        handleShowDelete(true, item?.pdf_id)
                                      }
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                      >
                                        <g clipPath="url(#clip0_1621_16992)">
                                          <path
                                            d="M1.94531 4.6875L2.77559 14.7105C2.83509 15.4333 3.45078 16 4.17634 16H11.8265C12.5521 16 13.1677 15.4333 13.2272 14.7105L14.0575 4.6875H1.94531ZM5.65722 14.125C5.41184 14.125 5.20541 13.9341 5.18984 13.6855L4.72109 6.12303C4.70506 5.86441 4.90144 5.64194 5.15963 5.62591C5.42741 5.60713 5.64028 5.80581 5.65675 6.06444L6.1255 13.6269C6.14209 13.8948 5.93019 14.125 5.65722 14.125ZM8.47016 13.6562C8.47016 13.9153 8.2605 14.125 8.00141 14.125C7.74231 14.125 7.53266 13.9153 7.53266 13.6562V6.09375C7.53266 5.83466 7.74231 5.625 8.00141 5.625C8.2605 5.625 8.47016 5.83466 8.47016 6.09375V13.6562ZM11.2817 6.12306L10.813 13.6856C10.7976 13.9316 10.5925 14.1367 10.3158 14.1241C10.0577 14.1081 9.86128 13.8856 9.87731 13.627L10.3461 6.06447C10.3621 5.80584 10.5887 5.61769 10.8432 5.62594C11.1014 5.64197 11.2978 5.86444 11.2817 6.12306Z"
                                            fill="#00A993"
                                          />
                                          <path
                                            d="M14.0938 1.875H11.2812V1.40625C11.2812 0.630813 10.6504 0 9.875 0H6.125C5.34956 0 4.71875 0.630813 4.71875 1.40625V1.875H1.90625C1.38847 1.875 0.96875 2.29472 0.96875 2.8125C0.96875 3.33022 1.38847 3.75 1.90625 3.75C6.21769 3.75 9.78247 3.75 14.0938 3.75C14.6115 3.75 15.0312 3.33022 15.0312 2.8125C15.0312 2.29472 14.6115 1.875 14.0938 1.875ZM10.3438 1.875H5.65625V1.40625C5.65625 1.14762 5.86637 0.9375 6.125 0.9375H9.875C10.1336 0.9375 10.3438 1.14762 10.3438 1.40625V1.875Z"
                                            fill="#00A993"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_1621_16992">
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </button>{" "}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="upcoming-event-detail-empty">
                            {/*<p>No content has been found.</p>*/}
                            <p>There is no material on your content space</p>
                            <p className="event-blue">
                              Please check under&nbsp;
                              <strong>one source</strong> what is currently
                              available
                            </p>
                          </div>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LazyLoadComponent>
          <LazyLoadComponent>
            <div className="contact-us">
              <div className="event-title">
                <p>Contact us</p>
              </div>
              <div className="expert-opinion-content">
                <div className="contact">
                  <p>
                    We are keen to get your feedback on the One Source platform.
                  </p>
                  <span>
                    If you have any comments, questions or suggestions relating
                    to the platform or content that you would like to see,
                    please write us your message here
                  </span>

                  {formSubmit ? (
                    <p
                      className={
                        contactErrorStatus ? "msg_success error" : "msg_success"
                      }
                    >
                      {contactErrorStatus
                        ? "Something went wrong, please try again"
                        : "Your message has been sent successfully"}
                    </p>
                  ) : null}

                  {!showContactBox && (
                    <Form className="contact-us default">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={contactUs}
                      >
                        Contact us
                      </Button>
                    </Form>
                  )}
                  {showContactBox ? (
                    <Form className="contact-us">
                      <FormGroup>
                        <textarea
                          placeholder="Please type your question here..."
                          value={textareaValue}
                          onChange={handleTextareaChange}
                        />
                      </FormGroup>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={sendContact}
                        className={
                          textareaValue.length > 0 ? "btn" : "btn disabled"
                        }
                      >
                        Send
                      </Button>
                    </Form>
                  ) : null}
                </div>
              </div>
            </div>
          </LazyLoadComponent>
        </div>
        <LazyLoadComponent>
          {showRequest && (
            <RequestModal
              handleShowRequest={handleShowRequest}
              handleShowThankYou={handleShowThankYou}
              pdfId={pdfId}
            />
          )}
          {showShare && (
            <ShareModal
              handleShowShare={handleShowShare}
              handleShowThankYou={handleShowThankYou}
              pdfId={pdfId}
            />
          )}
          {showThank && (
            <ThankModal
              handleShowThankYou={handleShowThankYou}
              message={message}
            />
          )}

          {showDelete && (
            <DeleteModal
              handleShowDelete={handleShowDelete}
              deleteContent={deleteContent}
            />
          )}

          {showConfirm && (
            <ConfirmationPopup handleShowConfirm={handleShowConfirm} />
          )}

          {delConsent && (
            <DeleteConsent
              deleteConsentShowConfirm={deleteConsentShowConfirm}
            />
          )}
        </LazyLoadComponent>
      </div>
    </>
  );
};
export default React.memo(Profile);