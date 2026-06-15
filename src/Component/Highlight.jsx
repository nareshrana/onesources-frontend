import React, { useCallback, useEffect, useState, useRef } from "react";
import { getData, postData } from "../axios/apiHelper";
// import SlideToggle from "react-slide-toggle";
import { ENDPOINT } from "../axios/apiConfig";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import DisplayText from "./CommonComponent/DisplayText";
import { Button } from "react-bootstrap";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import useUserTracking from "../hooks/useUserTracking";
import { stopAllPlayingVideos } from "../util/utils";
let path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
const Highlight = ({
  firstExpand,
  setExpand,
  moveToHighchart,
  highchartClick,
  scrollToSection,
  defaultIndex,
}) => {
  const [box, setBoxData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHighlightNotLoaded, setIsHighlightNotLoaded] = useState(true);
  const [expendStatus, setExpendStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expandWidth, setExpandWidth] = useState(0);
  const [highLightSectionTrack, setHighLightSectionTrack] = useState(0);
  const [eventDetailView, setEventDetailView] = useState(false);
  const detailViewRef = useRef(null);
  const trackUserAction = useUserTracking();

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        // //loader("show");
        const post = await getData(
          import.meta.env.VITE_REACT_APP_API_URL_LUMEN +
          `${ENDPOINT.POSTS}`
        );
        setBoxData(post?.data?.data || []);
      } catch (err) {
        console.error("-err", err);
      } finally {
        // //loader("hide");
        setIsHighlightNotLoaded(false);
      }
    };

    fetchArticleData();
  }, []);

  useEffect(() => {
    if (detailViewRef.current) {
      detailViewRef.current.style.maxHeight = eventDetailView
        ? `${detailViewRef.current.scrollHeight + 150}px`
        : "0px";
    }
  }, [eventDetailView, currentIndex]);

  useEffect(() => {
    if (box?.length > 0 && defaultIndex) {
      renderCompleteHandler();
    }
  }, [box]);

  const handleSetExpand = useCallback(
    (item, flag = 1) => {
      setExpand({
        id: item?.id,
        expand: true,
        image: item?.image,
        flag: flag,
        article: item?.article,
        heading: item?.heading,
        subheading: item?.subheading,
        video: item?.video,
        description: item?.description,
      });
    },
    [setExpand]
  );

  const renderCompleteHandler = () => {
    const [key, index] = defaultIndex.split("-");

    if (defaultIndex === "highlight-aland" || key.includes("highlight")) {
      if (index != -1 && box?.length > 0 && box?.[index]) {
        setTimeout(() => {
          moveToHighchart();
          handleSetExpand(box?.[index], 1);
          handleTracking(box?.[index]?.id, box?.[index]?.heading);
          setEventDetailView(true);
          setCurrentIndex(index);
          setExpendStatus(true);
          setIsOpen(true);
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (expendStatus || box.length === 0) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % box.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, box.length, expendStatus]);

  const updateTracking = useCallback(async (trackId) => {
    if (!trackId) return;

    try {
      await postData(`${ENDPOINT.UPDATETRACKING}`, {
        id: trackId,
        updated_at: new Date().toISOString(), // Add update time
      });
    } catch (err) {
      console.error(err);
    } finally {
      setHighLightSectionTrack(0);
    }
  }, []);

  const handleTracking = useCallback(
    async (id, title) => {
      try {
        if (highLightSectionTrack) {
          await updateTracking(highLightSectionTrack);
        }
        const data = await trackUserAction(id, "Highlights", `${title}`);
        setHighLightSectionTrack(data?.id || 0);
      } catch (err) {
        console.error(err);
      }
    },
    [highLightSectionTrack, updateTracking, trackUserAction]
  );

  const handleClose = useCallback(() => {
    scrollToSection("highchart_move");
    stopAllPlayingVideos();
    setIsOpen(false);
    setEventDetailView(false);
    setTimeout(() => {
      setExpand({
        ...firstExpand,
        expand: false,
        flag: 0,
        close: 0,
      });

      setExpandWidth(0);
      setExpendStatus(false);
      if (highLightSectionTrack) {
        updateTracking(highLightSectionTrack);
      }
    }, 1000);
  }, [firstExpand, highLightSectionTrack, updateTracking]);
  return (
    <>
      {/* <SlideToggle
        duration={1000}
        collapsed={true}
        whenReversedUseBackwardEase={false}
        render={({ toggle, setCollapsibleElement }) => ( */}
      <div className="highlight-box">
        <div className="highlight-title">
          <p>Highlights</p>
          {firstExpand?.expand && firstExpand?.flag == 1 ? (
            <img
              src={path_image + "close-icon.png"}
              alt=""
              onClick={handleClose}
            />
          ) : (
            ""
          )}
        </div>
        {isHighlightNotLoaded || box.length ? (
          <div
            className={`highlight-content ${
              firstExpand?.flag == 1
                ? "expand"
                : firstExpand?.close == 0
                ? "close"
                : ""
            }`}
          >
            <div
              className="article-main-content"
              style={{ width: expandWidth ? expandWidth : "" }}
            >
              {isHighlightNotLoaded ? (
                <div className="article-main-img">
                  {" "}
                  <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
                    {" "}
                    <Skeleton duration={2} height={410} width={297} />{" "}
                  </SkeletonTheme>
                </div>
              ) : (
                <div className="article-main-img">
                  {firstExpand?.flag == 1 ? (
                    <img src={firstExpand?.image} alt="" />
                  ) : (
                    <>
                      {box?.length > 0 ? (
                        <img
                          className="first_img_load"
                          onClick={() => {
                            moveToHighchart();
                            handleSetExpand(box?.[currentIndex], 1);
                            handleTracking(
                              box?.[currentIndex]?.id,
                              box?.[currentIndex]?.heading
                            );
                            setExpendStatus(true);
                            if (!isOpen) {
                              setIsOpen(true);
                              setEventDetailView(true);
                              // toggle();
                            }
                          }}
                          src={box?.[currentIndex]?.image}
                          loading="lazy" // New line for lazy loading
                          alt=""
                        />
                      ) : null}
                    </>
                  )}
                </div>
              )}

              <div className="article-description">
                <div className="article-category">
                  {firstExpand?.article ? firstExpand?.article : "Article"}
                </div>
                <div className="article-detail-title">
                  <h5>{firstExpand?.heading}</h5>
                  <h6 className="expand-subheading">
                    {firstExpand?.subheading}
                  </h6>
                </div>
              </div>
            </div>
            {/*ref={setCollapsibleElement}*/}
            <div
              ref={detailViewRef}
              style={{
                overflow: "hidden", // Important for the sliding effect
                transition: "max-height 1.2s ease-in-out", // Adjust duration as needed
              }}
            >
              <div
                className="article-des-full"
                style={{
                  display:
                    firstExpand?.expand == true && firstExpand?.flag == 1
                      ? "block"
                      : "none",
                }}
              >
                <div className="article-des-full-detailed">
                  <h6>
                    {firstExpand?.description ? (
                      <DisplayText
                        text={firstExpand?.description}
                        highchartClick={highchartClick}
                      />
                    ) : null}
                  </h6>
                </div>
                <div className="article-list">
                  {isHighlightNotLoaded ? (
                    <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
                      {" "}
                      {[...Array(3)].map((_, index) => (
                        <div className={`article-list-box  `} key={index}>
                          <div className="article-img">
                            <Skeleton width={86} height={115} />
                          </div>
                          <div
                            className="article-description"
                            style={{ marginLeft: 10 }}
                          >
                            <div className="article-detail-title">
                              <h6>
                                <Skeleton width={1000} height={35} />
                              </h6>
                              <p>
                                <Skeleton width={970} height={27} />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </SkeletonTheme>
                  ) : (
                    box?.map((item, index) => (
                      <div
                        className={`article-list-box ${
                          index == currentIndex ? "active" : ""
                        }`}
                        key={index}
                        onClick={() => {
                          handleSetExpand(item, 1);
                          if (!isOpen) {
                            setIsOpen(true);
                            setEventDetailView(true);
                            // toggle();
                          }
                          setCurrentIndex(index);
                          setExpendStatus(true);
                          // moveToHighchart()
                          handleTracking(item?.id, item?.heading);
                        }}
                      >
                        <div className="article-img ">
                          <img src={item?.image} alt="" />
                        </div>
                        <div className="article-description">
                          <div className="article-category">
                            {item?.article ? item?.article : "Article"}
                          </div>
                          <div className="article-detail-title">
                            <h6>{item?.heading}</h6>
                            <p>{item?.subheading}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="article-list">
              {isHighlightNotLoaded ? (
                <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
                  {" "}
                  {[...Array(3)].map((_, index) => (
                    <div className={`article-list-box  `} key={index}>
                      <div className="article-img">
                        <Skeleton width={100} height={115} />
                      </div>
                      <div
                        className="article-description"
                        style={{ marginLeft: 10 }}
                      >
                        <div className="article-detail-title">
                          <h6>
                            <Skeleton width={1000} height={35} />
                          </h6>
                          <p>
                            <Skeleton width={970} height={27} />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </SkeletonTheme>
              ) : (
                box?.map((item, index) => (
                  <div
                    className={`article-list-box ${
                      index == currentIndex ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      handleSetExpand(item, 1);
                      if (!isOpen) {
                        setIsOpen(true);
                        setEventDetailView(true);
                        // toggle();
                      }
                      handleTracking(item?.id, item?.heading);
                      setCurrentIndex(index);
                      setExpendStatus(true);
                      // moveToHighchart()
                    }}
                  >
                    <LazyLoadComponent>
                      <div className="article-img ">
                        <img src={item?.image} alt="" />
                      </div>
                      <div className="article-description">
                        <div className="article-category">
                          {item?.article ? item?.article : "Article"}
                        </div>
                        <div className="article-detail-title">
                          <h6>{item?.heading}</h6>
                          <p>{item?.subheading}</p>
                        </div>
                      </div>
                    </LazyLoadComponent>
                  </div>
                ))
              )}
            </div>

            {firstExpand?.flag == 1 ? (
              <Button className="close" onClick={handleClose}>
                Close
              </Button>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="no-data">
            <h4>No highlights live yet</h4>
          </div>
        )}
      </div>
      {/* )}
      /> */}
    </>
  );
};
export default React.memo(Highlight);
