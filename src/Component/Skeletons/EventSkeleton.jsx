import React, { useEffect, useState, useRef } from 'react'
import { Button } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import SlideToggle from "react-slide-toggle";
import DisplayText from '../CommonComponent/DisplayText';

export default function EventSkeleton() {
    const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
    const [eventDetailView, setEventDetailView] = useState(false);

    const detailViewRef = useRef(null);
    
    useEffect(() => {
        if (detailViewRef.current) {
          detailViewRef.current.style.maxHeight = eventDetailView ? `${detailViewRef.current.scrollHeight+10}px` : '0px';
        }
      }, [eventDetailView]);

    return (
        // <SlideToggle
        //   duration={1200}
        //   collapsed={true}
        //   whenReversedUseBackwardEase={false}
        //   render={({ toggle, setCollapsibleElement }) => (
            <div
              className={`highlight hide `}
              id="eventOuterBox"
            >
              <div className={`highlight-box `} >
                {/* <div className="highlight-title">
                  <p>Events</p>
                </div> */}
                <div className="highlight-content event_material">
                  <div
                    className={
                       "event_material-toggle upcoming_show"
                    }
                  >
                    <Button >
                      See past events
                      <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                        <path
                          d="M6.84011 5.33199C7.17745 5.67317 7.18219 6.23094 6.85069 6.5778C6.84171 6.5872 6.83258 6.59634 6.8233 6.60524L2.44717 11.1842C2.11567 11.5311 1.57347 11.5357 1.23613 11.1945C0.898794 10.8533 0.894058 10.2955 1.22556 9.94866L5.02825 5.96971L1.16239 2.05979C0.825046 1.71861 0.82031 1.16083 1.15181 0.81397C1.48331 0.467107 2.02551 0.462504 2.36284 0.803688L6.84011 5.33199Z"
                          fill="#00A993"
                        />
                      </svg>
                    </Button>
                  </div>
                  <div
                    className={
                       "event-list upcoming_list" 
                    }
                  >
                    {
                      [...Array(5)].map((_, index) => (
                        <SkeletonTheme
                          color="#5e6c77"
                          highlightColor="#a9b7c1"
                          key={index}
                        >
                          <div className="event-view-box" key={index}>
                            <div className="event-date">
                              <Skeleton duration={2} width={120} height={20} />
                            </div>
                            <div className="event-view-box-inset">
                              <div className="event-img">
                                <Skeleton duration={2} width={100} height={100} />
                              </div>
                              <div className="event-description">
                                <div className="event-description-top">
                                  
                                    <Skeleton duration={2} width={80} height={20} />
                                 
                                  <div className="event-title">
                                    <Skeleton
                                      duration={2}
                                      width={200}
                                      height={20}
                                    />
                                  </div>
                                </div>
                                <div className="event-description-bottom">
                                  <div className="upcoming-event-date">
                                    <Skeleton
                                      duration={2}
                                      width={120}
                                      height={20}
                                    />
                                  </div>
                                  <div className="upcoming-event-date">
                                    <Skeleton
                                      duration={2}
                                      width={120}
                                      height={20}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SkeletonTheme>
                      ))
                     }
                  </div>
                  <div
                    className={
                   "event_material-toggle coming-events upcoming_visible"
                    }
                  >
                    <Button >
                      See up coming events
                      <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                        <path
                          d="M6.84011 5.33199C7.17745 5.67317 7.18219 6.23094 6.85069 6.5778C6.84171 6.5872 6.83258 6.59634 6.8233 6.60524L2.44717 11.1842C2.11567 11.5311 1.57347 11.5357 1.23613 11.1945C0.898794 10.8533 0.894058 10.2955 1.22556 9.94866L5.02825 5.96971L1.16239 2.05979C0.825046 1.71861 0.82031 1.16083 1.15181 0.81397C1.48331 0.467107 2.02551 0.462504 2.36284 0.803688L6.84011 5.33199Z"
                          fill="#00A993"
                        />
                      </svg>
                    </Button>
                  </div>

                  <div 
                    ref={detailViewRef}
                    style={{
                      overflow: 'hidden', // Important for the sliding effect
                      transition: 'max-height 1.2s ease-in-out', // Adjust duration as needed
                    }}
                  >
                    <div
                      className={`event-full-detail `}
                      id="event-detail"
                    >
                      <div className="event-full-detail-event">
                        <div className="event-details">
                          <div className="event-view-box-inset">
                            <div className="event-img">
                              <img src="" alt="" />
                            </div>
                            <div className="event-description">
                              <div
                                className={`events-status ${
                                  "past" 
                                }`}
                              >
                                
                              </div>
                              <div className="event-title">
                                <p></p>
                              </div>
                              <div className="upcoming-event-date">
                                <img src={path_image + "calendar.svg"} alt="" />
                      
                              </div>
                              <div className="upcoming-event-date">
                                <img src={path_image + "location.svg"} alt="" />
                                
                              </div>
                              <div className="event-action">
                              
                                <p
                                className="add_cal"
                              >
                                + Add to your calendar
                              </p>
                              
      
                                {/* <a href="/home">+ Add to your calendar</a> */}
                              </div>
                            </div>
                          </div>
                          <div className="event-description-detail p">
                            <DisplayText
                            />
                          </div>
                          {/* <Button type="submit">Register</Button> */}
                        </div>
                        <div className="event-meterials">
                          <div className="event-meterials-box">
                            <div className="event-title">
                              <p>Event materialsa</p>
                            </div>
                          
                              <div className="event-meterials-blank">
                                <h6>No materials added yet.</h6>
                              </div>
                        
                          </div>
                          <Button
                            type="submit"
                            className="brn btn-bordered"
                            onClick={() => {
                    
      
                            }}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        //   )}
        // />
      );
}
