import React, {
  useEffect,
  useState,
  useCallback,
  memo,
} from "react";
import { getData, postData } from "../../axios/apiHelper";
import TrialSkeletonPage from "../Skeletons/TrialSkeleton";
import "./Trials.css";
const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;

const StatCard = memo(({ label, value }) => (
  <div className="trial-stat-item">
    {
      label === "Target Enrolment" ? (
        <span className="trial-stat-icon">
          <img src={path_image + "targetEnrolment.svg"} alt="up" />
        </span>
      ) : (
        <span className="trial-stat-icon">
          <img src={path_image + "enrolmentStatus.svg"} alt="down" />
        </span>
      )
    }

    <div>
      <p className="trial-stat-label">{label}</p>
      <strong className="trial-stat-value">{value || "-"}</strong>
    </div>
  </div>
));
const InvestigatorCard = memo(({ investigator }) => {
  const location = [
    investigator.city,
    investigator.state,
    investigator.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="trial-investigator">
      <div className="trial-investigator-avatar">
        <img
          src={investigator.image || "/default-avatar.png"}
          alt={investigator.name}
        />
      </div>

      <div className="trial-investigator-info">
        <p className="trial-investigator-name">
          {investigator.name}
        </p>

        <p className="trial-investigator-dept">
          {investigator.department}
        </p>

        <p className="trial-investigator-inst">
          {investigator.institution}
        </p>

        {location && (
          <p className="trial-investigator-loc">
            {location}
          </p>
        )}
      </div>
    </div>
  );
});

const TrialCard = memo(({ trial }) => {
  const [showContactForm, setShowContactForm] = useState(false);

  const [formState, setFormState] = useState({
    message: "",
    sending: false,
    submitted: false,
  });

  const toggleContactForm = useCallback(() => {
    setShowContactForm((prev) => !prev);

    setFormState((prev) => ({
      ...prev,
      submitted: false,
    }));
  }, []);

  const handleMessageChange = useCallback((e) => {
    const value = e.target.value;

    setFormState((prev) => ({
      ...prev,
      message: value,
    }));
  }, []);

  const handleSend = useCallback(async () => {
    if (!formState.message.trim()) return;
    const email = localStorage.getItem("email");
    try {
      setFormState((prev) => ({
        ...prev,
        sending: true,
      }));
      await postData("api/save-contact-details", {
        trial_id: trial.id,
        message: formState.message,
        email: email,
        source: "onesource",
      });
      setFormState({
          message: "",
          sending: false,
          submitted: true,
        });
      setTimeout(()=>{
        setShowContactForm(false);
      },2000);
    } catch (error) {
      console.error("Error sending message:", error);

      setFormState((prev) => ({
        ...prev,
        sending: false,
      }));
    }
  }, [formState.message, trial.id]);

  return (
    <div className="trial-card">

      <div className="trial-banner">
        <div className="trial-banner-left">
          <div className="trial-logo-wrap">
            <img
              src="public/images/pop_pk_logo.png"
              alt={trial.trial_name}
              className="trial-logo"
            />
          </div>

          <div className="trial-info">
            <h2 className="trial-name">
              {trial.trial_name}
            </h2>

            <p className="trial-description">
              {trial.full_description}
            </p>

            {trial.reference_link && (
              <a
                href={trial.reference_link}
                className="trial-reference-link"
                target="_blank"
                rel="noreferrer"
              >
                Trial Reference
              </a>
            )}
          </div>
        </div>

        <div className="trial-stats">
          <StatCard
            label="Target Enrolment"
            value={trial.target_enrolment}
          />

          <StatCard
            label="Recruitment Status"
            value={trial.recruitment_status}
          />
        </div>
      </div>


      <div className="trial-investigators-row">
        <div className="trial-investigators-section">
          <p className="trial-investigators-title">
            Leading Investigators
          </p>

          <div className="trial-investigators-list">
            {trial.lead_investigators?.map(
              (investigator, index) => (
                <InvestigatorCard
                  key={investigator.id || index}
                  investigator={investigator}
                />
              )
            )}
          </div>
        </div>

        <div className="trial-action-buttons">
          <button
            type="button"
            className="trial-btn-learn"
          >
            Learn More
          </button>

          <button
            type="button"
            className="trial-btn-contact"
            onClick={toggleContactForm}
          >
            Contact Us
          </button>
        </div>
      </div>


      {showContactForm && (
        <div className="trial-contact-section">
          <p className="trial-contact-title">
            Contact Us
          </p>

          <div className="trial-contact-box">
            <p className="trial-contact-prompt">
              Interested in learning more? Leave your
              message and our team will get in touch
              with you.
            </p>

            {formState.submitted ? (
              <div className="trial-contact-success">
                Your message has been sent successfully.
              </div>
            ) : (
              <>
                  <div className="trial-contact-input-wrapper">
                    <textarea
                      className="trial-contact-textarea"
                      placeholder="Please type your message here..."
                      rows={4}
                      value={formState.message}
                      onChange={handleMessageChange}
                    />

                    <button
                      type="button"
                      className="trial-btn-send"
                      onClick={handleSend}
                      disabled={formState.sending}
                    >
                      {formState.sending ? "Sending..." : "Send"}
                    </button>
                  </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
});


function Trials() {
  const [loading, setLoading] = useState(true);
  const [trials, setTrials] = useState([]);
  const [error, setError] = useState(null);

  const fetchTrials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getData(
        "/api/get-trial-details"
      );

      setTrials(response?.data?.data || []);
    } catch (error) {
      console.error(
        "Error fetching trial data:",
        error
      );

      setError(
        "Unable to load trial information."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrials();
  }, [fetchTrials]);

  return (
    <div
      className="expert-opinion your-opinion"
      id="trial-source-section"
    >
      <div className="expert-opinion-title">
        <p>Trial Source</p>
      </div>

      {loading && <TrialSkeletonPage />}

      {!loading && error && (
        <div className="trial-error">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        trials.map((trial) => (
          <TrialCard
            key={trial.id}
            trial={trial}
          />
        ))}
    </div>
  );
}

export default Trials;