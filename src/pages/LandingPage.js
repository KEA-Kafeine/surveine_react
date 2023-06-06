import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

import * as cm from "../components/Common";

import { ReactComponent as memoPad } from "../img/landingpage/memopad.svg";
import puzzlepng from "../img/landingpage/puzzle.png";
import globepng from "../img/landingpage/globe.png";
import lpimg from "../img/landingpage/lpimg.png";
import lpimg2 from "../img/landingpage/lpimg2.png";

//TODO: 랜딩페이지 밑에쪽 구현
function LandingPage() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop === 0) {
        window.scrollTo(0, 0);
      }

      const landingView = document.getElementById("landing-view");
      if (
        landingView &&
        scrollTop > landingView.offsetTop - window.innerHeight / 2
      ) {
        setFadeIn(true);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <cm.TopBarDark>
        <cm.TopBar_Menu_left>
          {" "}
          <cm.WLogoLand />
        </cm.TopBar_Menu_left>

        <cm.TopBar_Menu_right>
          <cm.LinkNone to="/login">
            <cm.BtnWhite>Login</cm.BtnWhite>
          </cm.LinkNone>
          <cm.TranslateBtn_white />
        </cm.TopBar_Menu_right>
      </cm.TopBarDark>
      <div>
        <GradationView>
          <div style={{ display: "flex", margin: "0px", FontFace: "Inter" }}>
            <h2>Welcome to </h2>
            <cm.BLogo style={{ margin: "10px" }} />
          </div>
          <h2 style={{ margin: "0px", FontFace: "Inter" }}>
            Powerful Form Creation Service.
          </h2>
          <GradationAnimation style={{ display: "flex", marginTop: "50px" }}>
            <MemoPad />
            <H1Text2 style={{ marginLeft: "100px" }}>
              <br />
              설문조사를
              <br />
              지금 바로
              <br />
              만들어보세요.
            </H1Text2>
          </GradationAnimation>
        </GradationView>

        <LandingView id="landing-view" fadeIn={fadeIn}>
          <div style={{ display: "flex" }}>
            <div style={{ flexDirection: "column" }}>
              <H1Text2 style={{ textAlign: "right", marginRight: "100px" }}>
                퍼즐 맞추듯 쉽게
                <br />
                설문조사 완성하기
                <br />
              </H1Text2>
              <cm.LinkNone
                to="https://beneficial-structure-ef5.notion.site/How-to-Make-SurVeine-93d3249b77d94d34ba2ff006d2c0b1cd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <cm.BtnBlue
                  style={{
                    width: "20rem",
                    height: "4rem",
                    fontSize: "1.5rem",
                    justifyContent: "flex-end",
                    marginLeft: "50px",
                    boxShadow: "8px 8px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  설문조사를 만드는 방법 &nbsp;▶
                </cm.BtnBlue>
              </cm.LinkNone>
            </div>
            <cm.ImageWrapper>
              <img src={puzzlepng} style={{ width: "100%" }} />
            </cm.ImageWrapper>
          </div>
        </LandingView>

        <LandingView id="landing-view" fadeIn={fadeIn}>
          <div style={{ display: "flex" }}>
            <cm.ImageWrapper>
              <img src={globepng} style={{ width: "100%" }} />
            </cm.ImageWrapper>
            <div style={{ flexDirection: "column" }}>
              <H1Text2 style={{ textAlign: "left", marginLeft: "100px" }}>
                GPS를 통한 한정된
                <br />
                공간에서의 실시간
                <br />
                설문 공유
              </H1Text2>
              <cm.LinkNone
                to="https://beneficial-structure-ef5.notion.site/How-to-Make-SurVeine-93d3249b77d94d34ba2ff006d2c0b1cd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <cm.BtnBlue
                  style={{
                    width: "20rem",
                    height: "4rem",
                    fontSize: "1.5rem",
                    justifyContent: "flex-end",
                    marginLeft: "100px",
                    boxShadow: "8px 8px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  설문조사를 배포하는 방법 &nbsp;▶
                </cm.BtnBlue>
              </cm.LinkNone>
            </div>
          </div>
        </LandingView>
        <LandingView id="landing-view" fadeIn={fadeIn}>
          <img
            src={lpimg}
            style={{
              width: "90vw",
              alignContent: "center",
              marginBottom: "10rem",
            }}
          />
          <img src={lpimg2} style={{ width: "90vw", alignContent: "center" }} />
        </LandingView>
      </div>
    </>
  );
}

export default LandingPage;

const FadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Animation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const GradationView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 76px;
  margin: 30px;
  width: 90%
  height: 300px;
  background: linear-gradient(180deg, #D9E1FA 1.21%, #FFFFFF 60.41%, #FFFFFF 116.57%);
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

const GradationAnimation = styled.div`
  animation: ${Animation} 2.5s ease-in-out infinite;
`;

const LandingView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 76px;
  margin: 30px;
  width: 90%
  height: 300px;

  opacity: 0;
  visibility: hidden;
  ${({ fadeIn }) =>
    fadeIn &&
    css`
      animation: ${FadeInAnimation} 1s ease-in-out forwards;
      opacity: 1;
      visibility: visible;
    `}
`;

const MemoPad = styled(memoPad)`
  margin-left: 100px;
`;

const H1Text2 = styled.p`
  width: 100%;
  ]font-family: "KoHo";
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 100px;
  /* or 156% */

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }

  @media screen and (max-width: 1000px) {
    font-size: 40px;
  }

  display: flex;
  align-items: ${(props) => props.align || "left"};

  color: rgba(0, 0, 0, 0.8);
`;
