import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { loader } from "./CommonComponent/Loader";

const TermsOfUse = () => {

  useEffect(() => {
    loader("hide")
  }, []);

  return (
    <>
      <header className="default-page-heading">
        <div className="site-main-log1">
        {/* <h4>Terms of use</h4> */}
        </div>
      </header>
      <div className="wrapper-site">
        <Container>
          <Row>
            <div className="privacy">
              <div className="privacy-policy">
                <div className="site-logo">
                  <img
                    src="./images/docintel-app-logo.svg"
                    alt="Docintel Logo"
                  />
                </div>
                <div className="privacy-content">
                  <p>
                    This agreement applies as between you, the user of this website and/or the apps, and Docintel.app, the owner(s) of this website and the apps (“Service”). Your agreement to comply with and be bound by these terms is deemed to occur upon your use of the Service. If you do not agree to be bound by these terms, you should stop using the Service immediately.
                  </p>
                  <ol start="1">
                    <li>Intellectual Property</li>
                  </ol>
                  <p>
                    Subject to the exceptions in clause 2 of these Terms of
                    Service, all content included through the Service including,
                    but not limited to, text, graphics, logos, icons, images,
                    sound clips, video clips, data compilations, page layout,
                    underlying code and software is the property of
                    Docintel.app, our affiliates, or our clients. By continuing
                    to use the Service you acknowledge that such material is
                    protected by the laws of England and Wales, international
                    intellectual property laws and other applicable laws.
                  </p>

                  <ol start="2">
                    <li>Intellectual Property</li>
                  </ol>
                  <p>
                    Unless otherwise indicated in the Service, the Service and
                    all content and other materials within the Service,
                    including, but not limited to, our logo and all designs,
                    text, graphics, logos, icons, images, photographs, audio
                    clips, content, digital downloads, data compilations,
                    software and the selection and arrangement thereof
                    (collectively the "Content") are our property or that of our
                    clients, licensors or are protected by English and/or
                    international copyright laws. You may not remove any notices
                    or credits posted within the Service, or any additional
                    information contained along with any such notices and
                    credits.
                  </p>
                  <p>
                    We grant you a limited, non-sublicensable and non-exclusive
                    license to access and make use of the Service and print to
                    hard copy, where expressly permitted, portions of the
                    Service for your informational, non-commercial and personal
                    use only, solely in accordance with, and subject to, these
                    Terms and any other agreement you may enter into with us or
                    any of our clients. Such license does not include, except as
                    and to the extent otherwise expressly permitted by these
                    Terms: (a) the collection, use, copying or distribution of
                    any portion of the Service or the Content; (b) any resale,
                    commercial use, commercial exploitation, distribution,
                    public performance or public display of the Service or any
                    of the Content; (c) modifying or otherwise making any
                    derivative uses of the Service or the Content, or any
                    portion thereof; (d) use of data mining, robots or similar
                    data gathering or extraction methods; (e) downloading (other
                    than page caching) of any portion of the Service, the
                    Content or any information contained therein, except as
                    expressly permitted on the Service; or (f) any use of the
                    Service or the Content other than for their intended
                    purposes.
                  </p>
                  <p>
                    Any use of the Service or of any Content not owned by you,
                    other than as specifically authorized herein, without our
                    prior written consent, is strictly prohibited and will
                    terminate this license grant and constitute a breach of this
                    license grant. Such unauthorized use may also violate
                    applicable laws, including, but not limited to, copyright
                    and trademark laws and applicable communications regulations
                    and statutes. Unless otherwise expressly stated, nothing in
                    these Terms will be construed as conferring any license to
                    intellectual property rights, whether by estoppel,
                    implication or otherwise. In the event any license (which is
                    not expressly granted under these Terms) is otherwise deemed
                    to be granted to you by operation of law or otherwise, you
                    hereby irrevocably assign to us forever all right, title and
                    interest therein, without any fee. In addition, such license
                    will be revocable by us at any time without any penalty.
                  </p>
                  <p>
                    Without our express consent, you agree that: (i) you will
                    not use any robot, spider, other automatic device, or manual
                    process to monitor or copy the Service, or any pages or
                    content available on the Service, for any other purpose;
                    (ii) you will not use any device, software or routine to
                    interfere or attempt to interfere with the proper working of
                    the Service; (iii) you will not take any action that imposes
                    an unreasonable or disproportionately large load on our
                    infrastructure; and (iv) you will not copy, reproduce,
                    alter, modify, create derivative works, or publicly display
                    any content (except for your own personal, non-commercial
                    use) from the Service.
                  </p>
                  <ol start="3">
                    <li>Links to Other Websites</li>
                  </ol>
                  <p>
                    This website may contain links to other websites. Unless
                    expressly stated, these sites are not under the control of
                    Docintel.app or that of our clients. We assume no
                    responsibility for the content of such Websites and disclaim
                    liability for any and all forms of loss or damage arising
                    out of the use of them. The inclusion of a link to another
                    site on this website does not imply any endorsement of the
                    sites themselves or of those in control of them.
                  </p>

                  <ol start="4">
                    <li>Links to this Website</li>
                  </ol>
                  <p>
                    Those wishing to place a link to this website on other sites
                    may do so only to the home page of the site
                    www.Docintel.app.com without prior permission. Deep linking
                    (i.e. links to specific pages within the site) requires the
                    express permission of Docintel.app. To find out more please
                    contact us by email at  <i style={{"text-decoration": "underline"}}><a href="mailto:support@Docintel.app" style={{color:"#004a89"}}>support@Docintel.app</a> </i>
                  </p>
                  <ol start="5">
                    <li>Advertising</li>
                  </ol>
                  <p>
                    Certain pages on this Service display third party
                    advertising. Docintel.app has neither control over, nor
                    involvement in, any third party advertising or the products
                    and/or services featured therein.
                  </p>
                  <p>
                    Unless it is expressly stated (for reasons including, but
                    not limited to, sponsorship), no advertising shall be taken
                    as an endorsement by Docintel.app of the products, services
                    or any party associated therewith featured in advertising.
                  </p>
                  <p>
                    Where any advertising utilises cookies or similar
                    technological means to gather data, it shall be governed by
                    our Privacy Policy.
                  </p>

                  <ol start="6">
                    <li>Privacy Policy</li>
                  </ol>
                  <p>
                    The use of the Service is also governed by our Privacy
                    Policy. Docintel.app’s Privacy Policy explains how we
                    collect, use, and secure personal information. By using the
                    Service you acknowledge, and agree to, Docintel.app’s
                    Privacy Policy.
                  </p>

                  <ol start="7">
                    <li>Data Retention</li>
                  </ol>
                  <p>
                    Docintel.app makes no warranty or representation that the
                    Service or the Content therein will meet your requirements,
                    that they will be of satisfactory quality, that they will be
                    fit for a particular purpose, that they will not infringe
                    the rights of third parties, that they will be compatible
                    with all systems, or that they will be secure.
                  </p>
                  <p>
                    The opinions expressed in Content are those of their authors
                    and do not represent the opinions of Docintel.app.
                  </p>
                  <p>
                    Whilst every reasonable endeavour has been made to ensure
                    that all information provided in this Service will be
                    accurate and up to date, Docintel.app makes no warranty or
                    representation that this is the case. We make no guarantee
                    of any specific results from the use of our Service.
                  </p>
                  <p>
                    No part of this Service is intended to constitute advice and
                    the Content of this Service should not be relied upon when
                    making any decisions or taking any action of any kind.
                  </p>
                  <p>
                    Docintel.app makes no representation or warranty that any
                    part of this Service is suitable for use in commercial
                    situations or that it constitutes accurate data and / or
                    advice on which medical decisions can be based.
                  </p>
                  <p>
                    Whilst every effort has been made to ensure that all
                    descriptions of services available from Docintel.app
                    correspond to the actual services available, Docintel.app is
                    not responsible for any variations from these descriptions.
                  </p>
                  <p>
                    Whilst Docintel.app uses reasonable endeavours to ensure
                    that the Service is secure and free of errors, viruses and
                    other malware, all users are advised to take responsibility
                    for their own security, that of their personal details and
                    their computers.
                  </p>
                  <ol start="8">
                    <li>Availability of the Service and Modifications</li>
                  </ol>
                  <p>
                    The Service is provided “as is” and on an “as available”
                    basis. We give no warranty that the Service will be free of
                    defects and / or faults. To the maximum extent permitted by
                    the law we provide no warranties (express or implied) of
                    fitness for a particular purpose, accuracy of information,
                    compatibility and satisfactory quality.
                  </p>
                  <p>
                    Docintel.app accepts no liability for any disruption or
                    non-availability of the Service resulting from external
                    causes including, but not limited to, ISP equipment failure,
                    host equipment failure, communications network failure,
                    power failure, natural events, acts of war or legal
                    restrictions and censorship.
                  </p>
                  <p>
                    Docintel.app reserves the right to alter, suspend or
                    discontinue any part (or the whole of) the Service
                    including, but not limited to, the Content and/or Service
                    available. These Terms of Service shall continue to apply to
                    any modified version of the Service unless it is expressly
                    stated otherwise.
                  </p>
                  <ol start="9">
                    <li>Limitation of Liability</li>
                  </ol>
                  <p>
                    To the maximum extent permitted by law, Docintel.app accepts
                    no liability for any direct or indirect loss or damage,
                    foreseeable or otherwise, including any indirect,
                    consequential, special or exemplary damages arising from the
                    use of the Service or any information contained therein.
                    Users should be aware that they use the Service and its
                    Content at their own risk.
                  </p>
                  <p>
                    Nothing in these terms and conditions excludes or restricts
                    Docintel.app’s liability for death or personal injury
                    resulting from any negligence or fraud on the part of
                    Docintel.app.
                  </p>
                  <p>
                    Whilst every effort has been made to ensure that these terms
                    and conditions adhere strictly with the relevant provisions
                    of the Unfair Contract Terms Act 1977, in the event that any
                    of these terms are found to be unlawful, invalid or
                    otherwise unenforceable, that term is to be deemed severed
                    from these terms and conditions and shall not affect the
                    validity and enforceability of the remaining terms and
                    conditions. This term shall apply only within jurisdictions
                    where a particular term is illegal.
                  </p>
                  <ol start="10">
                    <li>No Waiver</li>
                  </ol>
                  <p>
                    In the event that any party to these Terms of Service fails
                    to exercise any right or remedy contained herein, this shall
                    not be construed as a waiver of that right or remedy.
                  </p>
                  <ol start="11">
                    <li>Previous Terms and Conditions</li>
                  </ol>
                  <p>
                    In the event of any conflict between these Terms of Service
                    and any prior versions thereof, the provisions of these
                    Terms of Service shall prevail unless it is expressly stated
                    otherwise.
                  </p>
                  <ol start="12">
                    <li>Third Party Rights</li>
                  </ol>
                  <p>
                    Nothing in these Terms of Service shall confer any rights
                    upon any third party. The agreement created by these terms
                    is between you and Docintel.app.
                  </p>
                  <ol start="13">
                    <li>Communications</li>
                  </ol>
                  <p>
                    We will communicate with you by: (1) emailing you to the
                    email address you registered with; (2) posting
                    communications on our website; or (3) posting messages that
                    will be displayed when you access the Service.
                  </p>
                  <p>
                    All communications should be provided to us by email to
                    <i style={{"text-decoration": "underline"}}><a href="mailto:support@Docintel.app" style={{color:"#004a89"}}>support@Docintel.app</a> </i>. Your communication will be deemed
                    received on the day of sending if the email is received in
                    full on a business day and on the next business day if the
                    email is sent on a weekend or public holiday.
                  </p>
                  <p>
                    Docintel.app may from time to time send you information
                    about our products and/or services. If you do not wish to
                    receive such information, please notify us via
                    <i style={{"text-decoration": "underline"}}><a href="mailto:support@Docintel.app" style={{color:"#004a89"}}>support@Docintel.app</a> </i> or click on the “Unsubscribe” link in
                    any email you receive from us.
                  </p>
                  <ol start="14">
                    <li>Termination</li>
                  </ol>
                  <p>
                    We reserve the right, without notice and in our sole
                    discretion, to terminate your access to the Service, and to
                    block or prevent your future access to and use of the
                    Service.
                  </p>
                  <ol start="15">
                    <li>Update to Terms of Service</li>
                  </ol>
                  <p>
                    Docintel.app reserves the right to change and modify any of
                    the Terms of Service contained in these terms or any policy
                    at any time and in our sole discretion. Any changes to our
                    terms will be effective immediately upon posting in our
                    Service. Your continued use of the Service following posting
                    of amended terms will constitute your acceptance thereof. If
                    you do not agree with changes or modifications to our terms
                    or policy you should stop using the Service immediately.
                  </p>
                  <ol start="16">
                    <li>Law and Jurisdiction</li>
                  </ol>
                  <p>
                    These terms and the relationship between you and
                    Docintel.app shall be governed by and construed in
                    accordance with the Law of England and Wales and
                    Docintel.app and you agree to submit to the exclusive
                    jurisdiction of the Courts of England and Wales.
                  </p>
                  <p>
                    These terms and conditions and the relationship between you
                    and Docintel.app shall be governed by and construed in
                    accordance with the Law of England and Wales and
                    Docintel.app and you agree to submit to the exclusive
                    jurisdiction of the Courts of England and Wales.
                  </p>
                </div>
              </div>
            </div>
          </Row>
        </Container>
        </div>
    </>
  );
};
export default TermsOfUse;
