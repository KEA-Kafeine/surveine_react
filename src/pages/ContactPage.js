import React, { useState, useEffect } from "react";
import * as cm from "../components/Common";
import * as sl from "../components/SignupLogin";
import { Link } from "react-router-dom";
import styled from "styled-components";
const ContactPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log("title");
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <cm.TopBarDark>
        <cm.TopBar_Menu_left>
          {" "}
          <Link to="/">
            <cm.WLogo />
          </Link>
        </cm.TopBar_Menu_left>

        <cm.TopBar_Menu_right>
          <cm.TranslateBtn_white />
        </cm.TopBar_Menu_right>
      </cm.TopBarDark>
      <cm.Wrapper>
        <sl.Modal>
          <sl.Modal_header>
            <cm.BLogo />
          </sl.Modal_header>
          <sl.Modal_main>
            <sl.Modal_main_title>문의하기</sl.Modal_main_title>

            <cm.DivHorizon>
              <sl.Line height="22px" />
              <GrayText>카페인 팀원에게 문의사항을 보내주세요</GrayText>
              <sl.Line height="22px" />
            </cm.DivHorizon>
            <cm.DivVertical>
              <sl.InputTitle>이메일 *</sl.InputTitle>
              <InputEmail
                type="email"
                placeholder="이메일을 입력하세요"
                onChange={onChangeEmail}
              />
            </cm.DivVertical>
            <cm.DivVertical>
              <sl.InputTitle>제목 *</sl.InputTitle>
              <sl.InputBox
                placeholder="제목을 입력하세요"
                onChange={onChangeTitle}
              />
            </cm.DivVertical>
            <cm.DivVertical>
              <sl.InputTitle>문의내용 *</sl.InputTitle>
              <InputBox
                placeholder="문의사항을 입력하세요"
                onChange={onChangeContent}
              ></InputBox>
            </cm.DivVertical>

            <cm.BtnBlue className="cancel">문의하기</cm.BtnBlue>
          </sl.Modal_main>
          <sl.Modal_footer />
        </sl.Modal>
      </cm.Wrapper>
    </>
  );
};

export default ContactPage;

export const InputBox = styled.textarea`
  border-radius: 8px;
  height: 150px;
  background-color: #ffffff;
  border: 1px solid #dae0e6;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 14px;
  padding-left: 10px;
  padding-top: 10px;
  outline: none;
  resize: none; /* Prevent resizing */

  display: flex;
  align-items: flex-start;
  &:focus {
    border-color: black;
  }
  margin-bottom: 20px;
`;

export const InputEmail = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #dae0e6;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 14px;
  padding-left: 10px;
  outline: none;
  &:focus {
    border-color: black;
  }
`;
export const GrayText = styled.p`
  color: hsla(213, 14%, 43%, 1);
  font-family: "Poppins";
  font-weight: lighter;
  font-size: 13px;
  margin-top: 10px;
  padding-top: 5px;
`;
