import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loader } from "../CommonComponent/Loader";

const InvalidUrlComponent = () =>
{
  return (
    <div className="invalid-expired-container d-flex flex-column justify-content-center align-items-center text-center">
      <img
        src="../images/invalid-url.png"
        alt="Invalid URL"
        className="error-image mb-4"
      />
      <h1 className="display-5 text-danger mb-3">The URL is Invalid</h1>
      <p className="text-secondary fs-5 mb-4">
        Please check the link and try again.
      </p>
      <a href="/home" className="back-btn">
        Go to Homepage
      </a>
    </div>
  );
};

const ExpiredUrlComponent = () =>
{
  return (
    <div className="invalid-expired-container d-flex flex-column justify-content-center align-items-center text-center">
      <img
        src="../images/expire-url.png"
        alt="Expired URL"
        className="error-image mb-4"
      />
      <h1 className="display-5 text-danger mb-3">The URL has Expired</h1>
      <p className="text-secondary fs-5 mb-4">
        This link is no longer valid. Please request a new one.
      </p>
      <a href="/home" className="back-btn">
        Go to Homepage
      </a>
    </div>
  );
};

const LinkInvalidOrExpired = () =>
{
  const { reason } = useParams();

  useEffect(() =>
  {
    loader("hide");
  }, []);

  return reason == "invalid" ? (
    <InvalidUrlComponent />
  ) : (
    <ExpiredUrlComponent />
  );
};

export default LinkInvalidOrExpired;
