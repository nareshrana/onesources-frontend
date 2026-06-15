import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { loader } from "./CommonComponent/Loader";


const PageNotFound = () => {

  useEffect(() => {
    loader("hide")
  }, []);
  
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  return (
    <div className="page_not_found">
      <div className="page_not_found-inset">
      <img src={path_image + "not-found-page-logo.svg"} alt="Logo"/>
      <div className="not-found">
         <h1>404</h1>
      </div>
        <h4>Page not found</h4>
        <p>The link you clicked may be broken or the page may have been removed or renamed.</p>
        <Link to="/login">Go back</Link>
    </div>
    </div>
  )
}

export default PageNotFound;
