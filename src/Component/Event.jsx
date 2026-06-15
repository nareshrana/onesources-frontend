import React, { useEffect, useState, useRef } from "react";
import { ENDPOINT } from "../axios/apiConfig";
import { getData, postData } from "../axios/apiHelper";
import moment from "moment-timezone";
import { Button } from "react-bootstrap";
import DisplayText from "./CommonComponent/DisplayText";
import ical from "ical-generator";
import { saveAs } from "file-saver";
import { loader } from "./CommonComponent/Loader";
// import SlideToggle from "react-slide-toggle";
import EventSkeleton from "./Skeletons/EventSkeleton";
import useUserTracking from "../hooks/useUserTracking";
import ShareEvent from "./CommonComponent/ShareEventModal";
import ThankModal from "./CommonComponent/ThankModal";

const Event = ({
  data,
  handleExpand,
  eventRef,
  eventId,
  renderEvent,
  resetEvent,
  highchartClick,
  scrollToSection,
}) => {
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const ref = useRef(null);
  const [selectedItem, setItem] = useState("");
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const [showUpcomingEvents, setShowUpcomingEvents] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [trackingId, setTracking] = useState("");
  const [isEventNotLoaded, setIsEventNotLoaded] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [eventDetailView, setEventDetailView] = useState(false);
  const trackUserAction = useUserTracking();
  const [showEventShare, setShowEventShare] = useState(false);
  const [shareEventId, setShareEventId] = useState(0);
  const [message, setMessage] = useState(false);
  const [showThank, setShowThank] = useState(false);
  const detailViewRef = useRef(null);

  useEffect(() => {
    getEventsData();
  }, []);

  useEffect(() => {
    if (detailViewRef.current) {
      detailViewRef.current.style.maxHeight = eventDetailView
        ? `${detailViewRef.current.scrollHeight + 10}px`
        : "0px";
    }
  }, [eventDetailView, selectedItem]);

  useEffect(() => {
    if (eventId != 0) {
      let defaultData =
        eventData?.[eventData.findIndex((el) => el.id == eventId)];
      if (defaultData) {
        setItem(defaultData);
        resetEvent();
        handleExpand({
          expand: true,
          flag: 8,
        });
        setEventDetailView(true);
        setIsOpen(true);
      }
    }
  }, [renderEvent,eventData]);

  const handleClick = async (data) => {
    loader("show");
    await trackUserAction(data?.id, "Event-add-to-calendar", `${data?.title}`);
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
        name: "haematology.octapharma@octapharma.com",
        email: "haematology.octapharma@octapharma.com",
        sentBy: "haematology.octapharma@octapharma.com",
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

  const moveToEventMaterial = () => {
    // alert("moveToEventMaterial")
    setTimeout(() => {
      const sectionElement = document.getElementById("event-detail");
      const scrollContainerRef = document.getElementById("root");
      if (sectionElement) {
        const scrollContainer = scrollContainerRef;
        const containerOffsetTop = scrollContainer.getBoundingClientRect().top;
        const sectionOffsetTop = sectionElement.getBoundingClientRect().top;

        const scrollToPosition =
          sectionOffsetTop -
          containerOffsetTop +
          scrollContainer.scrollTop -
          150;
        scrollContainer.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      }
    }, 100);
  };

  const trackingStart = async (data) => {
    try {
      // const result = await postData(ENDPOINT.TRACKING, {
      //   article_id: data.id,
      //   action: "Event",
      // });
      const result = await trackUserAction(data?.id, "Event", `${data?.title}`);
      setTracking(result?.id);
    } catch (err) {
      console.log("-=er", err);
    }
  };

  const trackingClose = async () => {
    try {
      if (trackingId) {
        await postData(ENDPOINT.UPDATETRACKING, {
          id: trackingId,
        });
        setTracking("");
      }
    } catch (err) {
      console.log("-=er", err);
    }
  };

  const getEventsData = async () => {
    try {
      // loader("show");
      const user_id = localStorage.getItem("un");
      const events = await getData(
        import.meta.env.VITE_REACT_APP_API_URL_LUMEN +
          ENDPOINT.EVENTS +
          "?uid=" +
          user_id
      );

      setAllEvents(events?.data?.data);
      if (events?.data?.data) {
        let allEvents = events?.data?.data;
        var filteredArray = allEvents.filter(function (itm) {
          return itm.event_status_flag == 2;
        });
        filteredArray.sort((a, b) => {
          return new Date(a.eventDate) - new Date(b.eventDate);
        });
        setEventData(filteredArray);
        setApiCallStatus(true);
      }
      // loader("hide");
    } catch (err) {
      console.log("-err", err);
      setApiCallStatus(false);
      // loader("hide");
    } finally {
      setIsEventNotLoaded(false);
    }
  };

  const upcomingEvents = () => {
    setShowUpcomingEvents(true);
    handleExpand({
      expand: false,
      flag: 0,
    });
    var filteredArray = allEvents.filter(function (itm) {
      return itm.event_status_flag == 0;
    });
    filteredArray.sort((a, b) => {
      return new Date(a.eventDate) - new Date(b.eventDate);
    });

    setEventData(filteredArray);
  };

  const pastEvents = () => {
    setShowUpcomingEvents(false);
    handleExpand({
      expand: false,
      flag: 0,
    });
    var filteredArray = allEvents.filter(function (itm) {
      return itm.event_status_flag == 2;
    });
    filteredArray.sort((a, b) => {
      return new Date(a.eventDate) - new Date(b.eventDate);
    });
    setEventData(filteredArray);
  };

  const clickOnHere = (e) => {
    highchartClick(e);
  };

  const handleShowShare = (newShowRequest, eventId) => {
    setMessage({
      heading: "Thank You",
      body: "The event has been shared successfully!",
    });
    setShowEventShare(newShowRequest);
    setShareEventId(eventId);
  };

  const handleShowThankYou = (newShowRequest) => {
    setShowThank(newShowRequest);
  };


  return (
    <>
      {/* <SlideToggle
         duration={1200}
         collapsed={true}
         whenReversedUseBackwardEase={false}
         render={({ toggle, setCollapsibleElement }) => ( */}
      <div
        className={`highlight ${data?.flag == 8 ? "show" : "hide"}`}
        ref={eventRef}
        id="eventOuterBox"
      >
        <div className={`highlight-box `} ref={ref}>
          <div className="highlight-title">
            <p>Events</p>
            {data?.expand && data?.flag == 8 ? (
              <img
                src={path_image + "close-icon.png"}
                alt=""
                onClick={() => {
                  trackingClose();
                  if (isOpen) {
                    setIsOpen(false);
                    setEventDetailView(false);
                    // toggle();
                  }
                  scrollToSection("eventOuterBox");
                  handleExpand({
                    expand: false,
                    flag: 0,
                  });
                }}
              />
            ) : null}
            {/*<span onClick={()=>handleExpand({expand:true,flag:8})}>See More &gt;</span>*/}
          </div>
          <div className="highlight-content event_material">
            <div
              className={
                showUpcomingEvents
                  ? "event_material-toggle upcoming_show"
                  : "event_material-toggle"
              }
            >
              <Button onClick={() => upcomingEvents()}>
                See past events
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                  <path
                    d="M6.84011 5.33199C7.17745 5.67317 7.18219 6.23094 6.85069 6.5778C6.84171 6.5872 6.83258 6.59634 6.8233 6.60524L2.44717 11.1842C2.11567 11.5311 1.57347 11.5357 1.23613 11.1945C0.898794 10.8533 0.894058 10.2955 1.22556 9.94866L5.02825 5.96971L1.16239 2.05979C0.825046 1.71861 0.82031 1.16083 1.15181 0.81397C1.48331 0.467107 2.02551 0.462504 2.36284 0.803688L6.84011 5.33199Z"
                    fill="#00A993"
                  />
                </svg>
              </Button>
            </div>
            <div
              className={
                showUpcomingEvents ? "event-list upcoming_list" : "event-list"
              }
            >
              {isEventNotLoaded ? (
                <EventSkeleton />
              ) : apiCallStatus ? (
                eventData?.length > 0 ? (
                  eventData?.map((item, index) => {
                    return (
                      <div
                        className={
                          selectedItem.id == item.id
                            ? "event-view-box active"
                            : "event-view-box"
                        }
                        key={index}
                      >
                        <div className="event-date">{item?.date}</div>
                        <div className="event-view-box-inset">
                          <div className="event-img">
                            <img src={item?.event_image} alt="" />
                          </div>
                          <div className="event-description">
                            <div className="event-description-top">
                              <div
                                className={
                                  showUpcomingEvents
                                    ? "events-status past"
                                    : "events-status upcoming"
                                }
                              >
                                {item?.event_status}
                              </div>
                              <div className="event-title">
                                <p>{item?.title}</p>
                              </div>
                            </div>
                            <div className="event-description-bottom">
                              <div className="upcoming-event-date">
                                <img src={path_image + "clock.svg"} alt="" />
                                {item?.start_time?.substring(0, 5)} -{" "}
                                {item?.end_time?.substring(0, 5)}{" "}
                                {item?.timezone}
                              </div>
                              <div className="upcoming-event-date">
                                <img src={path_image + "location.svg"} alt="" />
                                {item?.address}
                              </div>
                              <Button
                                className={
                                  !item?.is_registered ? "learn-more" : ""
                                }
                                variant="primary"
                                type="submit"
                                onClick={() => {
                                  trackingStart(item);
                                  setItem(item);
                                  handleExpand({
                                    expand: true,
                                    flag: 8,
                                  });
                                  if (!isOpen) {
                                    // toggle();
                                    setEventDetailView(true);
                                    setIsOpen(true);
                                    moveToEventMaterial();
                                  }
                                }}
                              >
                                {item?.is_registered &&
                                item.event_status_flag != 0
                                  ? "Registration open"
                                  : "Learn more"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : showUpcomingEvents ? (
                  // <p className="no_events">
                  //   There are no past event on your event list
                  // </p>
                  <div className="no-data">
                    <h4> There are no past event on your event list</h4>
                  </div>
                ) : (
                  // <p className="no_events">
                  //   There are no upcoming event on your event list
                  // </p>
                  <div className="no-data">
                    <h4>There are no upcoming event on your event list</h4>
                  </div>
                )
              ) : null}
            </div>
            <div
              className={
                showUpcomingEvents
                  ? "event_material-toggle coming-events upcoming_visible"
                  : "event_material-toggle coming-events"
              }
            >
              <Button onClick={() => pastEvents()}>
                See up coming events
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                  <path
                    d="M6.84011 5.33199C7.17745 5.67317 7.18219 6.23094 6.85069 6.5778C6.84171 6.5872 6.83258 6.59634 6.8233 6.60524L2.44717 11.1842C2.11567 11.5311 1.57347 11.5357 1.23613 11.1945C0.898794 10.8533 0.894058 10.2955 1.22556 9.94866L5.02825 5.96971L1.16239 2.05979C0.825046 1.71861 0.82031 1.16083 1.15181 0.81397C1.48331 0.467107 2.02551 0.462504 2.36284 0.803688L6.84011 5.33199Z"
                    fill="#00A993"
                  />
                </svg>
              </Button>
            </div>

            {
              // eventDetailView ?
              <div
                ref={detailViewRef}
                style={{
                  overflow: "hidden", // Important for the sliding effect
                  transition: "max-height 1.2s ease-in-out", // Adjust duration as needed
                  width: "100%"
                }}
              >
                <div className={`event-full-detail `} id="event-detail">
                  <div className="event-full-detail-event">
                    <div className="event-details">
                      <div className="event-view-box-inset">
                        <div className="event-img">
                          <img src={selectedItem?.event_image} alt="" />
                        </div>
                        <div className="event-description">
                          <div className="d-flex justify-content-between align-item-center mb-3">
                          <div
                            className={`events-status ${
                              showUpcomingEvents ? "past" : "coming"
                            }`}
                          >
                            {selectedItem?.event_status}
                          </div>
                          {
                            !showUpcomingEvents && selectedItem?.real_event_id != 0 ?
                              <button className="btn-bordered" onClick={() => {
                                handleShowShare(true, selectedItem?.id)
                              }}>Share</button>
                            : null
                          }
                          </div>
                          <div className="event-title">
                            <p>{selectedItem?.title}</p>
                          </div>
                          <div className="upcoming-event-date">
                            <img src={path_image + "calendar.svg"} alt="" />
                            {selectedItem?.event_date} |{" "}
                            {selectedItem?.start_time?.substring(0, 5)} -{" "}
                            {selectedItem?.end_time?.substring(0, 5)}{" "}
                            {selectedItem?.timezone}
                          </div>
                          <div className="upcoming-event-date">
                            <img src={path_image + "location.svg"} alt="" />
                            {selectedItem?.address}
                          </div>
                          <div className="event-action">
                            {selectedItem?.is_registered == 1 &&
                            selectedItem?.event_status_flag != 0 ? (
                              <a
                                href={selectedItem?.link}
                                target="_blank"
                                className="register_btn"
                              >
                                Register
                              </a>
                            ) : null}
                            {/* {showUpcomingEvents ? (
                                  ""
                                ) : (
                                  <p
                                    onClick={() => handleClick(selectedItem)}
                                    className="add_cal"
                                  >
                                    + Add to your calendar
                                  </p>
                                )} */}
                            {selectedItem?.event_status_flag == 2 ? (
                              <p
                                onClick={() => handleClick(selectedItem)}
                                className="add_cal"
                              >
                                + Add to your calendar
                              </p>
                            ) : (
                              ""
                            )}

                            {/* <a href="/home">+ Add to your calendar</a> */}
                          </div>
                        </div>
                      </div>
                      <div className="event-description-detail p">
                        <DisplayText
                          text={selectedItem?.article}
                          highchartClick={clickOnHere}
                        />
                      </div>
                      {/* <Button type="submit">Register</Button> */}
                    </div>
                    <div className="event-meterials">
                      <div className="event-meterials-box">
                        <div className="event-title">
                          <p>Event materials</p>
                        </div>
                        {selectedItem?.event_material?.length ? (
                          <div className="event-meterials-return">
                            {selectedItem?.event_material?.map(
                              (item, index) => (
                                <div
                                  className="event-meterials-inset"
                                  key={index}
                                >
                                  <div className="material-file-type">
                                    {item?.file_type == "pdf" ? (
                                      <img
                                        src={path_image + "pdf.png"}
                                        alt=""
                                      />
                                    ) : item?.file_type == "ppt" ? (
                                      <img
                                        src={path_image + "ppt.png"}
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        src={path_image + "Video.png"}
                                        alt=""
                                      />
                                    )}
                                  </div>
                                  <div className="event-meterials-content">
                                    <div className="material-category">
                                      {item?.file_type}
                                    </div>
                                    <div className="material-detail-title">
                                      <p>{item?.title}</p>
                                    </div>
                                    <div className="event-meterials-btn_outer">
                                      <a
                                        className="btn btn-filled btn__view"
                                        onClick={() =>
                                          trackUserAction(
                                            item?.id,
                                            "Event-materials",
                                            `${item?.title}`
                                          )
                                        }
                                        href={item?.event_url}
                                        target="_blank"
                                      >
                                        View
                                      </a>
                                      {/*
                                    item?.file_type != "mp4"?<a
                                    className="btn-download"
                                    onClick={(e) =>
                                      handleDownload(
                                        e,
                                        item?.event_url,
                                        item?.file_type
                                      )
                                    }
                                    target="_blank"
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M15.1628 9.85938C15.0136 9.85938 14.8706 9.91864 14.7651 10.0241C14.6596 10.1296 14.6003 10.2727 14.6003 10.4219V12.3428C14.6003 12.7956 14.4204 13.2298 14.1003 13.55C13.7801 13.8701 13.3459 14.05 12.8931 14.05H3.10562C2.65285 14.05 2.21862 13.8701 1.89846 13.55C1.5783 13.2298 1.39844 12.7956 1.39844 12.3428V10.4219C1.39844 10.2727 1.33917 10.1296 1.23368 10.0241C1.1282 9.91864 0.985122 9.85938 0.835938 9.85938C0.686753 9.85938 0.543679 9.91864 0.43819 10.0241C0.332701 10.1296 0.273438 10.2727 0.273438 10.4219V12.3428C0.274182 13.0937 0.572811 13.8137 1.10379 14.3446C1.63477 14.8756 2.35471 15.1743 3.10562 15.175H12.8931C13.644 15.1743 14.364 14.8756 14.895 14.3446C15.4259 13.8137 15.7246 13.0937 15.7253 12.3428V10.4219C15.7253 10.2727 15.666 10.1296 15.5606 10.0241C15.4551 9.91864 15.312 9.85938 15.1628 9.85938Z"
                                        fill="#00A993"
                                      />
                                      <path
                                        d="M7.60047 11.4988C7.65276 11.5515 7.71497 11.5933 7.78352 11.6219C7.85207 11.6504 7.92559 11.6651 7.99984 11.6651C8.0741 11.6651 8.14762 11.6504 8.21617 11.6219C8.28471 11.5933 8.34693 11.5515 8.39922 11.4988L11.5998 8.29813C11.6891 8.19067 11.7353 8.05382 11.7292 7.91423C11.7232 7.77464 11.6654 7.6423 11.5671 7.54298C11.4688 7.44366 11.3371 7.38446 11.1976 7.37692C11.0581 7.36938 10.9207 7.41404 10.8123 7.50219L8.56234 9.75219V1.39063C8.56234 1.24144 8.50308 1.09837 8.39759 0.992877C8.2921 0.887388 8.14903 0.828125 7.99984 0.828125C7.85066 0.828125 7.70759 0.887388 7.6021 0.992877C7.49661 1.09837 7.43734 1.24144 7.43734 1.39063V9.74375L5.18734 7.49375C5.0818 7.3882 4.93864 7.32891 4.78938 7.32891C4.64011 7.32891 4.49695 7.3882 4.39141 7.49375C4.28586 7.5993 4.22656 7.74245 4.22656 7.89172C4.22656 8.04099 4.28586 8.18414 4.39141 8.28969L7.60047 11.4988Z"
                                        fill="#00A993"
                                      />
                                    </svg>
                                  </a>: <a
                                    className="btn-download"
                                    href={item?.event_url}
                                    target="_blank"
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M15.1628 9.85938C15.0136 9.85938 14.8706 9.91864 14.7651 10.0241C14.6596 10.1296 14.6003 10.2727 14.6003 10.4219V12.3428C14.6003 12.7956 14.4204 13.2298 14.1003 13.55C13.7801 13.8701 13.3459 14.05 12.8931 14.05H3.10562C2.65285 14.05 2.21862 13.8701 1.89846 13.55C1.5783 13.2298 1.39844 12.7956 1.39844 12.3428V10.4219C1.39844 10.2727 1.33917 10.1296 1.23368 10.0241C1.1282 9.91864 0.985122 9.85938 0.835938 9.85938C0.686753 9.85938 0.543679 9.91864 0.43819 10.0241C0.332701 10.1296 0.273438 10.2727 0.273438 10.4219V12.3428C0.274182 13.0937 0.572811 13.8137 1.10379 14.3446C1.63477 14.8756 2.35471 15.1743 3.10562 15.175H12.8931C13.644 15.1743 14.364 14.8756 14.895 14.3446C15.4259 13.8137 15.7246 13.0937 15.7253 12.3428V10.4219C15.7253 10.2727 15.666 10.1296 15.5606 10.0241C15.4551 9.91864 15.312 9.85938 15.1628 9.85938Z"
                                        fill="#00A993"
                                      />
                                      <path
                                        d="M7.60047 11.4988C7.65276 11.5515 7.71497 11.5933 7.78352 11.6219C7.85207 11.6504 7.92559 11.6651 7.99984 11.6651C8.0741 11.6651 8.14762 11.6504 8.21617 11.6219C8.28471 11.5933 8.34693 11.5515 8.39922 11.4988L11.5998 8.29813C11.6891 8.19067 11.7353 8.05382 11.7292 7.91423C11.7232 7.77464 11.6654 7.6423 11.5671 7.54298C11.4688 7.44366 11.3371 7.38446 11.1976 7.37692C11.0581 7.36938 10.9207 7.41404 10.8123 7.50219L8.56234 9.75219V1.39063C8.56234 1.24144 8.50308 1.09837 8.39759 0.992877C8.2921 0.887388 8.14903 0.828125 7.99984 0.828125C7.85066 0.828125 7.70759 0.887388 7.6021 0.992877C7.49661 1.09837 7.43734 1.24144 7.43734 1.39063V9.74375L5.18734 7.49375C5.0818 7.3882 4.93864 7.32891 4.78938 7.32891C4.64011 7.32891 4.49695 7.3882 4.39141 7.49375C4.28586 7.5993 4.22656 7.74245 4.22656 7.89172C4.22656 8.04099 4.28586 8.18414 4.39141 8.28969L7.60047 11.4988Z"
                                        fill="#00A993"
                                      />
                                    </svg>
                                  </a>
                                  */}
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="event-meterials-blank">
                            <h6>No materials added yet.</h6>
                          </div>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="brn btn-bordered"
                        onClick={() => {
                          trackingClose();
                          handleExpand({
                            expand: false,
                            flag: 0,
                          });
                          // setItem("");
                          if (isOpen) {
                            setIsOpen(false);
                            setEventDetailView(false);
                            // toggle();
                          }

                          scrollToSection("eventOuterBox");
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              // : null
            }
          </div>
        </div>
      </div>
      {/* )}
      /> */}
      {showEventShare && (
        <ShareEvent
          handleShowShare={handleShowShare}
          handleShowThankYou={handleShowThankYou}
          eventId={shareEventId}
        />
      )}
      {showThank && (
        <ThankModal handleShowThankYou={handleShowThankYou} message={message} />
      )}
    </>
  );
};
export default React.memo(Event);
