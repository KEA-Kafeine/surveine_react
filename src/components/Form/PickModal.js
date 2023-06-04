import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as t from "../Form/FromStyled";
import Arrow from "../../img/form/Arrow.svg";
const PickModal = (props) => {
  const [num, setNum] = useState(0);
  const [type, setType] = useState("선착순");

  const selectType = (e) => {
    setType(e.target.value);
  };

  const onChangeNum = (e) => {
    setNum(e.target.value);
    console.log(num);
  };
  return (
    <>
      <Modal>
        <Main>
          <Menu>
            <NumberDropDown onChange={onChangeNum} />
            <TypeDropDown onChange={selectType}>
              선착순
              <option id="checkBox">선착순</option>
              <option>랜덤</option>
            </TypeDropDown>
            <PickButton>추첨</PickButton>
          </Menu>
          <PickedScreen />
        </Main>
        <ButtonMenu>
          <SaveButton>저장</SaveButton>
        </ButtonMenu>
      </Modal>
    </>
  );
};
export default PickModal;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

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

const Main = styled.section`
  width: 300px;
  height: 400px;
  margin-top: 50px;
`;

const Menu = styled.div`
  width: 100%;
  height: 50px;
  display: flex;

  justify-content: space-between;
`;

const ButtonMenu = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const PickedScreen = styled.div`
  width: 100%;
  height: 70%;
  margin-top: 20px;
  border-radius: 25px;
  border: 1px solid #1a2051;
`;

const NumberDropDown = styled.input`
  width: 30%;
  height: 40px;
  background-color: #f0f0f0;
  outline: none;
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  padding-left: 40px;
  font-size: 15px;
`;

const TypeDropDown = styled.select`
  width: 30%;
  height: 40px;
  border-radius: 8px;
  background-color: #f0f0f0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  font-size: 15px;
  background-image: url(${Arrow});
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 0.8rem 0.8rem;
  border: none;
  appearance: none;
  &:focus {
    outline: none;
  }
  /* Add this line to include padding and border in the specified width and height */
`;

const PickButton = styled.div`
  width: 30%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const SaveButton = styled.div`
  width: 100px;
  height: 40px;
  background: #2b234a;
  border-radius: 25px;
  border-radius: 8px;
  border: 1px solid black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SelectOption = styled.select`
  width: 8rem;
  height: 2rem;
  margin-left: 0.4rem;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 2rem; /* 이미지와 텍스트 간의 간격을 설정 */
  margin-bottom: 1rem;
  margin-top: 0rem;
  appearance: none;
`;
