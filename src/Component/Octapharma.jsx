import React, { useEffect } from "react";
import { loader } from "./CommonComponent/Loader";
const OctapharmaPrivacy = () => {

  useEffect(() => {
    loader("hide")
  }, []);


  return (
    <>
              <header className="default-page-heading"><div className="site-main-log1">
                {/* <h4>Privacy</h4> */}
                </div></header>
              <div className="wrapper-site">
                <div className="container">
                  <div className="row">
                    <div className="privacy  default-view">
                      <div className="privacy-policy">
                        <div className="site-logo">
                            <img
                              style={{ cursor: "pointer" }}
                              src={"./images/octapharma-logo.svg"}
                              alt="Docintel Logo"
                            />
                        </div>
                        <div className="privacy-content">
                        <p>
                          <b>  Data privacy statement </b> <br/><br/>
                          Octapharma AG, Seidenstrasse 2, 8853 Lachen SZ, Switzerland (hereinafter “Octapharma” or “we” or “us”) respects the right of individuals regarding their personal data. This Data Privacy Statement (“privacy statement”) describes the way we process your personal information.</p>

                          <p>
                          Octapharma Pharmazeutika Produktionsgesellschaft m.b.H., Oberlaaer Strasse 235, 1100 Vienna, Austria is appointed as our representative in the EU/EEA in accordance with Article 27 GDPR. </p>
                           <p>
                            <p>Please DO NOT report drug safety related information, such as side effects, via this website. Drug safety related information should be reported to <i style={{"text-decoration": "underline"}}><a href="mailto:at1safetyinformation@octapharma.com" style={{color:"#004a89"}}>at1safetyinformation@octapharma.com.</a></i>  If you are a patient, please contact your physician in case of adverse reactions.</p>
                           {/* Personal information will not be disclosed to third parties except where the third party is a contractor who is involved in fulfilling the individual’s request for information, or a supplier or contractor who is involved in the development and management of the relevant website, app and/or system. */}
                          </p>
                          <p>
                          <b> <i style={{"text-decoration": "underline"}}>  Disclosure and use of personal information
                          </i> </b> <br/> <br/>
                          <p>We are using your contact data to send you this e-mail communication. Unless you register to our platform OneSource and confirm that your personal data shall be available longer - so you can benefit from the system functionalities - your personal data will be fully deleted within 4 weeks from this communication.

                          </p>
                          <p>Information will not be disclosed to third parties except where the third party is a contractor who is involved in fulfilling the individual’s request for information, or a supplier or contractor who is involved in the development and management of the relevant website, app and/or system.</p>


                          <b> <i style={{"text-decoration": "underline"}}>  Legal basis</i> </b> <br/> <br/>
                           <i  style={{"text-decoration": "underline"}}>Access to documents for health care professionals</i>: We provide you with access to certain documents on the basis of your consent (clicking on the links and registering to the system) and we provide you with access to onesource, to restrict access to health care professionals, only on the basis of the legitimate interest and to comply with applicable laws. It will be tracked if you have opened the relevant documents in the system.
                            </p>
                            <p>
                            <i style={{"text-decoration": "underline"}}>Any further purpose</i>: Marketing information, invitation to future events etc. is subject to the explicit consent provided by the relevant health care professional. It will be tracked if you have opened the relevant documents in the system.
                          </p>
                          <b> <i style={{"text-decoration": "underline"}}>Your rights</i> </b> <br/><br/>
                          <p>
                          You can access all your personally identifiable information that we collect. You may also demand the deletion of your personal data unless the applicable laws and regulations oblige us to store your personal data. </p>
                          <p>
                          You can request to be provided with information about data which we store/process about you. In addition, you have the right to have any personal data blocked or deleted, to object to the processing of your data, to have any incorrect data corrected and the right to have your data transferred to a third party.</p>
                          <p>
                          You can correct factual errors in your personally identifiable information by sending us an email that credibly shows the error. You likewise have the right to request the correction of incorrect personal data. </p>
                          <p>
                          To protect your privacy and security, we will also take reasonable steps to verify your identity before making corrections. Should you have other questions or concerns about these privacy statement or want to have your data deleted from our database, please send an email to <i style={{"text-decoration": "underline"}}><a href="mailto:dataprivacy@octapharma.com" style={{color:"#004a89"}}>dataprivacy@octapharma.com</a> </i></p>
                          <p>
                           You also have the right to lodge a complaint with a supervisory authority, if applicable.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </>
  );
};
export default OctapharmaPrivacy;
