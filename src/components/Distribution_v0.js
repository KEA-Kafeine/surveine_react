import axios from "axios";
import React, { useState, useEffect, useParams } from "react";
import { uToken } from "../components/TokenAtom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as cm from "../components/Common";
import { Sd } from "@mui/icons-material";
import { set } from "date-fns";
import { DivHorizon } from "../components/Common";
import { Button } from "@mui/base";
import { nanoid } from "nanoid";
const Dist = {};

const Modal = styled.div`
  display: flex;
  align-items: center;

  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  flex-direction: column;

  width: 464px;
  height: 583px;

  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border: 1px solid #dae0e6;
  border-radius: 10px;
  background-color: white;
`;

//모달 안에 header (x버튼 부분)
const Modal_header = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;
  height: 5%;
  width: 100%;
`;

const CloseBtn = styled.button`
  top: 1rem;
  right: 1rem;
  margin: 1rem;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  font-family: "Noto Sans";
`;

//옵션 wrapper
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
`;

//모달 안 옵션 타이틀
const Modal_title = styled.div`
  display: inline-block;
  margin-left: 63px;
  justify-content: left;
  text-align: left;
  color: hsl(234, 52%, 14%);
  font-family: "Poppins";
  font-style: normal;
  font-weight: bolder;
  font-size: 1.5rem;

  margin-top: 30px;
`;

//토글쪽 wrapper(선택지 포함)
const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 63px;
  margin-top: 30px;
`;

//옵션토글버튼
const Toggle = styled.div`
  display: flex;
  width: 16em;
  height: 2.8em;
  border: 2px solid #1a2051;
  border-radius: 25px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: bold;
  box-sizing: border-box;
  position: relative;
`;

//왼쪽버튼
const LeftToggle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) => (active ? "#1A2051" : "white")};
  color: ${({ active }) => (active ? "white" : "#1A2051")};
  cursor: pointer;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-right: 2px solid #1a2051;
`;

//오른쪽 버튼
const RightToggle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) => (active ? "#1A2051" : "white")};
  color: ${({ active }) => (active ? "white" : "#1A2051")};
  cursor: pointer;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border-left: 2px solid #1a2051;
`;

//인원제한있음 클릭시 나타나는 인풋박스
const InputBox = styled.div`
  width: 7.5em;
  height: 2.6em;
  top: 0;
  left: calc(100% - 7%);
  position: absolute;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border-top: 1px dashed #1a2051;
  border-bottom: 1px dashed #1a2051;
  border-right: 1px dashed #1a2051;
  display: flex;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

//입력박스
const Input = styled.input.attrs({ type: "number", min: 1 })`
  width: 3em;
  height: 1.7em;
  background-color: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #BFBFBF;
  margin-left: 25px;
  text-align: center;
  font-size: 1rem;
`;

//글씨
const InnerTitle = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: bold;
  margin-left: 20%;
`;

//시간 설정 박스
const TimeBox = styled.div`
  height: 12em;
  width: 15.9em;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom: 1px dashed #1a2051;
  border-left: 1px dashed #1a2051;
  border-right: 1px dashed #1a2051;
  top: calc(100% - 50%);

  margin-left: 63px;
  display: flex;
  flex-direction: row;
`;

//시작일/마감일 박스
const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 13%;
  text-align: left;
  width: 50%;
`;

//세로선
const Line = styled.div`
  border-left: 1px solid #1a2051;
  margin-top: 37.5%;
  height: 17%;
`;

//날짜선택
const DateSelect = styled.input.attrs({ type: "date" })`
  border: 0;
  width: 75%;
  font-family: "Poppins";
  font-style: normal;
  margin-left: 15%;
  color: #1a2051;
  font-size: 13px;
`;

//시간선택
const TimeSelect = styled.input.attrs({ type: "time" })`
  border: 0;
  width: 76%;
  font-family: "Poppins";
  font-style: normal;
  margin-left: 15%;
  color: #1a2051;
  font-size: 12.5px;
`;
//배포버튼
const ExportBtn = styled.button`
  width: 5em;
  height: 2.5em;
  border-radius: 1rem;
  background: white;
  display: inline-block;
  margin-left: 10px;
  border: 2px solid #1a2051;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 70%;
  margin-top: 30px;
  justify-content: center;
`;

const Distribution = (props) => {
  const tokenValue = useRecoilValue(uToken);
  const [enqStatus, setEnqStatus] = useState("ENQ_MAKE"); //배포 상태

  const [currentDate, setCurrentDate] = useState(new Date()); //현재 날짜
  const [maxDate, setMaxDate] = useState(); //최대 날짜
  const [minDate, setMinDate] = useState(currentDate); //최소 날짜

  const [distArr, setDistArr] = useState({}); //배포 request를 담을 배열
  const [limitQuota, setLimitQuota] = useState(false);
  const [quota, setQuota] = useState(""); // 인원 제한 수를 저장하는 state
  const [distType, setDistType] = useState("LINK"); //distType를 저장하는 state
  const [isLink, setIsLink] = useState(true); // 링크배포 클릭 시 true / GPS 배포 클릭 시 false
  const [startDate, setStartDate] = useState(); // 배포 시작 날짜
  const [startTime, setStartTime] = useState(); // 배포 시작 시각
  const [endDate, setEndDate] = useState(); // 배포 종료 시간을 저장하는 state
  const [endTime, setEndTime] = useState(); // 배포 종료 시간을 저장하는 state
  const [howLong, setHowLong] = useState(0); //gps 배포 시간
  const [distRange, setDistRange] = useState(0); //gps 반경
  const [clickLink, setClickLink] = useState(true); // 링크배포 클릭 시 true / GPS 배포 클릭 시 false

  const [error, setError] = useState("");

  const [distNanoId, setDistNanoId] = useState("");
  useEffect(() => {
    setCurrentDate(new Date());
    console.log(currentDate);
    setMaxDate(
      new Date(
        currentDate.getFullYear() + 1,
        currentDate.getMonth(),
        currentDate.getDate()
      )
        .toISOString()
        .split("T")[0]
    );
    setMinDate(currentDate.toISOString().split("T")[0]);
    console.log(props.enqStatus);
    setEnqStatus(props.enqStatus);
    // if (distNanoId != null) {
    //   console.log(enqId);
    //   setDistNanoId(enqId);
    //   axios
    //     .get(`/api/wspace/enq/dist/${enqId}`, {
    //       headers: { Authorization: "Bearer " + String(tokenValue) },
    //     })
    //     .then((response) => {
    //       const rs = response.data.result;
    //       console.log(response);
    //       setEnqStatus(rs.enqStatus);

    //       setClickLink(rs.clickLink);
    //       setLimitQuota(rs.limitQuota);
    //       setQuota(limitQuota === true ? setQuota(rs.quota) : 0);
    //       setStartDate(rs.startDate);
    //       setStartTime(rs.startTime);
    //       setEndDate(rs.endDate);
    //       setEndTime(rs.endTime);
    //     });
    // }
  }, []);

  const handleNoLimitQuota = () => {
    setLimitQuota(false);
    // setQuota("");
  };

  const handleLimitQuota = () => {
    setLimitQuota(true);
    // setQuota(true);
  };

  const handleQuotaChange = (e) => {
    setQuota(e.target.value);
  };

  const handleLink = () => {
    setIsLink(true);
    setDistType("LINK");
    setClickLink(true);
  };

  const handleGPS = () => {
    setIsLink(false);
    setDistType("GPS");
    setClickLink(false);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleHowLongChange = (e) => {
    setHowLong(e.target.value);
    validateGtime(e.target.value);
  };

  const validateGtime = (value) => {
    if (value < 1 || value > 1000) {
      setError("1~1000분 사이로 선택해주세요.");
    } else {
      setError("");
    }
  };

  const handleDistRangeChange = (e) => {
    setDistRange(e.target.value);
    validateMeter(e.target.value);
  };

  const validateMeter = (value) => {
    if (value < 1 || value > 1000) {
      setError("1~1000m 사이로 선택해주세요.");
    } else {
      setError("");
    }
  };

  /* 즉시배포 */
  const handleImidiate = () => {
    handleDist("IMMEDIATE");
  };

  /* 배포예약 */
  const handleReserve = () => {
    handleDist("RESERVE");
  };

  /* 배포취소 */
  const handleDistCancle = () => {
    handleDist("CANCLE");
  };

  const handleDist = (set) => {
    const distInfo = {
      quota: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      distLink: "",
    };

    if (distNanoId === "") {
    } else {
    }

    if (set === "IMMEDIATE") {
      Dist.enqStatus = "DIST_DONE";
    }

    if (set === "RESERVE") {
      Dist.enqStatus = "DIST_WAIT";
    }

    Dist.distType = distType;
    Dist.distInfo = distArr;

    distInfo.quota = quota;
    distInfo.startDate = startDate;
    distInfo.startTime = startTime;
    distInfo.endDate = endDate;
    distInfo.endTime = endTime;
    distInfo.distLink = nanoid();

    Dist.distInfo = distInfo;

    console.log(set);
    console.log(Dist);
    axios
      .put(`/api/wspace/enq/dist/${props.enqId}`, Dist, {
        headers: { Authorization: "Bearer " + String(tokenValue) },
      })
      .then((response) => {
        const rs = response.data.result;
        console.log(response);
        console.log(response.data.result);
      });
  };

  const Buttons = (props) => {
    if (enqStatus === "ENQ_MAKE") {
      return (
        <>
          <ExportBtn onClick={handleImidiate}>즉시 배포</ExportBtn>
          <ExportBtn onClick={handleReserve}>배포 예약</ExportBtn>
        </>
      );
    } else if (enqStatus === "DIST_WAIT") {
      return (
        <>
          <ExportBtn onClick={handleImidiate}>즉시 배포</ExportBtn>
          <ExportBtn onClick={handleDistCancle}>배포 취소</ExportBtn>
        </>
      );
    } else if (enqStatus === "DIST_DONE") {
      return <ExportBtn onClick={props.clickDistriubtion}>확인</ExportBtn>;
    } else if (enqStatus === "ENQ_DONE") {
      return <ExportBtn onClick={props.clickDistriubtion}>확인</ExportBtn>;
    }

    // 위 조건문에 해당하지 않는 경우 null을 반환하거나 원하는 기본값을 반환할 수 있습니다.
    return null;
  };

  return (
    <>
      <Modal>
        <Modal_header>
          <CloseBtn onClick={props.clickDistriubtion}>X</CloseBtn>
        </Modal_header>
        <Wrapper>
          <Modal_title>1. 인원제한</Modal_title>
          <ToggleWrapper>
            <Toggle>
              <LeftToggle active={!limitQuota} onClick={handleNoLimitQuota}>
                제한없음
              </LeftToggle>
              <RightToggle active={limitQuota} onClick={handleLimitQuota}>
                제한있음
              </RightToggle>
              {limitQuota && (
                <InputBox>
                  <Input onChange={handleQuotaChange} />
                  <InnerTitle
                    style={{ marginRight: "15px", marginLeft: "0px" }}
                  >
                    명
                  </InnerTitle>
                </InputBox>
              )}
            </Toggle>
          </ToggleWrapper>
        </Wrapper>
        <Wrapper>
          <Modal_title>2. 배포방식</Modal_title>
          <ToggleWrapper>
            <Toggle>
              <LeftToggle active={isLink} onClick={handleLink}>
                링크배포
              </LeftToggle>
              <RightToggle active={!isLink} onClick={handleGPS}>
                GPS배포
              </RightToggle>
            </Toggle>
          </ToggleWrapper>
          {clickLink && (
            <TimeBox>
              <DateBox>
                <InnerTitle>시작일</InnerTitle>
                <DateSelect
                  value={startDate}
                  onChange={handleStartDateChange}
                  min={minDate}
                  max={maxDate}
                />

                <TimeSelect
                  value={startTime}
                  onChange={handleStartTimeChange}
                />
              </DateBox>
              <Line />
              <DateBox>
                <InnerTitle>마감일</InnerTitle>
                <DateSelect
                  value={endDate}
                  onChange={handleEndDateChange}
                  min={startDate}
                  max={"2024-05-06"}
                />
                {startDate === endDate && (
                  <TimeSelect
                    value={endTime}
                    onChange={handleEndTimeChange}
                    min={startDate}
                  />
                )}
                {startDate !== endDate && (
                  <TimeSelect value={endTime} onChange={handleEndTimeChange} />
                )}
              </DateBox>
            </TimeBox>
          )}
          {!clickLink && (
            <TimeBox style={{ display: "flex", flexDirection: "column" }}>
              <InnerTitle style={{ marginLeft: "12%" }}>
                지금부터
                <Input
                  value={howLong}
                  onChange={handleHowLongChange}
                  style={{
                    marginLeft: "8px",
                    marginRight: "7px",
                    marginTop: "20%",
                  }}
                />
                분 동안
              </InnerTitle>
              <InnerTitle style={{ marginLeft: "12%", marginTop: "-10%" }}>
                여기서부터 반경
                <Input
                  value={distRange}
                  onChange={handleDistRangeChange}
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    marginTop: "20%",
                    width: "3.2em",
                  }}
                  max="1000"
                />
                m
              </InnerTitle>
            </TimeBox>
          )}
        </Wrapper>
        <ButtonContainer>
          <Buttons status={props.enqStatus} />
        </ButtonContainer>
      </Modal>
    </>
  );
};

export default Distribution;