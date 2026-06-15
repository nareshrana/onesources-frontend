import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function SourceContentSkeleton() {


  return (
    [...Array(21)].map((_, index) => (
      <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1" key={index}>
        <div className="onesource-content-box">
          <div className="onesource-content-box-inside ">
            <Skeleton height={150} width={'100%'} />

            <div className="skeleton-content">
              <Skeleton width={'100%'} height={16} style={{ marginBottom: '8px' }} />
              <Skeleton width={'100%'} height={12} />
              <Skeleton width={'30%'} height={12} style={{ marginTop: '8px' }} />
            </div>

            <div className="article-options">
              <div className="skeleton-options">
                <Skeleton circle={true} height={24} width={24} />
              </div>
              {/* <div className="options-list">
            <div className="skeleton-option">
              <Skeleton width={'80%'} height={16} />
            </div>
            <div className="skeleton-option">
              <Skeleton width={'80%'} height={16} />
            </div>
          </div> */}
            </div>
          </div>
        </div>
      </SkeletonTheme>))
  )
}



const SourceContentSkeletonLayout = () => {

  return (<div className="onesource-section full-width ">
    <div
      className="expert-opinion your-opinion"
      id="oneSourceLibraryAll"
      data-section="oneSourceLibrary"
    >
      <div className="expert-opinion-title">
        <p>One Source library</p>
      </div>
      <div className="expert-opinion-content">
        <div className="onesource-content">
          <div className="onesource-content-serach d-flex justify-content-between">
            <form>
              <div className="filter">
                <div className="filter-by nav-item dropdown ">
                  <button
                    className="btn btn-secondary dropdown"
                    type="button"
                    id="dropdownMenuButton2"
                  >
                    Filter by
                    <svg
                      width={16}
                      height={14}
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                        fill="#001489"
                      />
                      <path
                        d="M15.3846 6.15264H11.6923C11.6923 5.47387 11.1403 4.92188 10.4615 4.92188H9.23077C8.552 4.92188 8 5.47387 8 6.15264H0.615385C0.275692 6.15264 0 6.42772 0 6.76803C0 7.10834 0.275692 7.38341 0.615385 7.38341H8C8 8.06218 8.552 8.61418 9.23077 8.61418H10.4615C11.1403 8.61418 11.6923 8.06218 11.6923 7.38341H15.3846C15.7243 7.38341 16 7.10834 16 6.76803C16 6.42772 15.7243 6.15264 15.3846 6.15264Z"
                        fill="#001489"
                      />
                      <path
                        d="M15.3846 11.0745H6.76923C6.76923 10.3957 6.21723 9.84375 5.53846 9.84375H4.30769C3.62892 9.84375 3.07692 10.3957 3.07692 11.0745H0.615385C0.275692 11.0745 0 11.3496 0 11.6899C0 12.0302 0.275692 12.3053 0.615385 12.3053H3.07692C3.07692 12.9841 3.62892 13.5361 4.30769 13.5361H5.53846C6.21723 13.5361 6.76923 12.9841 6.76923 12.3053H15.3846C15.7243 12.3053 16 12.0302 16 11.6899C16 11.3496 15.7243 11.0745 15.3846 11.0745Z"
                        fill="#001489"
                      />
                    </svg>
                  </button>
                  <div
                    className="dropdown-menu filter-options"
                    aria-labelledby="dropdownMenuButton2"
                    id="libraryFiltersEvents"
                  >
                    <div className="clear-data">
                      <p>Clear all</p>
                    </div>
                    <h4>Filter by</h4>
                    <div className="accordion">
                      <div className="card accordion-item">
                        <h2 className="card-header accordion-header">
                          <button
                            type="button"
                            aria-expanded="false"
                            className="accordion-button collapsed"
                          >
                            Categories
                          </button>
                        </h2>
                        <div className="accordion-collapse collapse">
                          <div className="card-body accordion-body">
                            <ul>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Article
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Clinical Studies
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Event
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Events
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Expert Video
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Posters
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Publications
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Services
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Symposia
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Websites
                                  <span className="checkmark" />
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card accordion-item">
                        <h2 className="card-header accordion-header">
                          <button
                            type="button"
                            aria-expanded="false"
                            className="accordion-button collapsed"
                          >
                            Products
                          </button>
                        </h2>
                        <div className="accordion-collapse collapse">
                          <div className="card-body accordion-body">
                            <ul>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Nuwiq
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Nuwiq, octanate and wilate
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Nuwiq and wilate
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  octanate
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  octanine F<span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Others
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  wilate
                                  <span className="checkmark" />
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card accordion-item">
                        <h2 className="card-header accordion-header">
                          <button
                            type="button"
                            aria-expanded="false"
                            className="accordion-button collapsed"
                          >
                            Topics
                          </button>
                        </h2>
                        <div className="accordion-collapse collapse">
                          <div className="card-body accordion-body">
                            <ul>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  8CHECK
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  acquired HA
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Altuviiio
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ASH
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ASH2023
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Clinical Practice
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  diagnosis
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  EAHAD2020
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  EAHAD2022
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Eahad2024 <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  efficacy
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  emicizumab
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  endothelium
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  FVIII
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  FVIII Inhibitor Elimination
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  FVIII inhibitors
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  genotyping
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  HA carriers
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Haemophilia A<span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Haemophilia B<span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  immunogenicity
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  inhibitors
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ISTH2019
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ISTH2020
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ISTH2021
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ISTH2022
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ISTH2023
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ISTH 2023 symposium
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ISTH 2023 symposium 1
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ISTH 2023 symposium 2
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ISTH2024
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ITI
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  ITI Modified Regimen
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  joint health
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  MAIC
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  menorrahgia
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  mild HA
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Nuwiq
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  NUWIQ
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  octanate
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  octanine F<span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  pharmacokinetics
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  phrophylaxis
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  platelets
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  pre-clinical
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  pregnancy
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  prophylaxis
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  PTPs
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  PUPs
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  RNA seq
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  service
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  subcutaneous
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  surgery
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  THSNA2022
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  VWD
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  WAPPs
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  webinar
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  website
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  WFH2022
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  WIL31
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  wilate
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  women
                                  <span className="checkmark" />
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card accordion-item">
                        <h2 className="card-header accordion-header">
                          <button
                            type="button"
                            aria-expanded="false"
                            className="accordion-button collapsed"
                          >
                            Platform
                          </button>
                        </h2>
                        <div className="accordion-collapse collapse">
                          <div className="card-body accordion-body">
                            <ul>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                    defaultChecked=""
                                  />
                                  Library
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox-tags"
                                  />
                                  Congress
                                  <span className="checkmark" />
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sort_by">
                      <h4>Sort by</h4>
                      <div className="sorted-data-by">
                        <div className="sorted-data-list">
                          <input
                            type="radio"
                            id="sorted-data-new"
                            name="sorting"
                            defaultChecked=""
                          />
                          <div className="sorted-data-list-inset">
                            <svg
                              width={20}
                              height={14}
                              viewBox="0 0 20 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.5 3.6875C12.4994 3.12884 12.2772 2.59324 11.8822 2.1982C11.4871 1.80317 10.9515 1.58097 10.3929 1.58036H10.0128V1.19643C10.0128 1.07803 9.96573 0.964477 9.88201 0.880756C9.79829 0.797034 9.68474 0.75 9.56634 0.75C9.44794 0.75 9.33439 0.797034 9.25067 0.880756C9.16694 0.964477 9.11991 1.07803 9.11991 1.19643V1.58036H3.38045V1.19643C3.38045 1.07803 3.33341 0.964477 3.24969 0.880756C3.16597 0.797034 3.05242 0.75 2.93402 0.75C2.81562 0.75 2.70207 0.797034 2.61835 0.880756C2.53462 0.964477 2.48759 1.07803 2.48759 1.19643V1.58036H2.10714C1.54848 1.58097 1.01288 1.80317 0.617847 2.1982C0.222814 2.59324 0.000614459 3.12884 0 3.6875V11.1429C0.000614459 11.7015 0.222814 12.2371 0.617847 12.6322C1.01288 13.0272 1.54848 13.2494 2.10714 13.25H6.8808H10.3929C10.9515 13.2494 11.4871 13.0272 11.8822 12.6322C12.2772 12.2371 12.4994 11.7015 12.5 11.1429L12.5 10.125V3.6875ZM2.48723 2.47321H2.10714C1.78521 2.47359 1.47657 2.60165 1.24893 2.82929C1.02129 3.05693 0.893235 3.36557 0.892857 3.6875V4.06643H11.6071V3.6875C11.6068 3.36557 11.4787 3.05693 11.2511 2.82929C11.0234 2.60165 10.7148 2.47359 10.3929 2.47321H10.0121V2.8542C10.0121 2.9726 9.96502 3.08615 9.8813 3.16987C9.79758 3.25359 9.68402 3.30062 9.56562 3.30062C9.44722 3.30062 9.33367 3.25359 9.24995 3.16987C9.16623 3.08615 9.1192 2.9726 9.1192 2.8542V2.47321H3.38009V2.8542C3.38009 2.9726 3.33305 3.08615 3.24933 3.16987C3.16561 3.25359 3.05206 3.30062 2.93366 3.30062C2.81526 3.30062 2.70171 3.25359 2.61799 3.16987C2.53427 3.08615 2.48723 2.9726 2.48723 2.8542V2.47321ZM0.892857 4.95929V11.1429C0.893259 11.4648 1.02132 11.7734 1.24896 12.001C1.47659 12.2287 1.78522 12.3567 2.10714 12.3571H6.03732H10.3929C10.7148 12.3567 11.0234 12.2287 11.251 12.001C11.4787 11.7734 11.6067 11.4648 11.6071 11.1429L11.6071 6.78732V4.95929H0.892857Z"
                                fill="#001489"
                                fillOpacity="0.4"
                              />
                              <path
                                d="M19.5973 9.17178C19.4918 9.06633 19.3488 9.0071 19.1996 9.0071C19.0505 9.0071 18.9075 9.06633 18.802 9.17178L17.3566 10.7043V1.93748C17.3566 1.7883 17.2974 1.64523 17.1919 1.53974C17.0864 1.43426 16.9433 1.375 16.7942 1.375C16.645 1.375 16.5019 1.43426 16.3964 1.53974C16.2909 1.64523 16.2317 1.7883 16.2317 1.93748V10.7043L14.7032 9.17178C14.5971 9.06932 14.455 9.01263 14.3076 9.01391C14.1601 9.01519 14.019 9.07435 13.9147 9.17863C13.8104 9.28292 13.7513 9.424 13.75 9.57148C13.7487 9.71896 13.8054 9.86104 13.9079 9.96713L16.3965 12.4598C16.4487 12.5121 16.5108 12.5537 16.5791 12.582C16.6475 12.6104 16.7207 12.625 16.7947 12.625C16.8687 12.625 16.942 12.6104 17.0103 12.582C17.0786 12.5537 17.1407 12.5121 17.193 12.4598L19.5984 9.96713C19.7037 9.8615 19.7628 9.71837 19.7626 9.56922C19.7624 9.42007 19.7029 9.27711 19.5973 9.17178Z"
                                fill="#001489"
                                fillOpacity="0.4"
                              />
                            </svg>
                            <span className="checkmark" />
                          </div>
                        </div>
                        <div className="sorted-data-list">
                          <input
                            type="radio"
                            id="sorted-data-old"
                            name="sorting"
                          />
                          <div className="sorted-data-list-inset">
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.5 6.6875C12.4994 6.12884 12.2772 5.59324 11.8822 5.1982C11.4871 4.80317 10.9515 4.58097 10.3929 4.58036H10.0128V4.19643C10.0128 4.07803 9.96573 3.96448 9.88201 3.88076C9.79829 3.79703 9.68474 3.75 9.56634 3.75C9.44794 3.75 9.33439 3.79703 9.25067 3.88076C9.16694 3.96448 9.11991 4.07803 9.11991 4.19643V4.58036H3.38045V4.19643C3.38045 4.07803 3.33341 3.96448 3.24969 3.88076C3.16597 3.79703 3.05242 3.75 2.93402 3.75C2.81562 3.75 2.70207 3.79703 2.61835 3.88076C2.53462 3.96448 2.48759 4.07803 2.48759 4.19643V4.58036H2.10714C1.54848 4.58097 1.01288 4.80317 0.617847 5.1982C0.222814 5.59324 0.000614459 6.12884 0 6.6875V14.1429C0.000614459 14.7015 0.222814 15.2371 0.617847 15.6322C1.01288 16.0272 1.54848 16.2494 2.10714 16.25H6.8808H10.3929C10.9515 16.2494 11.4871 16.0272 11.8822 15.6322C12.2772 15.2371 12.4994 14.7015 12.5 14.1429L12.5 13.125V6.6875ZM2.48723 5.47321H2.10714C1.78521 5.47359 1.47657 5.60165 1.24893 5.82929C1.02129 6.05693 0.893235 6.36557 0.892857 6.6875V7.06643H11.6071V6.6875C11.6068 6.36557 11.4787 6.05693 11.2511 5.82929C11.0234 5.60165 10.7148 5.47359 10.3929 5.47321H10.0121V5.8542C10.0121 5.9726 9.96502 6.08615 9.8813 6.16987C9.79758 6.25359 9.68402 6.30062 9.56562 6.30062C9.44722 6.30062 9.33367 6.25359 9.24995 6.16987C9.16623 6.08615 9.1192 5.9726 9.1192 5.8542V5.47321H3.38009V5.8542C3.38009 5.9726 3.33305 6.08615 3.24933 6.16987C3.16561 6.25359 3.05206 6.30062 2.93366 6.30062C2.81526 6.30062 2.70171 6.25359 2.61799 6.16987C2.53427 6.08615 2.48723 5.9726 2.48723 5.8542V5.47321ZM0.892857 7.95929V14.1429C0.893259 14.4648 1.02132 14.7734 1.24896 15.001C1.47659 15.2287 1.78522 15.3567 2.10714 15.3571H6.03732H10.3929C10.7148 15.3567 11.0234 15.2287 11.251 15.001C11.4787 14.7734 11.6067 14.4648 11.6071 14.1429L11.6071 9.78732V7.95929H0.892857Z"
                                fill="#001489"
                                fillOpacity="0.4"
                              />
                              <path
                                d="M19.5973 7.82822C19.4918 7.93367 19.3488 7.9929 19.1996 7.9929C19.0505 7.9929 18.9075 7.93367 18.802 7.82822L17.3566 6.29574V15.0625C17.3566 15.2117 17.2974 15.3548 17.1919 15.4603C17.0864 15.5657 16.9433 15.625 16.7942 15.625C16.645 15.625 16.5019 15.5657 16.3964 15.4603C16.2909 15.3548 16.2317 15.2117 16.2317 15.0625V6.29574L14.7032 7.82822C14.5971 7.93068 14.455 7.98737 14.3076 7.98609C14.1601 7.98481 14.019 7.92565 13.9147 7.82137C13.8104 7.71708 13.7513 7.576 13.75 7.42852C13.7487 7.28104 13.8054 7.13896 13.9079 7.03287L16.3965 4.54025C16.4487 4.48787 16.5108 4.44631 16.5791 4.41795C16.6475 4.3896 16.7207 4.375 16.7947 4.375C16.8687 4.375 16.942 4.3896 17.0103 4.41795C17.0786 4.44631 17.1407 4.48787 17.193 4.54025L19.5984 7.03287C19.7037 7.1385 19.7628 7.28163 19.7626 7.43078C19.7624 7.57993 19.7029 7.72289 19.5973 7.82822Z"
                                fill="#001489"
                                fillOpacity="0.4"
                              />
                            </svg>
                            <span className="checkmark" />
                          </div>
                        </div>
                        <div className="sorted-data-list">
                          <input
                            type="radio"
                            id="data-list-accending"
                            name="sorting"
                          />
                          <div className="sorted-data-list-inset">
                            <svg
                              width={14}
                              height={12}
                              viewBox="0 0 14 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.49315 5.30469H0.5L2.01327 0.382812H3.20762L4.71875 5.30469H3.7256L2.62757 1.50754H2.59332L1.49315 5.30469ZM1.43108 3.37006H3.77697V4.18237H1.43108V3.37006Z"
                                fill="#001489"
                                fillOpacity="0.4"
                              />
                              <path
                                d="M0.505374 11.6328V11.0152L3.25159 7.5689H0.5V6.71094H4.71338V7.32858L1.96447 10.7748H4.71875V11.6328H0.505374Z"
                                fill="#001489"
                                fillOpacity="0.4"
                              />
                              <path
                                d="M13.3473 8.17178C13.2418 8.06633 13.0988 8.0071 12.9496 8.0071C12.8005 8.0071 12.6575 8.06633 12.552 8.17178L11.1066 9.70426V0.937477C11.1066 0.788298 11.0474 0.64523 10.9419 0.539745C10.8364 0.43426 10.6933 0.374999 10.5442 0.374999C10.395 0.374999 10.2519 0.43426 10.1464 0.539745C10.0409 0.64523 9.98168 0.788298 9.98168 0.937477V9.70426L8.45322 8.17178C8.34713 8.06932 8.20505 8.01263 8.05757 8.01391C7.91009 8.01519 7.76901 8.07435 7.66472 8.17863C7.56044 8.28292 7.50128 8.424 7.5 8.57148C7.49872 8.71896 7.55541 8.86104 7.65787 8.96713L10.1465 11.4598C10.1987 11.5121 10.2608 11.5537 10.3291 11.582C10.3975 11.6104 10.4707 11.625 10.5447 11.625C10.6187 11.625 10.692 11.6104 10.7603 11.582C10.8286 11.5537 10.8907 11.5121 10.943 11.4598L13.3484 8.96713C13.4537 8.8615 13.5128 8.71837 13.5126 8.56922C13.5124 8.42007 13.4529 8.27711 13.3473 8.17178Z"
                                fill="#001489"
                                fillOpacity="0.4"
                              />
                            </svg>
                            <span className="checkmark" />
                          </div>
                        </div>
                        <div className="sorted-data-list">
                          <input
                            type="radio"
                            id="sorted-data-desending"
                            name="sorting"
                          />
                          <div className="sorted-data-list-inset">
                            <svg
                              width={14}
                              height={12}
                              viewBox="0 0 14 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.49315 5.30469H0.5L2.01327 0.382812H3.20762L4.71875 5.30469H3.7256L2.62757 1.50754H2.59332L1.49315 5.30469ZM1.43108 3.37006H3.77697V4.18237H1.43108V3.37006Z"
                                fill="#001489"
                                fillOpacity="0.4"
                              />
                              <path
                                d="M0.505374 11.6328V11.0152L3.25159 7.5689H0.5V6.71094H4.71338V7.32858L1.96447 10.7748H4.71875V11.6328H0.505374Z"
                                fill="#001489"
                                fillOpacity="0.4"
                              />
                              <path
                                d="M13.3473 3.82822C13.2418 3.93367 13.0988 3.9929 12.9496 3.9929C12.8005 3.9929 12.6575 3.93367 12.552 3.82822L11.1066 2.29574V11.0625C11.1066 11.2117 11.0474 11.3548 10.9419 11.4603C10.8364 11.5657 10.6933 11.625 10.5442 11.625C10.395 11.625 10.2519 11.5657 10.1464 11.4603C10.0409 11.3548 9.98168 11.2117 9.98168 11.0625V2.29574L8.45322 3.82822C8.34713 3.93068 8.20505 3.98737 8.05757 3.98609C7.91009 3.98481 7.76901 3.92565 7.66472 3.82137C7.56044 3.71708 7.50128 3.576 7.5 3.42852C7.49872 3.28104 7.55541 3.13896 7.65787 3.03287L10.1465 0.540249C10.1987 0.487867 10.2608 0.446308 10.3291 0.417953C10.3975 0.389596 10.4707 0.375 10.5447 0.375C10.6187 0.375 10.692 0.389596 10.7603 0.417953C10.8286 0.446308 10.8907 0.487867 10.943 0.540249L13.3484 3.03287C13.4537 3.1385 13.5128 3.28163 13.5126 3.43078C13.5124 3.57993 13.4529 3.72289 13.3473 3.82822Z"
                                fill="#001489"
                                fillOpacity="0.4"
                              />
                            </svg>
                            <span className="checkmark" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="filter-footer">
                      <button
                        id="applyFilter"
                        className="btn btn-primary btn-filled"
                      >
                        Apply
                      </button>
                      <button className="btn btn-primary btn-bordered">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="right_section_form d-flex">
              <div className="search">
                <form className="d-flex">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    defaultValue=""
                  />
                  <button className="btn btn-outline-success" type="submit">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
                        fill="#001489"
                      />
                    </svg>
                  </button>
                </form>
              </div>
              <div className="switch6">
                <label className="switch6-light">
                  <input type="checkbox" />
                  <span>
                    <span>
                      Global
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.0001 6.99995C14.0001 8.50257 13.5241 9.89606 12.7153 11.0377C12.4271 11.2905 11.9806 11.3315 11.81 11.2323C11.7665 11.2071 11.7514 11.1858 11.768 11.1189C11.9377 10.4354 11.9106 10.0843 11.8843 9.74482C11.8733 9.6017 11.8627 9.46646 11.8663 9.30284C11.8829 8.51547 11.7753 8.045 11.5175 7.77711C11.2531 7.50272 10.8886 7.4964 10.5364 7.49049C10.2793 7.48609 10.0139 7.48155 9.74501 7.38825C8.93328 6.84679 9.15966 6.49039 9.47174 5.99875C9.65048 5.71736 9.85152 5.40075 9.73979 5.06745C9.78545 4.97719 9.92266 4.82926 9.99351 4.80944C10.5727 4.99054 11.9777 5.02493 12.2463 4.95143C12.5304 4.87356 12.7749 4.40502 12.7311 4.02317C12.6897 3.66141 12.4079 3.43533 11.9771 3.41841C11.9132 3.41581 11.7939 3.42707 11.5519 3.45018C11.2549 3.47867 10.5979 3.54156 10.3637 3.51348C10.2858 3.24226 10.2259 2.69847 10.4634 2.48161C10.7081 2.25775 11.1453 2.11173 11.4646 2.00512C11.5974 1.96079 11.7001 1.92585 11.7811 1.89213C13.1458 3.17034 14.0001 4.98712 14.0001 6.99995ZM3.01071 1.2515C3.26405 1.33063 3.44734 1.39612 3.59773 1.45007C4.2018 1.66622 4.26562 1.66611 5.30206 1.44799C5.98224 1.30473 6.12686 1.42349 6.34618 1.60333C6.52616 1.75098 6.75046 1.93468 7.2249 2.00225C7.36816 2.02275 7.5641 2.02866 7.66743 2.14438C7.71725 2.20052 7.73858 2.27757 7.74063 2.35257C7.74463 2.50463 7.69327 2.6483 7.66853 2.79634C7.64788 2.91895 7.64528 3.05957 7.55185 3.15369C7.439 3.26736 7.20139 3.27548 7.05195 3.30643C6.62468 3.39489 6.25814 3.5365 5.87133 3.73436C5.51108 3.91863 5.06278 4.14786 4.93068 4.82404C4.89284 5.01916 4.62191 5.07295 4.21269 5.13267C3.84571 5.18618 3.46634 5.2415 3.32473 5.54712C3.16966 5.8812 3.41018 6.22798 3.568 6.51104C3.72006 6.78336 3.88213 7.08799 4.15516 7.25796C4.36376 7.38798 4.57428 7.36334 4.92311 7.32263C5.04998 7.30789 5.20781 7.28946 5.39823 7.27434C5.6257 7.27434 7.26111 7.73199 7.82168 8.33085C7.93245 8.44892 7.98473 8.55679 7.97773 8.65118C7.92146 9.39066 7.57662 9.79754 7.21156 10.2284C6.8685 10.6329 6.51418 11.0512 6.43013 11.7284C6.33325 12.5113 6.05295 12.9105 5.9232 12.9139C5.92293 12.9139 5.92238 12.9139 5.92211 12.9139C5.83335 12.9139 5.53711 12.6449 5.32189 11.4387C5.06319 9.98714 4.61696 9.68456 4.25852 9.44141C3.96651 9.24325 3.75558 9.10016 3.74361 8.04434C3.73576 7.34437 3.36711 6.84567 2.77088 6.50029C2.2345 6.18972 1.24543 5.61578 0.67643 4.0002C1.20345 2.89349 2.01283 1.94625 3.01071 1.2515ZM7.00008 14.0001C9.03068 14.0001 10.8618 13.1306 12.1416 11.7449C12.1107 11.747 12.0797 11.7484 12.0491 11.7484C11.8727 11.7484 11.7073 11.7123 11.5755 11.6358C11.3474 11.5034 11.25 11.2679 11.315 11.0064C11.4667 10.3963 11.4433 10.0973 11.4189 9.78089C11.4075 9.63268 11.3955 9.47967 11.3995 9.29296C11.4127 8.66619 11.3392 8.26506 11.1811 8.10078C11.0574 7.97226 10.8623 7.96277 10.5284 7.95698C10.239 7.95216 9.91093 7.94653 9.55976 7.81758C9.54283 7.81137 9.52675 7.80341 9.51188 7.79363C8.98141 7.44576 8.72274 7.07727 8.72066 6.66734C8.71916 6.31356 8.90961 6.01346 9.07761 5.74856C9.24591 5.48354 9.34429 5.31401 9.28938 5.1958C9.19718 4.99751 9.37196 4.75519 9.48423 4.62834C9.69161 4.394 9.92469 4.29658 10.123 4.36097C10.6115 4.51948 11.8963 4.54248 12.1124 4.50341C12.1799 4.45099 12.3055 4.20782 12.2606 4.03914C12.2513 4.00351 12.2224 3.89506 11.959 3.88475C11.9205 3.88366 11.7482 3.90015 11.5962 3.91475C10.3686 4.03225 10.0795 4.01051 9.96775 3.792C9.75198 3.36943 9.7484 2.67895 10.0209 2.28375C10.0576 2.23037 10.1005 2.18096 10.1483 2.13721C10.4663 1.84647 10.9579 1.6823 11.3166 1.56245C11.3366 1.55583 11.357 1.54897 11.3776 1.54208C10.178 0.577938 8.65558 0 7.00008 0C5.73428 0 4.54595 0.337668 3.52026 0.927855C3.6097 0.958809 3.68758 0.98648 3.75501 1.01068C4.25849 1.19066 4.25849 1.19066 5.20573 0.991293C6.04043 0.815555 6.32745 0.984539 6.64188 1.24242C6.7979 1.37025 6.94515 1.49105 7.2908 1.54033C7.59557 1.58367 7.86103 1.63581 8.0238 1.83466C8.28401 2.15236 8.15976 2.71146 8.07926 3.0739C8.01787 3.34953 7.8686 3.58758 7.58223 3.66477C7.32039 3.73524 7.05053 3.76852 6.79156 3.85011C6.54732 3.92716 6.3076 4.03534 6.08388 4.1498C5.75846 4.31629 5.4772 4.46009 5.38885 4.91348C5.2844 5.44764 4.70373 5.53241 4.2799 5.59434C4.09413 5.62157 3.78358 5.66686 3.74793 5.74336C3.74615 5.74708 3.70776 5.83857 3.9019 6.14983L3.97827 6.27298C4.18425 6.60393 4.3085 6.80373 4.4018 6.86178C4.46923 6.90375 4.58645 6.89205 4.86883 6.85915C5.00008 6.84373 5.1637 6.82475 5.36378 6.80879C5.65343 6.78568 7.41554 7.26657 8.12325 7.97166C8.35387 8.20132 8.46161 8.44197 8.4429 8.68651C8.3752 9.57693 7.94618 10.0833 7.56733 10.5301C7.24147 10.9146 6.96011 11.2467 6.89322 11.7857C6.77515 12.7421 6.39909 13.3681 5.93565 13.3804C5.93042 13.3805 5.92547 13.3806 5.9205 13.3806C5.43834 13.3806 5.08252 12.755 4.86232 11.5205C4.63805 10.2628 4.29704 10.0315 3.9964 9.82748C3.57052 9.53865 3.29049 9.25892 3.27688 8.04953C3.27138 7.54261 2.96535 7.15222 2.53684 6.904C2.03982 6.61612 1.0634 6.05043 0.418742 4.61442C0.147793 5.3594 0 6.1626 0 6.99989C0.000109375 10.8598 3.14021 14.0001 7.00008 14.0001Z"
                          fill="#001489"
                        />
                      </svg>
                    </span>
                    <span>
                      Local
                      <svg
                        width={12}
                        height={14}
                        viewBox="0 0 12 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.99996 0C3.2042 0 0.929688 2.27451 0.929688 5.07024C0.929688 8.53983 5.46708 13.6334 5.66027 13.8485C5.84172 14.0506 6.15852 14.0503 6.33965 13.8485C6.53283 13.6334 11.0702 8.53983 11.0702 5.07024C11.0702 2.27451 8.79569 0 5.99996 0ZM5.99996 7.62122C4.59334 7.62122 3.449 6.47686 3.449 5.07024C3.449 3.66362 4.59337 2.51929 5.99996 2.51929C7.40655 2.51929 8.55088 3.66365 8.55088 5.07027C8.55088 6.47689 7.40655 7.62122 5.99996 7.62122Z"
                          fill="rgba(0, 20, 137, 0.4)"
                        />
                      </svg>
                    </span>
                  </span>
                  <a className="btn btn-primary" />
                </label>
              </div>
            </div>
          </div>
          <div className="onesource-content-view">
            <div className="onesource-content-view-inside">
              <SourceContentSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )

}
export { SourceContentSkeletonLayout }