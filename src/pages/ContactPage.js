import React, { useState, useEffect } from "react";
import * as cm from "../components/Common";
import * as sl from "../components/SignupLogin";
import { Link } from "react-router-dom";
import Student from "../img/landingpage/student.svg";
import styled from "styled-components";

import { useLocation } from "react-router-dom";
const ContactPage = () => {
  const kakaoLogin = () => {
    //카카오 로그인 이동 페이지
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
      <Wrapper>
        <RightWrapper>
          <StudentImg src={Student} alt="" />
        </RightWrapper>
        <LeftWrapper>
          <sl.Modal>
            <sl.Modal_header>
              <cm.BLogo />
            </sl.Modal_header>
            <sl.Modal_main></sl.Modal_main>
            <sl.Modal_footer />
          </sl.Modal>
        </LeftWrapper>
      </Wrapper>
    </>
  );
};

export default ContactPage;

const Wrapper = styled.div`
  width: 100vw;
  height: 93vh;
  display: flex;
`;

const RightWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const LeftWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;
const StudentImg = styled.img`
  width: 100%;
  height: 100%;
  margin-left: 50%;
`;
