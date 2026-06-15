import React,{useEffect} from 'react'
import { Container, Row } from 'react-bootstrap'
import { loader } from "./CommonComponent/Loader";
const EAHAD26 = () => {
    const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
    console.log("path_image",path_image)
     useEffect(() => {
    loader("hide");
     })
  return (
    <>
    <div className="promotion-page eahad26">
                <Container>
                <Row>
                    <div className="promotion-section vh-100 d-flex align-items-center justify-content-center">
                        <div className='promo26 '>
                        <h1>EAHAD 2026<br/>Octapharma Activities</h1>
                        <h2>Coming soon...</h2>
                        <img src={path_image + "user-image.png"} alt="One Source"/>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    </>
  )
}

export default EAHAD26