import React, { useEffect, useRef } from "react";
import { ENDPOINT } from "../axios/apiConfig";
import { loader } from "./CommonComponent/Loader";
import {docintelExternal, postData} from "../axios/apiHelper";
// import queryString from 'query-string';
import { redirect, useNavigate } from "react-router-dom";

import { db, auth } from "../config/firebaseConfig";
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import eventConfig from "../config/eventconfig.json";
import eventConfigUSA from "../config/eventconfigUSA.json";

const Redirect =()=>{
    const navigate = useNavigate();
    // const queryParams = queryString.parse(window.location.search);
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);
    let active=queryParams.get('active');
    const userCountry = localStorage.getItem("country");
    const isUSA =  localStorage.getItem("un") == "2147541916" && (
      userCountry === "United States" ||
      userCountry === "USA" ||
      userCountry === "United States Minor Outlying Islands");
  
    const activeEventConfig = isUSA ? eventConfigUSA : eventConfig;
    
    const queryData=useRef({})
    useEffect(() => {
      let query=queryParams?.get('user-id')?.split("goto");
      let codeQuery=queryParams?.get('user-id')?.split(/code/);
      let eventQuery=queryParams?.get('email')?.split(/event/);
      if(query?.length==2){
        queryData.current={
          userId:query[0],
          goto:query[1]
        };

      }else if(codeQuery?.length==2){
        queryData.current={
          userId:codeQuery[0],
          code:codeQuery[1]
        };
      }else if(eventQuery?.length>=1){
        queryData.current={
          email:eventQuery[0],
          eventId:eventQuery?.[1] ? eventQuery?.[1] : queryParams.get('event')
        };
      }else{
        queryData.current={
          userId:queryParams.get('user-id')
        };
      }
         myFun();
        if(eventQuery?.length>=1){
          checkUserExistence();
        }else{
          login()
        }
    },[]);

    
  function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 3600 * 1000); // Convert hours to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
 const login = async() =>{
     let body = {
       user_id:  queryData?.current?.userId
     };
     try{
       const isLogin = await postData(ENDPOINT.NEWLOGIN, body);

      let firebaseId = isLogin?.data?.data?.firebase_id;
      if(!firebaseId || firebaseId == '' || firebaseId == null){
        const firebaseId = await checkAndCreateUser(isLogin?.data?.data?.username);
        localStorage.setItem("fireud",firebaseId);

        const storeFireBase = await postData(`${ENDPOINT?.STORE_FIREBASE}`, {
          user_id:isLogin?.data?.data?.user_id,
          firebase_id:firebaseId
        }); 
      }else{
        localStorage.setItem("fireud",firebaseId);
      }

      if (Object.keys(isLogin?.data?.data?.registered_event).length === 0) {
        localStorage.setItem("register",0);
      } else {
        // if(isLogin?.data?.event_id !=undefined &&isLogin?.data?.event_id!=0){
          let checkEventExist = Object.hasOwn(isLogin?.data?.data?.registered_event, isLogin?.data?.event_id  )
          // let checkEventExist = Object.hasOwn(isLogin?.data?.data?.registered_event,eventConfig?.eventId)
          let exist = checkEventExist ? 1 : 0;
          localStorage.setItem("register",exist);
        // }else{
        //   localStorage.setItem("register",0);
        // }
      }

       localStorage.setItem("evd",isLogin?.data?.event_id?isLogin?.data?.event_id:activeEventConfig?.eventId); 
       localStorage.setItem("eventCode",isLogin?.data?.event_code?isLogin?.data?.event_code:activeEventConfig?.eventCode);  
       localStorage.setItem("dhdjdluytt",isLogin?.data?.token);
       localStorage.setItem("bhdkdlolepk","pastrara6789943dcgbh");
       localStorage.setItem("dhdjdluytp","01245a4sd045");
       localStorage.setItem("un",isLogin?.data?.data?.user_id);
       localStorage.setItem("name",isLogin?.data?.data?.name);
       localStorage.setItem("ec",isLogin?.data?.data?.encryped_id);
        if(isLogin?.data?.data?.country != '0'){
          localStorage.setItem("country",isLogin?.data?.data?.country);
        }
       localStorage.setItem("email",isLogin?.data?.data?.username);
       localStorage.setItem("ct",isLogin?.data?.data?.consent);
       
      //  if(isLogin.status === 200){
        const token=isLogin?.data?.token;
        if(token.length > 0){   
         setCookie("timeLeft",token, 3);
        }
      // }
      
       if(queryData.current?.code ||  queryData.current?.goto || queryParams.get('code') || queryData.current?.eventId || queryParams.get('event')){

        let stateObject = {};
        if (queryData.current?.code) {
          stateObject.code = queryData.current?.code;
        }
         if (queryParams.get('code')) {
          stateObject.code = queryParams.get('code');
        }
        if ( queryData.current?.goto) {
          stateObject.goto =  queryData.current?.goto;
        }
        if ( queryData.current?.eventId) {
          stateObject.eventId =  queryData.current?.eventId;
        }
         
        if(active){
          stateObject.active=active
        }

        navigate("/home", {
          state: stateObject,
        });
        //  navigate("/home", {
        //    state: { code: queryParams.get('code') },
        //  });
       }else{
         // loader("hide");
         navigate("/home");
       }
     }catch(err){
       console.log(err);
       loader("hide");
       navigate("/login");
     }
 }

 const checkAndCreateUser = async(email) => {
  try {
    const userId = await createUserIfNotExists(email);
    return userId;
  } catch (error) {
    console.error('Error in component:', error.message);
  }
}

const createUserIfNotExists = async (email) => {
  try {
    const userId = await checkUserExists(email);
    if (!userId) {
      // User does not exist, create a new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, '12345678');
      const user = userCredential.user;
      // Save additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        // Add any other user data you want to store
      });
      return user.uid;
    }
    // User already exists, return their ID
    return userId;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
};

const checkUserExists = async (email) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, '12345678');
    const user = userCredential.user;
    return user.uid;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      // User does not exist, return null
      return null;
    } else {
      // Handle other errors
      console.error('Error checking user existence:', error.message);
      throw error;
    }
  }
};

const checkUserExistence = async() => {
  let body = {
    userdetail:  queryData?.current?.email
  };
  const result = await docintelExternal(
    import.meta.env.VITE_REACT_APP_API_KEY + "check-register",
    "post",
    body
  );
  if(!result?.data?.success){
    navigate("/register");
  }else{
    const user_id = result?.data?.data?.id;
    queryData.current={
      userId:user_id,
      eventId:queryData?.current?.eventId
    };
    login();
  }
}

  const myFun = () => {
      loader("show");
     };
    return (
        <>
        </>
    )
}
export default Redirect
