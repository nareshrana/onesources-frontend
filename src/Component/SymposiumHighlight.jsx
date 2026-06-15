import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import ExpertSymposium from "./ExpertSymposium";
import { ENDPOINT } from "../axios/apiConfig";
import { getData, postData, externalApi } from "../axios/apiHelper";
import ShareModal from "./CommonComponent/ShareModal";
import ThankModal from "./CommonComponent/ThankModal";
import ScrollContext from "./ScrollContext";
import SymposiumHighlightSkeleton from "./Skeletons/SymposiumHighlightSkeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useUserTracking from "../hooks/useUserTracking";
const SymposiumHighlight = ({ scrollToSection, active }) => {
  const { symposiumRef } = useContext(ScrollContext);
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const [isVisible, setIsVisible] = useState(false);
  const [previousElement, setPreviousElement] = useState("");

  const [rating, setRating] = useState(0);
  const [data, setData] = useState({});
  const [apiFlag, setApiFlag] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showThank, setShowThank] = useState(false);
  const [materialsActiveIndex, setMaterialsActiveIndex] = useState(-1);
  const [encryptUser, setEncryptUser] = useState("JUFCJTEzJUNEWSVBNCVEOCVEREQ");
  const [iframeLoader, setIframeLoader] = useState(false);
  const [isSymposiumHighlightNotLoaded, setIsSymposiumHighlightNotLoaded] =
    useState(true);
  const trackUserAction = useUserTracking();

  const [message, setMessage] = useState(false);
  const [ifFrameLink, setIfFrameLink] = useState({
    link: "",
    flag: false,
  });

  const [id, setId] = useState(-1);
  const [symposiumId, setSymposiumId] = useState(null);

  useEffect(() => {
    getSymposiumHighlights();
    let encUser = localStorage.getItem("ec");
    if (encUser) {
      setEncryptUser(encUser);
    }
  }, []);

  const symposiumHighlightTracking = async (payload) => {
    try {
      if (id != -1) {
        payload.id = id;
      }
      const response = await postData(
        `${ENDPOINT.SYMPOSIUM_HIGHLIGHTS_TRACKING}`,
        payload
      );
      setId(response.data.id);
    } catch (err) {
      console.error("Error fetching ID:", err);
    }
  };

  const getSymposiumHighlights = async () => {
    try {
      //loader("show");
      const user_id = localStorage.getItem("un");
      const response = await getData(
        import.meta.env.VITE_REACT_APP_API_URL_LUMEN +
          ENDPOINT.SYMPOSIUM_HIGHLIGHTS +
          "?uid=" +
          user_id
      );
      //loader("hide");      
      setData(response?.data?.data ?? {});
      setSymposiumId(response?.data?.data?.id );
    } catch (err) {
      console.log("--err", err);
    } finally {
      setIsSymposiumHighlightNotLoaded(false);
    }
  };

  const downloadMaterial = async (e, item) => {
    //loader("show");

    await trackUserAction(item?.id, "Symposium-download", `${item?.title}`);

    symposiumHighlightTracking({
      action: "Symposium Highlights",
      article_id: symposiumId,
      videoId: -1,
      materialId: item?.id,
      clickedData: {
        [`downloadClicked_${item?.id}`]: item?.id,
      },
    });
    let pdfLinks = {
      41: "SPOTLIGHT_EAHAD.pdf",
      46: "EAHAD 2024 symposium_slides.pdf",
      48: "isth_2024_nuwiq_agenda.pdf",
      49: "ISTH2024_Learn About Tomorrows Advances 1.pdf",
    };
    const filePath = pdfLinks[item?.id]
      ? path_image + pdfLinks[item?.id]
      : item?.file_download_url ?? path_image + "SPOTLIGHT_EAHAD.pdf";
    const response = await fetch(filePath);
    const blob = await response.blob();
    const downloadLink = document.createElement("a");
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    const fileExtension = filePath.split(".").pop();
    downloadLink.download = item?.title
      ? `${item.title}.${fileExtension}`
      : `SPOTLIGHT_EAHAD.${fileExtension}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
    //loader("hide");
  };

  const saveToLibraryMaterial = (e, item) => {
    console.log("e-->", e, "--item--->", item);
  };
  const handleIframeLoad = () => {
    setTimeout(() => {
      setIframeLoader(false);
    }, 2000);
  };
  const handleRating = (rate) => {
    setRating(rate);
  };
  const submitRating = async (id, title) => {
    try {
      symposiumHighlightTracking({
        action: "Symposium Highlights",
        article_id: symposiumId,
        videoId: -1,
        materialId: -1,
        clickedData: {
          [`symposiumRating`]: rating,
        },
      });
      let body = {
        symposium_id: id,
        rating: rating,
      };
      await trackUserAction(id, "Symposium-rating", `${title} ~ ${rating}`);
      const res = await postData(ENDPOINT.VIDEORATING, body);
      let sampleData = { ...data };
      if (sampleData) {
        sampleData.has_rated = true;
        setData(sampleData);
        // setForceCount(forceCount + 1);
        setApiFlag(true);
        setTimeout(() => {
          setApiFlag(false);
        }, 3000);
      }
      // setSecondLoader(false);
    } catch (err) {
      // setSecondLoader(false);
    }
  };
  const handleShowShare = (newShowRequest, pdfId) => {
    setMessage({
      heading: "Thank You",
      body: "The content has been shared successfully!",
    });
    setShowShare(newShowRequest);
  };
  const handleShareClicked = () => {
    symposiumHighlightTracking({
      action: "Symposium Highlights",
      videoId: -1,
      article_id: symposiumId,
      materialId: -1,
      clickedData: {
        sharedClicked: 1,
      },
    });
  };
  const handleShowThankYou = (newShowRequest) => {
    setShowThank(newShowRequest);
  };
  const addContentToMyLibrary = async (pdfId, item) => {
    //loader("show");
    await trackUserAction(
      item?.id,
      "Symposium-add-to-library",
      `${item?.title}`
    );
    symposiumHighlightTracking({
      action: "Symposium Highlights",
      article_id: symposiumId,
      videoId: -1,
      materialId: item?.id,
      clickedData: {
        [`libraryClicked_${item?.id}`]: item?.id,
      },
    });
    try {
      let body = {
        method: "UserConsentStatus",
        pdfID: [pdfId],
        emailid: localStorage.getItem("email"),
        consent_option: localStorage.getItem("ct"),
        medium: "OneSource",
      };

      const result = await externalApi(
        import.meta.env.VITE_REACT_APP_API_INDEX_URL + "/UserConsentStatus",
        "post",
        body
      );
      setMessage({
        heading: "Done!",
        body: "The content has been added to your content space successfully",
      });
      handleShowThankYou(true);
    } catch (err) {
      //loader("hide");
      console.log(err);
    } finally {
      //loader("hide");
    }
  };
  const viewClicked = async (item) => {
    await trackUserAction(item?.id, "Symposium-view", `${item?.title}`);
    symposiumHighlightTracking({
      action: "Symposium Highlights",
      article_id: symposiumId,
      videoId: -1,
      materialId: item?.id,
      clickedData: {
        [`viewClicked_${item?.id}`]: item?.id,
      },
    });
  };
  return (
    <div className="" id="symposium-section">
      <div className="expert-opinion your-opinion symposium-highlight">
        <div
          className="expert-opinion-title"
          ref={symposiumRef}
          data-section="symposium"
          id="symposium_move"
        >
          <p>Symposium highlight</p>
        </div>
        {isSymposiumHighlightNotLoaded || Object.keys(data)?.length ? (
          <>
            {isSymposiumHighlightNotLoaded ? (
              <SymposiumHighlightSkeleton />
            ) : (
              <div className="expert-opinion-content">
                <div className="onesource-content-box">
                  <div className="symposium-box-inside">
                    <img src={data?.image} alt="" loading="lazy" />
                    <div className="onesource-content-detail">
                      <div className="opinion-content-detail-upper">
                        <h5
                          dangerouslySetInnerHTML={{
                            __html: data?.heading ? data.heading : "",
                          }}
                        />{" "}
                        <h6
                          className="sub-title"
                          dangerouslySetInnerHTML={{
                            __html: data?.sub_heading ? data.sub_heading : "",
                          }}
                        />
                        <p
                          className="small-description"
                          dangerouslySetInnerHTML={{ __html: data?.content }}
                        ></p>
                      </div>
                      <div className="add-inlibrary">
                        <button
                          onClick={() => {
                            handleShowShare(true, data?.id);
                            handleShareClicked();
                          }}
                          type="button"
                          className="btn btn-default"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M13.4134 5.82735C14.0018 6.34955 14.7764 6.66667 15.625 6.66667C17.466 6.66667 18.9583 5.17428 18.9583 3.33333C18.9583 1.49238 17.466 0 15.625 0C13.7841 0 12.2917 1.49238 12.2917 3.33333C12.2917 3.86996 12.4185 4.37697 12.6438 4.82603L6.71511 8.12558C6.11517 7.24493 5.10428 6.66667 3.95833 6.66667C2.11738 6.66667 0.625 8.15905 0.625 10C0.625 11.8409 2.11738 13.3333 3.95833 13.3333C4.98719 13.3333 5.90718 12.8672 6.51863 12.1346L12.5127 15.4706C12.3699 15.8418 12.2917 16.2451 12.2917 16.6667C12.2917 18.5076 13.7841 20 15.625 20C17.466 20 18.9583 18.5076 18.9583 16.6667C18.9583 14.8257 17.466 13.3333 15.625 13.3333C14.6553 13.3333 13.7822 13.7474 13.1731 14.4085L7.12536 11.0426C7.23328 10.7146 7.29167 10.3641 7.29167 10C7.29167 9.75208 7.2646 9.51048 7.21326 9.278L13.4134 5.82735Z"
                              fill="#00A993"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {data?.show_rating && !data?.has_rated ? (
                    <div className="video-rating">
                      <div className="video-rating-feed">
                        <p>
                          How relevant was this symposium to your clinical
                          practice?
                        </p>

                        <Rating
                          id="rating"
                          onClick={handleRating}
                          ratingValue={rating}
                          initialValue={0}
                          size={34}
                          label
                          //transition
                          fillColor="blue, red, green"
                          emptyColor="#b8bec9"
                          className="feedback"
                        />

                        <Button
                          className={rating ? "btn" : "btn-disabled"}
                          onClick={() => submitRating(data?.id, data?.heading)}
                        >
                          Submit
                        </Button>
                        {/* )} */}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {apiFlag && (
                    <div className="video-rating">
                      <div className="video-rating-feed">
                        <p className="success_msg">
                          Thank you for your feedback
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="symposium-expert d-flex justify-content-between">
                    <div className="agenda-speakers">
                      <div className="agenda-speakers-listed">
                        <img
                          src={
                            data?.speaker_img
                              ? data?.speaker_img
                              : path_image + "speaker.png"
                          }
                          alt=""
                        />
                        {/* <LazyLoadImage
                      key={"agenda-speakers"}
                      src={
                        data?.speaker_img
                          ? data?.speaker_img
                          : path_image + "speaker.png"
                      }
                       effect="blur"
                      wrapperProps={{
                        style: { transitionDelay: "1s" },
                      

                    /> */}
                      </div>
                      <div className="material-box">
                        <div className="expert-opinion-title">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: data?.material_section_title
                                ? data?.material_section_title
                                : "Materials",
                            }}
                          />
                        </div>
                        <div className="material-available">
                          {data?.symposium_materials?.length
                            ? data?.symposium_materials?.map((item, index) => {
                                return (
                                  <div
                                    key={`material-available_${index}`}
                                    className={`material-available-box ${
                                      index == materialsActiveIndex
                                        ? "active"
                                        : ""
                                    }`}
                                    id={item?.id}
                                  >
                                    <img
                                      loading="lazy"
                                      src={
                                        item?.cover_image
                                          ? item?.cover_image
                                          : path_image +
                                            `${
                                              item?.file_type == "ebook"
                                                ? "spotlight-banner.png"
                                                : "spotlight-video.png"
                                            }`
                                      }
                                      alt=""
                                    />
                                    <div className="material-detail">
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: item?.title ? item.title : "",
                                        }}
                                      />
                                      <div className="">
                                        <div className="add-inlibrary">
                                          {item?.enable_download ? (
                                            <button
                                              type="button"
                                              className="btn btn-default"
                                              onClick={(e) =>
                                                downloadMaterial(e, item)
                                              }
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                              >
                                                <path
                                                  d="M16.1628 10.8594C16.0136 10.8594 15.8706 10.9186 15.7651 11.0241C15.6596 11.1296 15.6003 11.2727 15.6003 11.4219V13.3428C15.6003 13.7956 15.4204 14.2298 15.1003 14.55C14.7801 14.8701 14.3459 15.05 13.8931 15.05H4.10562C3.65285 15.05 3.21862 14.8701 2.89846 14.55C2.5783 14.2298 2.39844 13.7956 2.39844 13.3428V11.4219C2.39844 11.2727 2.33917 11.1296 2.23368 11.0241C2.1282 10.9186 1.98512 10.8594 1.83594 10.8594C1.68675 10.8594 1.54368 10.9186 1.43819 11.0241C1.3327 11.1296 1.27344 11.2727 1.27344 11.4219V13.3428C1.27418 14.0937 1.57281 14.8137 2.10379 15.3446C2.63477 15.8756 3.35471 16.1743 4.10562 16.175H13.8931C14.644 16.1743 15.364 15.8756 15.895 15.3446C16.4259 14.8137 16.7246 14.0937 16.7253 13.3428V11.4219C16.7253 11.2727 16.666 11.1296 16.5606 11.0241C16.4551 10.9186 16.312 10.8594 16.1628 10.8594Z"
                                                  fill="#00A993"
                                                />
                                                <path
                                                  d="M8.60047 12.4988C8.65276 12.5515 8.71497 12.5933 8.78352 12.6219C8.85207 12.6504 8.92559 12.6651 8.99984 12.6651C9.0741 12.6651 9.14762 12.6504 9.21617 12.6219C9.28471 12.5933 9.34693 12.5515 9.39922 12.4988L12.5998 9.29813C12.6891 9.19067 12.7353 9.05382 12.7292 8.91423C12.7232 8.77464 12.6654 8.6423 12.5671 8.54298C12.4688 8.44366 12.3371 8.38446 12.1976 8.37692C12.0581 8.36938 11.9207 8.41404 11.8123 8.50219L9.56234 10.7522V2.39063C9.56234 2.24144 9.50308 2.09837 9.39759 1.99288C9.2921 1.88739 9.14903 1.82813 8.99984 1.82812C8.85066 1.82813 8.70759 1.88739 8.6021 1.99288C8.49661 2.09837 8.43734 2.24144 8.43734 2.39063V10.7438L6.18734 8.49375C6.0818 8.3882 5.93864 8.32891 5.78938 8.32891C5.64011 8.32891 5.49695 8.3882 5.39141 8.49375C5.28586 8.5993 5.22656 8.74245 5.22656 8.89172C5.22656 9.04099 5.28586 9.18414 5.39141 9.28969L8.60047 12.4988Z"
                                                  fill="#00A993"
                                                />
                                              </svg>
                                            </button>
                                          ) : null}
                                          {item?.enable_save_to_library ? (
                                            <button
                                              type="button"
                                              className="btn btn-default"
                                              onClick={(e) => {
                                                addContentToMyLibrary(
                                                  item?.file_id,
                                                  item
                                                );
                                              }}
                                            >
                                              <svg
                                                width="14"
                                                height="16"
                                                viewBox="0 0 14 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M11.444 0C12.4258 0 13.2218 0.795938 13.2218 1.77778V10.6667C13.2218 11.6485 12.4258 12.4444 11.444 12.4444H3.44401C2.95309 12.4444 2.55512 12.8424 2.55512 13.3333C2.55512 13.8243 2.95309 14.2222 3.44401 14.2222H13.2218V15.1111C13.2218 15.602 12.8238 16 12.3329 16H2.55512C1.57328 16 0.777344 15.2041 0.777344 14.2222V1.77778C0.777344 0.795938 1.57328 0 2.55512 0H11.444ZM7.76147 5.5873H9.9202C10.2708 5.5873 10.5551 5.87159 10.5551 6.22222C10.5551 6.57285 10.2708 6.85714 9.9202 6.85714H7.76147C7.69134 6.85714 7.63449 6.914 7.63449 6.98413V9.14286C7.63449 9.49349 7.3502 9.77778 6.99957 9.77778C6.64893 9.77778 6.36465 9.49349 6.36465 9.14286V6.98413C6.36465 6.914 6.30779 6.85714 6.23766 6.85714H4.07893C3.7283 6.85714 3.44401 6.57285 3.44401 6.22222C3.44401 5.87159 3.7283 5.5873 4.07893 5.5873H6.23766C6.30779 5.5873 6.36465 5.53044 6.36465 5.46032V3.30159C6.36465 2.95095 6.64893 2.66667 6.99957 2.66667C7.3502 2.66667 7.63449 2.95095 7.63449 3.30159V5.46032C7.63449 5.53044 7.69134 5.5873 7.76147 5.5873Z"
                                                  fill="#00A993"
                                                ></path>
                                              </svg>
                                            </button>
                                          ) : null}

                                          <Button
                                            onClick={() => {
                                              if (item?.file_url != "") {
                                                viewClicked(item);
                                                scrollToSection(
                                                  "symposium-videos"
                                                );
                                                setPreviousElement(item?.id);
                                                setIframeLoader(true);

                                                setMaterialsActiveIndex(index);
                                                setIfFrameLink({
                                                  link: item?.file_url,
                                                  flag: true,
                                                });
                                              }
                                            }}
                                            className="view-btn"
                                          >
                                            View
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            : null}
                        </div>
                      </div>
                    </div>
                    <div className="symposium-expert-videos">
                      {data && (
                        <ExpertSymposium
                          symposiumId={symposiumId}
                          active={active}
                          isVisibleFlag={isVisible}
                          setIsVisibleFlag={setIsVisible}
                          handleIframe={(link, status = false) => {
                            if (status) {
                              setPreviousElement("expertPlayer");
                              scrollToSection("symposium-videos");
                            } else {
                              setPreviousElement("expertPlayer");
                              scrollToSection("expertPlayer");
                            }
                            setIframeLoader(true);
                            setIfFrameLink({
                              link: link,
                              flag: status,
                            });
                          }}
                          type="symposium"
                          symposium={data?.symposium_videos}
                          heading={data?.heading}
                          id={id}
                          setId={setId}
                        />
                      )}
                    </div>
                    <div className="material-box mobile">
                      <div className="expert-opinion-title">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: data?.material_section_title
                              ? data?.material_section_title
                              : "Materials", // Use dynamicContent here if needed
                          }}
                        />{" "}
                      </div>
                      <div className="material-available">
                        {data?.symposium_materials?.length
                          ? data?.symposium_materials?.map((item, index) => {
                              return (
                                <div
                                  key={`material-available-${index}`}
                                  className={`material-available-box ${
                                    index == materialsActiveIndex
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <img
                                    loading="lazy"
                                    src={
                                      item?.cover_image
                                        ? item?.cover_image
                                        : path_image +
                                          `${
                                            item?.file_type == "ebook"
                                              ? "spotlight-banner.png"
                                              : "spotlight-video.png"
                                          }`
                                    }
                                    alt=""
                                  />
                                  {/* <img src={item?.file_url} alt="" />  */}
                                  <div className="material-detail">
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: item?.title ? item.title : "",
                                      }}
                                    />
                                    <div className="">
                                      <div className="add-inlibrary">
                                        {item?.enable_download ? (
                                          <button
                                            type="button"
                                            className="btn btn-default"
                                            onClick={(e) =>
                                              downloadMaterial(e, item)
                                            }
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="18"
                                              height="18"
                                              viewBox="0 0 18 18"
                                              fill="none"
                                            >
                                              <path
                                                d="M16.1628 10.8594C16.0136 10.8594 15.8706 10.9186 15.7651 11.0241C15.6596 11.1296 15.6003 11.2727 15.6003 11.4219V13.3428C15.6003 13.7956 15.4204 14.2298 15.1003 14.55C14.7801 14.8701 14.3459 15.05 13.8931 15.05H4.10562C3.65285 15.05 3.21862 14.8701 2.89846 14.55C2.5783 14.2298 2.39844 13.7956 2.39844 13.3428V11.4219C2.39844 11.2727 2.33917 11.1296 2.23368 11.0241C2.1282 10.9186 1.98512 10.8594 1.83594 10.8594C1.68675 10.8594 1.54368 10.9186 1.43819 11.0241C1.3327 11.1296 1.27344 11.2727 1.27344 11.4219V13.3428C1.27418 14.0937 1.57281 14.8137 2.10379 15.3446C2.63477 15.8756 3.35471 16.1743 4.10562 16.175H13.8931C14.644 16.1743 15.364 15.8756 15.895 15.3446C16.4259 14.8137 16.7246 14.0937 16.7253 13.3428V11.4219C16.7253 11.2727 16.666 11.1296 16.5606 11.0241C16.4551 10.9186 16.312 10.8594 16.1628 10.8594Z"
                                                fill="#00A993"
                                              />
                                              <path
                                                d="M8.60047 12.4988C8.65276 12.5515 8.71497 12.5933 8.78352 12.6219C8.85207 12.6504 8.92559 12.6651 8.99984 12.6651C9.0741 12.6651 9.14762 12.6504 9.21617 12.6219C9.28471 12.5933 9.34693 12.5515 9.39922 12.4988L12.5998 9.29813C12.6891 9.19067 12.7353 9.05382 12.7292 8.91423C12.7232 8.77464 12.6654 8.6423 12.5671 8.54298C12.4688 8.44366 12.3371 8.38446 12.1976 8.37692C12.0581 8.36938 11.9207 8.41404 11.8123 8.50219L9.56234 10.7522V2.39063C9.56234 2.24144 9.50308 2.09837 9.39759 1.99288C9.2921 1.88739 9.14903 1.82813 8.99984 1.82812C8.85066 1.82813 8.70759 1.88739 8.6021 1.99288C8.49661 2.09837 8.43734 2.24144 8.43734 2.39063V10.7438L6.18734 8.49375C6.0818 8.3882 5.93864 8.32891 5.78938 8.32891C5.64011 8.32891 5.49695 8.3882 5.39141 8.49375C5.28586 8.5993 5.22656 8.74245 5.22656 8.89172C5.22656 9.04099 5.28586 9.18414 5.39141 9.28969L8.60047 12.4988Z"
                                                fill="#00A993"
                                              />
                                            </svg>
                                          </button>
                                        ) : null}
                                        {item?.enable_save_to_library ? (
                                          <button
                                            type="button"
                                            className="btn btn-default"
                                            onClick={(e) =>
                                              saveToLibraryMaterial(e, item)
                                            }
                                          >
                                            <svg
                                              width="14"
                                              height="16"
                                              viewBox="0 0 14 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M11.444 0C12.4258 0 13.2218 0.795938 13.2218 1.77778V10.6667C13.2218 11.6485 12.4258 12.4444 11.444 12.4444H3.44401C2.95309 12.4444 2.55512 12.8424 2.55512 13.3333C2.55512 13.8243 2.95309 14.2222 3.44401 14.2222H13.2218V15.1111C13.2218 15.602 12.8238 16 12.3329 16H2.55512C1.57328 16 0.777344 15.2041 0.777344 14.2222V1.77778C0.777344 0.795938 1.57328 0 2.55512 0H11.444ZM7.76147 5.5873H9.9202C10.2708 5.5873 10.5551 5.87159 10.5551 6.22222C10.5551 6.57285 10.2708 6.85714 9.9202 6.85714H7.76147C7.69134 6.85714 7.63449 6.914 7.63449 6.98413V9.14286C7.63449 9.49349 7.3502 9.77778 6.99957 9.77778C6.64893 9.77778 6.36465 9.49349 6.36465 9.14286V6.98413C6.36465 6.914 6.30779 6.85714 6.23766 6.85714H4.07893C3.7283 6.85714 3.44401 6.57285 3.44401 6.22222C3.44401 5.87159 3.7283 5.5873 4.07893 5.5873H6.23766C6.30779 5.5873 6.36465 5.53044 6.36465 5.46032V3.30159C6.36465 2.95095 6.64893 2.66667 6.99957 2.66667C7.3502 2.66667 7.63449 2.95095 7.63449 3.30159V5.46032C7.63449 5.53044 7.69134 5.5873 7.76147 5.5873Z"
                                                fill="#00A993"
                                              ></path>
                                            </svg>
                                          </button>
                                        ) : null}

                                        <Button
                                          onClick={() => {
                                            scrollToSection("symposium-videos");

                                            setMaterialsActiveIndex(index);
                                            setIfFrameLink({
                                              link: item?.file_url,
                                              flag: true,
                                            });
                                          }}
                                          className="view-btn"
                                        >
                                          View
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div id="symposium-videos">
              {ifFrameLink?.flag && (
                <>
                  <div className="symposium-videos-watch">
                    <div className="symposium-videos-link">
                      <img
                        loading="lazy"
                        src={path_image + "close-icon.png"}
                        alt=""
                        className="close_option"
                        onClick={() => {
                          setIsVisible(true);
                          setIfFrameLink(() => ({
                            link: "",
                            flag: false,
                          }));
                          setMaterialsActiveIndex(-1);
                          scrollToSection(previousElement);
                        }}
                      />
                      <div className="iframeOuter" id="iframeOuter">
                        {iframeLoader ? (
                          <div className={`loadspanner show`}>
                            <div className="loadover">
                              <div className="globalloader"></div>
                              <p>Loading the content, please be patient.</p>
                            </div>
                          </div>
                        ) : null}
                        <iframe
                          src={ifFrameLink?.link + "_" + encryptUser}
                          onLoad={handleIframeLoad}
                          title=""
                          height="1008px"
                          width="100%"
                        ></iframe>
                      </div>
                      <Button
                        className="close"
                        onClick={() => {
                          setIsVisible(true);
                          setIfFrameLink(() => ({
                            link: "",
                            flag: false,
                          }));
                          setMaterialsActiveIndex(-1);

                          scrollToSection(previousElement);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="no-data">
            <h4>No symposium highlights live yet</h4>
          </div>
        )}
      </div>
      {showShare && (
        <ShareModal
          handleShowShare={handleShowShare}
          handleShowThankYou={handleShowThankYou}
          pdfId={0}
          symposiumId={symposiumId}
          id={id}
          setId={setId}
        />
      )}
      {showThank && (
        <ThankModal handleShowThankYou={handleShowThankYou} message={message} />
      )}
    </div>
  );
};

export default SymposiumHighlight;
