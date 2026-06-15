import React,{useEffect, useState} from 'react'
import { Container, Row } from 'react-bootstrap'
import { loader } from "./CommonComponent/Loader";
import { useLocation,useSearchParams } from 'react-router-dom';
import { postData } from '../axios/apiHelper';
import { ENDPOINT } from '../axios/apiConfig';
const WFH2026 = () => {
    const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
     const [searchParams] = useSearchParams();
      const location = useLocation();
     const [currentMedium, setCurrentMedium] = useState("web");
     const [id, setId] = useState(-1);
       useEffect(()=>{
        const med = searchParams.get("med");
            if (med) {
             setCurrentMedium(med);
             trackingData({calendarClicked :0,downloadClicked:0,videoClicked:0,linkClicked:0,visitedMedium:med,path:location.pathname},id)
            }else{
                trackingData({calendarClicked :0,downloadClicked:0,videoClicked:0,linkClicked:0,visitedMedium:currentMedium,path:location.pathname},id)
            }
        },[searchParams,location.pathname]);

const trackingData = async (payload,id) => {
    try {
      loader("show");
        if(id!= -1){
            payload.id = id
        }
        const response = await postData(
            `${ENDPOINT.EAHAD_TRACKING}`,
            payload
        );
        setId(response.data.id);
        loader("hide");
        } catch (err) {
        loader("hide"); 
        console.error("Error fetching event ID:", err);
     }
   }


  return (
    <>
    <div className="promotion-page wth2026">
                <Container>
                <Row>
                    <div className="promotion-section vh-100 d-flex align-items-center justify-content-center">
                        <div className='promo26 '>
                        <h1>WFH 2026<br/>Octapharma Activities</h1>
                        <h2>Coming soon...</h2>
                        <div className="wth2026-banner">
                        <img src={path_image + "wth2026-banner-img5.png"} alt="One Source"/>
                        </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    </>
  )
}

export default WFH2026