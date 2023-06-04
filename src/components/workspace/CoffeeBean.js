import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Axios from "axios";
import CoffeeBeanIcon from "../../img/workspace/coffeeBean.svg";
import EnqSetIcon from "../../img/workspace/enqSetting.svg";
import GPSIcon from "../../img/workspace/GPS_icon.svg";
import LINKIcon from "../../img/workspace/LINK_icon.svg";
import EnqSetModal from "./EnqSetting";
import EditModal from "./EditModal";
import LinkCopyModal from "./LinkCopyModal";

const CoffeeBean = (props) => {
  useEffect(() => {
    console.log("===CoffeeBean===");
    console.log(props);
    console.log("===END CB===");
  }, []);
  const clickEnqSetting = () => {
    //검색을 클릭했을 때 실행되야할 기능 구현
    alert("설문지 설정 클릭");
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };
  const unShowModal = () => {
    setModalOpen(false);
  };

  const startDistribute = () => {
    alert("배포시작 클릭");
  };
  const endDistribute = () => {
    alert("배포종료 클릭");
  };

  const getLink = () => {
    setLinkModalOpen(!linkModalOpen);
  };
  const [enqName, setEnqName] = useState(props.enqName);

  return (
    <CoffeeBox>
      <div>
        {props.enqStatus == "ENQ_MAKE" && <EnqState>제작중</EnqState>}
        {props.enqStatus == "DIST_WAIT" && <EnqState>배포예약</EnqState>}
        {props.enqStatus == "DIST_DONE" && <EnqState>배포완료</EnqState>}
        {props.enqStatus == "ENQ_DONE" && <EnqState>설문종료</EnqState>}

        <CBIcon src={CoffeeBeanIcon} />
        <EnqPreview>
          {enqName.length > 10 ? enqName.slice(0, 10) + "..." : enqName}
          <br />
          <p style={{ fontSize: "12px", fontWeight: "250" }}>
            {props.updateDate}
          </p>
        </EnqPreview>
      </div>

      {props.distType == "GPS" && <GPSType src={GPSIcon} />}
      {props.distType == "LINK" && (
        <LINKType src={LINKIcon} onClick={getLink} />
      )}

      {props.enqStatus == "DIST_WAIT" && (
        <DistrBtn onClick={startDistribute}>배포시작</DistrBtn>
      )}
      {props.enqStatus == "DIST_DONE" && (
        <DistrBtn onClick={endDistribute}>배포종료</DistrBtn>
      )}

      <StyledEnqSetBtn src={EnqSetIcon} onClick={showModal} />
      {modalOpen && (
        <div>
          <EnqSetModal
            isShared={props.isShared}
            enqId={props.enqId}
            enqName={enqName}
            setEnqName={setEnqName}
            cbList={props.cbList}
            abList={props.abList}
          />
          <StyledEnqSetBtn src={EnqSetIcon} onClick={unShowModal} />
        </div>
      )}

      {linkModalOpen && (
        <div>
          <LinkCopyModal enqId={props.enqId} />
        </div>
      )}
    </CoffeeBox>
  );
};
export default CoffeeBean;

const CoffeeBox = styled.div`
  width: 238px;
  height: 179px;
  border: 1.5px solid #21296b;
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 750px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
`;

const EnqState = styled.div`
  position: absolute;
  top: 17px;
  z-index: 1;
  display: inline-block;
  width: 4rem;
  height: 1.5rem;
  text-align: center;
  vertical-align: center;
  background-color: hsl(234, 52%, 14%);
  color: white;
  font-family: "Noto Sans";
  font-style: normal;
  font-size: 12px;
  font-weight: 620;
  width: 3.4rem;
  height: 1.5rem;
  border: 2px solid #2b234a;
  border-radius: 25px;
  padding-top: 5px;
  margin-left: 1rem;
  align-items: center;
  justify-content: center;
`;

const EnqPreview = styled.p`
  position: absolute;
  bottom: 7px;
  left: 43px;
  display: inline-block;
  width: 100vw;
  color: #1a2051;
  font-weight: 640;
`;

const StyledEnqSetBtn = styled.img`
  position: absolute;
  left: 231px;
  bottom: 64px;
  width: 1rem;
  height: 1rem;
`;

const GPSType = styled.img`
  position: absolute;
  left: 212px;
  bottom: 64px;
  width: 1rem;
  height: 1rem;
`;

const LINKType = styled.img`
  position: absolute;
  left: 212px;
  bottom: 64px;
  width: 1rem;
  heigth: 1rem;
`;

const CBIcon = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const DistrBtn = styled.button`
  display: inline-flex;
  flex-direction: row;
  position: absolute;
  left: 180px;
  bottom: 29px;
  font-family: "Noto Sans";
  font-size: 13px;
  font-weight: 400;
  border: 1px solid #1a2051;
  border-radius: 15px;
  padding: 0.3rem 0.5rem;
  color: #1a2051;
  background-color: white;
  width: 65px;
  align-items: center;
  justify-content: center;
`;
