import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function ExpertSkeleton() {
  return (
    <>
      <div data-section="expertOpinion">
        <div
          className={`expert-opinion section-left-side "hide"
          }`}
          id="secondDiv"
        >
          <div className="expert-opinion-title">
            <p>Expert opinions</p>
          </div>

          <div className="expert-opinion-content">
            <div className="opinion-content-detail d-flex">
              <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
                <div className="opinion-content-detail-left">
                  <div className="video-title-description">
                    <h6>
                      <Skeleton height={30} width={760} />
                    </h6>
                    <p>
                      <Skeleton height={22} width={760} />
                    </p>
                    <span className="article-post-date">
                      <Skeleton height={15} width={67} />
                    </span>
                  </div>
                  <div className="expert-openion-video">
                    <Skeleton height={447} width={795} />
                  </div>
                  <div className="video-rating">
                    <div className="video-rating-feed">
                      <p>
                        <Skeleton height={22} width={360} />
                      </p>
                      <span className="style-module_starRatingWrap__q-lJC" style={{ direction: "ltr" }}>
                        <Skeleton height={34} width={34} count={1} inline={true} />
                      </span>
                      <button type="button" className="btn btn-primary">
                        <Skeleton height={36} width={80} />
                      </button>
                    </div>
                  </div>
                </div>
              </SkeletonTheme>


              <div className="opinion-content-detail-right">
                <div className="expert-opinion-video-list">
                  {[...Array(5)].map((_, index) => (
                    <SkeletonTheme
                      color="#5e6c77"
                      highlightColor="#a9b7c1"
                      key={`skeleton_expert_video_${index}`}
                      inline={true}
                    >
                      <div className="expert-opinion-video-list-box" >
                        <div className="expert-opinion-video-thumbnail">
                          <div>
                            <Skeleton height={74} width={143} />
                          </div>
                        </div>
                        <div className="expert-opinion-video-discription">
                          <Skeleton height={20} width={449} />
                          <Skeleton height={16} width={200} />
                          <span className="video-date"><Skeleton height={12} width={53} /></span>
                        </div>
                      </div>
                    </SkeletonTheme>
                  ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>)
}

export default ExpertSkeleton