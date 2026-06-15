import React from 'react'
import Modal from "react-bootstrap/Modal";

const CokkieModal = ({cookieShow,hideCookieModal}) => {
  return (
    <Modal show={cookieShow} className="cookieadd" centered>
        <Modal.Header>
          <Modal.Title>Used cookies</Modal.Title>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={hideCookieModal}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Essential cookies exclusively enhance your experience with us
            ensuring our system runs smoothly whilst recognising you for
            seamless recurring use. Be confident we never share your information
            with any commercial cookie company.
          </h6>
          <div className="used-cookies-table-top">
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
                    <td>
                      Framework default cookie for cache of all component.
                    </td>
                  </tr>
                  <tr>
                    <td>dynamic_number (ex 1210)</td>
                    <td>
                      This cookie is used for storing the status of consent
                      given or not for the article.
                    </td>
                  </tr>
                  <tr>
                    <td>video_track</td>
                    <td>
                      This cookie is used for storing the last seek time of user
                      for the particular video.
                    </td>
                  </tr>
                  <tr>
                    <td>name_use</td>
                    <td>
                      Used to autofill name of the user to help with repetitive
                      task. Only used in some circumstances where user have been
                      directed to the site based on previous consent.{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>email_use</td>
                    <td>
                      Used to autofill email of the user to help with repetitive
                      task. Only used in some circumstances where user have been
                      directed to the site based on previous consent.
                    </td>
                  </tr>
                  <tr>
                    <td>country_use</td>
                    <td>
                      Used to autofill country of the user to help with
                      repetitive task. Only used in some circumstances where
                      user have been directed to the site based on previous
                      consent.
                    </td>
                  </tr>
                  <tr>
                    <td>consent_type</td>
                    <td>
                      Used to detect if use have given full or limited consent
                      to be sure tracking of usage is handled correctly.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
  )
}

export default CokkieModal