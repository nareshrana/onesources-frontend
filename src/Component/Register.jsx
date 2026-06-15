import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

import {
  Container,
  Row,
  Form,
  Col,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { register } from "./CommonComponent/Validations";
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import Modal from 'react-bootstrap/Modal';
import VideoModal from "./CommonComponent/VideoModal";
import { loader } from "./CommonComponent/Loader";

import { db, auth } from "../config/firebaseConfig";
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import eventConfig from "../config/eventconfig.json";
import eventConfigUSA from "../config/eventconfigUSA.json";


const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const [error, setError] = useState({});
  const [checkboxMain, setCheckMain] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [checkbox1Selected, setCheckbox1Selected] = useState(false);
  const [checkbox2Selected, setCheckbox2Selected] = useState(false);
  const [checkbox3Selected, setCheckbox3Selected] = useState(false);
  const checkbox1value = useRef(null);
  const checkbox2value = useRef(null);
  const checkbox3value = useRef(null);
  const checkboxvalue = useRef(null);

  const userCountry = localStorage.getItem("country");
  const isUSA =  localStorage.getItem("un") == "2147541916" && (
      userCountry === "United States" ||
      userCountry === "USA" ||
      userCountry === "United States Minor Outlying Islands");
  
    const activeEventConfig = isUSA ? eventConfigUSA : eventConfig;

  const [cookieShow, setCookieShow] = useState(false);
  const hideCookieModal = () => setCookieShow(false);
  const showCookieModal = () => setCookieShow(true);

  const options = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "American Samoa", label: "American Samoa" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Anguilla", label: "Anguilla" },
    { value: "Antarctica", label: "Antarctica" },
    { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
    { value: "Argentina", label: "Argentina" },
    { value: "Armenia", label: "Armenia" },
    { value: "Aruba", label: "Aruba" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Bahamas", label: "Bahamas" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Barbados", label: "Barbados" },
    { value: "Belarus", label: "Belarus" },
    { value: "Belgium", label: "Belgium" },
    { value: "Belize", label: "Belize" },
    { value: "Benin", label: "Benin" },
    { value: "Bermuda", label: "Bermuda" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "B&H", label: "Bosnia and Herzegovina" },
    { value: "Botswana", label: "Botswana" },
    { value: "Bouvet Island", label: "Bouvet Island" },
    { value: "Brazil", label: "Brazil" },
    { value: "British Indian Ocean Territory", label: "British Indian Ocean Territory" },
    { value: "Brunei Darussalam", label: "Brunei Darussalam" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "Burundi", label: "Burundi" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Canada", label: "Canada" },
    { value: "Cape Verde", label: "Cape Verde" },
    { value: "Cayman Islands", label: "Cayman Islands" },
    { value: "Central African Republic", label: "Central African Republic" },
    { value: "Chad", label: "Chad" },
    { value: "Chile", label: "Chile" },
    { value: "China", label: "China" },
    { value: "Christmas Island", label: "Christmas Island" },
    { value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands" },
    { value: "Colombia", label: "Colombia" },
    { value: "Comoros", label: "Comoros" },
    { value: "Congo", label: "Congo" },
    { value: "Congo, The Democratic Republic of The", label: "Congo, The Democratic Republic of The" },
    { value: "Cook Islands", label: "Cook Islands" },
    { value: "Costa Rica", label: "Costa Rica" },
    { value: "Cote D'ivoire", label: "Cote D'ivoire" },
    { value: "Croatia", label: "Croatia" },
    { value: "Cuba", label: "Cuba" },
    { value: "Cyprus", label: "Cyprus" },
    { value: "Czech Republic", label: "Czech Republic" },
    { value: "Denmark", label: "Denmark" },
    { value: "Djibouti", label: "Djibouti" },
    { value: "Dominica", label: "Dominica" },
    { value: "Dominican Republic", label: "Dominican Republic" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Egypt", label: "Egypt" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "Equatorial Guinea", label: "Equatorial Guinea" },
    { value: "Eritrea", label: "Eritrea" },
    { value: "Estonia", label: "Estonia" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Falkland Islands (Malvinas)", label: "Falkland Islands (Malvinas)" },
    { value: "Faroe Islands", label: "Faroe Islands" },
    { value: "Fiji", label: "Fiji" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "French Guiana", label: "French Guiana" },
    { value: "French Polynesia", label: "French Polynesia" },
    { value: "French Southern Territories", label: "French Southern Territories" },
    { value: "Gabon", label: "Gabon" },
    { value: "Gambia", label: "Gambia" },
    { value: "Georgia", label: "Georgia" },
    { value: "Germany", label: "Germany" },
    { value: "Ghana", label: "Ghana" },
    { value: "Gibraltar", label: "Gibraltar" },
    { value: "Greece", label: "Greece" },
    { value: "Greenland", label: "Greenland" },
    { value: "Grenada", label: "Grenada" },
    { value: "Guadeloupe", label: "Guadeloupe" },
    { value: "Guam", label: "Guam" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Guinea", label: "Guinea" },
    { value: "Guinea-bissau", label: "Guinea-bissau" },
    { value: "Guyana", label: "Guyana" },
    { value: "Haiti", label: "Haiti" },
    { value: "Heard Island and Mcdonald Islands", label: "Heard Island and Mcdonald Islands" },
    { value: "Holy See (Vatican City State)", label: "Holy See (Vatican City State)" },
    { value: "Honduras", label: "Honduras" },
    { value: "Hong Kong", label: "Hong Kong" },
    { value: "Hungary", label: "Hungary" },
    { value: "Iceland", label: "Iceland" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Iran, Islamic Republic of", label: "Iran, Islamic Republic of" },
    { value: "Iraq", label: "Iraq" },
    { value: "Ireland", label: "Ireland" },
    { value: "Israel", label: "Israel" },
    { value: "Italy", label: "Italy" },
    { value: "Jamaica", label: "Jamaica" },
    { value: "Japan", label: "Japan" },
    { value: "Jordan", label: "Jordan" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kiribati", label: "Kiribati" },
    { value: "Korea, Democratic People's Republic of", label: "Korea, Democratic People's Republic of" },
    { value: "Korea, Republic of", label: "Korea, Republic of" },
    { value: "Kosovo", label: "Kosovo" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Kyrgyzstan", label: "Kyrgyzstan" },
    { value: "Lao People's Democratic Republic", label: "Lao People's Democratic Republic" },
    { value: "Latvia", label: "Latvia" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "Lesotho", label: "Lesotho" },
    { value: "Liberia", label: "Liberia" },
    { value: "Libyan Arab Jamahiriya", label: "Libyan Arab Jamahiriya" },
    { value: "Liechtenstein", label: "Liechtenstein" },
    { value: "Lithuania", label: "Lithuania" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Macao", label: "Macao" },
    { value: "North Macedonia", label: "North Macedonia" },
    { value: "Madagascar", label: "Madagascar" },
    { value: "Malawi", label: "Malawi" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Maldives", label: "Maldives" },
    { value: "Mali", label: "Mali" },
    { value: "Malta", label: "Malta" },
    { value: "Marshall Islands", label: "Marshall Islands" },
    { value: "Martinique", label: "Martinique" },
    { value: "Mauritania", label: "Mauritania" },
    { value: "Mauritius", label: "Mauritius" },
    { value: "Mayotte", label: "Mayotte" },
    { value: "Mexico", label: "Mexico" },
    { value: "Micronesia, Federated States of", label: "Micronesia, Federated States of" },
    { value: "Moldova, Republic of", label: "Moldova, Republic of" },
    { value: "Monaco", label: "Monaco" },
    { value: "Mongolia", label: "Mongolia" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Morocco", label: "Morocco" },
    { value: "Mozambique", label: "Mozambique" },
    { value: "Myanmar", label: "Myanmar" },
    { value: "Namibia", label: "Namibia" },
    { value: "Nauru", label: "Nauru" },
    { value: "Nepal", label: "Nepal" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "Netherlands Antilles", label: "Netherlands Antilles" },
    { value: "New Caledonia", label: "New Caledonia" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Nicaragua", label: "Nicaragua" },
    { value: "Niger", label: "Niger" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "Niue", label: "Niue" },
    { value: "Norfolk Island", label: "Norfolk Island" },
    { value: "Northern Mariana Islands", label: "Northern Mariana Islands" },
    { value: "Norway", label: "Norway" },
    { value: "Oman", label: "Oman" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Palau", label: "Palau" },
    { value: "Palestinian Territory, Occupied", label: "Palestinian Territory, Occupied" },
    { value: "Panama", label: "Panama" },
    { value: "Papua New Guinea", label: "Papua New Guinea" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Peru", label: "Peru" },
    { value: "Philippines", label: "Philippines" },
    { value: "Pitcairn", label: "Pitcairn" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "Puerto Rico", label: "Puerto Rico" },
    { value: "Qatar", label: "Qatar" },
    { value: "Reunion", label: "Reunion" },
    { value: "Romania", label: "Romania" },
    { value: "Russian Federation", label: "Russian Federation" },
    { value: "Rwanda", label: "Rwanda" },
    { value: "Saint Helena", label: "Saint Helena" },
    { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
    { value: "Saint Lucia", label: "Saint Lucia" },
    { value: "Saint Pierre and Miquelon", label: "Saint Pierre and Miquelon" },
    { value: "Saint Vincent and The Grenadines", label: "Saint Vincent and The Grenadines" },
    { value: "Samoa", label: "Samoa" },
    { value: "San Marino", label: "San Marino" },
    { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Senegal", label: "Senegal" },
    { value: "Serbia", label: "Serbia" },
    { value: "Montenegro", label: "Montenegro" },
    { value: "Seychelles", label: "Seychelles" },
    { value: "Sierra Leone", label: "Sierra Leone" },
    { value: "Singapore", label: "Singapore" },
    { value: "Slovakia", label: "Slovakia" },
    { value: "Slovenia", label: "Slovenia" },
    { value: "Solomon Islands", label: "Solomon Islands" },
    { value: "Somalia", label: "Somalia" },
    { value: "South Africa", label: "South Africa" },
    { value: "South Georgia and The South Sandwich Islands", label: "South Georgia and The South Sandwich Islands" },
    { value: "Spain", label: "Spain" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Sudan", label: "Sudan" },
    { value: "Suriname", label: "Suriname" },
    { value: "Svalbard and Jan Mayen", label: "Svalbard and Jan Mayen" },
    { value: "Swaziland", label: "Swaziland" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Syrian Arab Republic", label: "Syrian Arab Republic" },
    { value: "Taiwan, Province of China", label: "Taiwan, Province of China" },
    { value: "Tajikistan", label: "Tajikistan" },
    { value: "Tanzania, United Republic of", label: "Tanzania, United Republic of" },
    { value: "Thailand", label: "Thailand" },
    { value: "Timor-leste", label: "Timor-leste" },
    { value: "Togo", label: "Togo" },
    { value: "Tokelau", label: "Tokelau" },
    { value: "Tonga", label: "Tonga" },
    { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Turkey", label: "Turkey" },
    { value: "Turkmenistan", label: "Turkmenistan" },
    { value: "Turks and Caicos Islands", label: "Turks and Caicos Islands" },
    { value: "Tuvalu", label: "Tuvalu" },
    { value: "Uganda", label: "Uganda" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    { value: "United States Minor Outlying Islands", label: "United States Minor Outlying Islands" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Vanuatu", label: "Vanuatu" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Viet Nam", label: "Viet Nam" },
    { value: "Virgin Islands, British", label: "Virgin Islands, British" },
    { value: "Virgin Islands, U.S.", label: "Virgin Islands, U.S." },
    { value: "Wallis and Futuna", label: "Wallis and Futuna" },
    { value: "Western Sahara", label: "Western Sahara" },
    { value: "Yemen", label: "Yemen" },
    { value: "Zambia", label: "Zambia" },
    { value: "Zimbabwe", label: "Zimbabwe" }
  ]

  const videoEl = useRef(null);
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };


  const handleFun = (e, type) => {
    if (e.target.checked) {
      if (type == "check1") {
        setCheckMain(true);
        setCheckbox3Selected(false);
        if (checkbox1Selected) {
          setCheckbox2Selected(true);
        }
      }
      if (type == "check2") {
        setCheckbox1Selected(true);
        setCheckbox3Selected(false);
        if (checkboxMain) {
          setCheckbox2Selected(true);
        }
      }
      if (type == "check3") {
        setCheckbox3Selected(false);
        setCheckbox2Selected(true);
        setCheckbox1Selected(true);
        setCheckMain(true);
      }
      if (type == "check4") {
        setCheckbox3Selected(true);
        setCheckbox2Selected(false);
        setCheckbox1Selected(false);
        setCheckMain(false);
      }
    } else {
      if (type == "check1") {
        setCheckMain(false);
        setCheckbox2Selected(false);
      }
      if (type == "check2") {
        setCheckbox1Selected(false);
        setCheckbox2Selected(false);
      }
      if (type == "check3") {
        setCheckbox3Selected(false);
        setCheckbox2Selected(false);
        setCheckbox1Selected(false);
        setCheckMain(false);
      }
      if (type == "check4") {
        setCheckbox3Selected(false);
        setCheckbox2Selected(false);
        setCheckbox1Selected(false);
        setCheckMain(false);
      }
    }
  };

  const registerButtonClicked = async (e) => {
    // try {
    e.preventDefault();

    let str = "";
    if (checkbox2Selected == true) {
      str = str + "checkbox3~checkbox4~checkbox5";
    } else if (checkboxMain == true) {
      str = str + "checkbox3";
    } else if (checkbox1Selected == true) {
      str = str + "checkbox4";
    } else if (checkbox3Selected == true) {
      str = str + "checkbox6";
    }

    const body = {
      name: name,
      email: email,
      country: country.value,
      consent: str,
      App_used: "OneSource"
    };

    const err = register(body);
    if (Object.keys(err)?.length) {
      setError(err);
      return;
    } else {
      setError({});
      loader("show");
      try {
        const isRegister = await postData(`${ENDPOINT?.REGISTER}`, body);
        const firebaseId = await checkAndCreateUser(email);

        localStorage.setItem("fireud", firebaseId);

        const storeFireBase = await postData(`${ENDPOINT?.STORE_FIREBASE}`, {
          user_id: isRegister?.data?.data?.registration?.user_id,
          firebase_id: firebaseId
        });

        if (Object.keys(isRegister?.data?.data?.registration?.registered_event).length === 0) {
          localStorage.setItem("register", 0);
        } else {
          // if(isRegister?.data?.event_id!=undefined && isRegister?.data?.event_id!=0){
          let checkEventExist = Object.hasOwn(isRegister?.data?.data?.registration?.registered_event, isRegister?.data?.event_id)
          // let checkEventExist = Object.hasOwn(isRegister?.data?.data?.registration?.registered_event,eventConfig?.eventId)
          let exist = checkEventExist ? 1 : 0;
          localStorage.setItem("register", exist);
          // }else{
          //   localStorage.setItem("register",0);
          // }
        }
        localStorage.setItem("evd", isRegister?.data?.event_id ? isRegister?.data?.event_id : activeEventConfig?.eventId);
        localStorage.setItem("eventCode", isRegister?.data?.event_code ? isRegister?.data?.event_code : activeEventConfig?.eventCode);
        localStorage.setItem("dhdjdluytt", isRegister?.data?.token);
        localStorage.setItem("bhdkdlolepk", "pastrara6789943dcgbh");
        localStorage.setItem("dhdjdluytp", "01245a4sd045");
        localStorage.setItem("un", isRegister?.data?.data?.registration?.user_id);
        localStorage.setItem("name", isRegister?.data?.data?.registration?.name);
        localStorage.setItem("country", isRegister?.data?.data?.registration?.country);
        localStorage.setItem("email", isRegister?.data?.data?.registration?.username);
        localStorage.setItem("ct", isRegister?.data?.data?.registration?.consent);
        localStorage.setItem("ec", isRegister?.data?.data?.registration?.encryped_id);
        navigate("/thankyou");
        loader("hide");
      } catch (err) {
        loader("hide");
        console.log(err);
      }
    }
  };
  const nameChanged = (e) => {
    setName(e.target.value);
  };

  const countryDropDownClicked = (e) => {
    // console.log(e);
    setCountry(e);
  };

  const handleShowVideo = (newShowRequest) => {
    setShowVideo(newShowRequest);
  };



  const checkAndCreateUser = async (email) => {
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



  useEffect(() => {
    loader("hide")
    attemptPlay();
  }, []);

  return (
    <div className="front-page register">
      <Container fluid>
        <Row>
          <Col sm={6} className="left-cont">
            <div className="login-left-side">
              <p><strong>To learn more about One Source</strong> <span className="video_pop" onClick={() =>
                handleShowVideo(true)
              }>CLICK HERE</span><br /><span>One Source</span> is a free service from Octapharma for Health Care Professionals only.<br />
                The information in this asset has been developed for an international audience. Accordingly, it may contain information on products and/or indications that are not approved in your country. Please consult your local prescribing information.
              </p>
              <div className="copyright-links">
                <Link to="/octapharma-privacy" target="_blank">Octapharma Privacy Statement</Link>
                <Link to="/docintel-privacy" target="_blank">Docintel Privacy Policy</Link>
                <Link to="/terms_of_use" target="_blank">Term of Use</Link>
              </div>
            </div>
          </Col>
          <Col sm={6} className="right-cont">
            <div className="login-page registration">
              <div className="one-source-logo">
                <a href="https://onesource.octapharma.com/">
                  <video
                    playsInline
                    muted
                    alt="One Source Logo"
                    src="https://docintel.s3.eu-west-1.amazonaws.com/image/one_Source_logg.mp4"
                    ref={videoEl}
                  />
                </a>
              </div>
              <div className="login-content">
                <p className="start-title">By registering to One Source you will gain access to the relevant content in accordance with the data privacy policy of <Link to="/octapharma-privacy" target="_blank">Octapharma AG</Link>   
                {/* and <a href="https://albert.docintel.app/privacy_policy/" target="_blank">Docintel.app</a>  */}
                 &nbsp;operating this page.</p>
                <Form className="register_form">
                  <Form.Group className="form-group">
                    <Form.Label>
                      Name <span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      onChange={(e) => {
                        nameChanged(e);
                      }}
                      className={error?.name ? "validationErrors" : null}
                    />
                    {error?.name ? (
                      <div className="login-validation">{error?.name}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>
                      Email <span>*</span>
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="email"
                      placeholder="Enter your email"
                      className={error?.email ? "validationErrors" : null}
                    />
                    {error?.email ? (
                      <div className="login-validation">{error?.email}</div>
                    ) : null}
                  </Form.Group>

                  {/* <Form.Group className="form-group">
                  <Form.Label>
                    Country <span>*</span>
                  </Form.Label>
                  <DropdownButton
                    className={
                      error?.country
                        ? "validationErrors dropdown-basic-button split-button-dropup"
                        : country != ""
                        ? "dropdown-basic-button split-button-dropup country_selected countryDropdown"
                        : "dropdown-basic-button split-button-dropup"
                    }
                    title={
                      country != "" && country != "undefined"
                        ? country
                        : "Select your country"
                    }
                    onSelect={(event) => countryDropDownClicked(event)}
                  >
                    <div className="dropdown-menu-list">
                      {
                        options?.map((item, index) => (
                          <Dropdown.Item eventKey={item.label} key={index} className={item.label == country ? "selected": ""}>
                            {item.label}
                          </Dropdown.Item>
                        ))
                      }
                    </div>
                  </DropdownButton>
                  {error?.country ? (
                    <div className="login-validation">{error?.country}</div>
                  ) : null}
                </Form.Group> */}
                  <Form.Group className="form-group">
                    <Form.Label>
                      Country <span>*</span>
                    </Form.Label>
                    <Select
                      className={
                        error?.country
                          ? "validationErrors dropdown-basic-button split-button-dropup"
                          : country != ""
                            ? "dropdown-basic-button split-button-dropup country_selected countryDropdown"
                            : "dropdown-basic-button split-button-dropup"
                      }
                      placeholder="Select your country"
                      value={
                        country != "" && country != "undefined"
                          ? country
                          : "Select your country"
                      }
                      onChange={(event) => countryDropDownClicked(event)}
                      options={options}
                    />
                    {error?.country ? (
                      <div className="login-validation">{error?.country}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="form-group radio">
                    {/* <div className="certify-option">
                    <input
                      type="checkbox"
                      value="remember-me"
                      onChange={(e) => certifyCheckboxChanged(e)}
                    />
                    <label>I certify that I'm a healthcare professional.</label>
                  </div> */}
                    <div className="certify-option">
                      <p>I also consent to: <span>*</span></p>
                      <div className="option-list">
                        <input
                          id="first_consent"
                          type="checkbox"
                          onChange={(e) => handleFun(e, 'check1')}
                          ref={checkboxvalue}
                          checked={checkboxMain ? true : false}
                        />
                        <label htmlFor="first_consent">Receive One Source updates and new materials from Octapharma.</label>
                      </div>
                      <div className="option-list">
                        <input
                          id="second_consent"
                          type="checkbox"
                          onChange={(e) => handleFun(e, 'check2')}
                          ref={checkbox1value}
                          checked={checkbox1Selected ? true : false}
                        />
                        <label htmlFor="second_consent">Receive invitations to future events.</label>
                      </div>
                      <div className="option-list">
                        <input
                          id="third_consent"
                          type="checkbox"
                          onChange={(e) => handleFun(e, 'check3')}
                          ref={checkbox2value}
                          checked={checkbox2Selected ? true : false}
                        />
                        <label htmlFor="third_consent">Both of the options above.</label>
                      </div>
                      <div className="option-list">
                        <input
                          id="fourth_consent"
                          type="checkbox"
                          onChange={(e) => handleFun(e, 'check4')}
                          ref={checkbox3value}
                          checked={checkbox3Selected ? true : false}
                        />
                        <label htmlFor="fourth_consent">None of the options above.</label>
                      </div>
                      {error?.consent ? (
                        <div className="login-validation">{error?.consent}</div>
                      ) : null}
                    </div>
                  </Form.Group>

                  <Form.Group className="col-12 sspace form-group d-flex flex-column align-items-center">
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={registerButtonClicked}
                    >
                      Register
                    </Button>
                  </Form.Group>
                </Form>
                <p className="consent-change">Your consent can be changed or withdrawn at any time in your One Source {/*(Docintel) */}account after registration.</p>
                <p className="form-text">
                  Already have an account?&nbsp;&nbsp;<Link to="/login">login now</Link>
                </p>
              </div>
              <div className="page-copyright">
                <p>We only use essential cookies and no data is shared with 3rd party. <a href="javascript:void(0)" onClick={showCookieModal}>Click here</a> to see the specifics.</p>
                <div className="copyright-links">
                  <Link to="/octapharma-privacy" target="_blank">Octapharma Privacy Statement</Link>
                  {/* <Link to="/docintel-privacy" target="_blank">Docintel Privacy Policy</Link>
                  <Link to="/terms_of_use" target="_blank">Terms of Use</Link> */}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={cookieShow} onHide={hideCookieModal} className="cookieadd" centered>
        <Modal.Header closeButton>
          <Modal.Title>Used cookies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Essential cookies exclusively enhance your experience with us ensuring our system runs smoothly whilst recognising you for seamless recurring use. Be confident we never share your information with any commercial cookie company.</h6>
          <div className="used-cookies-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CAKEPHP</td>
                  <td>Framework default cookie for cache of all component.</td>
                </tr>
                <tr>
                  <td>dynamic_number (ex 1210)</td>
                  <td>This cookie is used for storing the status of consent given or not for the article.</td>
                </tr>
                <tr>
                  <td>video_track</td>
                  <td>This cookie is used for storing the last seek time of user for the particular video.</td>
                </tr>
                <tr>
                  <td>name_use</td>
                  <td>Used to autofill name of the user to help with repetitive task. Only used in some circumstances where user have been directed to the site based on previous consent. </td>
                </tr>
                <tr>
                  <td>email_use</td>
                  <td>Used to autofill email of the user to help with repetitive task. Only used in some circumstances where user have been directed to the site based on previous consent.</td>
                </tr>
                <tr>
                  <td>country_use</td>
                  <td>Used to autofill country of the user to help with repetitive task. Only used in some circumstances where user have been directed to the site based on previous consent.</td>
                </tr>
                <tr>
                  <td>consent_type</td>
                  <td>Used to detect if use have given full or limited consent to be sure tracking of usage is handled correctly.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>

      {showVideo && (
        <VideoModal
          handleShowVideo={handleShowVideo}
        />
      )}
    </div>
  );
};

export default Register;
