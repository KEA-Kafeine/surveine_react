import { AssistantTwoTone } from "@mui/icons-material";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const ResultBarChart = (props) => {
  const tens = props.age.ten
    .map((ageData) => {
      const matchingQst = props.qst.find(
        (qstData) => qstData.optionId === ageData.optId
      );
      if (matchingQst) {
        return {
          x: matchingQst.optionContent,
          y: ageData.optCnt,
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  const twen = props.age.twen
    .map((ageData) => {
      const matchingQst = props.qst.find(
        (qstData) => qstData.optionId === ageData.optId
      );
      if (matchingQst) {
        return {
          x: matchingQst.optionContent,
          y: ageData.optCnt,
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  const thrt = props.age.thrt
    .map((ageData) => {
      const matchingQst = props.qst.find(
        (qstData) => qstData.optionId === ageData.optId
      );
      if (matchingQst) {
        return {
          x: matchingQst.optionContent,
          y: ageData.optCnt,
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  const four = props.age.four
    .map((ageData) => {
      const matchingQst = props.qst.find(
        (qstData) => qstData.optionId === ageData.optId
      );
      if (matchingQst) {
        return {
          x: matchingQst.optionContent,
          y: ageData.optCnt,
        };
      }
      return null;
    })
    .filter((item) => item !== null);
  const fiftOver = props.age.fiftOver
    .map((ageData) => {
      const matchingQst = props.qst.find(
        (qstData) => qstData.optionId === ageData.optId
      );
      if (matchingQst) {
        return {
          x: matchingQst.optionContent,
          y: ageData.optCnt,
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  const options = {
    chart: {
      type: "bar",
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    series: [
      {
        name: "10s",
        data: tens,
      },
      {
        name: "20s",
        data: twen,
      },
      {
        name: "30s",
        data: thrt,
      },
      {
        name: "40s",
        data: four,
      },
      {
        name: "50s over",
        data: fiftOver,
      },
    ],
  };

  return (
    <ChartContainer>
      {" "}
      {/* Apply custom class to the chart container */}
      <ReactApexChart
        options={options.plotOptions}
        series={options.series}
        type="bar"
        width={500}
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
export default ResultBarChart;
