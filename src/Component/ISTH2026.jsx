import React, { useCallback, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation, useSearchParams } from "react-router-dom";
import { loader } from "./CommonComponent/Loader";
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";

const Isth2026 = ({section}) => {
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [currentMedium, setCurrentMedium] = useState("web");
  const [id, setId] = useState(-1);
  useEffect(() => {
    const med = searchParams.get("med");
    const medium = med ? med : currentMedium;
    if (med) setCurrentMedium(med);
    trackingData(
      {
        calendarClicked: 0,
        downloadClicked: 0,
        videoClicked: 0,
        linkClicked: 0,
        visitedMedium: medium,
        type: location.pathname.replaceAll("/", "").toLocaleUpperCase(),
      },
      id,
    );
  }, [searchParams, location.pathname]);

  const trackingData = useCallback(async (payload, id) => {
    try {
      loader("show");
      if (id != -1) {
        payload.id = id;
      }
      const response = await postData(`${ENDPOINT.WFH_TRACKING}`, payload);
      setId(response.data.id);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.error("Error fetching event ID:", err);
    }
  }, []);

  return (
    <div className="--isth2026">
      <Container fluid>
        <Row className="justify-content-center">
          <div className="isth-card">
            <div className="isth-main">
              <div className="isth-banner">
                <img src={path_image + "isth26-banner.png"} alt="ISTH Banner" />
              </div>
              <div className="isth-content">
                <h1>
                  ISTH 2026 <br />
                  Octapharma Activities
                </h1>
                <h2>Coming soon...</h2>
              </div>
            </div>

            <div className="isth-footer">
              <img
                src={path_image + "isth26-footer.png"}
                alt="Footer Skyline"
              />
            </div>
            <div className="isth-logo">
              <img src={path_image + "octapharma-white.png"} alt="Octapharma" />
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Isth2026;
