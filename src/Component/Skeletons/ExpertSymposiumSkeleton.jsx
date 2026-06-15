import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function ExpertSymposiumSkeleton() {
  return (
    <div className="expert-opinion-content">
      <div className="opinion-content-detail">
        <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
          {" "}
          <Skeleton duration={2} height={30} style={{ width: "80%" }} />
        </SkeletonTheme>
      </div>
      <div className="opinion-box">
        <div className="opinion-graph">
          <div className="opinion-response">
            <div className="pie-result">
              <div className="question">
                <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
                  {" "}
                  <Skeleton
                    duration={2}
                    height={280}
                    style={{ width: "100%" }}
                  />
                </SkeletonTheme>
              </div>
            </div>
          </div>
        </div>
        <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1" inline={true}>
          <div className="opinion-question">
            <form>
              <div className="question-list-view">
                <span>
                  <Skeleton height={22} width={396} />
                </span>
                <div className="" style={{ width: "100%" }}>
                  <div className="option-list">
                    <div className="d-flex">
                      <Skeleton circle="true" height={20} width={20} />
                      <Skeleton height={20} width={70} />
                    </div>
                    <span className="checkmark"></span>
                  </div>
                  <div className="option-list">
                    <div className="d-flex">
                      <Skeleton circle="true" height={20} width={20} />
                      <Skeleton height={20} width={70} />
                    </div>
                    <span className="checkmark"></span>
                  </div>
                  <div className="option-list">
                    <div className="d-flex">
                      <Skeleton circle="true" height={20} width={20} />
                      <Skeleton height={20} width={300} />
                    </div>
                    <span className="checkmark"></span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn-disabled btn btn-primary"
              ></button>
            </form>
          </div>
        </SkeletonTheme>
      </div>
    </div>
  );
}

export default ExpertSymposiumSkeleton;
