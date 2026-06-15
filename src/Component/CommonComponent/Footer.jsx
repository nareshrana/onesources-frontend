import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
   let path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  return (
    <>
    <section className='footer'>
      <div className='footer-content'>
        <div className='footer-logo'>
          <a href="https://onesource.octapharma.com/">
            <img src={path_image + "footer-logo.svg"} alt=""/>
          </a>
        </div>
        <div className='footer-links'>
        <Link to="/octapharma-privacy" target="_blank">Octapharma Privacy Statement</Link>
          {/* <Link to="/docintel-privacy" target="_blank">Docintel Privacy Policy</Link>
          <Link to="/terms_of_use" target="_blank">Terms of Use</Link> */}

        </div>
        {/* <div className='docintel-logo'>
            <a href="https://albert.docintel.app/" target="_blank">
              <img src={path_image + "docintel-logo.svg"} alt=""/>
            </a>
        </div> */}
      </div>
    </section>
    </>
  )
}

export default Footer
