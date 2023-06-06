import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const ResultNodeChart = (props) => {
  const donutData = {
    series: props.result,
    options: {
      chart: {
        type: "donut",
      },

      colors: ["#b1bdd6", "#9787d1", "#9C27B0"],

      dataLabels: {
        style: {
          colors: ["#FFFFFF"],
        },
      },
      markers: {
        colors: ["#F44336", "#E91E63", "#9C27B0"],
      },
      legend: {
        position: "bottom",
      },
      responsive: [
        {
          breakpoint: 480,
        },
      ],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: "응답자수",
                fontSize: "12px",
              },
            },
          },
        },
      },
      labels: props.options,
      title: {
        text: props.category,
        align: "center",
      },
    },
  };

  return (
    <ChartContainer>
      {" "}
      {/* Apply custom class to the chart container */}
      <ReactApexChart
        options={donutData.options}
        series={donutData.series}
        type="donut"
        width={280}
      />
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default ResultNodeChart;
