import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ximg from "../../img/sideNavi/xImg.svg";
import axios from "axios";
import { uToken } from "../TokenAtom";
import { useRecoilValue } from "recoil";

let enqId = "";
const LinkCopyModal = (props) => {
  const tokenValue = useRecoilValue(uToken);
  const [link, setLink] = useState("No Link");

  const onClickX = () => {
    props.showLinkModal();
  };
  useEffect(() => {
    enqId = props.enqId;
    console.log(enqId);
    axios
      .get(`/api/enq/dist/link/${enqId}`, {
        headers: { Authorization: "Bearer " + String(tokenValue) },
      })
      .then((response) => {
        console.log(response);
        setLink(response.data.result);
      });
  }, []);

  return (
    <Wrapper>
      <XImg src={Ximg} onClick={onClickX} />
      <InputWrapper>{link}</InputWrapper>
    </Wrapper>
  );
};
export default LinkCopyModal;

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  width: 400px;
  padding: 30px;
  z-index: 3;
  color: #1a2051;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const XImg = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const InputWrapper = styled.div`
  width: 90%;
  height: 20px;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  border: 1.5px solid #1a2051;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SaveBtn = styled.button`
  padding: 7px 18px;
  margin-top: 10px;
  margin-left: auto;
  background-color: #ffffff;
  border: 1.5px solid #1a2051;
  border-radius: 35px;
  color: #1a2051;
  font-weight: 550;

  &:hover:not(.cancel) {
    background-color: #1a2051;
    color: #ffffff;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SaveBtnNoHover = styled.button`
  padding: 7px 18px;
  margin-top: 10px;
  margin-left: auto;
  background-color: #1a2051;
  border: 1.5px solid #1a2051;
  border-radius: 35px;
  color: #ffffff;
  font-weight: 550;
  cursor: pointer;
`;
