import Highcharts from "highcharts";
import { getData, postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import { loader } from "./CommonComponent/Loader";
import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import { Button, Form, FormGroup } from "react-bootstrap";
import ExpertSymposiumSkeleton from "./Skeletons/ExpertSymposiumSkeleton";
import useUserTracking from "../hooks/useUserTracking";

const ExpertOpinion = () => {
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const [question, setQuestions] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [optionValue, setOptionValue] = useState([]);
  const [apiFlag, setApiFlag] = useState(false);
  const [countFlag, setCountFlag] = useState(1);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [isExpertOpinionNotLoaded, setIsExpertOpinionNotLoaded] =
    useState(true);
  const trackUserAction = useUserTracking();
  const [hcpOptions, setHcpOptions] = useState({
    chart: {
      renderTo: "container",
      type: "bar",
      height: "250",
      width: "471",
      backgroundColor: null,
    },
    title: {
      text: "",
    },
    legend: {
      enabled: false,
      format: "",
    },
    tooltip: {
      formatter: function () {
        return this.series.name[this.point.index];
      },
    },

    xAxis: {
      categories: [],
      lineWidth: 1, // Specify the width of the x-axis line
      labels: {
        enabled: false,
        format: "",
      },
      // lineColor: "#000000", // Specify the color of the x-axis line
    },
    yAxis: {
      min: 0,
      minRange: 5,
      title: {
        text: "",
      },
      labels: {
        enabled: false, // Enable y-axis labels
        format: "", // Display only integer values on the y-axis
      },
      // lineColor: "#000000", // Specify the color of the y-axis line
      lineWidth: 1, // Specify the width of the y-axis line
      allowDecimals: false, // Disable displaying decimal values
    },
    plotOptions: {
      bar: {
        point: {
          events: {},
        },
        allowPointSelect: true,
        cursor: "pointer",
      },
    },
    series: [],
  });

  useEffect(() => {
    handleApiFun();
  }, []);

  const handleApiFun = async () => {
    try {
      //loader("show")
      const user_id = localStorage.getItem("un");
      // const question = await getData(ENDPOINT.QUESTION);
      const question = await getData(
        import.meta.env.VITE_REACT_APP_API_URL_LUMEN +
          ENDPOINT.QUESTION +
          "?uid=" +
          user_id
      );

      //loader("hide")
      setQuestions(question?.data?.data || []);
      if (question?.data?.data?.[0]?.selected_options?.length > 0) {
        setSubmitFlag(true);
      }
      if (question?.data?.data?.[0]?.graph_data?.length > 0) {
        let graphData = question?.data?.data?.[0]?.graph_data;
        let colorData = [];
        let gData = [];
        let name = [];
        let optionsType = [];
        let yflag = 5;
        graphData.map((item, index) => {
          colorData.push(item?.color);
          gData.push({
            y: item?.percentage,
            color: item?.color,
            percentage_data: item?.percentage_data,
          }); // Set Y-axis value to 0
          name.push(item?.option);
          optionsType.push(alphabet[index]);
          if (item?.percentage) {
            yflag = 0;
          }
        });

        const newSeries = {
          name: name,
          data: gData,
          size: "100%",
          innerSize: "45%",
          dataLabels: {
            enabled: true,
            distance: 20,
            align: "right",
            x: 35,
            formatter: function () {
              var pcnt = this.point.percentage_data;
              return (
                '<tspan style="color:' +
                this.point.color +
                '">' +
                pcnt +
                "</tspan>"
              );
            },
            style: {
              textOutline: "none",
              fontSize: "12px",
            },
            inside: false,
          },
        };

        const newHcpOptions = {
          ...hcpOptions,
          yAxis: {
            min: 0,
            minRange: yflag,
            title: {
              text: "",
            },
            labels: {
              enabled: false,
              format: "",
            },
            lineWidth: 1,
            allowDecimals: false,
          },
          xAxis: {
            categories: optionsType,
          },
          series: [newSeries],
        };
        setHcpOptions(newHcpOptions);
      }
    } catch (err) {
      console.log("-er", err);
      //loader("hide")
    } finally {
      setIsExpertOpinionNotLoaded(false);
    }
  };

  const handleSelect = (e, type, id, option) => {
    if (type == "radio") {
      setSelectedValue([id]);
      setOptionValue([option]);
    } else if (type == "checkbox") {
      if (e?.target?.checked == true) {
        let newValue = id;
        let newOption = option;
        setSelectedValue((prevArray) => [...prevArray, newValue]);
        setOptionValue((prevArray) => [...prevArray, newOption]);
      } else {
        //remove value
      }
    }
  };

  const submitQuestion = async (e) => {
    e.preventDefault();

    let formattedString = `${question?.[0]?.question} ~ `;
    if (question?.[0]?.question_type === "radio") {
      // For radio, a single value is selected
      formattedString += `${selectedValue} ~ ${optionValue}`;
    } else if (question?.[0]?.question_type === "checkbox") {
      // For checkbox, multiple values are selected
      for (let i = 0; i < selectedValue.length; i++) {
        formattedString += `${selectedValue[i]} ~ ${optionValue[i]}`;
        if (i < selectedValue.length - 1) {
          formattedString += " ~ "; // Add separator between multiple values
        }
      }
    }

    await trackUserAction(0, "Your-opinion", formattedString);

    const body = {
      question_id: question?.[0]?.question_id,
      options: selectedValue,
    };
    loader("show");
    try {
      const res = await postData(ENDPOINT.SUBMITQUESTION, body);
      if (res?.data?.data) {
        let graphData = res?.data?.data?.graph_data;
        let selectedOption = res?.data?.data?.selected_options;
        let gData = [];
        graphData.map((item, index) => {
          gData.push({
            y: item?.percentage,
            color: item?.color,
            percentage_data: item?.percentage_data,
          });
        });

        const newHcpOptions = {
          ...hcpOptions,
          yAxis: {
            minRange: 0,
          },
          series: {
            data: gData,
          },
        };
        question[0].selected_options = selectedOption;
        setQuestions(question);
        setHcpOptions(newHcpOptions);
        setCountFlag(countFlag + 1);
        setApiFlag(true);
        setSubmitFlag(true);
        setTimeout(() => {
          setApiFlag(false);
        }, 3000);
        loader("hide");
      }
    } catch (err) {
      loader("hide");
      console.log(err);
    }
  };

  return isExpertOpinionNotLoaded || question.length ? (
    <div className="expert-opinion-content">
      {countFlag ? (
        <>
          {isExpertOpinionNotLoaded ? (
            <ExpertSymposiumSkeleton />
          ) : (
            question?.map((item, index) => (
              <React.Fragment key={`opinion_content_${index}`}>
                <div className="opinion-content-detail">
                  <h6>{item?.question}</h6>
                  <span className="article-post-date">
                    {item?.question_created_at}
                  </span>
                </div>
                <div className="opinion-box">
                  <div className="opinion-graph">
                    <div className="opinion-response">
                      <div className="pie-result">
                        <div className="question">
                          <p>Live results:</p>
                        </div>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={hcpOptions}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="opinion-question">
                    <Form>
                      <div className="question-list-view">
                        {submitFlag ? (
                          <span>Your answer:</span>
                        ) : (
                          <span>Please select one option:</span>
                        )}

                        <FormGroup
                          className={
                            item?.selected_options?.length
                              ? "btn_check_disabled"
                              : ""
                          }
                        >
                          {item?.options?.length &&
                            item?.options?.map((options, optionsIndex) => (
                              <React.Fragment
                                key={`option-list_${optionsIndex}`}
                              >
                                {item?.selected_options?.length ? (
                                  <div
                                    className="option-list"
                                    key={optionsIndex}
                                  >
                                    <input
                                      type={item?.question_type}
                                      className="form-check-input"
                                      id={"questions_" + options?.option_id}
                                      name="question_radio"
                                      value={options?.option}
                                      onChange={(e) => {
                                        handleSelect(
                                          e,
                                          item?.question_type,
                                          options?.option_id,
                                          options?.option
                                        );
                                      }}
                                      checked={
                                        item?.selected_options.findIndex(
                                          (el) =>
                                            el.option_id == options?.option_id
                                        ) == -1
                                          ? false
                                          : true
                                      }
                                    />
                                    <span className="checkmark"></span>
                                    <label
                                      htmlFor={
                                        "questions_" + options?.option_id
                                      }
                                    >
                                      <strong>
                                        {alphabet?.[optionsIndex]}.
                                      </strong>
                                      {options?.option}
                                    </label>
                                  </div>
                                ) : (
                                  <div
                                    className="option-list"
                                    key={optionsIndex}
                                  >
                                    <input
                                      type={item?.question_type}
                                      className="form-check-input"
                                      id={"questions_" + options?.option_id}
                                      name="question_radio"
                                      value={options?.option}
                                      onChange={(e) => {
                                        handleSelect(
                                          e,
                                          item?.question_type,
                                          options?.option_id,
                                          options?.option
                                        );
                                      }}
                                    />
                                    <span className="checkmark"></span>
                                    <label
                                      htmlFor={
                                        "questions_" + options?.option_id
                                      }
                                    >
                                      <strong>
                                        {alphabet?.[optionsIndex]}.
                                      </strong>
                                      {options?.option}
                                    </label>
                                  </div>
                                )}
                              </React.Fragment>
                            ))}
                        </FormGroup>
                      </div>
                      {!submitFlag && (
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={submitQuestion}
                          className={
                            selectedValue?.length ? "btn" : "btn-disabled"
                          }
                        >
                          Submit
                        </Button>
                      )}
                      {apiFlag && (
                        <p className="success_msg">Thank you for your answer</p>
                      )}
                    </Form>
                  </div>
                </div>
              </React.Fragment>
            ))
          )}
        </>
      ) : null}
    </div>
  ) : (
    <div className="no-data">
      <h4>No Opinion live yet.</h4>
    </div>
  );
};

export default ExpertOpinion;
