import React,{useEffect} from "react";
import { Navigate,useNavigate } from "react-router-dom";


const DefaultLayout = ({ component: Component, header, footer, ...rest }) => {
  const isAuthenticated = localStorage.getItem("un") !== null;

  return (
    <>
      {
        isAuthenticated ?
          <Navigate to="/home" />
        : <Component {...rest} />
      }
    </>
  );
};

export default DefaultLayout;
