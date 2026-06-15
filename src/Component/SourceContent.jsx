import React, { useState, useEffect, useRef } from "react";
import { Button, Accordion } from "react-bootstrap";
import { externalApi, postData } from "../axios/apiHelper";
import RequestModal from "./CommonComponent/RequestModal";
import ShareModal from "./CommonComponent/ShareModal";
import ThankModal from "./CommonComponent/ThankModal";
import DisplayText from "./CommonComponent/DisplayText";
import ScrollContext from "./ScrollContext";
import { useContext } from "react";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import SourceContentSkeleton from "./Skeletons/SourceContentSkeleton";
import useUserTracking from "../hooks/useUserTracking";
import { toast } from "react-toastify";
import { ENDPOINT } from "../axios/apiConfig";

const SourceContent = ({
  firstExpand,
  handleExpand,
  renderProfile,
  allContent,
  highlightclick,
  highlightArticleFlag,
  scrollToSection,
}) => {
  const { oneSourceLibraryRef } = useContext(ScrollContext);
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const [selected, setSelected] = useState([]);
  const [articleOptions, setArticleOptions] = useState("");
  const [sortType, setSortType] = useState("Activated_dateD");
  const [iframeLoader, setIframeLoader] = useState(false);
  const [apiCallFlag, setApiCallFlag] = useState(false);
  const [localRegion, setLocalRegion] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [encryptUser, setencryptUser] = useState("JUFCJTEzJUNEWSVBNCVEOCVEREQ");
  const [data, setData] = useState({
    library: [],
    data: [],
  });
  const [myLibrary, setMyLibrary] = useState([]);
  const [libraryData, setLibraryData] = useState({});
  const [filterData, setFilterData] = useState({ Library: "platform" });
  const [displayFilters, setDisplayFilters] = useState({});
  const [filterApply, setFilterApply] = useState(false);
  const [userFilterApply, setUserFilterApply] = useState(false);
  const [search, setSearch] = useState("");
  const [showRequest, setShowRequest] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showThank, setShowThank] = useState(false);
  const [message, setMessage] = useState(false);
  const [pdfId, setPdfId] = useState(0);
  const [filterCounter, setFilterCounter] = useState(1);
  const [isSourceContentNotLoaded, SetIsSourceContentNotLoaded] =
    useState(true);
  const trackUserAction = useUserTracking();
  const [isUsa,setIsUsa] = useState(false)
  const [trackingId, setTracking] = useState(null);

  useEffect(() => {
    handleApiFun("global");
    checkLocalContent();
    checkUsaContent();
    let encUser = localStorage.getItem("ec");
    if (encUser) {
      setencryptUser(encUser);
    }
  }, [allContent]);

  useEffect(() => {
    if (apiCallFlag) {
      defaultRender();
    }
  }, [highlightclick, highlightArticleFlag, apiCallFlag]);

  const defaultRender = () => {
    if (highlightclick != "") {
      let defaultData =
        data?.data?.[
          data?.data?.findIndex((el) => el.share_url == highlightclick)
        ];
      if (defaultData) {
        setSelected(defaultData);
        setIframeLoader(true);
        handleExpand({
          expand: true,
          flag: 6,
        });
      } else {
        let defaultMy =
          myLibrary?.[
            myLibrary?.findIndex((el) => el.share_url == highlightclick)
          ];
        if (defaultMy) {
          setSelected(defaultMy);
          setIframeLoader(true);
          handleExpand({
            expand: true,
            flag: 6,
          });
        }
      }
    }
  };

  const handleApiFun = async (type, region_id = "") => {
    // //loader("show");
    try {
      const result = await externalApi(
        import.meta.env.VITE_REACT_APP_API_INDEX_URL + "/OneSourceLibrary",
        "post",
        {
          method: "OneSourceLibrary",
          region: type,
          user_id: localStorage.getItem("un"),
          local_id: region_id,
        }
      );

      setData({
        library: result?.data?.data?.data,
        data: result?.data?.data?.data,
      });

      setMyLibrary(result?.data?.data?.data_my);
      result?.data?.data?.format.shift();
      setLibraryData({
        format: result?.data?.data?.format,
        product: result?.data?.data?.product,
        tags: result?.data?.data?.tags,
        platform: ["Library", "Congress"],
      });
      setApiCallFlag(true);

      // setTimeout(()=>{
      //   var buttonElement = document.getElementById('applyFilter');
      //   buttonElement.click();
      // },2000)

      //loader("hide");
    } catch (err) {
      //loader("hide");
      console.log("err", err);
    } finally {
      SetIsSourceContentNotLoaded(false);
    }
  };

  const buttonRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setFilterApply(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const checkLocalContent = () => {
    let country = localStorage.getItem('country');
    let countryArr = ['Albania', 'Azerbaijan', 'B&H', 'Bosnia and Herzegovina', 'Belarus', 'Bulgaria', 'Croatia', 'Czech Republic', 'Estonia', 'Georgia', 'Hungary',
      'Kazakhstan', 'Kosovo', 'Latvia', 'Lithuania', 'Moldova', 'Montenegro', 'North Macedonia',
      'Poland', 'Romania', 'Serbia', 'Slovakia', 'Slovenia', 'Tajikistan', 'Ukraine', 'Uzbekistan', "Argentina", "Bahamas", "Barbados", "Belize", "Bolivia",
      "Chile", "Colombia", "Costa Rica", "Cuba", "Curacao", "Dominican Republic", "Ecuador", "El Salvador", "Guatemala", "Honduras", "Jamaica", "Panama",
      "Paraguay", "Peru", "Trinidad and Tobago", "Uruguay", "Venezuela", "Aguascalientes", "Baja California", "Baja California Sur", "Chihuahua",
      "Colima", "Campeche", "Coahuila", "Chiapas", "Federal District", "Durango", "Guerrero", "Guanajuato", "Hidalgo", "Jalisco", "Mexico City",
      "Michoacan", "Morelos", "Nayarit", "Nuevo Leon", "Oaxaca", "Puebla", "Queretaro", "Quintana Roo", "Sinaloa", "San Luis Potosi",
      "Sonora", "Tabasco", "Tlaxcala", "Tamaulipas", "Veracruz", "Yucatan", "Zacatecas", "Bahrain", "Egypt", "Iran", "Islamic Republic of,Iraq",
      "Iraq", "Israel", "Jordan", "Lebanon", "Oman", "Palestinian Territory, Occupied", "Palestine", "Saudi Arabia", "Syrian Arab Republic",
      "United Arab Emirates", "Kuwait", "Pakistan", "Qatar", "Sudan", "Yemen", "Alberta", "British Colombia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
      "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon", "Canada","Mexico City","Mexico"
    ];
    setLocalRegion(countryArr.includes(country));
  };

  const checkUsaContent = ()=>{
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
  }

  const handleCheckboxChange = (event) => {
    setSelected([]);
    setFilterData({ Library: "platform" });
    setSearch("");
    setDisplayFilters({});
    SetIsSourceContentNotLoaded(true);
    if (event.target.checked) {

      let country = localStorage.getItem('country');
      let cis_country = ['Albania', 'Azerbaijan', 'B&H', 'Bosnia and Herzegovina', 'Belarus', 'Bulgaria', 'Croatia', 'Czech Republic', 'Estonia', 'Georgia', 'Hungary', 'Kazakhstan', 'Kosovo', 'Latvia', 'Lithuania', 'Moldova', 'Montenegro', 'North Macedonia', 'Poland', 'Romania', 'Serbia', 'Slovakia', 'Slovenia', 'Tajikistan', 'Ukraine', 'Uzbekistan'];
      let latam_country = ["Argentina", "Bahamas", "Barbados", "Belize", "Bolivia", "Chile", "Colombia", "Costa Rica", "Cuba", "Curacao", "Dominican Republic", "Ecuador", "El Salvador", "Guatemala", "Honduras", "Jamaica", "Panama", "Paraguay", "Peru", "Trinidad and Tobago", "Uruguay", "Venezuela"];
      let mexico_country = ["Mexico","Aguascalientes", "Baja California", "Baja California Sur", "Chihuahua", "Colima", "Campeche", "Coahuila", "Chiapas", "Federal District", "Durango", "Guerrero", "Guanajuato", "Hidalgo", "Jalisco", "Mexico City", "Michoacan", "Morelos", "Nayarit", "Nuevo Leon", "Oaxaca", "Puebla", "Queretaro", "Quintana Roo", "Sinaloa", "San Luis Potosi", "Sonora", "Tabasco", "Tlaxcala", "Tamaulipas", "Veracruz", "Yucatan", "Zacatecas"];
      let mena_country = ["Bahrain", "Egypt", "Iran", "Islamic Republic of,Iraq", "Iraq", "Israel", "Jordan", "Lebanon", "Oman", "Palestinian Territory, Occupied", "Palestine", "Saudi Arabia", "Syrian Arab Republic", "United Arab Emirates", "Kuwait", "Pakistan", "Qatar", "Sudan", "Yemen"];
      let canada_country = ["Alberta", "British Colombia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon", "Canada"];

      let region_id = "";
      if (cis_country.includes(country)) {
        region_id = 29836198;
      } else if (latam_country.includes(country)) {
        region_id = 2147494219;
      } else if (mexico_country.includes(country)) {
        region_id = 2147494217;
      } else if (mena_country.includes(country)) {
        region_id = 2147494218;
      } else if (canada_country.includes(country)) {
        region_id = 2147498474;
      }

      handleApiFun("local", region_id);
    } else {
      handleApiFun("global");
    }
  };

  const handleClick = (e, type = "", clear = 0, obj = "") => {
    e.preventDefault();
    closeAllAccordions();
    if (type == "") {
      setFilterApply(false);
    }
    let newData = [];
    let filterAr = [];
    if (clear == 1) {
      filterAr = Object.keys(obj);
    } else if (clear == 2) {
      setUserFilterApply(true);
      setFilterCounter(filterCounter + 1);
      filterAr = Object.keys(obj);
    } else {
      setUserFilterApply(true);
      setFilterCounter(filterCounter + 1);
      filterAr = Object.keys(filterData);
      setDisplayFilters(filterData);
    }

    let testObj = {
      category: [],
      product: [],
      tags: [],
      platform: [],
    };

    filterAr.forEach((x) => {
      if (filterData[x] == "category") {
        testObj.category.push(x);
      }
      if (filterData[x] == "product") {
        testObj.product.push(x);
      }
      if (filterData[x] == "topic") {
        testObj.tags.push(x);
      }
      if (filterData[x] == "platform" || typeof filterData[x] === "undefined") {
        if (x == "Library" || x == "") {
          testObj.platform.push("1");
        } else if (x == "Congress") {
          testObj.platform.push("2");
        }
        // testObj.platform.push(x)
      }
    });

    if (filterAr.length == 0) {
      testObj.platform.push("1");
    }

    data?.data.forEach((item) => {
      let flags = -1;
      let newObj = {};
      // if (filterAr.length) {
      if (testObj?.category?.length) {
        if (testObj?.category.includes(item.format)) {
          if (flags != 0) {
            flags = 1;
          }
        } else {
          flags = 0;
        }
      }
      if (testObj?.product?.length) {
        if (testObj?.product.includes(item.product)) {
          if (flags != 0) {
            flags = 1;
          }
        } else {
          flags = 0;
        }
      }
      if (testObj?.tags?.length) {
        let myArray = item.tags.split(",").map((newitem) => newitem.trim());
        let resultArray = myArray.filter((arr) =>
          arr.includes(testObj?.tags?.[0])
        );
        if (resultArray.length > 0) {
          if (flags != 0) {
            flags = 1;
          }
        } else {
          flags = 0;
        }
        // item.tags?.split(",")?.forEach(values =>{
        //   if( testObj?.tags.includes(values)) {
        //     if(flags != 0){
        //       flags = 1
        //     }
        //   }else{
        //     flags = 0
        //   }
        // })
      }
      if (testObj?.platform?.length) {
        if (testObj?.platform.includes(item.article_platform)) {
          if (flags != 0) {
            flags = 1;
          }
        } else {
          flags = 0;
        }
      }
      if (filterData?.search) {
        if (
          item.pdf_title.toLowerCase().includes(filterData.search.toLowerCase())
        ) {
          if (flags != 0) {
            flags = 1;
          }
        } else {
          flags = 0;
        }
      }
      if (flags) {
        newData.push(item);
      }
    });

    if (clear == 1) {
      sortArr(data?.data, "Activated_dateD");
    } else {
      sortArr(newData, sortType);
    }
  };

  const handleClear = (e) => {
    var parentElement = document.getElementById("libraryFiltersEvents");
    if (parentElement) {
      var checkboxes = parentElement.querySelectorAll("input[type='checkbox']");
      if (checkboxes) {
        checkboxes.forEach(function (checkbox) {
          checkbox.checked = false;
        });
      }
    }

    if (filterData.hasOwnProperty("search")) {
      setFilterData({ search: filterData.search, Library: "platform" });
    } else {
      setFilterData({ Library: "platform" });
      setDisplayFilters({});
    }
    setSortType("Activated_dateD");
    setData({ ...data, library: data.data });
    setUserFilterApply(false);
    if (filterData.hasOwnProperty("search")) {
      let obj = { search: filterData.search, Library: "platform" };
      setTimeout(() => {
        handleClick(e, "search", 1, obj);
      }, 2000);
    } else {
      sortArr(data.data, "Activated_dateD");
      let obj = { Library: "platform" };
      setFilterApply(false);
      setTimeout(() => {
        handleClick(e, "", 2, obj);
      }, 2000);
    }

    closeAllAccordions();
  };

  const sortArr = (sdata, type = "") => {
    const searchValue = type ? type : "";
    let sortAr = sdata;
    switch (searchValue) {
      case "Activated_dateD":
        sortAr.sort((a, b) => (a.activated_date > b.activated_date ? -1 : 1));
        break;
      case "Activated_dateA":
        sortAr.sort((a, b) => (a.activated_date > b.activated_date ? 1 : -1));
        break;

      case "titleA":
        sortAr.sort(
          (a, b) =>
            (a.pdf_title.toLowerCase() > b.pdf_title.toLowerCase()) * 2 - 1
        );
        break;
      case "titleD":
        sortAr.sort((a, b) =>
          a.pdf_title.toLowerCase() > b.pdf_title.toLowerCase() ? -1 : 1
        );
        break;
      default:
        break;
    }
    // window.scrollTo(0,0)
    setData({ ...data, library: sortAr });
  };

  const handleChange = (data, name) => {
    let newData = JSON.parse(JSON.stringify(filterData));

    if (newData.hasOwnProperty(data)) {
      if (data == "all" || data == "All") {
        for (let key in newData) {
          if (newData[key] === "category") {
            delete newData[key];
          }
        }
      } else if (name === "category") {
        if (newData.hasOwnProperty("All")) {
          delete newData["All"];
        }
        delete newData[data];
      } else {
        delete newData[data];
      }
      setFilterData(newData);
    } else {
      if (data == "all" || data == "All") {
        let objKyes = createObjectWithSameValue(name, libraryData?.format);
        newData = {
          ...newData,
          ...objKyes,
        };
      } else {
        const valuesArray = Object.values(newData);
        if (valuesArray.includes(name)) {
          let previoudVal = Object.keys(newData).find(
            (key) => newData[key] === name
          );
          if (previoudVal) {
            delete newData[previoudVal];
          }
          newData = {
            ...newData,
            [data]: name,
          };
        } else {
          newData = {
            ...newData,
            [data]: name,
          };
        }
      }
      setFilterData(newData);
    }
  };

  const createObjectWithSameValue = (keys, value) => {
    const obj = {};
    value.forEach((item) => {
      obj[item] = keys;
    });
    return obj;
  };

  const handleIframeLoad = () => {
    setTimeout(() => {
      setIframeLoader(false);
    }, 2000);
  };

  const searchChange = (e) => {
    setSearch(e?.target?.value);
    if (e?.target?.value === "") {
      delete filterData.search;
      // setFilterData(filterData)
      handleClick(e, "search");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    filterData.search = search;
    setFilterData(filterData);
    handleClick(event, "search");
  };

  const handleShowRequest = (newShowRequest, pdfId) => {
    setMessage({
      heading: "Thank You ",
      body: "Your request has been submitted successfully!",
    });
    setShowRequest(newShowRequest);
    setPdfId(pdfId);

    setShowShare(false);
  };

  const handleShowShare = (newShowRequest, pdfId) => {
    setMessage({
      heading: "Thank You",
      body: "The content has been shared successfully!",
    });
    setShowShare(newShowRequest);
    setPdfId(pdfId);
    setShowRequest(false);
  };

  const addContentToMyLibrary = async (pdfId, item) => {
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

      // const mainData = data?.data?.filter((item) => item.pdf_id !== pdfId);
      // const libData  = data?.library?.filter((item) => item.pdf_id !== pdfId);
      // setData({
      //   library: libData,
      //   data: mainData,
      // });
      setMessage({
        heading: "Done!",
        body: "The content has been added to your content space successfully",
      });
      setMyLibrary((myLibrary) => [...myLibrary, item]);
      handleShowThankYou(true);
      renderProfile();
      //loader("hide");
    } catch (err) {
      //loader("hide");
      console.log(err);
    }
  };


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
      setMyLibrary((myLibrary) =>
        myLibrary.filter((entry) => entry.pdf_id != pdfId)
      );
      handleShowThankYou(true);
      renderProfile();
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowThankYou = (newShowRequest) => {
    setShowThank(newShowRequest);
  };

  const changeDateFormat = (datestring) => {
    const datetime = moment(datestring);
    const formattedDate = datetime.format("MMMM D . YYYY");

    return formattedDate;
  };

  const removeFilter = (e, type, value) => {
    if (type == "category" && value == "All") {
      let newObj = { ...displayFilters };
      const filteredObj = Object.entries(newObj).reduce((acc, [key, value]) => {
        if (value !== type) {
          acc[key] = value;
        }
        return acc;
      }, {});
      setDisplayFilters(filteredObj);
      setFilterData(filteredObj);
      handleClick(e, "", 2, filteredObj);
    } else if (type == "platform") {
      let newObj = { ...displayFilters };
      if (newObj[value] === type) {
        delete newObj[value];
        newObj = {
          ...newObj,
          ["Library"]: "platform",
        };
        setDisplayFilters(newObj);
        setFilterData(newObj);
        handleClick(e, "", 2, newObj);
      }
    } else {
      let newObj = { ...displayFilters };
      if (newObj[value] === type) {
        delete newObj[value];
        setDisplayFilters(newObj);
        setFilterData(newObj);
        handleClick(e, "", 2, newObj);
      }
    }
  };



  const moveToUp = () => {
    var element = document.getElementById("oneSourceLibraryAll");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const handleAccordionClick = (accordionKey) => {
    setActiveKey((prevKey) => (prevKey === accordionKey ? "" : accordionKey));
  };

  const closeAllAccordions = () => {
    setActiveKey("");
  };
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

  return (
    <div
      className={`onesource-section full-width ${
        firstExpand?.flag == 6 ? "clicked" : ""
      }`}
    >
      <div
        className="expert-opinion your-opinion"
        ref={oneSourceLibraryRef}
        id="oneSourceLibraryAll"
        data-section="oneSourceLibrary"
      >
        <div className="expert-opinion-title">
          <p>One Source library</p>
          {firstExpand?.expand && firstExpand?.flag == 6 ? (
            <img
              src={path_image + "close-icon.png"}
              alt=""
              onClick={() => {
                setSelected([]);
                handleExpand({
                  expand: false,
                  flag: 0,
                });
                trackingClose();
              }}
            />
          ) : null}
        </div>

        <div className="expert-opinion-content">
          <div className="onesource-content">
            <div
              className={
                firstExpand?.flag != 6
                  ? "onesource-content-serach d-flex justify-content-between"
                  : "onesource-content-serach d-flex justify-content-between expand_hide"
              }
            >
              <form>
                <div
                  className={
                    (Object.values(filterData).includes("category") ||
                      Object.values(filterData).includes("product") ||
                      Object.values(filterData).includes("platform") ||
                      Object.values(filterData).includes("topic")) &&
                    userFilterApply
                      ? "filter filter_applied"
                      : "filter"
                  }
                >
                  <div
                    className={`filter-by nav-item dropdown ${
                      filterApply ? "show" : ""
                    }`}
                  >
                    <button
                      ref={buttonRef}
                      onClick={() => {
                        setFilterApply((prev) => !prev);
                      }}
                      className={`btn btn-secondary dropdown`}
                      type="button"
                      id="dropdownMenuButton2"
                    >
                      Filter by
                      {filterApply ? (
                        <svg
                          width="16"
                          height="14"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.32166 5.99961L11.8083 1.51278C11.9317 1.38927 11.9998 1.22449 12 1.04878C12 0.872976 11.9319 0.708 11.8083 0.584683L11.4151 0.19161C11.2915 0.0678049 11.1267 0 10.9508 0C10.7752 0 10.6104 0.0678049 10.4868 0.19161L6.0002 4.67815L1.51337 0.19161C1.38995 0.0678049 1.22507 0 1.04927 0C0.873659 0 0.70878 0.0678049 0.585366 0.19161L0.192 0.584683C-0.064 0.840683 -0.064 1.25707 0.192 1.51278L4.67873 5.99961L0.192 10.4862C0.0684878 10.61 0.000487805 10.7747 0.000487805 10.9504C0.000487805 11.1261 0.0684878 11.2909 0.192 11.4145L0.585268 11.8076C0.708683 11.9313 0.873658 11.9992 1.04917 11.9992C1.22498 11.9992 1.38985 11.9313 1.51327 11.8076L6.0001 7.32098L10.4867 11.8076C10.6103 11.9313 10.7751 11.9992 10.9507 11.9992H10.9509C11.1266 11.9992 11.2914 11.9313 11.415 11.8076L11.8082 11.4145C11.9316 11.291 11.9997 11.1261 11.9997 10.9504C11.9997 10.7747 11.9316 10.61 11.8082 10.4863L7.32166 5.99961Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="14"
                          viewBox="0 0 16 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                            fill="#001489"
                          />
                          <path
                            d="M15.3846 6.15264H11.6923C11.6923 5.47387 11.1403 4.92188 10.4615 4.92188H9.23077C8.552 4.92188 8 5.47387 8 6.15264H0.615385C0.275692 6.15264 0 6.42772 0 6.76803C0 7.10834 0.275692 7.38341 0.615385 7.38341H8C8 8.06218 8.552 8.61418 9.23077 8.61418H10.4615C11.1403 8.61418 11.6923 8.06218 11.6923 7.38341H15.3846C15.7243 7.38341 16 7.10834 16 6.76803C16 6.42772 15.7243 6.15264 15.3846 6.15264Z"
                            fill="#001489"
                          />
                          <path
                            d="M15.3846 11.0745H6.76923C6.76923 10.3957 6.21723 9.84375 5.53846 9.84375H4.30769C3.62892 9.84375 3.07692 10.3957 3.07692 11.0745H0.615385C0.275692 11.0745 0 11.3496 0 11.6899C0 12.0302 0.275692 12.3053 0.615385 12.3053H3.07692C3.07692 12.9841 3.62892 13.5361 4.30769 13.5361H5.53846C6.21723 13.5361 6.76923 12.9841 6.76923 12.3053H15.3846C15.7243 12.3053 16 12.0302 16 11.6899C16 11.3496 15.7243 11.0745 15.3846 11.0745Z"
                            fill="#001489"
                          />
                        </svg>
                      )}
                    </button>
                    <div
                      ref={filterRef}
                      className="dropdown-menu filter-options"
                      aria-labelledby="dropdownMenuButton2"
                      id="libraryFiltersEvents"
                    >
                      <div className="clear-data">
                        <p onClick={handleClear}>Clear all</p>
                      </div>
                      <h4>Filter by</h4>
                      <Accordion activeKey={activeKey}>
                        <Accordion.Item eventKey="0" className="card">
                          <Accordion.Header
                            className="card-header"
                            onClick={() => handleAccordionClick("0")}
                          >
                            Categories
                          </Accordion.Header>
                          <Accordion.Body className="card-body">
                            <ul>
                              {libraryData?.format?.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <label className="select-multiple-option">
                                      <input
                                        type="checkbox"
                                        checked={filterData.hasOwnProperty(
                                          item
                                        )}
                                        onChange={() =>
                                          handleChange(item, "category")
                                        }
                                        className="custom-checkbox-tags"
                                      />
                                      {item}
                                      <span className="checkmark"></span>
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className="card">
                          <Accordion.Header
                            className="card-header"
                            onClick={() => handleAccordionClick("1")}
                          >
                            Products
                          </Accordion.Header>
                          <Accordion.Body className="card-body">
                            <ul>
                              {libraryData?.product?.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <label className="select-multiple-option">
                                      <input
                                        type="checkbox"
                                        onChange={() =>
                                          handleChange(item, "product")
                                        }
                                        checked={filterData.hasOwnProperty(
                                          item
                                        )}
                                        className="custom-checkbox-tags"
                                      />
                                      {item}
                                      <span className="checkmark"></span>
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2" className="card">
                          <Accordion.Header
                            className="card-header"
                            onClick={() => handleAccordionClick("2")}
                          >
                            Topics
                          </Accordion.Header>
                          <Accordion.Body className="card-body">
                            <ul>
                              {libraryData?.tags?.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <label className="select-multiple-option">
                                      <input
                                        type="checkbox"
                                        checked={filterData.hasOwnProperty(
                                          item
                                        )}
                                        onChange={() =>
                                          handleChange(item, "topic")
                                        }
                                        className="custom-checkbox-tags"
                                      />
                                      {item}
                                      <span className="checkmark"></span>
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3" className="card">
                          <Accordion.Header
                            className="card-header"
                            onClick={() => handleAccordionClick("3")}
                          >
                            Platform
                          </Accordion.Header>
                          <Accordion.Body className="card-body">
                            <ul>
                              {libraryData?.platform?.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <label className="select-multiple-option">
                                      <input
                                        type="checkbox"
                                        checked={filterData.hasOwnProperty(
                                          item
                                        )}
                                        onChange={() =>
                                          handleChange(item, "platform")
                                        }
                                        className="custom-checkbox-tags"
                                      />
                                      {item}
                                      <span className="checkmark"></span>
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <div className="sort_by">
                        <h4>Sort by</h4>
                        <div className="sorted-data-by">
                          <div className="sorted-data-list">
                            <input
                              type="radio"
                              id="sorted-data-new"
                              name="sorting"
                              onChange={(e) => setSortType("Activated_dateD")}
                              checked={
                                sortType == "Activated_dateD" ? true : false
                              }
                            />
                            <div className="sorted-data-list-inset">
                              <svg
                                width="20"
                                height="14"
                                viewBox="0 0 20 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12.5 3.6875C12.4994 3.12884 12.2772 2.59324 11.8822 2.1982C11.4871 1.80317 10.9515 1.58097 10.3929 1.58036H10.0128V1.19643C10.0128 1.07803 9.96573 0.964477 9.88201 0.880756C9.79829 0.797034 9.68474 0.75 9.56634 0.75C9.44794 0.75 9.33439 0.797034 9.25067 0.880756C9.16694 0.964477 9.11991 1.07803 9.11991 1.19643V1.58036H3.38045V1.19643C3.38045 1.07803 3.33341 0.964477 3.24969 0.880756C3.16597 0.797034 3.05242 0.75 2.93402 0.75C2.81562 0.75 2.70207 0.797034 2.61835 0.880756C2.53462 0.964477 2.48759 1.07803 2.48759 1.19643V1.58036H2.10714C1.54848 1.58097 1.01288 1.80317 0.617847 2.1982C0.222814 2.59324 0.000614459 3.12884 0 3.6875V11.1429C0.000614459 11.7015 0.222814 12.2371 0.617847 12.6322C1.01288 13.0272 1.54848 13.2494 2.10714 13.25H6.8808H10.3929C10.9515 13.2494 11.4871 13.0272 11.8822 12.6322C12.2772 12.2371 12.4994 11.7015 12.5 11.1429L12.5 10.125V3.6875ZM2.48723 2.47321H2.10714C1.78521 2.47359 1.47657 2.60165 1.24893 2.82929C1.02129 3.05693 0.893235 3.36557 0.892857 3.6875V4.06643H11.6071V3.6875C11.6068 3.36557 11.4787 3.05693 11.2511 2.82929C11.0234 2.60165 10.7148 2.47359 10.3929 2.47321H10.0121V2.8542C10.0121 2.9726 9.96502 3.08615 9.8813 3.16987C9.79758 3.25359 9.68402 3.30062 9.56562 3.30062C9.44722 3.30062 9.33367 3.25359 9.24995 3.16987C9.16623 3.08615 9.1192 2.9726 9.1192 2.8542V2.47321H3.38009V2.8542C3.38009 2.9726 3.33305 3.08615 3.24933 3.16987C3.16561 3.25359 3.05206 3.30062 2.93366 3.30062C2.81526 3.30062 2.70171 3.25359 2.61799 3.16987C2.53427 3.08615 2.48723 2.9726 2.48723 2.8542V2.47321ZM0.892857 4.95929V11.1429C0.893259 11.4648 1.02132 11.7734 1.24896 12.001C1.47659 12.2287 1.78522 12.3567 2.10714 12.3571H6.03732H10.3929C10.7148 12.3567 11.0234 12.2287 11.251 12.001C11.4787 11.7734 11.6067 11.4648 11.6071 11.1429L11.6071 6.78732V4.95929H0.892857Z"
                                  fill="#001489"
                                  fillOpacity="0.4"
                                />
                                <path
                                  d="M19.5973 9.17178C19.4918 9.06633 19.3488 9.0071 19.1996 9.0071C19.0505 9.0071 18.9075 9.06633 18.802 9.17178L17.3566 10.7043V1.93748C17.3566 1.7883 17.2974 1.64523 17.1919 1.53974C17.0864 1.43426 16.9433 1.375 16.7942 1.375C16.645 1.375 16.5019 1.43426 16.3964 1.53974C16.2909 1.64523 16.2317 1.7883 16.2317 1.93748V10.7043L14.7032 9.17178C14.5971 9.06932 14.455 9.01263 14.3076 9.01391C14.1601 9.01519 14.019 9.07435 13.9147 9.17863C13.8104 9.28292 13.7513 9.424 13.75 9.57148C13.7487 9.71896 13.8054 9.86104 13.9079 9.96713L16.3965 12.4598C16.4487 12.5121 16.5108 12.5537 16.5791 12.582C16.6475 12.6104 16.7207 12.625 16.7947 12.625C16.8687 12.625 16.942 12.6104 17.0103 12.582C17.0786 12.5537 17.1407 12.5121 17.193 12.4598L19.5984 9.96713C19.7037 9.8615 19.7628 9.71837 19.7626 9.56922C19.7624 9.42007 19.7029 9.27711 19.5973 9.17178Z"
                                  fill="#001489"
                                  fillOpacity="0.4"
                                />
                              </svg>
                              <span className="checkmark"></span>
                            </div>
                          </div>
                          <div className="sorted-data-list">
                            <input
                              type="radio"
                              id="sorted-data-old"
                              name="sorting"
                              onChange={(e) => setSortType("Activated_dateA")}
                              checked={
                                sortType == "Activated_dateA" ? true : false
                              }
                            />
                            <div className="sorted-data-list-inset">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12.5 6.6875C12.4994 6.12884 12.2772 5.59324 11.8822 5.1982C11.4871 4.80317 10.9515 4.58097 10.3929 4.58036H10.0128V4.19643C10.0128 4.07803 9.96573 3.96448 9.88201 3.88076C9.79829 3.79703 9.68474 3.75 9.56634 3.75C9.44794 3.75 9.33439 3.79703 9.25067 3.88076C9.16694 3.96448 9.11991 4.07803 9.11991 4.19643V4.58036H3.38045V4.19643C3.38045 4.07803 3.33341 3.96448 3.24969 3.88076C3.16597 3.79703 3.05242 3.75 2.93402 3.75C2.81562 3.75 2.70207 3.79703 2.61835 3.88076C2.53462 3.96448 2.48759 4.07803 2.48759 4.19643V4.58036H2.10714C1.54848 4.58097 1.01288 4.80317 0.617847 5.1982C0.222814 5.59324 0.000614459 6.12884 0 6.6875V14.1429C0.000614459 14.7015 0.222814 15.2371 0.617847 15.6322C1.01288 16.0272 1.54848 16.2494 2.10714 16.25H6.8808H10.3929C10.9515 16.2494 11.4871 16.0272 11.8822 15.6322C12.2772 15.2371 12.4994 14.7015 12.5 14.1429L12.5 13.125V6.6875ZM2.48723 5.47321H2.10714C1.78521 5.47359 1.47657 5.60165 1.24893 5.82929C1.02129 6.05693 0.893235 6.36557 0.892857 6.6875V7.06643H11.6071V6.6875C11.6068 6.36557 11.4787 6.05693 11.2511 5.82929C11.0234 5.60165 10.7148 5.47359 10.3929 5.47321H10.0121V5.8542C10.0121 5.9726 9.96502 6.08615 9.8813 6.16987C9.79758 6.25359 9.68402 6.30062 9.56562 6.30062C9.44722 6.30062 9.33367 6.25359 9.24995 6.16987C9.16623 6.08615 9.1192 5.9726 9.1192 5.8542V5.47321H3.38009V5.8542C3.38009 5.9726 3.33305 6.08615 3.24933 6.16987C3.16561 6.25359 3.05206 6.30062 2.93366 6.30062C2.81526 6.30062 2.70171 6.25359 2.61799 6.16987C2.53427 6.08615 2.48723 5.9726 2.48723 5.8542V5.47321ZM0.892857 7.95929V14.1429C0.893259 14.4648 1.02132 14.7734 1.24896 15.001C1.47659 15.2287 1.78522 15.3567 2.10714 15.3571H6.03732H10.3929C10.7148 15.3567 11.0234 15.2287 11.251 15.001C11.4787 14.7734 11.6067 14.4648 11.6071 14.1429L11.6071 9.78732V7.95929H0.892857Z"
                                  fill="#001489"
                                  fillOpacity="0.4"
                                />
                                <path
                                  d="M19.5973 7.82822C19.4918 7.93367 19.3488 7.9929 19.1996 7.9929C19.0505 7.9929 18.9075 7.93367 18.802 7.82822L17.3566 6.29574V15.0625C17.3566 15.2117 17.2974 15.3548 17.1919 15.4603C17.0864 15.5657 16.9433 15.625 16.7942 15.625C16.645 15.625 16.5019 15.5657 16.3964 15.4603C16.2909 15.3548 16.2317 15.2117 16.2317 15.0625V6.29574L14.7032 7.82822C14.5971 7.93068 14.455 7.98737 14.3076 7.98609C14.1601 7.98481 14.019 7.92565 13.9147 7.82137C13.8104 7.71708 13.7513 7.576 13.75 7.42852C13.7487 7.28104 13.8054 7.13896 13.9079 7.03287L16.3965 4.54025C16.4487 4.48787 16.5108 4.44631 16.5791 4.41795C16.6475 4.3896 16.7207 4.375 16.7947 4.375C16.8687 4.375 16.942 4.3896 17.0103 4.41795C17.0786 4.44631 17.1407 4.48787 17.193 4.54025L19.5984 7.03287C19.7037 7.1385 19.7628 7.28163 19.7626 7.43078C19.7624 7.57993 19.7029 7.72289 19.5973 7.82822Z"
                                  fill="#001489"
                                  fillOpacity="0.4"
                                />
                              </svg>
                              <span className="checkmark"></span>
                            </div>
                          </div>
                          <div className="sorted-data-list">
                            <input
                              type="radio"
                              id="data-list-accending"
                              name="sorting"
                              onChange={(e) => setSortType("titleA")}
                              checked={sortType == "titleA" ? true : false}
                            />
                            <div className="sorted-data-list-inset">
                              <svg
                                width="14"
                                height="12"
                                viewBox="0 0 14 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1.49315 5.30469H0.5L2.01327 0.382812H3.20762L4.71875 5.30469H3.7256L2.62757 1.50754H2.59332L1.49315 5.30469ZM1.43108 3.37006H3.77697V4.18237H1.43108V3.37006Z"
                                  fill="#001489"
                                  fillOpacity="0.4"
                                />
                                <path
                                  d="M0.505374 11.6328V11.0152L3.25159 7.5689H0.5V6.71094H4.71338V7.32858L1.96447 10.7748H4.71875V11.6328H0.505374Z"
                                  fill="#001489"
                                  fillOpacity="0.4"
                                />
                                <path
                                  d="M13.3473 8.17178C13.2418 8.06633 13.0988 8.0071 12.9496 8.0071C12.8005 8.0071 12.6575 8.06633 12.552 8.17178L11.1066 9.70426V0.937477C11.1066 0.788298 11.0474 0.64523 10.9419 0.539745C10.8364 0.43426 10.6933 0.374999 10.5442 0.374999C10.395 0.374999 10.2519 0.43426 10.1464 0.539745C10.0409 0.64523 9.98168 0.788298 9.98168 0.937477V9.70426L8.45322 8.17178C8.34713 8.06932 8.20505 8.01263 8.05757 8.01391C7.91009 8.01519 7.76901 8.07435 7.66472 8.17863C7.56044 8.28292 7.50128 8.424 7.5 8.57148C7.49872 8.71896 7.55541 8.86104 7.65787 8.96713L10.1465 11.4598C10.1987 11.5121 10.2608 11.5537 10.3291 11.582C10.3975 11.6104 10.4707 11.625 10.5447 11.625C10.6187 11.625 10.692 11.6104 10.7603 11.582C10.8286 11.5537 10.8907 11.5121 10.943 11.4598L13.3484 8.96713C13.4537 8.8615 13.5128 8.71837 13.5126 8.56922C13.5124 8.42007 13.4529 8.27711 13.3473 8.17178Z"
                                  fill="#001489"
                                  fillOpacity="0.4"
                                />
                              </svg>
                              <span className="checkmark"></span>
                            </div>
                          </div>
                          <div className="sorted-data-list">
                            <input
                              type="radio"
                              id="sorted-data-desending"
                              name="sorting"
                              onChange={(e) => setSortType("titleD")}
                              checked={sortType == "titleD" ? true : false}
                            />
                            <div className="sorted-data-list-inset">
                              <svg
                                width="14"
                                height="12"
                                viewBox="0 0 14 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1.49315 5.30469H0.5L2.01327 0.382812H3.20762L4.71875 5.30469H3.7256L2.62757 1.50754H2.59332L1.49315 5.30469ZM1.43108 3.37006H3.77697V4.18237H1.43108V3.37006Z"
                                  fill="#001489"
                                  fillOpacity="0.4"
                                />
                                <path
                                  d="M0.505374 11.6328V11.0152L3.25159 7.5689H0.5V6.71094H4.71338V7.32858L1.96447 10.7748H4.71875V11.6328H0.505374Z"
                                  fill="#001489"
                                  fillOpacity="0.4"
                                />
                                <path
                                  d="M13.3473 3.82822C13.2418 3.93367 13.0988 3.9929 12.9496 3.9929C12.8005 3.9929 12.6575 3.93367 12.552 3.82822L11.1066 2.29574V11.0625C11.1066 11.2117 11.0474 11.3548 10.9419 11.4603C10.8364 11.5657 10.6933 11.625 10.5442 11.625C10.395 11.625 10.2519 11.5657 10.1464 11.4603C10.0409 11.3548 9.98168 11.2117 9.98168 11.0625V2.29574L8.45322 3.82822C8.34713 3.93068 8.20505 3.98737 8.05757 3.98609C7.91009 3.98481 7.76901 3.92565 7.66472 3.82137C7.56044 3.71708 7.50128 3.576 7.5 3.42852C7.49872 3.28104 7.55541 3.13896 7.65787 3.03287L10.1465 0.540249C10.1987 0.487867 10.2608 0.446308 10.3291 0.417953C10.3975 0.389596 10.4707 0.375 10.5447 0.375C10.6187 0.375 10.692 0.389596 10.7603 0.417953C10.8286 0.446308 10.8907 0.487867 10.943 0.540249L13.3484 3.03287C13.4537 3.1385 13.5128 3.28163 13.5126 3.43078C13.5124 3.57993 13.4529 3.72289 13.3473 3.82822Z"
                                  fill="#001489"
                                  fillOpacity="0.4"
                                />
                              </svg>
                              <span className="checkmark"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*disabled*/}
                      <div className="filter-footer">
                        <button
                          onClick={handleClick}
                          id="applyFilter"
                          className={
                            Object.keys(filterData)?.length > 0
                              ? "btn btn-primary btn-filled"
                              : "btn btn-primary btn-filled"
                          }
                        >
                          Apply
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            closeAllAccordions();
                            setFilterApply((filterApply) => !filterApply);
                          }}
                          className="btn btn-primary btn-bordered"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Filter By{" "}
                      <svg
                        className="filter-arrow"
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                          fill="#001489"
                        ></path>
                        <path
                          d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                          fill="#001489"
                        ></path>
                        <path
                          d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                          fill="#001489"
                        ></path>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">By Registered User</Dropdown.Item>
                      <Dropdown.Item href="#">By Unregistered User</Dropdown.Item>
                      <Dropdown.Item href="#">All User</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                </div>
              </form>
              <div className="right_section_form d-flex">
                <div className="search">
                  <form className="d-flex" onSubmit={submitHandler}>
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={search}
                      onChange={(e) => searchChange(e)}
                    />
                    {!search ? (
                      <button className="btn btn-outline-success" type="submit">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
                            fill="#001489"
                          ></path>
                        </svg>
                      </button>
                    ) : null}
                  </form>
                </div>

                <div className={localRegion ? "switch6" : "switch6 no_local"}>
                  <label className="switch6-light">
                    <input type="checkbox" onChange={handleCheckboxChange} />
                    {isUsa ? (
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
                      </span>
                    ) : (
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
                        {localRegion ? (
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
                        ) : null}
                      </span>
                    )}

                    <a className="btn btn-primary"></a>
                  </label>
                </div>
              </div>
            </div>
            {firstExpand?.flag != 6 ? (
              Object.values(displayFilters).includes("category") ||
              Object.values(displayFilters).includes("product") ||
              Object.values(displayFilters).includes("topic") ||
              (Object.values(displayFilters).includes("platform") &&
                !Object.keys(displayFilters).includes("Library") &&
                userFilterApply) ? (
                <div className="apply-filter">
                  <div className="filter-block">
                    <div className="filter-block-left full">
                      {filterCounter ? (
                        Object.values(displayFilters).includes("category") ? (
                          <div className="filter-div">
                            <div className="filter-div-title">
                              <span>Category |</span>
                            </div>
                            <div className="filter-div-list">
                              {Object.entries(displayFilters).filter(
                                ([key, value]) => key.includes("All")
                              )?.length > 0 ? (
                                <div className="filter-result">
                                  All
                                  <img
                                    src={path_image + "close-icon.png"}
                                    alt="Close-filter"
                                    onClick={(e) =>
                                      removeFilter(e, "category", "All")
                                    }
                                  />
                                </div>
                              ) : (
                                Object.entries(displayFilters)
                                  .filter(([key, value]) =>
                                    value.includes("category")
                                  )
                                  .map(([key, value]) => (
                                    <div className="filter-result">
                                      {key}
                                      <img
                                        src={path_image + "close-icon.png"}
                                        alt="Close-filter"
                                        onClick={(e) =>
                                          removeFilter(e, "category", key)
                                        }
                                      />
                                    </div>
                                  ))
                              )}
                            </div>
                          </div>
                        ) : null
                      ) : null}

                      {Object.values(displayFilters).includes("product") ? (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Product |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(displayFilters)
                              .filter(([key, value]) =>
                                value.includes("product")
                              )
                              .map(([key, value]) => (
                                <div className="filter-result">
                                  {key}
                                  <img
                                    src={path_image + "close-icon.png"}
                                    alt="Close-filter"
                                    onClick={(e) =>
                                      removeFilter(e, "product", key)
                                    }
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : null}

                      {Object.values(displayFilters).includes("topic") ? (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Topic |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(displayFilters)
                              .filter(([key, value]) => value.includes("topic"))
                              .map(([key, value]) => (
                                <div className="filter-result">
                                  {key}
                                  <img
                                    src={path_image + "close-icon.png"}
                                    alt="Close-filter"
                                    onClick={(e) =>
                                      removeFilter(e, "topic", key)
                                    }
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : null}

                      {Object.values(displayFilters).includes("platform") &&
                      !Object.keys(displayFilters).includes("Library") ? (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Platform |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(displayFilters)
                              .filter(([key, value]) =>
                                value.includes("platform")
                              )
                              .map(([key, value]) => (
                                <div className="filter-result">
                                  {key}
                                  <img
                                    src={path_image + "close-icon.png"}
                                    alt="Close-filter"
                                    onClick={(e) =>
                                      removeFilter(e, "platform", key)
                                    }
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="clear-filter">
                      <button
                        className="btn btn-outline-primary btn-bordered"
                        onClick={handleClear}
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            ) : null}

            {firstExpand?.flag == 6 ? (
              <div className="source-content">
                {Object.keys(selected)?.length ? (
                  <div className="onesource-content-box">
                    <div className="onesource-content-box-inside">
                      <img src={selected?.pdf_thumb} />
                      <div className="onesource-content-detail">
                        <div className="opinion-content-detail-upper">
                          <h5>
                            <DisplayText text={selected?.pdf_title} />
                          </h5>
                          <h6 className="sub-title">
                            {selected?.pdf_sub_title}
                          </h6>
                          <span className="article-post-date tet">
                            {changeDateFormat(selected?.article_date)}
                          </span>
                        </div>
                       {(() => {
                            const isInLibrary = myLibrary?.[
                              myLibrary.findIndex((el) => el.pdf_id == selected?.pdf_id)
                            ];
                            return (
                              <div className="add-inlibrary">
                                <Button
                                  variant="default"
                                  className={isInLibrary ? "library_added" : ""}
                                  onClick={() =>
                                    isInLibrary
                                      ? removeContentToMyLibrary(selected?.pdf_id, selected)
                                      : addContentToMyLibrary(selected?.pdf_id, selected)
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
                      </div>
                      <div className="iframeOuter">
                        {iframeLoader ? (
                          <div className={`loadspanner show`}>
                            <div className="loadover">
                              <div className="globalloader"></div>
                              <p>Loading the content, please be patient.</p>
                            </div>
                          </div>
                        ) : null}

                        <iframe
                          src={selected?.share_url + "_" + encryptUser}
                          onLoad={handleIframeLoad}
                          title=""
                          height="1008px"
                          width="100%"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                ) : null}
                <Button
                  className="close"
                  onClick={() => {
                    scrollToSection("oneSourceLibraryAll");
                    setSelected([]);
                    handleExpand({
                      expand: false,
                      flag: 0,
                    });
                  }}
                >
                  Close
                </Button>
              </div>
            ) : (
              ""
            )}
            <div className="onesource-content-view">
              <div className="onesource-content-view-inside">
                {isSourceContentNotLoaded ? (
                  <SourceContentSkeleton />
                ) : data?.library?.length > 0 ? (
                  data?.library?.map((item, index) => (
                    <div className="onesource-content-box" key={index}>
                      <div
                        className={
                          selected?.pdf_id == item?.pdf_id
                            ? "onesource-content-box-inside active"
                            : "onesource-content-box-inside"
                        }
                      >
                        <LazyLoadImage
                          key={item.pdf_id}
                          src={item?.pdf_thumb}
                          effect="blur"
                          wrapperProps={{
                            style: { transitionDelay: "1s" },
                          }}
                          onClick={async () => {
                            setSelected(item);
                            setIframeLoader(true);
                            moveToUp();
                            handleExpand({
                              expand: true,
                              flag: 6,
                            });
                            const data = await trackUserAction(
                              item.pdf_id,
                              "One-source-library",
                              `${item?.pdf_title}`
                            );
                            setTracking(data?.id);
                          }}
                        />
                        <div
                          className="onesource-content-detail"
                          onClick={async () => {
                            setSelected(item);
                            moveToUp();
                            handleExpand({
                              expand: true,
                              flag: 6,
                            });
                            const data = await trackUserAction(
                              item.pdf_id,
                              "One-source-library",
                              `${item?.pdf_title}`
                            );
                            setTracking(data?.id);
                          }}
                        >
                          <div className="p">
                            <DisplayText text={item?.pdf_title} />
                          </div>
                          <span className="sub-title">
                            {item?.pdf_sub_title}
                          </span>
                          <span className="article-post-date">
                            {changeDateFormat(item?.article_date)}
                          </span>
                        </div>
                        <div className="article-options">
                          <img
                            src={path_image + "options.svg"}
                            alt="Options"
                            onClick={() => setArticleOptions(item?.pdf_id)}
                          />
                          <div
                            className={
                              articleOptions == item?.pdf_id
                                ? "options-list show"
                                : "options-list"
                            }
                            style={
                              articleOptions == item?.pdf_id
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            <img
                              src={path_image + "close-arrow.svg"}
                              alt=""
                              className="close_option"
                              onClick={() => setArticleOptions("")}
                            />
                            <ul>
                              <li
                                onClick={() => {
                                  setArticleOptions("");
                                  handleShowShare(true, item?.pdf_id);
                                }}
                              >
                                <img
                                  src={path_image + "share-article-icon.svg"}
                                  alt=""
                                />
                                Share
                              </li>

                              <li
                                onClick={() => {
                                  setArticleOptions("");
                                  handleShowRequest(true, item?.pdf_id);
                                }}
                              >
                                <img
                                  src={path_image + "add-to-content.svg"}
                                  alt=""
                                />
                                Request
                              </li>
                              <li
                                onClick={() => {
                                  if (navigator.clipboard) {
                                    navigator.clipboard
                                      .writeText(item?.share_url)
                                      .then(() => {
                                        toast.success(
                                          "Link is copied to clipboard"
                                        );
                                      })
                                      .catch((err) => {
                                        toast.error(
                                          "Failed to copy PDF ID: ",
                                          err
                                        );
                                      });
                                  } else {
                                    toast.warn("Clipboard API not supported");
                                  }
                                }}
                              >
                                <img
                                  src={path_image + "copy-icon.svg"}
                                  alt=""
                                />
                                Copy Link
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  data?.library && (
                    <div className="upcoming-event-detail-empty">
                      <p>No content has been found.</p>
                      {/* <p className="event-blue">
                        Please check under <strong>one source</strong> what is currently available
                      </p> */}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showRequest && (
        <RequestModal
          handleShowRequest={handleShowRequest}
          handleShowThankYou={handleShowThankYou}
          pdfId={pdfId}
        />
      )}
      {showShare && (
        <ShareModal
          handleShowShare={handleShowShare}
          handleShowThankYou={handleShowThankYou}
          pdfId={pdfId}
        />
      )}
      {showThank && (
        <ThankModal handleShowThankYou={handleShowThankYou} message={message} />
      )}
    </div>
  );
};
export default React.memo(SourceContent);
