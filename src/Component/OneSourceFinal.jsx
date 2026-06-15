import React, { lazy, useCallback } from "react";
import Expert from "./Expert";
import Profile from "./Profile";
import LiveStreaming from "./LiveStreaming";
import Event from "./Event";
import SourceContent from "./SourceContent";
import SymposiumHighlights from "./SymposiumHighlight";
import moment from "moment";
import ExpertOpinion from "./ExpertOpinion";
import { useState, useRef, useEffect } from "react";
import "react-h5-audio-player/lib/styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollContext from "./ScrollContext";
import { useContext } from "react";
import ResponsiveNavbar from "./CommonComponent/ResponsiveNavbar";
import Highlight from "./Highlight";
import { externalApi, postData } from "../axios/apiHelper";
import eventConfig from "../config/eventconfig.json";
import eventConfigUSA from "../config/eventconfigUSA.json";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { loader } from "./CommonComponent/Loader.jsx";
import ExpertSymposiumSkeleton from "./Skeletons/ExpertSymposiumSkeleton.jsx";
import { SymposiumHighlightSkeletonLayout } from "./Skeletons/SymposiumHighlightSkeleton.jsx";
import ExpertSkeleton from "./Skeletons/ExpertSkeleton.jsx";
import EventSkeleton from "./Skeletons/EventSkeleton.jsx";
import SourceContentSkeleton, {
  SourceContentSkeletonLayout,
} from "./Skeletons/SourceContentSkeleton.jsx";
import PopularContentSkeleton from "./Skeletons/PopularContentSkeleton.jsx";
import useUserTracking from "../hooks/useUserTracking.jsx";
import { ENDPOINT } from "../axios/apiConfig.js";
import Trials from "./Trials/Trials.jsx";
import TrialSkeletonPage from "./Skeletons/TrialSkeleton.jsx";

const PopuplarContent = lazy(() => import("./PopuplarContent.jsx"));

const OneSourceFinal = (props) => {
  const userCountry = localStorage.getItem("country"); // or whatever key you are using

  const isUSA = localStorage.getItem("un") == "2147541916" && (
    userCountry === "United States" ||
    userCountry === "USA" ||
    userCountry === "United States Minor Outlying Islands");

  const activeEventConfig = isUSA ? eventConfigUSA : eventConfig;
  const [eventId, setEvent] = useState({
    id: activeEventConfig?.eventId,
    companyId: activeEventConfig?.eventCode,
  });

  const { state } = useLocation();
  const active = state?.active ?? 0;

  const {
    highlightRef,
    yourOpinionRef,
    eventRef,

    podcastRef,
  } = useContext(ScrollContext);
  let path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const ref = useRef(null);
  const oneSourceRef = useRef(null);
  const expertRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [tempheight, setTempheight] = useState(0);
  const [profileRenderFirst, setProfileRenderFirst] = useState(0);
  const [expertHeight, setExpertHeight] = useState(0);
  const [expendEventId, setExpendEventId] = useState(0);
  const [renderEventCom, setRenderEventCom] = useState(1);
  const [isResponsive, setIsResponsive] = useState(
    window.innerWidth >= 1200 ? false : true
  );
  const [className, setClassName] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState(1);
  const [highlightArticleFlag, setHighlightArticleFlag] = useState(1);
  const [allContent, setAllContent] = useState(1);
  const [highlightArticle, setHighlightArticle] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [urlParamData, setUrlParamData] = useState({
    loaded: false,
    data: "",
  });
  const [shareCode, setShareCode] = useState("");
  const trackUserAction = useUserTracking();
  const userId = localStorage.getItem("un");
  const navigate = useNavigate();

  const expertFunction = useCallback((data, expand, value, condition = "") => {
    if (condition == "event") {
      setExpertHeight(
        expertRef.current.clientHeight - ref.current.clientHeight + 25
      );
      setHeight(data);
      setExpand({
        expand: expand,
        flag: value,
      });
    } else if (condition) {
      setExpertHeight(data - ref.current.clientHeight);
    } else {
      setHeight(data);
      setExpand({
        expand: expand,
        flag: value,
      });
    }
    // setExpandWidth(0);
  }, []);

  const reRenderProfile = () => {
    setProfileUpdate(profileUpdate + 1);
  };

  useEffect(() => {
    try {
      const param = state?.urlParam || "";
      const data = param.split("/").pop();
      if (data && data !== "undefined") {
        setUrlParamData({
          loaded: true,
          data: data,
        });
        let obj = {
          qrCodeToken: data,
        };
        (async () => {
          const data = await postData(`${ENDPOINT.QRCODE_SHARE_CONTENT}`, obj);
          if (data?.data?.redirect_link) {
            const code = (data?.data?.redirect_link || "").split("code=");
            getMyLibrary(code[code.length - 1]);

            // navigate(data?.data?.redirect_link, { replace: true });
          }
        })();
      }
    } catch (ex) {
    } finally {
      setUrlParamData({
        loaded: true,
        data: "",
      });
    }
  }, [state]);

  const [firstExpand, setExpand] = useState({
    expand: false,
    flag: 0,
    image: "eahad.png",
    article: "Article",
    heading: "Topic Lealquam ultcies idcies quisue nunc neque neuxam dictumst",
    subheading: "",
    description: "",
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1200) {
        setShowProfile(false);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();
    window.history.replaceState({}, "");
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (state?.goto === "symposium-section") {
      scrollToSection("symposium-section");
    } else if (state?.goto === "expert") {
      scrollToSection("secondDiv");
    }
  }, [state?.goto]);

  useEffect(() => {
    if (firstExpand?.flag == 1) {
      setExpertHeight(0);
      setHeight(600);
      if (tempheight === ref?.current?.clientHeight && tempheight > 10) {
        setTimeout(() => {
          if (tempheight === ref?.current?.clientHeight) {
            setHeight(ref?.current?.clientHeight + 25);
          } else {
            setTempheight(ref?.current?.clientHeight);
          }
        }, 100);
      } else {
        setTempheight(ref?.current?.clientHeight);
      }
    }
  }, [firstExpand, tempheight]);

  useEffect(() => {
    if (typeof state?.code !== "undefined") {
      getMyLibrary(state?.code);
    }
    loader("hide");
  }, [state?.code]);

  useEffect(() => {
    if (typeof state?.eventId !== "undefined") {
      handleEventLearnMore(state?.eventId);
    }
    loader("hide");
  }, [state?.eventId]);

  const getMyLibrary = async (code) => {
    try {
      const result = await externalApi(
        import.meta.env.VITE_REACT_APP_API_INDEX_URL + "/OneSourceCodeRegsiter",
        "post",
        {
          method: "OneSourceCodeRegsiter",
          user_id: localStorage.getItem("un"),
          code: code,
        }
      );

      if (result?.data?.data?.library != "No") {
        //open profile section and open My library article
        if (window.innerWidth >= 1200) {
          setShowProfile(false);
          setClassName(true);
        } else {
          setShowProfile(true);
        }
        setShareCode(code);
        // setShowProfile(false);
        // setClassName(true);
        // setShareCode(state?.code);
      } else {
        //Redirec to MY library section article
        setHighlightArticle(result?.data?.data?.url);
        setHighlightArticleFlag(highlightArticleFlag + 1);
        setTimeout(() => {
          const headerHeight = 115;
          var element = document.getElementById("oneSourceLibraryAll");
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
            offsetTop: -headerHeight,
          });
        }, 200);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeExpand = (data) => {
    setExpand(data);
  };

  const handleChildStateChange = (newState) => {
    setClassName(newState);
    setProfileRenderFirst(profileRenderFirst + 1);
  };

  const handleEventLearnMore = (eventId) => {
    // oneSourceRef.current.scrollIntoView({ behavior: "smooth" });
    const element = document.getElementById("eventOuterBox");

    if (!element) {
      const element = document.getElementById("events");
    } else {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    setExpendEventId(eventId);
    setRenderEventCom(renderEventCom + 1);
  };

  const resetDefaultEvent = () => {
    setExpendEventId(0);
  };

  const deleteMyContentFun = () => {
    setAllContent(allContent + 1);
  };

  const moveToHighchart = () => {
    var element = document.getElementById("highchart_move");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const highchartClick = (event) => {
    event.preventDefault();
    if (
      event.target.textContent == "Click Here" ||
      event.target.textContent == "click here" ||
      event.target.textContent == "here" ||
      event.target.textContent == "Here" ||
       event.target.closest("a").getAttribute("href").includes("docintel.app/Haematology_Octapharma") ||
      event.target.getAttribute("href").includes("docintel.app/Haematology_Octapharma")
    ) {
      let article = event.target.getAttribute("href") ? event.target.getAttribute("href") : event.target.closest("a").getAttribute("href"); ;


      if (article && article != "") {
        setHighlightArticle(article);
        setHighlightArticleFlag(highlightArticleFlag + 1);
        setTimeout(() => {
          const headerHeight = 115;
          var element = document.getElementById("oneSourceLibraryAll");
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
            offsetTop: -headerHeight,
          });
        }, 200);
      }
    } else {
      var nearestATag = event.target.closest("a"); // Find the nearest <a> tag
      if (nearestATag) {
        var url = nearestATag.getAttribute("href"); // Get the href attribute
        window.open(url, "_blank");
      }
    }
  };
  const handleShowProfile = (value) => {
    setShowProfile(value);
  };
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const scrollContainerRef = document.getElementById("root");
    if (sectionElement) {
      const scrollContainer = scrollContainerRef;
      const containerOffsetTop = scrollContainer.getBoundingClientRect().top;
      const sectionOffsetTop = sectionElement.getBoundingClientRect().top;

      if (sectionId == "highchart_move") {
        const scrollToPosition =
          sectionOffsetTop -
          containerOffsetTop +
          scrollContainer.scrollTop -
          200;
        scrollContainer.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      } else {
        const scrollToPosition =
          sectionOffsetTop -
          containerOffsetTop +
          scrollContainer.scrollTop -
          100;
        scrollContainer.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <LazyLoadComponent>
        <ResponsiveNavbar />
      </LazyLoadComponent>

      <div className="main-content" id="main">
        <div
          className="responsive-toggle"
          onClick={() => handleShowProfile(!showProfile)}
        >
          {showProfile ? (
            <>
              {" "}
              <div className="responsive-login-btn">
                <img
                  className="close"
                  src={path_image + "close-icon1.png"}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>{" "}
            </>
          ) : (
            <div className="responsive-login-btn">
              <img
                src={path_image + "user-login.svg"}
                alt=""
                style={{ cursor: "pointer" }}
                // onClick={() => trackUserAction(0,`profile-seeMore`,"")}
              />
            </div>
          )}
        </div>
        <div
          className={`right-side full-side ${
            showProfile ? " show-profile" : "close-profile"
          }${className ? " active_right" : "  "}
          ${profileRenderFirst ? " add_animate " : ""}
          `}
        >
          {profileUpdate && (
            <Profile
              expertFunction={expertFunction}
              firstExpand={firstExpand}
              end={moment().add(3, "days")}
              onStateChange={handleChildStateChange}
              profileUpdate={profileUpdate}
              deleteMyContent={deleteMyContentFun}
              learnMore={handleEventLearnMore}
              showProfile={showProfile}
              handleShowProfile={handleShowProfile}
              code={shareCode}
              urlParamData={urlParamData}
            />
          )}
        </div>
        <div
          className={`onesource-section first-sec ${
            firstExpand?.expand && firstExpand?.flag == 1
              ? "firstSectionExpand"
              : firstExpand?.flag == 2
              ? "secondSectionExpand"
              : ""
          }`}
        >
          {<LiveStreaming handleEvent={setEvent} eventData={eventId} />}
          <div ref={highlightRef} data-section="highlight" id="highchart_move">
            <div
              className={`highlight section-left-side ${
                firstExpand?.expand && firstExpand?.flag == 1 ? "show" : "hide"
              }`}
              id="first-section"
              ref={ref}
            >
              <Highlight
                firstExpand={firstExpand}
                setExpand={setExpand}
                moveToHighchart={moveToHighchart}
                highchartClick={highchartClick}
                scrollToSection={scrollToSection}
                defaultIndex={state?.goto}
              />
            </div>
          </div>

          {/* {
            <LazyLoadComponent placeholder={<TrialSkeletonPage />}>
              <Trials />
            </LazyLoadComponent>
          } */}

          {
            <LazyLoadComponent placeholder={<ExpertSkeleton />}>
              <Expert
                expertFunction={expertFunction}
                data={firstExpand}
                // refer={expertRef}
                type="videos"
                scrollToSection={scrollToSection}
                active={active}
              />
            </LazyLoadComponent>
          }
          <div className="onesource-section">
            <div
              className="expert-opinion your-opinion section-right-side"
              style={{
                marginTop:
                  firstExpand?.expand && [4].includes(firstExpand?.flag)
                    ? height
                    : "",
                position:
                  firstExpand?.expand && [4].includes(firstExpand?.flag)
                    ? "relative"
                    : "",
              }}
              data-section="yourOpinion"
              ref={yourOpinionRef}
            >
              <div className="expert-opinion-title">
                <p>Your opinion</p>
              </div>
              <LazyLoadComponent placeholder={<ExpertSymposiumSkeleton />}>
                <ExpertOpinion scrollToSection={scrollToSection} />
              </LazyLoadComponent>
            </div>
          </div>
          <div className="symposium-highlight-section">
            <LazyLoadComponent
              placeholder={<SymposiumHighlightSkeletonLayout />}
            >
              <SymposiumHighlights
                scrollToSection={scrollToSection}
                active={active}
              />
            </LazyLoadComponent>
          </div>
        </div>
        <div className="right-side">
          {!isResponsive ? (
            <div
              className="expert-opinion your-opinion"
              ref={podcastRef}
              data-section="podcasts"
            >
              <div className="expert-opinion-title">
                <p>Podcasts</p>
              </div>
              <div className="expert-opinion-content postcast">
                <div className="postcast-view">
                  <div className="postcast-play-wave">
                    <img src={path_image + "wave-bar.png"} alt="" />
                  </div>
                  <div className="postcast-content-comingsoon">
                    <p>Coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div
          className="onesource-section full-width"
          ref={eventRef}
          data-section="events"
          id="events"
        >
          {renderEventCom && (
            <LazyLoadComponent placeholder={<EventSkeleton />}>
              <Event
                data={firstExpand}
                handleExpand={handleChangeExpand}
                eventRef={oneSourceRef}
                eventId={expendEventId}
                renderEvent={renderEventCom}
                resetEvent={resetDefaultEvent}
                highchartClick={highchartClick}
                scrollToSection={scrollToSection}
              />
            </LazyLoadComponent>
          )}
        </div>

        {isResponsive ? (
          <div
            className="expert-opinion your-opinion"
            ref={podcastRef}
            data-section="podcasts"
          >
            <div className="expert-opinion-title">
              <p>Podcasts</p>
            </div>
            <div className="expert-opinion-content postcast">
              <div className="postcast-view">
                <div className="postcast-play-wave">
                  <img src={path_image + "wave-bar.png"} alt="" />
                </div>
                <div className="postcast-content-comingsoon">
                  <p>Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <LazyLoadComponent placeholder={<PopularContentSkeleton />}>
          <PopuplarContent
            renderProfile={reRenderProfile}
            allContent={allContent}
            scrollToSection={scrollToSection}
          />
        </LazyLoadComponent>

        <LazyLoadComponent placeholder={<SourceContentSkeletonLayout />}>
          {allContent && (
            <SourceContent
              firstExpand={firstExpand}
              handleExpand={handleChangeExpand}
              renderProfile={reRenderProfile}
              allContent={allContent}
              highlightclick={highlightArticle}
              highlightArticleFlag={highlightArticleFlag}
              scrollToSection={scrollToSection}
            />
          )}
        </LazyLoadComponent>
      </div>
    </>
  );
};

export default OneSourceFinal;
