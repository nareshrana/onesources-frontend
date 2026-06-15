import { ENDPOINT } from "../axios/apiConfig";
import { postData } from "../axios/apiHelper";

const getTrackingEndpoint = () => {
  const pathname = window.location.pathname;

  return pathname.startsWith("/ISTH26")
    ? ENDPOINT.TRACKING_USER_ACTIVITY_ISTH_2026
    : ENDPOINT.TRACKING_USER_ACTIVITY;
};

const trackUserActivity = async (eventType, eventData = {}) => {
  const {data:data} = await postData(`${getTrackingEndpoint()}`, {
    eventType,
    timestamp: new Date().toISOString(),
    session_id: localStorage.getItem("session_id") || "unknown",
    ...eventData,
  });
  localStorage.setItem("tracking_id", data.id );
};

const useTrackingHandlers = () => {
  const handleInit = (customData = {},type="ISTH2025") =>
    trackUserActivity("init", {
      ...customData,
      type: type,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      user_id: localStorage.getItem("user_id"),
    });

  const handleClick = ({ id, action, card_heading: title,section_key }) =>
    trackUserActivity("click", { id, action, title, section_key });

  const handleDownload = ({ id, action, card_heading: title, section_key }, url) =>
    trackUserActivity("download", { id, action, title, section_key, url });

  const handleVideoInteraction = (eventData = {}) =>
    trackUserActivity("video_watch", eventData);

  const handleEventInteraction = (eventType, eventData = {}) =>
    trackUserActivity(eventType, eventData);

  return {
    handleClick,
    handleDownload,
    handleVideoInteraction,
    handleEventInteraction,
    handleInit,
  };
};

export default useTrackingHandlers;
