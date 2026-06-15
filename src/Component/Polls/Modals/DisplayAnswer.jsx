import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useLocation, useParams, useSearchParams } from 'react-router';
let  colors= ["#ff5366","#0053a0","#ff8649","#89A550","#4098B7","#DB843D","#FFBE3C","#3cff79","#b58cca","#8c95ca"] 

function DisplayAnswer({ show, data, onClose, readerCount, customAnswer, designData, graphType }) {
  const [searchParams] = useSearchParams();
  let parms=searchParams.get('evnt');
  const [userCount,setUserCount] = useState(0) 
  let chartOptions = '';
if(customAnswer == 1 || graphType === 'bar'){
  let graphData = [],
      line_v = [],
      line_h = [];
      let i = 0;
      let totalAnswer = data?.map(item => item.y) // Extracting the 'y' values
            .reduce((total, yValue) => total + yValue, 0);
      data?.forEach((item) => {
        line_v.push(item?.name);
        line_h.push(item?.y);
        const foundObj = {
          // y:item?.y,
          data:  [{p:(item?.y/totalAnswer)*100,y:item?.y}],
          name: item?.name,
          color: item?.color ? item?.color : colors[i],

          
        };
        graphData.push(foundObj);
      });

      chartOptions = {
        chart: {
          // type: "column",
          type: "bar",
        },
        yAxis: {
          min: 0,
          tickInterval: 1,
          allowDecimals: false,
          stackLabels: {
            enabled: true,
          },
          title: {
            text: ''
          },
        },
        legend: {
          enabled:true,
          verticalAlign: "bottom",
      }, 
        xAxis: {
          categories: line_v,
          visible:false,
        },
        title: {
          text: null,
        },
        tooltip: {
          formatter: function() {
            return '<b>' + this.series.name +":"+ '</b><br/>' +
              this.point.y ;
          }
        },
        plotOptions: {
          series: {
            // stacking: "normal",
            pointWidth: 30,
            // allowPointSelect: true,
            cursor: "pointer",
            dataLabels: [
             
              {
                enabled:true,
                // distance: -40,
                color:'#000000',
                // formatter: function() {
                //   return '<tspan style="color:#000000  ">' + this.y + '</tspan>'; // Display the data value on top of the bar
                // },
                formatter:function() {
                  if(customAnswer == 1){
                  return '<tspan style="color:#000000 ">' + this.point.y  +'</tspan>';
                  }
                  const pcnt = this.point.p.toFixed(0);
                  return '<tspan style="color:#000000 ">' + pcnt +"%" +'</tspan>';
              },
                cursor:"pointer",
                style: {
                  fontSize: "1.2em",
                  textOutline: "none",
                  opacity: 0.7,
                  
                },
               
              },
            ],
            // dataLabels: {
            //   enabled: true,
            //   distance: 20,
            //   align: 'right',
            //   x: 35,
            //   formatter:function() {
            //       var pcnt = this.point.y;
            //       // return '<tspan style="color:' + this.point.color + '">' + pcnt + '</tspan>';
            //       return '<tspan style="color:' + this.point.color + '">' + pcnt + '</tspan>';
            //   },
            //   style: {
            //     textOutline: "none",
            //     fontSize:"12px"
            //   },
            //   inside: false,
            // },
            
          },
          bar: {
            showInLegend: true,
        }
        },
        column: {
          colorByPoint: true,
        },
        exporting: {
          enabled: false,
        },
        series:graphData
        
      };
}else{
    const seriesData = data.map((question,index) => ({
      name: question.name,
      y: question.y,
      drilldown: question.drilldown,
      color:question?.color ? question?.color : colors[index],
      // color:colors[index],
      // color: question.y === 2 ? "#00FF00" : "#FF0000", 
    }));
    const drilldownData = data?.filter(question => question?.drillDownData?.length > 0) // Exclude questions with empty drillDownData
      .map(question => ({
        id: question.drilldown,
        name: question.name,
        data: question.drillDownData.map(answer => [answer.name, answer.total]),
        colors: question.drillDownData.map(answer => answer.color)
      }));
    ;
    
    // console.log(drilldownData);
     chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: null,
      },
      tooltip: {
        formatter: function() {
          return this.point.name +' : <b>'+ this.point.y + '</b>';
      },
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    legend: {
        labelFormat: '{name} ({percentage:.0f}%) ',
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
      series: [
        {
          name: "",
          colorByPoint: true,
          data: seriesData,
        },
      ],
      drilldown: {
        series: drilldownData,
      },
    };
}


// const [highchartData, setHighChartData] = useState(chartOptions);
// useEffect(() => {
//   const seriesData = sampleData.data.map((question) => ({
//     name: question.name,
//     y: question.y,
//     drilldown: question.drilldown,
//     color: question.y === 2 ? "#00FF00" : "#FF0000", // Define colors based on your logic
//   }));
//   const drilldownData = sampleData.data.map((question) => ({
//     id: question.drilldown,
//     data: question.drillDownData.map((answer) => [answer.name, answer.total]),
//   }));
//   console.log(seriesData);

//   const chartOptions = {
//     chart: {
//       type: "pie",
//     },
//     title: {
//       text: "Your Chart Title",
//     },
//     plotOptions: {
//       pie: {
//         allowPointSelect: true,
//         cursor: "pointer",
//         dataLabels: {
//           enabled: true,
//           format: "<b>{point.name}</b>: {point.percentage:.1f} %",
//         },
//         showInLegend: true,
//       },
//     },
//     series: [
//       {
//         name: "Questions",
//         colorByPoint: true,
//         data: seriesData,
//       },
//     ],
//     drilldown: {
//       series: drilldownData,
//     },
//   };

 
//   setHighChartData(chartOptions);
// }, [sampleData]);
//  console.log(highchartData);

  Highcharts.setOptions({
    colors: ["#FFCACD", "#39CABC"],
  });
  const shouldAddClass = parms && parms.includes("eahad_2024");
  return (
    <>
      <Modal show={show} backdrop="static" onHide={onClose}  className={`${shouldAddClass ? "eahad_2024" : ""}`} centered
      keyboard={false} id="pollModel1">
      <Modal.Header closeButton style={{ background: designData?.headerBackgroundColor }}>
      <Modal.Title id="contained-modal-title-vcenter">
          {/* <img
            // src="https://webinar.docintel.app/Event/webinar-assets/images/octa-logo.svg"
            src={path_image+'FVIII_logo.png'} 
            alt="logo"
          /> */}
           {/* <img  src={`${parms?.includes("eahad_2024")?"https://webinar.docintel.app/EAHAD2022/images/Octapharma_blue.png":path_image+'FVIII_logo.png'}`}alt="Factor logo" /> */}
           <img  src={"https://onesourcedoc.s3.eu-west-1.amazonaws.com/images/3BOf8GjoyBykieysOxBPUPNfeXFV4YBT1i3M3T01.png"} alt="Factor logo" />
           {/* <img  src={designData?.logoImageUrl} alt="Factor logo" /> */}
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
          {
            data?.length == 0 ?
              <p className="no_found">No Data Found</p>
            :
            <>
              <p dangerouslySetInnerHTML={{__html: data?.question}}></p>
              <HighchartsReact key = {"rand_"+customAnswer} highcharts={Highcharts} options={chartOptions} />
            </>
          }
          {
            /*<h5 style={{ color: designData?.textColor }}>Total Answer:{readerCount}</h5> */
          }
        </Modal.Body>
      
      </Modal>
    </>
  );
}

export default DisplayAnswer;
