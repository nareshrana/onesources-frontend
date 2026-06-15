import React, { useState, useEffect} from "react";
import {Button} from "react-bootstrap";
import moment from "moment";
import { externalApi, postData } from "../axios/apiHelper";
import ThankModal from "./CommonComponent/ThankModal";
import ScrollContext from "./ScrollContext";
import { useContext } from "react";
import  { SkeletonLayout } from "./Skeletons/PopularContentSkeleton";
import useUserTracking from "../hooks/useUserTracking";
import { ENDPOINT } from "../axios/apiConfig";
const PopuplarContent = ({renderProfile, allContent,scrollToSection}) => {
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const [popularContent,setPopularContent] = useState([])
  const [areaExpend,setAreaExpend] = useState(false)
  const [selectedItem,setSelectedItem] = useState({});
  const [myLibrary, setMyLibrary] = useState([]);
  const [showThank, setShowThank] = useState(false);
  const [localRegion, setLocalRegion] = useState(false);
  const [message, setMessage] = useState(false);
  const [isPopularContentNotLoaded,setIsPopularContentNotLoaded] = useState(true);
  const [iframeLoader, setIframeLoader] = useState(false);
  const [isUsa,setIsUsa] = useState(false)
  const [encrUser, setencrUser] = useState('JUFCJTEzJUNEWSVBNCVEOCVEREQ');
  const trackUserAction = useUserTracking();
    const [trackingId, setTracking] = useState(null);
  

    const {

      mostPopularContentRef,

    } = useContext(ScrollContext);

  useEffect(() => {
    handleApiFun("global");
    checkLocalContent();
    checkUsaContent();
    let encUser = localStorage.getItem('ec');
    if(encUser){
        setencrUser(encUser);
    }
  },[allContent])

  const handleIframeLoad = ()=> {
    setTimeout(()=>{
      setIframeLoader(false)
    },2000)
  }

  const checkLocalContent = () => {
    let country = localStorage.getItem('country');
    let countryArr = ['B&H'];
    // let countryArr = ['Albania','Azerbaijan','B&H','Bosnia and Herzegovina','Belarus','Bulgaria','Croatia','Czech Republic','Estonia','Georgia','Hungary',
      // 'Kazakhstan','Kosovo','Latvia','Lithuania','Moldova','Montenegro','North Macedonia',
      // 'Poland','Romania','Serbia','Slovakia','Slovenia','Tajikistan','Ukraine','Uzbekistan',"Argentina","Bahamas","Barbados","Belize","Bolivia",
      // "Chile","Colombia","Costa Rica","Cuba","Curacao","Dominican Republic","Ecuador","El Salvador","Guatemala","Honduras","Jamaica","Panama",
      // "Paraguay","Peru","Trinidad and Tobago","Uruguay","Venezuela","Aguascalientes","Baja California","Baja California Sur","Chihuahua",
      // "Colima","Campeche","Coahuila","Chiapas","Federal District","Durango","Guerrero","Guanajuato","Hidalgo","Jalisco","Mexico City",
      // "Michoacan","Morelos","Nayarit","Nuevo Leon","Oaxaca","Puebla","Queretaro","Quintana Roo","Sinaloa","San Luis Potosi",
      // "Sonora","Tabasco","Tlaxcala","Tamaulipas","Veracruz","Yucatan","Zacatecas","Bahrain","Egypt","Iran", "Islamic Republic of,Iraq",
      // "Iraq","Israel","Jordan","Lebanon","Oman","Palestinian Territory, Occupied","Palestine","Saudi Arabia","Syrian Arab Republic",
      // "United Arab Emirates","Kuwait","Pakistan","Qatar","Sudan","Yemen","Alberta","British Colombia","Manitoba","New Brunswick","Newfoundland and Labrador",
      // "Northwest Territories","Nova Scotia","Nunavut","Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon","Canada", "Mexico City","Mexico"
    // ];
    setLocalRegion(countryArr.includes(country));
  }

  const checkUsaContent = () => {
    let country = localStorage.getItem("country");
    if (
      [
        "United States",
        "USA",
        "US",
        "United States Minor Outlying Islands",
      ].includes(country) && localStorage.getItem("un") == "2147541916"
    )
      setIsUsa(true);
    else setIsUsa(false);
  };

  const handleApiFun = async(type,region_id="")=>{
      // //loader("show")
      setIsPopularContentNotLoaded(true)

    try{
      const result =  await externalApi(import.meta.env.VITE_REACT_APP_API_INDEX_URL + "/OneSourcePopular","post", {"method":"OneSourcePopular","region":type, user_id: localStorage.getItem('un'),"local_id":region_id})

      setPopularContent(result?.data?.data?.data);
      setMyLibrary(result?.data?.data?.data_my);
     //loader("hide")
    }catch(err){
   //loader("hide")
      console.log("err",err)
    }finally{
      setIsPopularContentNotLoaded(false)
    }
  }

  const handleCheckboxChange = (event) => {
    setIsPopularContentNotLoaded(true);
    if(event.target.checked){
      let country = localStorage.getItem('country');

      let cis_country = ['Albania','Azerbaijan','B&H','Bosnia and Herzegovina','Belarus','Bulgaria','Croatia','Czech Republic','Estonia','Georgia','Hungary','Kazakhstan','Kosovo','Latvia','Lithuania','Moldova','Montenegro','North Macedonia','Poland','Romania','Serbia','Slovakia','Slovenia','Tajikistan','Ukraine','Uzbekistan'];
      let latam_country = ["Argentina","Bahamas","Barbados","Belize","Bolivia","Chile","Colombia","Costa Rica","Cuba","Curacao","Dominican Republic","Ecuador","El Salvador","Guatemala","Honduras","Jamaica","Panama","Paraguay","Peru","Trinidad and Tobago","Uruguay","Venezuela"];
      let mexico_country = ["Aguascalientes","Baja California","Baja California Sur","Chihuahua","Colima","Campeche","Coahuila","Chiapas","Federal District","Durango","Guerrero","Guanajuato","Hidalgo","Jalisco","Mexico City","Michoacan","Morelos","Nayarit","Nuevo Leon","Oaxaca","Puebla","Queretaro","Quintana Roo","Sinaloa","San Luis Potosi","Sonora","Tabasco","Tlaxcala","Tamaulipas","Veracruz","Yucatan","Zacatecas"];
      let mena_country = ["Bahrain","Egypt","Iran", "Islamic Republic of,Iraq","Iraq","Israel","Jordan","Lebanon","Oman","Palestinian Territory, Occupied","Palestine","Saudi Arabia","Syrian Arab Republic","United Arab Emirates","Kuwait","Pakistan","Qatar","Sudan","Yemen"];
      let canada_country = ["Alberta","British Colombia","Manitoba","New Brunswick","Newfoundland and Labrador","Northwest Territories","Nova Scotia","Nunavut","Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon","Canada"];

      let region_id = "";
      if(cis_country.includes(country)){
        region_id = 29836198;
      }else if(latam_country.includes(country)){
        region_id = 2147494219;
      }else if(mexico_country.includes(country)){
        region_id = 2147494217;
      }else if(mena_country.includes(country)){
        region_id = 2147494218;
      }else if(canada_country.includes(country)){
        region_id = 2147498474;
      }
      handleApiFun("local",region_id);
    }else{
      handleApiFun("global");
    }
  }
  const removeContentToMyLibrary = async (pdfId) => {
    try {
      let body = {
        user_id: localStorage.getItem("un"),
        pdf_id:pdfId
      };
      const result = await externalApi(
        import.meta.env.VITE_REACT_APP_API_INDEX_URL + ENDPOINT.REMOVE_LIBRARY_CONTENT,
        "post",
        body
      );
      setMessage({
        heading: "Done!",
        body: "The content has been removed from your content space successfully",
      });
      // setMyLibrary((myLibrary) => [...myLibrary, item]);
      setMyLibrary((myLibrary) =>
        myLibrary.filter((entry) => entry.pdf_id != pdfId)
      );
      handleShowThankYou(true);
      renderProfile();
      //loader("hide");
    } catch (err) {
      //loader("hide");
      console.log(err);
    }
  };
  const addContentToMyLibrary = async(pdfId, item) => {
    // //loader("show");
    try{
      let body = {
        method: "UserConsentStatus",
        pdfID: [pdfId],
        emailid: localStorage.getItem('email'),
        consent_option: localStorage.getItem('ct'),
        medium : 'OneSource'
      }

      const result = await externalApi(
        import.meta.env.VITE_REACT_APP_API_INDEX_URL+ "/UserConsentStatus",
        "post",
        body
      );

      setMessage({
        heading: "Done!",
        body: "The content has been added to your content space successfully",
      });
      setMyLibrary(myLibrary => [...myLibrary, item]);
      handleShowThankYou(true);
      renderProfile();
       //loader("hide");
    }catch(err){
      //loader("hide");
      console.log(err);
    }
  }
  const tracking = ()=>{
  }
   const trackingClose = async () => {
    try {
      if (trackingId) {
        await postData(ENDPOINT.UPDATETRACKING, {
          id: trackingId,
        });
        setTracking("");
      }
    } catch (err) {
      console.log("-=er", err);
    }
  };
  const handleShowThankYou = (newShowRequest) => {
    setShowThank(newShowRequest);
  };

  
    return (
      <div className={`onesource-section full-width ${areaExpend?"clicked":""}`} ref={mostPopularContentRef} data-section="mostPopularContent" >
         <div className="expert-opinion your-opinion most-popular" id="mostPopular">
            <div className="expert-opinion-title">
               <p>Most popular content </p>
               {
                 areaExpend
                 ?
                   <img src={path_image+"close-icon.png"}
                   alt=""
                   onClick={()=>{
                      trackingClose()
                     setSelectedItem({})
                     setAreaExpend(false)
                    }}
                  />
                 : null
              }
            </div>
            <div className="expert-opinion-content">

                <div className={!areaExpend ? localRegion ? "switch6" : "switch6 no_local" : "switch6 expand_hide"}>
                  <label className="switch6-light">
                  <input type="checkbox" onChange={handleCheckboxChange} />
                  {isUsa ?
                  <span>
                    <span>
                      USA
                      <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.0001 6.99995C14.0001 8.50257 13.5241 9.89606 12.7153 11.0377C12.4271 11.2905 11.9806 11.3315 11.81 11.2323C11.7665 11.2071 11.7514 11.1858 11.768 11.1189C11.9377 10.4354 11.9106 10.0843 11.8843 9.74482C11.8733 9.6017 11.8627 9.46646 11.8663 9.30284C11.8829 8.51547 11.7753 8.045 11.5175 7.77711C11.2531 7.50272 10.8886 7.4964 10.5364 7.49049C10.2793 7.48609 10.0139 7.48155 9.74501 7.38825C8.93328 6.84679 9.15966 6.49039 9.47174 5.99875C9.65048 5.71736 9.85152 5.40075 9.73979 5.06745C9.78545 4.97719 9.92266 4.82926 9.99351 4.80944C10.5727 4.99054 11.9777 5.02493 12.2463 4.95143C12.5304 4.87356 12.7749 4.40502 12.7311 4.02317C12.6897 3.66141 12.4079 3.43533 11.9771 3.41841C11.9132 3.41581 11.7939 3.42707 11.5519 3.45018C11.2549 3.47867 10.5979 3.54156 10.3637 3.51348C10.2858 3.24226 10.2259 2.69847 10.4634 2.48161C10.7081 2.25775 11.1453 2.11173 11.4646 2.00512C11.5974 1.96079 11.7001 1.92585 11.7811 1.89213C13.1458 3.17034 14.0001 4.98712 14.0001 6.99995ZM3.01071 1.2515C3.26405 1.33063 3.44734 1.39612 3.59773 1.45007C4.2018 1.66622 4.26562 1.66611 5.30206 1.44799C5.98224 1.30473 6.12686 1.42349 6.34618 1.60333C6.52616 1.75098 6.75046 1.93468 7.2249 2.00225C7.36816 2.02275 7.5641 2.02866 7.66743 2.14438C7.71725 2.20052 7.73858 2.27757 7.74063 2.35257C7.74463 2.50463 7.69327 2.6483 7.66853 2.79634C7.64788 2.91895 7.64528 3.05957 7.55185 3.15369C7.439 3.26736 7.20139 3.27548 7.05195 3.30643C6.62468 3.39489 6.25814 3.5365 5.87133 3.73436C5.51108 3.91863 5.06278 4.14786 4.93068 4.82404C4.89284 5.01916 4.62191 5.07295 4.21269 5.13267C3.84571 5.18618 3.46634 5.2415 3.32473 5.54712C3.16966 5.8812 3.41018 6.22798 3.568 6.51104C3.72006 6.78336 3.88213 7.08799 4.15516 7.25796C4.36376 7.38798 4.57428 7.36334 4.92311 7.32263C5.04998 7.30789 5.20781 7.28946 5.39823 7.27434C5.6257 7.27434 7.26111 7.73199 7.82168 8.33085C7.93245 8.44892 7.98473 8.55679 7.97773 8.65118C7.92146 9.39066 7.57662 9.79754 7.21156 10.2284C6.8685 10.6329 6.51418 11.0512 6.43013 11.7284C6.33325 12.5113 6.05295 12.9105 5.9232 12.9139C5.92293 12.9139 5.92238 12.9139 5.92211 12.9139C5.83335 12.9139 5.53711 12.6449 5.32189 11.4387C5.06319 9.98714 4.61696 9.68456 4.25852 9.44141C3.96651 9.24325 3.75558 9.10016 3.74361 8.04434C3.73576 7.34437 3.36711 6.84567 2.77088 6.50029C2.2345 6.18972 1.24543 5.61578 0.67643 4.0002C1.20345 2.89349 2.01283 1.94625 3.01071 1.2515ZM7.00008 14.0001C9.03068 14.0001 10.8618 13.1306 12.1416 11.7449C12.1107 11.747 12.0797 11.7484 12.0491 11.7484C11.8727 11.7484 11.7073 11.7123 11.5755 11.6358C11.3474 11.5034 11.25 11.2679 11.315 11.0064C11.4667 10.3963 11.4433 10.0973 11.4189 9.78089C11.4075 9.63268 11.3955 9.47967 11.3995 9.29296C11.4127 8.66619 11.3392 8.26506 11.1811 8.10078C11.0574 7.97226 10.8623 7.96277 10.5284 7.95698C10.239 7.95216 9.91093 7.94653 9.55976 7.81758C9.54283 7.81137 9.52675 7.80341 9.51188 7.79363C8.98141 7.44576 8.72274 7.07727 8.72066 6.66734C8.71916 6.31356 8.90961 6.01346 9.07761 5.74856C9.24591 5.48354 9.34429 5.31401 9.28938 5.1958C9.19718 4.99751 9.37196 4.75519 9.48423 4.62834C9.69161 4.394 9.92469 4.29658 10.123 4.36097C10.6115 4.51948 11.8963 4.54248 12.1124 4.50341C12.1799 4.45099 12.3055 4.20782 12.2606 4.03914C12.2513 4.00351 12.2224 3.89506 11.959 3.88475C11.9205 3.88366 11.7482 3.90015 11.5962 3.91475C10.3686 4.03225 10.0795 4.01051 9.96775 3.792C9.75198 3.36943 9.7484 2.67895 10.0209 2.28375C10.0576 2.23037 10.1005 2.18096 10.1483 2.13721C10.4663 1.84647 10.9579 1.6823 11.3166 1.56245C11.3366 1.55583 11.357 1.54897 11.3776 1.54208C10.178 0.577938 8.65558 0 7.00008 0C5.73428 0 4.54595 0.337668 3.52026 0.927855C3.6097 0.958809 3.68758 0.98648 3.75501 1.01068C4.25849 1.19066 4.25849 1.19066 5.20573 0.991293C6.04043 0.815555 6.32745 0.984539 6.64188 1.24242C6.7979 1.37025 6.94515 1.49105 7.2908 1.54033C7.59557 1.58367 7.86103 1.63581 8.0238 1.83466C8.28401 2.15236 8.15976 2.71146 8.07926 3.0739C8.01787 3.34953 7.8686 3.58758 7.58223 3.66477C7.32039 3.73524 7.05053 3.76852 6.79156 3.85011C6.54732 3.92716 6.3076 4.03534 6.08388 4.1498C5.75846 4.31629 5.4772 4.46009 5.38885 4.91348C5.2844 5.44764 4.70373 5.53241 4.2799 5.59434C4.09413 5.62157 3.78358 5.66686 3.74793 5.74336C3.74615 5.74708 3.70776 5.83857 3.9019 6.14983L3.97827 6.27298C4.18425 6.60393 4.3085 6.80373 4.4018 6.86178C4.46923 6.90375 4.58645 6.89205 4.86883 6.85915C5.00008 6.84373 5.1637 6.82475 5.36378 6.80879C5.65343 6.78568 7.41554 7.26657 8.12325 7.97166C8.35387 8.20132 8.46161 8.44197 8.4429 8.68651C8.3752 9.57693 7.94618 10.0833 7.56733 10.5301C7.24147 10.9146 6.96011 11.2467 6.89322 11.7857C6.77515 12.7421 6.39909 13.3681 5.93565 13.3804C5.93042 13.3805 5.92547 13.3806 5.9205 13.3806C5.43834 13.3806 5.08252 12.755 4.86232 11.5205C4.63805 10.2628 4.29704 10.0315 3.9964 9.82748C3.57052 9.53865 3.29049 9.25892 3.27688 8.04953C3.27138 7.54261 2.96535 7.15222 2.53684 6.904C2.03982 6.61612 1.0634 6.05043 0.418742 4.61442C0.147793 5.3594 0 6.1626 0 6.99989C0.000109375 10.8598 3.14021 14.0001 7.00008 14.0001Z"
                        fill="#001489"
                        />
                      </svg>
                    </span>
                  </span>:
                  <span>
                    <span>
                      Global
                      <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.0001 6.99995C14.0001 8.50257 13.5241 9.89606 12.7153 11.0377C12.4271 11.2905 11.9806 11.3315 11.81 11.2323C11.7665 11.2071 11.7514 11.1858 11.768 11.1189C11.9377 10.4354 11.9106 10.0843 11.8843 9.74482C11.8733 9.6017 11.8627 9.46646 11.8663 9.30284C11.8829 8.51547 11.7753 8.045 11.5175 7.77711C11.2531 7.50272 10.8886 7.4964 10.5364 7.49049C10.2793 7.48609 10.0139 7.48155 9.74501 7.38825C8.93328 6.84679 9.15966 6.49039 9.47174 5.99875C9.65048 5.71736 9.85152 5.40075 9.73979 5.06745C9.78545 4.97719 9.92266 4.82926 9.99351 4.80944C10.5727 4.99054 11.9777 5.02493 12.2463 4.95143C12.5304 4.87356 12.7749 4.40502 12.7311 4.02317C12.6897 3.66141 12.4079 3.43533 11.9771 3.41841C11.9132 3.41581 11.7939 3.42707 11.5519 3.45018C11.2549 3.47867 10.5979 3.54156 10.3637 3.51348C10.2858 3.24226 10.2259 2.69847 10.4634 2.48161C10.7081 2.25775 11.1453 2.11173 11.4646 2.00512C11.5974 1.96079 11.7001 1.92585 11.7811 1.89213C13.1458 3.17034 14.0001 4.98712 14.0001 6.99995ZM3.01071 1.2515C3.26405 1.33063 3.44734 1.39612 3.59773 1.45007C4.2018 1.66622 4.26562 1.66611 5.30206 1.44799C5.98224 1.30473 6.12686 1.42349 6.34618 1.60333C6.52616 1.75098 6.75046 1.93468 7.2249 2.00225C7.36816 2.02275 7.5641 2.02866 7.66743 2.14438C7.71725 2.20052 7.73858 2.27757 7.74063 2.35257C7.74463 2.50463 7.69327 2.6483 7.66853 2.79634C7.64788 2.91895 7.64528 3.05957 7.55185 3.15369C7.439 3.26736 7.20139 3.27548 7.05195 3.30643C6.62468 3.39489 6.25814 3.5365 5.87133 3.73436C5.51108 3.91863 5.06278 4.14786 4.93068 4.82404C4.89284 5.01916 4.62191 5.07295 4.21269 5.13267C3.84571 5.18618 3.46634 5.2415 3.32473 5.54712C3.16966 5.8812 3.41018 6.22798 3.568 6.51104C3.72006 6.78336 3.88213 7.08799 4.15516 7.25796C4.36376 7.38798 4.57428 7.36334 4.92311 7.32263C5.04998 7.30789 5.20781 7.28946 5.39823 7.27434C5.6257 7.27434 7.26111 7.73199 7.82168 8.33085C7.93245 8.44892 7.98473 8.55679 7.97773 8.65118C7.92146 9.39066 7.57662 9.79754 7.21156 10.2284C6.8685 10.6329 6.51418 11.0512 6.43013 11.7284C6.33325 12.5113 6.05295 12.9105 5.9232 12.9139C5.92293 12.9139 5.92238 12.9139 5.92211 12.9139C5.83335 12.9139 5.53711 12.6449 5.32189 11.4387C5.06319 9.98714 4.61696 9.68456 4.25852 9.44141C3.96651 9.24325 3.75558 9.10016 3.74361 8.04434C3.73576 7.34437 3.36711 6.84567 2.77088 6.50029C2.2345 6.18972 1.24543 5.61578 0.67643 4.0002C1.20345 2.89349 2.01283 1.94625 3.01071 1.2515ZM7.00008 14.0001C9.03068 14.0001 10.8618 13.1306 12.1416 11.7449C12.1107 11.747 12.0797 11.7484 12.0491 11.7484C11.8727 11.7484 11.7073 11.7123 11.5755 11.6358C11.3474 11.5034 11.25 11.2679 11.315 11.0064C11.4667 10.3963 11.4433 10.0973 11.4189 9.78089C11.4075 9.63268 11.3955 9.47967 11.3995 9.29296C11.4127 8.66619 11.3392 8.26506 11.1811 8.10078C11.0574 7.97226 10.8623 7.96277 10.5284 7.95698C10.239 7.95216 9.91093 7.94653 9.55976 7.81758C9.54283 7.81137 9.52675 7.80341 9.51188 7.79363C8.98141 7.44576 8.72274 7.07727 8.72066 6.66734C8.71916 6.31356 8.90961 6.01346 9.07761 5.74856C9.24591 5.48354 9.34429 5.31401 9.28938 5.1958C9.19718 4.99751 9.37196 4.75519 9.48423 4.62834C9.69161 4.394 9.92469 4.29658 10.123 4.36097C10.6115 4.51948 11.8963 4.54248 12.1124 4.50341C12.1799 4.45099 12.3055 4.20782 12.2606 4.03914C12.2513 4.00351 12.2224 3.89506 11.959 3.88475C11.9205 3.88366 11.7482 3.90015 11.5962 3.91475C10.3686 4.03225 10.0795 4.01051 9.96775 3.792C9.75198 3.36943 9.7484 2.67895 10.0209 2.28375C10.0576 2.23037 10.1005 2.18096 10.1483 2.13721C10.4663 1.84647 10.9579 1.6823 11.3166 1.56245C11.3366 1.55583 11.357 1.54897 11.3776 1.54208C10.178 0.577938 8.65558 0 7.00008 0C5.73428 0 4.54595 0.337668 3.52026 0.927855C3.6097 0.958809 3.68758 0.98648 3.75501 1.01068C4.25849 1.19066 4.25849 1.19066 5.20573 0.991293C6.04043 0.815555 6.32745 0.984539 6.64188 1.24242C6.7979 1.37025 6.94515 1.49105 7.2908 1.54033C7.59557 1.58367 7.86103 1.63581 8.0238 1.83466C8.28401 2.15236 8.15976 2.71146 8.07926 3.0739C8.01787 3.34953 7.8686 3.58758 7.58223 3.66477C7.32039 3.73524 7.05053 3.76852 6.79156 3.85011C6.54732 3.92716 6.3076 4.03534 6.08388 4.1498C5.75846 4.31629 5.4772 4.46009 5.38885 4.91348C5.2844 5.44764 4.70373 5.53241 4.2799 5.59434C4.09413 5.62157 3.78358 5.66686 3.74793 5.74336C3.74615 5.74708 3.70776 5.83857 3.9019 6.14983L3.97827 6.27298C4.18425 6.60393 4.3085 6.80373 4.4018 6.86178C4.46923 6.90375 4.58645 6.89205 4.86883 6.85915C5.00008 6.84373 5.1637 6.82475 5.36378 6.80879C5.65343 6.78568 7.41554 7.26657 8.12325 7.97166C8.35387 8.20132 8.46161 8.44197 8.4429 8.68651C8.3752 9.57693 7.94618 10.0833 7.56733 10.5301C7.24147 10.9146 6.96011 11.2467 6.89322 11.7857C6.77515 12.7421 6.39909 13.3681 5.93565 13.3804C5.93042 13.3805 5.92547 13.3806 5.9205 13.3806C5.43834 13.3806 5.08252 12.755 4.86232 11.5205C4.63805 10.2628 4.29704 10.0315 3.9964 9.82748C3.57052 9.53865 3.29049 9.25892 3.27688 8.04953C3.27138 7.54261 2.96535 7.15222 2.53684 6.904C2.03982 6.61612 1.0634 6.05043 0.418742 4.61442C0.147793 5.3594 0 6.1626 0 6.99989C0.000109375 10.8598 3.14021 14.0001 7.00008 14.0001Z"
                        fill="#001489"
                        />
                      </svg>
                    </span>
                    {
                      localRegion ?
                        <span>
                        Local
                        <svg
                        width="12"
                        height="14"
                        viewBox="0 0 12 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                        d="M5.99996 0C3.2042 0 0.929688 2.27451 0.929688 5.07024C0.929688 8.53983 5.46708 13.6334 5.66027 13.8485C5.84172 14.0506 6.15852 14.0503 6.33965 13.8485C6.53283 13.6334 11.0702 8.53983 11.0702 5.07024C11.0702 2.27451 8.79569 0 5.99996 0ZM5.99996 7.62122C4.59334 7.62122 3.449 6.47686 3.449 5.07024C3.449 3.66362 4.59337 2.51929 5.99996 2.51929C7.40655 2.51929 8.55088 3.66365 8.55088 5.07027C8.55088 6.47689 7.40655 7.62122 5.99996 7.62122Z"
                        fill="rgba(0, 20, 137, 0.4)"
                        />
                        </svg>
                        </span>
                        : null
                    }
                  </span>}
                 
                  <a className="btn btn-primary"></a>
                </label>
              </div>

              {
                 areaExpend && (
                   <>
                    {
                      Object.keys(selectedItem)?.length ?
                         <div className="popular-content-viewer">
                             <div className="top-article-img">
                                <img src={selectedItem?.pdf_thumb} alt="" />
                             </div>
                             <div className="top-article-content onesource-content-detail">
                              <div className="opinion-content-detail-upper">
                                 <h5>
                                   {selectedItem?.pdf_title}
                                </h5>
                                <h6 className="sub-title">
                                   {selectedItem?.pdf_sub_title}
                                </h6>
                                 <span className="top-article-date">{moment(selectedItem?.date).format("MMMM DD, YYYY")}</span>
                              </div>

                                   {(() => {
                                                          const isInLibrary = myLibrary?.[
                                                            myLibrary.findIndex((el) => el.pdf_id == selectedItem?.pdf_id)
                                                          ];
                                                          return (
                                                            <div className="add-inlibrary">
                                                              <Button
                                                                variant="default"
                                                                className={isInLibrary ? "library_added" : ""}
                                                                onClick={() =>
                                                                  isInLibrary
                                                                    ? removeContentToMyLibrary(selectedItem?.pdf_id, selectedItem)
                                                                    : addContentToMyLibrary(selectedItem?.pdf_id, selectedItem)
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
                                                                  />
                                                                </svg>
                                                              </Button>
                                                              <div className="add-inlibrary-hover">
                                                                {isInLibrary ? "Remove from my content" : "Add to my content"}
                                                              </div>
                                                            </div>
                                                          );
                                                        })()}
                                {/* <div className="add-inlibrary">
                                      <Button
                                      className = {myLibrary?.[myLibrary.findIndex(el => el.pdf_id == selectedItem?.pdf_id)] ? "library_added" : ""}
                                      variant="default"
                                       onClick={() => addContentToMyLibrary(selectedItem?.pdf_id,selectedItem)}>
                                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.444 0C12.4258 0 13.2218 0.795938 13.2218 1.77778V10.6667C13.2218 11.6485 12.4258 12.4444 11.444 12.4444H3.44401C2.95309 12.4444 2.55512 12.8424 2.55512 13.3333C2.55512 13.8243 2.95309 14.2222 3.44401 14.2222H13.2218V15.1111C13.2218 15.602 12.8238 16 12.3329 16H2.55512C1.57328 16 0.777344 15.2041 0.777344 14.2222V1.77778C0.777344 0.795938 1.57328 0 2.55512 0H11.444ZM7.76147 5.5873H9.9202C10.2708 5.5873 10.5551 5.87159 10.5551 6.22222C10.5551 6.57285 10.2708 6.85714 9.9202 6.85714H7.76147C7.69134 6.85714 7.63449 6.914 7.63449 6.98413V9.14286C7.63449 9.49349 7.3502 9.77778 6.99957 9.77778C6.64893 9.77778 6.36465 9.49349 6.36465 9.14286V6.98413C6.36465 6.914 6.30779 6.85714 6.23766 6.85714H4.07893C3.7283 6.85714 3.44401 6.57285 3.44401 6.22222C3.44401 5.87159 3.7283 5.5873 4.07893 5.5873H6.23766C6.30779 5.5873 6.36465 5.53044 6.36465 5.46032V3.30159C6.36465 2.95095 6.64893 2.66667 6.99957 2.66667C7.3502 2.66667 7.63449 2.95095 7.63449 3.30159V5.46032C7.63449 5.53044 7.69134 5.5873 7.76147 5.5873Z" fill="#00A993"/>
                                        </svg>
                                      </Button>
                                      <div className="add-inlibrary-hover">Add to my content</div>
                                </div> */}
                             </div>
                             <div className="iframeOuter">
                                {
                                  iframeLoader?<div className={`loadspanner show`}>
                                  <div className="loadover">
                                    <div className="globalloader"></div>
                                    <p>Loading the content, please be patient.</p>
                                  </div>
                                  </div>:null
                                }
                             <iframe src={selectedItem?.share_url+"_"+encrUser}
                              onLoad={handleIframeLoad}
                             title="" height="1008px" width="100%"></iframe>
                             </div>
                         </div>
                      : null
                    }
                      <div className="source-content"></div>
                    {
                      /*

                        <Button className="close" onClick={()=>{
                             setSelectedItem({})
                              setAreaExpend(false)
                            }}>Close</Button>
                      */
                    }

                  </>
                 )
               }


               <div className="top-rated-content our_suggestion">
                {
                  isPopularContentNotLoaded ?
                   <SkeletonLayout/>:
                   popularContent?.length > 0 ?
                          popularContent?.slice(0, 3)?.map((item, index) => (
                            <div className={item.pdf_id == selectedItem.pdf_id ? "top-rated-content-box hide" : "top-rated-content-box"} 
                            key={index} 
                            onClick={async ()=>{
                                 tracking()
                                setAreaExpend(true)
                                setIframeLoader(true)
                                setSelectedItem(item)
                                const data = await trackUserAction(item.pdf_id, 'Most-popular-content',`${item?.pdf_title}`);
                                setTracking(data?.id);
                              }} >
                               <div className="top-article-img">
                                  <img src={item?.pdf_thumb} alt="" />
                               </div>
                               <div className="top-article-content">
                                  <h6>
                                     {item?.pdf_title}
                                  </h6>
                                  <p className="top-article-subtitle">
                                     {item?.pdf_sub_title}
                                  </p>
                                  <span className="top-article-date">{moment(item?.date).format("MMMM DD, YYYY")}</span>
                               </div>
                            </div>
                          ))
                        : <div className="popular-event-detail-empty">
                            <p>No content has been found.</p>
                          </div>
                }
                {
                  areaExpend && (
                    <>
                     {
                       Object.keys(selectedItem)?.length ?
                       <div className="source-content_close_btn">
                         <Button className="close" onClick={()=>{
                               scrollToSection("mostPopular")
                              setSelectedItem({})
                               setAreaExpend(false)
                             }}>Close</Button>
                       </div>
                       : null
                     }
                     </>
                   )
                }
               </div>
            </div>
         </div>

         {showThank && (
           <ThankModal handleShowThankYou={handleShowThankYou} message={message} />
         )}
      </div>

    );
};

export default React.memo(PopuplarContent);
