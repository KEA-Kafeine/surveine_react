import axios from "axios";
import React, { useState, useEffect } from "react";
import { uToken } from "../components/TokenAtom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { DatePicker, Space, Button, Dropdown, Menu } from 'antd';
import Ximg from "../img/sideNavi/xImg.svg";
import { nanoid } from "nanoid";

const Distribution = (props) => {
    const tokenValue = useRecoilValue(uToken);
    
    useEffect(() => {
        console.log("==DISTRIBUTE===");
        console.log(props);
    }, []);

    const { RangePicker } = DatePicker;
    const [firstDateStr, setFirstDateStr] = useState("");
    const [secondDateStr, setSecondDateStr] = useState("");
    const onChange = (value, dateString) => {
      console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
      console.log(typeof(dateString));
      if(typeof dateString === "string") {
        setFirstDateStr(dateString);
        setSecondDateStr("");
      } else if(typeof dateString === "object") {
        setFirstDateStr(dateString[0]);
        setSecondDateStr(dateString[1]);
      }
    };
    useEffect(() => {
        console.log("====Date String====");
        console.log(firstDateStr);
        console.log(secondDateStr);
    }, [firstDateStr, secondDateStr]);
    const onOk = (value) => {
      console.log('onOk: ', value);
    };
    
    const items = [
      {
        key: "1",
        label: "시작일과 종료일 설정"
      },
      {
        key: "2",
        label: "시작일만 설정"
      },
      {
        key: "3",
        label: "종료일만 설정"
      }
    ];
    
    const gps_ranges = [
        {
            key: "100",
            label: "100m"
        },
        {
            key: "200",
            label: "200m"
        },
        {
            key: "300",
            label: "300m"
        },
        {
            key: "400",
            label: "400m"
        },
        {
            key: "500",
            label: "500m"
        }
    ];

    const closeModal = () => {
        props.clickDistriubtion();
    };

    const [selectedOption, setSelectedOption] = useState("1");
    const [buttonName, setButtonName] = useState("시작일과 종료일 설정");
    const handleOptionSelect = (option) => {
        setSelectedOption(option.key);
        const selectedLabel = items.find(item => item.key === option.key)?.label;
        if (selectedLabel) {
            setButtonName(selectedLabel);
        }
    };
    useEffect(() => {
        console.log("selected option: ", selectedOption);
    }, [selectedOption]);

    const [rangeOption, setRangeOption] = useState("100");
    const [rangeName, setRangeName] = useState("100m");
    const handleRangeSelect = (option) => {
        setRangeOption(option.key);
        const rangeSelectedLabel = gps_ranges.find(item => item.key === option.key)?.label;
        if(rangeSelectedLabel) {
            setRangeName(rangeSelectedLabel);
        }
    };
    useEffect(() => {
        console.log("selected range: ", rangeOption);
    }, [rangeOption]);

    const [limitQuota, setLimitQuota] = useState(false);
    const [quota, setQuota] = useState(0); // 인원 제한 수를 저장하는 state
    const handleNoLimitQuota = () => {
        setLimitQuota(false);
        setQuota(0);
    };
    const handleLimitQuota = () => {
        setLimitQuota(true);
    };
    const handleQuotaChange = (e) => {
        const parsedValue = parseInt(e.target.value);
        if(parsedValue < 1) {
            alert("1 이상의 숫자를 입력해주세요.");
            e.target.value = "";
        } else {
            setQuota(parsedValue);
        }
    };
    const handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(keyValue);
        const isSpecialChar = /[+\-=]/.test(keyValue);

        if (isKorean || isSpecialChar) {
            e.preventDefault();
        }
    };
    useEffect(() => {
        console.log("quota: ", quota);
    }, [quota]);

    const [isLink, setIsLink] = useState(true); // 링크배포 클릭 시 true / GPS 배포 클릭 시 false
    const handleLink = () => {
        setIsLink(true);
    };
    const handleGPS = () => {
        setIsLink(false);
    };
    useEffect(() => {
        console.log("isLink: ", isLink);
    }, [isLink]);

    const clickDistribute = (enqId) => {
        let reqData = {};
        let distType = "LINK";
        if(isLink === false) {
            distType = "GPS";
        }
        
        let startTime = "";
        let endTime = "";
        if(selectedOption === "1") {
            startTime = firstDateStr;
            endTime = secondDateStr;
            console.log("SET start time: ", startTime);
            console.log("SET end time: ", endTime);
        } else if(selectedOption === "2") {
            startTime = firstDateStr.slice(0, -3);
            endTime = "";
            console.log("SET start time: ", startTime);
            console.log("SET end time: ", endTime);
        } else if(selectedOption === "3") {
            startTime = "";
            endTime = firstDateStr.slice(0, -3);
            console.log("SET start time: ", startTime);
            console.log("SET end time: ", endTime);
        }
        
        if(distType === "GPS") {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    reqData = {
                        "distType": distType,
                        "distInfo": {
                            "quota": quota,
                            "startDateTime": startTime,
                            "endDateTime": endTime,
                            "lat": lat,
                            "lng": lng,
                            "distRange": rangeOption
                        }
                    };

                    axios.put(`/api/enq/dist/${enqId}`, reqData, {
                        headers: { Authorization: "Bearer " + String(tokenValue) },
                    })
                    .then((response) => {
                        if(response.data.isSuccess) {
                            console.log("Distribute Enquete: ", response.data);
                        } else {
                            alert("failed to");
                        }
                    })
                    .catch(error => {
                        console.error("[ERROR] distribute enquete: ", error);
                    });
                },
                (error) => {
                    console.log("[ERROR] GPS: ", error);
                    alert("GPS 배포를 하려면 위치에 엑세스 할 수 있도록 위치 권한을 허용해줘야 합니다.");
                }
            );
        } else if(distType === "LINK") {
            let distLink = nanoid();
            reqData = {
                "distType": distType,
                "distInfo": {
                    "quota": quota,
                    "startDateTime": startTime,
                    "endDateTime": endTime,
                    "distLink": distLink
                }
            };
            axios.put(`/api/enq/dist/${enqId}`, reqData, {
                headers: { Authorization: "Bearer " + String(tokenValue) },
            })
            .then((response) => {
                if(response.data.isSuccess) {
                    console.log("Distribute Enquete: ", response.data);
                } else {
                    alert("failed to");
                }
            })
            .catch(error => {
                console.error("[ERROR] distribute enquete: ", error);
            });
        }

        props.clickDistriubtion();
    };
    const clickDeleteDist = (enqId) => {
        alert(enqId + ": click delete distribute");
        props.clickDistriubtion();
    };
    const clickSaveDist = (enqId) => {
        alert(enqId + ": click save distribute");
        props.clickDistriubtion();
    };

    return (
        <>
        <Modal>
            <XImg src={Ximg} onClick={closeModal} />
            <NumWrapper>
                <NumTitle>1. 인원제한</NumTitle>
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
                        <Input onChange={handleQuotaChange} onKeyPress={handleKeyPress} />
                        <InnerTitle
                            style={{ marginRight: "15px", marginLeft: "0px" }}
                        >
                            명
                        </InnerTitle>
                        </InputBox>
                    )}
                    </Toggle>
                </ToggleWrapper>
            </NumWrapper>

            <NumWrapper>
                <NumTitle style={{marginTop: "3rem"}}>2. 배포방식</NumTitle>
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

                <SetDateTime>
                    <div>
                        <Dropdown
                            overlay={(
                            <Menu onClick={handleOptionSelect}>
                                {items.map(item => (
                                <Menu.Item key={item.key}>{item.label}</Menu.Item>
                                ))}
                            </Menu>
                            )}
                        >
                            <Button>{buttonName}</Button>
                        </Dropdown>
                    </div>

                    <Space size={12}>
                        {selectedOption === "1" && (
                        <div style={{marginTop: "1rem"}}>
                            <RangePicker
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={onChange}
                                onOk={onOk}
                                placeholder={["Start Date and Time", "End Date and Time"]}
                            />
                        </div>
                        )}
                        {selectedOption === "2" && (
                        <div>
                            <GuideSetTime>* 종료일을 설정하지 않으면 강제로 배포종료를 선택할 때까지 배포가 종료되지 않습니다.</GuideSetTime>
                                <DatePicker
                                    showTime
                                    onChange={onChange}
                                    onOk={onOk}
                                    placeholder="Start Date and Time"
                                />
                        </div>
                        )}
                        {selectedOption === "3" && (
                        <div>
                            <GuideSetTime>* 시작일을 설정하지 않으면 즉시 배포됩니다.</GuideSetTime>
                                <DatePicker
                                    showTime
                                    onChange={onChange}
                                    onOk={onOk}
                                    placeholder="End Date and Time"
                                />
                        </div>
                        )}
                    </Space>
                </SetDateTime>
                {!isLink && (
                    <SetGPSRange>
                        <div>여기서부터 반경</div>
                        <div style={{marginTop: "-0.4rem", marginLeft: "1rem"}}>
                            <Dropdown
                                overlay={(
                                <Menu onClick={handleRangeSelect}>
                                    {gps_ranges.map(item => (
                                    <Menu.Item key={item.key}>{item.label}</Menu.Item>
                                    ))}
                                </Menu>
                                )}
                            >
                                <Button>{rangeName}</Button>
                            </Dropdown>
                        </div>
                    </SetGPSRange>
                )}
            </NumWrapper>

            {props.enqStatus === "ENQ_MAKE" && (
                <BtnWrapper>
                    <SaveBtn onClick={() => clickDistribute(props.enqId)}>배포하기</SaveBtn>
                </BtnWrapper>
            )}
            {props.enqStatus === "DIST_WAIT" && (
                <BtnWrapper>
                    <SaveBtn onClick={() => clickSaveDist(props.enqId)}>저장하기</SaveBtn>
                    <SaveBtn style={{marginLeft: "1.5rem"}} onClick={() => clickDeleteDist(props.enqId)}>삭제하기</SaveBtn>
                </BtnWrapper>
            )}
        </Modal>
        </>
    );
}
export default Distribution;

const Modal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  flex-direction: column;

  width: 470px;
  height: 590px;

  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border: 1px solid #dae0e6;
  border-radius: 10px;
  background-color: white;
`;

const XImg = styled.img`
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
`;

// 1번, 2번 wrapper
const NumWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
`;

const NumTitle = styled.div`
  display: inline-block;
  margin-left: 3.5rem;
  justify-content: left;
  text-align: left;
  color: hsl(234, 52%, 14%);
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 1.45rem;
  margin-top: 4.5rem;
`;

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3.5rem;
  margin-top: 1.3rem;
`;

const Toggle = styled.div`
  display: flex;
  width: 16em;
  height: 2.8em;
  border: 1.8px solid #1a2051;
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

const InnerTitle = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: bold;
  margin-left: 20%;
`;

const SetDateTime = styled.div`
    margin-top: 1.5rem;
    margin-left: 4rem;
`;

const GuideSetTime = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 7px;
    line-height: 10px;
    display: flex;
    align-items: center;
    color: #6F6A6A;
    margin-bottom: 1rem;
`;

const SetGPSRange = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1.5rem;
    margin-left: 4rem;
`;

const BtnWrapper = styled.div`
    margin: auto auto 2.5rem auto;
`;

const SaveBtn = styled.button`
    padding: 9px 21px;
    background-color: #FFFFFF;
    border: 1.5px solid #1A2051;
    border-radius: 35px;
    color: #1A2051;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
`;