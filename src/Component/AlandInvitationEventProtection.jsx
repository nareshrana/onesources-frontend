import React, { useEffect } from "react";
import { loader } from "./CommonComponent/Loader";

const AlandInvitationEventProtection = () => {
   
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
                                      <b>Data Protection</b> <br /><br />
                                      The personal data provided by you is being processed by Octapharma AG (Seidenstrasse 2, 8853 Lachen, Switzerland) (hereinafter referred to as “Octapharma”) for the purpose of your participation in an event.</p>

                                  <p>
                                      Only if needed by law/codex or necessary for the purpose of the relevant request, such information is shared with other legal entities within the Octapharma Group. The transfer to the group companies is based on the same legal ground as the processing as such. In order to ensure that the personal data is protected, Octapharma has entered into an Intercompany Data Transfer Agreement with its affiliated companies.</p>
                                  <p>
                                      Please be aware that we might take pictures or even videos during the events. Such pictures and videos will be used for internal information and educational purposed and external marketing purposes. You might appear in such videos/pictures from the back, in the background or out of focus.
                                  </p>
                                  <p>
                                      We will ask for your specific consent for any pictures/video, which will show you explicitly.
                                  </p>
                                  <p>You have the right to request to be informed about the personal data, which are processed/stored with Octapharma.<br/>
                                      You have the right to request any corrections or modifications of personal data, which are incorrect.

                                  </p>
                                  <p>
                                      For natural persons located in the EU/EEA/CH: Additionally, if a data subject has any issues with Octapharma’s processing of personal data, the data subject has the right to lodge a complaint with the competent data protection authority.<br/>
                                      A data subject has, in addition to the rights outlined above, a right to object to certain processing of personal data, a right to request restriction of the processing of personal data, and a right to data portability. The right to data portability covers such personal data which Octapharma processes in electronic form either based on the relevant agreement as such or on consent.
</p>
                                  <p>
                                      We will keep a version of all participation requests (if any) sent by email, on the Octapharma e-mail server and will ensure that only such employees will have access to the relevant information with a need to see and access it.<br/>
                                      Octapharma will store your personal data as long as needed for the purpose for which the personal data was originally collected, or as necessary in order for Octapharma to satisfy potential legal claims, or in order for Octapharma to establish, defend or exercise legal claims in accordance with our Data Protection Policy. When the processing of the personal data is no longer necessary for these purposes, the personal data will be securely deleted, taking into account retention times subject to local laws. For questions or requests concerning your personal data, please send an e-mail to: <a href="mailto:dataprivacy@octapharma.com">dataprivacy@octapharma.com.</a> 

                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default AlandInvitationEventProtection