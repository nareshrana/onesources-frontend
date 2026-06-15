import React from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function SymposiumHighlightSkeleton() {
  return (
    <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1" inline={true}>
      <div className="expert-opinion-content">
        <div className="onesource-content-box">
          <div className="symposium-box-inside">
            <Skeleton height={114} width={85} />
            <div className="onesource-content-detail" style={{ marginLeft: "10px" }}>
              <div className="opinion-content-detail-upper" >
                <Skeleton height={22} width="80%" />
                <Skeleton height={18} width="60%" style={{ margin: "0 0 15px" }} />
                <Skeleton height={43} width="60%" />
                {/* <Skeleton count={3} /> */}
              </div>
              <div className="add-inlibrary">
                <Skeleton circle={true} height={32} width={32} />
              </div>
            </div>
          </div>
          <div className="video-rating">
            <div className="video-rating-feed">
              <Skeleton width={300} height={24} />
            </div>
          </div>
          <div className="symposium-expert d-flex justify-content-between">
            <div className="agenda-speakers">
              <div className="agenda-speakers-listed">
                <Skeleton height={678} width={511} />
              </div>
              <div className="material-box">
                <div className="expert-opinion-title">
                  <Skeleton width={140} />
                </div>
                <div className="material-available">
                  {Array(2)
                    .fill()
                    .map((_, index) => (
                      <div key={index} className="material-available-box">
                        <Skeleton height={185} width="100%" />
                        <div className="material-detail">
                          <Skeleton height={35} width={162} style={{ margin: '0 0 15px' }} />
                          <div className="add-inlibrary">
                            <Skeleton circle={true} height={30} width={30} />
                            <Skeleton circle={true} height={30} width={30} />
                            <Skeleton height={26} width={82} />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="symposium-expert-videos">
              <div className="expert-opinion-content">
                <div className="opinion-content-detail d-flex">
                  <div className="opinion-content-detail-left">
                    <div className="video-title-description">
                      <h6><Skeleton width="60%" height={28} /></h6>
                      <p><Skeleton width="60%" height={22} /></p>
                      <span className="article-post-date">
                        <Skeleton width={80} height={12} />
                      </span>
                    </div>
                    <div className="expert-openion-video">
                      <div className="loader" id="custom_loader">
                        <div className="loader_show">
                          <Skeleton width="100%" height={200} />
                        </div>
                      </div>
                      <div className="expertPlayer">
                        <Skeleton width="100%" height={550} />
                      </div>
                      <div>
                        <div className="video-btn-play">
                          {/* <Skeleton circle={true} height={40} width={40} /> */}
                        </div>
                      </div>
                      <div className="video-time"><Skeleton width={53} height={15} /></div>
                    </div>
                  </div>
                  <div className="opinion-content-detail-right">
                    <div className="expert-opinion-video-list">
                      {[...Array(5)].map((_, index) => (
                        <div className="expert-opinion-video-list-box" key={index}>
                          <div className="expert-opinion-video-thumbnail">
                            <Skeleton width="100%" height={119} />
                            <div className="video-time"><Skeleton width={53} height={15} /></div>
                          </div>
                          <div className="expert-opinion-video-discription">
                            <p><Skeleton width="70%" /></p>
                            <span><Skeleton width="50%" /></span>
                            <span className="video-date"><Skeleton width="40%" height={15} /></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="material-box mobile">
              <div className="expert-opinion-title">
                <Skeleton width="40%" />
              </div>
              <div className="material-available">
                {Array(3)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="material-available-box">
                      <Skeleton height={80} width={80} />
                      <div className="material-detail">
                        <Skeleton width="100%" />
                        <div className="add-inlibrary">
                          <Skeleton circle={true} height={20} width={20} />
                          <Skeleton circle={true} height={20} width={20} />
                          <Skeleton width="50%" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>)
}


const SymposiumHighlightSkeletonLayout = () => {
  return (<div className="onesource-section" id="symposium-section">
    <div className="expert-opinion your-opinion symposium-highlight" >
      <div className="expert-opinion-title" data-section="symposium" id="symposium_move">
        <p>Symposium highlight</p>
      </div>
      <SymposiumHighlightSkeleton />
    </div>
  </div>)


}

export {SymposiumHighlightSkeletonLayout}
