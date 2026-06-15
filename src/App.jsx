import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
  useLocation,
} from "react-router";
import Header from "./Component/CommonComponent/Header";
import Footer from "./Component/CommonComponent/Footer";
import DefaultLayout from "./Component/CommonComponent/DefaultLayout";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Forgot from "./Component/Forgot";
import Thankyou from "./Component/Thankyou";
import SetPassword from "./Component/SetPassword";
import OneSourceFinal from "./Component/OneSourceFinal";
import GotMail from "./Component/GotMail";
import Octapharma from "./Component/Octapharma";
import DocintelPrivacy from "./Component/DocintelPrivacy";
import Redirect from "./Component/Redirect";
import PageNotFound from "./Component/PageNotFound";
import Term from "./Component/Term";
import React, { useEffect, useRef, useState } from "react";
import ScrollContext from "./Component/ScrollContext";
import EAHAD2024 from "./Component/EAHAD2024";
import EAHAD2025 from "./Component/EAHAD2025";
import ISTH2024 from "./Component/ISTH2024";
import ISTH2025 from "./Component/ISTH2025";
import ISTH2 from "./Component/ISTH2";
import WFH2024 from "./Component/WFH2024";
import AlandInvitationEventProtection from "./Component/AlandInvitationEventProtection";
import "react-loading-skeleton/dist/skeleton.css";
import { loader } from "./Component/CommonComponent/Loader";
import { ENDPOINT } from "./axios/apiConfig";
import { useNavigate } from "react-router";
import { postData } from "./axios/apiHelper";
import PDFViewer from "./Component/CommonComponent/PdfViewer";
import Wil_ISI from "./Component/Wil_ISI";
import EAHAD2026 from "./Component/EAHAD2026";
import EAHAD26 from "./Component/EAHAD26";
import ShareContentComponent from "./Component/ShareContent/ShareContentComponent";
import LinkInvalidOrExpired from "./Component/ShareContent/LinkInvalidOrExpired";
import useCheckLinkValidity from "./hooks/useCheckLinkValidity";
import EAHAD2026PromoPage from "./Component/EAHAD2026PromoPage";
import AlandInvitationEventProtectionNew from "./Component/AlandInvitationEventProtectionNew";
import WFH2026 from "./Component/WFH2026";
import WFH2026PromoPage from "./Component/WFH2026promopage";
import Isth2026 from "./Component/ISTH2026";
import ISTH2026Agenda from "./Component/ISTH2026Agenda";
import ISTH2026Promo from "./Component/ISTH2026Promo";

const Layout = () => {
  let isAuthenticated = localStorage.getItem("un") !== null;
  const [isAuthenticatedFromCookie, setIsAuthenticatedFromCookie] =
    useState(true);

  const highlightRef = useRef(null);
  const expertOpinionRef = useRef(null);
  const yourOpinionRef = useRef(null);
  const eventRef = useRef(null);
  const mostPopularContentRef = useRef(null);
  const oneSourceLibraryRef = useRef(null);
  const podcastRef = useRef(null);
  const webinarRef = useRef(null);
  const logoutBtnRef1 = useRef(null);
  const logoutBtnRef2 = useRef(null);
  const symposiumRef = useRef(null);
  const [shouldObserveElements, setShouldObserveElements] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const validOrExpireLink = useCheckLinkValidity();

  const [desiredPath, setDesiredPath] = useState(location.pathname);

  // Helper function to check cookie expiration
  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) {
        return value;
      }
    }
    return undefined; // Cookie not found
  }

  useEffect(() => {
    const cookieTimeLeft = getCookie("timeLeft");
    if (!cookieTimeLeft) {
      isAuthenticated = false;
      userActivity();
      if (location.pathname && location.pathname.startsWith("/home/share/")) {
        validOrExpireLink(location.pathname.split("/").pop(), "login");
      } else {
        navigate("/login");
      }
    } else {
      setIsAuthenticatedFromCookie(false);
    }
  }, [navigate]);

  const userActivity = () => {
    let obj = {
      user_id: localStorage.getItem("un"),
      event_id: localStorage.getItem("evd"),
    };
    if (obj.user_id && obj.event_id) {
      postData(`${ENDPOINT.LOGOUT}`, obj);
    }
    localStorage.clear();
  };

  if (isAuthenticatedFromCookie) {
    return null;
  }

  return (
    <>
      {isAuthenticated ? (
        <ScrollContext.Provider
          value={{
            highlightRef,
            expertOpinionRef,
            yourOpinionRef,
            eventRef,
            mostPopularContentRef,
            oneSourceLibraryRef,
            podcastRef,
            webinarRef,
            shouldObserveElements,
            setShouldObserveElements,
            logoutBtnRef1,
            logoutBtnRef2,
            symposiumRef,
          }}
        >
          {location.pathname &&
          location.pathname.startsWith("/home/share/") ? null : (
            <Header />
          )}
          <Outlet />{" "}
          {location.pathname &&
          location.pathname.startsWith("/home/share/") ? null : (
            <Footer />
          )}
        </ScrollContext.Provider>
      ) : (
        <Navigate to="/login" state={{ desiredPath: location.pathname }} />
      )}
    </>
  );
};

function App() {
  useEffect(() => {
    const removeLoader = () => {
      loader("hide");
    };
    document.addEventListener("DOMContentLoaded", removeLoader);

    return () => {
      document.removeEventListener("DOMContentLoaded", removeLoader);
    };
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout component={Login} />} />
          <Route path="/login" element={<DefaultLayout component={Login} />} />
          <Route
            path="/register"
            element={<DefaultLayout component={Register} />}
          />
          <Route
            path="/forgot"
            element={<DefaultLayout component={Forgot} />}
          />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/got-mail" element={<GotMail />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/octapharma-privacy" element={<Octapharma />} />
          <Route
            path="/aland-data-protection"
            element={<AlandInvitationEventProtection />}
          />
          <Route
            path="/aland-data-policy"
            element={<AlandInvitationEventProtectionNew />}
          />
          <Route path="/terms_of_use" element={<Term />} />
          <Route path="/wil_isth25" element={<Wil_ISI />} />
          <Route path="/docintel-privacy" element={<DocintelPrivacy />} />
          <Route path="/EAHAD2024" element={<EAHAD2024 />} />
          <Route path="/EAHAD2025" element={<EAHAD2025 />} />
          {/* <Route path="/EAHAD2026" element={<EAHAD2026 />} /> */}
          <Route path="/EAHAD2026" element={<EAHAD2026PromoPage />} />
          <Route path="/EAHAD2026_1" element={<EAHAD2026PromoPage />} />
          {/* <Route path="/EAHAD2026_demo" element={<EAHAD2026PromoPage />} /> */}
          <Route path="/WFH2024" element={<WFH2024 />} />
          <Route path="/WFH2026" element={<WFH2026PromoPage />} />
          <Route path="/WFH2026_1" element={<WFH2026PromoPage />} />
           {/* <Route path="/WFH2026promopage" element={<WFH2026PromoPage />} /> */}
          <Route path="/ISTH2024" element={<ISTH2024 />} />
          <Route path="/ISTH2024_2" element={<ISTH2 />} />
          <Route path="/ISTH2025/:section?" element={<ISTH2025 />} />

          {/* <Route path="/ISTH2026" element={<Isth2026 />} /> */}
          {/* <Route path="/ISTH26" element={<ISTH2026Promo />} /> */}

          {/* <Route path="/ISTH2026_0" element={<ISTH2026Promo/>} /> */}
          {/* <Route path="/ISTH2026_1" element={<ISTH2026Promo section="0"/>} />
          <Route path="/ISTH2026_2" element={<ISTH2026Promo section="1"/>} />
          <Route path="/ISTH2026_3" element={<ISTH2026Promo section="2"/>} /> */}

          <Route path="/ISTH26" element={<ISTH2026Promo />} />
          <Route path="/ISTH26_1" element={<ISTH2026Promo section="0"/>} />
          <Route path="/ISTH26_2" element={<ISTH2026Promo section="1"/>} />
          <Route path="/ISTH26_3" element={<ISTH2026Promo section="2"/>} />

          <Route path="/ISTH26I" element={<ISTH2026Promo/>} />
          <Route path="/ISTH26I_1" element={<ISTH2026Promo section="0"/>} />
          <Route path="/ISTH26I_2" element={<ISTH2026Promo section="1"/>} />
          <Route path="/ISTH26I_3" element={<ISTH2026Promo section="2"/>} />

          <Route path="/ISTH26M" element={<ISTH2026Promo/>} />
          <Route path="/ISTH26M_1" element={<ISTH2026Promo section="0"/>} />
          <Route path="/ISTH26M_2" element={<ISTH2026Promo section="1"/>} />
          <Route path="/ISTH26M_3" element={<ISTH2026Promo section="2"/>} />

          {/* <Route path="/ISTH2026_1" element={<Isth2026 />} /> */}
          <Route
            path="/ISTH2025_VN"
            element={<ISTH2025 noVideoPlay={true} />}
          />
          <Route
            path="/ISTH2025_SS"
            element={<ISTH2025 noVideoPlay={true} id="main-section" />}
          />
          <Route path="/ISTH25_1" element={<ISTH2025 section="0" />} />
          <Route path="/ISTH25_2" element={<ISTH2025 section="1" />} />
          <Route path="/ISTH25_3" element={<ISTH2025 section="2" />} />
          <Route path="/ISTH25_4" element={<ISTH2025 section="3" />} />
          <Route
            path="/invalidOrExpire/:reason"
            element={<LinkInvalidOrExpired />}
          />
          {/* <Route
            path="/ISTH25_1"
            element={
              <PDFViewer pdfUrl="https://docintel.app/img/octa/e-templates/pdf/ISTH_2025_Agenda_New_product.pdf?ver=1.23" />
            }
          />
          <Route
            path="/ISTH25_2"
            element={
              <PDFViewer pdfUrl="https://docintel.app/img/octa/e-templates/pdf/ISTH_2025_Agenda_wilate.pdf?ver=1.24" />
            }
          />
          <Route
            path="/ISTH25_3"
            element={
              <PDFViewer pdfUrl="https://docintel.app/img/octa/e-templates/pdf/ISTH_2025_Agenda_critical_care.pdf?ver=1.25" />
            }
          />
          <Route
            path="/ISTH25_4"
            element={
              <PDFViewer pdfUrl="https://docintel.app/img/octa/e-templates/pdf/ISTH_2025_Agenda_Nuwiq.pdf?ver=1.26" />
            }
          /> */}

          <Route path="/home" element={<Layout />}>
            <Route index element={<OneSourceFinal />} />
            <Route
              path="share/:urlParam?"
              element={<ShareContentComponent />}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
