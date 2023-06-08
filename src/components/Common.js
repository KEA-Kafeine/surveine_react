import styled, { css, keyframes } from "styled-components";

import { Link } from "react-router-dom";
import { ReactComponent as Logo_white } from "../img/logo_white.svg";
import { ReactComponent as Logo_black } from "../img/logo_black.svg";
import translateImg_white from "../img/translate_white.png";
import translateImg_dark from "../img/translate_dark.png";

//서베인 검정 로고
export const BLogo = styled(Logo_black)``;

//전체 페이지

/**시작- 네비바 */
//네비바_화이트
export const TopBarWhite = styled.div`
  overflow-y: auto;
  max-width: 100%;
  max-height: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

//네비바_다크
export const TopBarDark = styled.div`
  width: 100%;
  height: 7vh;
  background: hsl(234, 52%, 14%);
  display: flex;
  justify-content: left;
  align-items: center;
`;

//네비바 왼쪽 로고
export const WLogo = styled(Logo_white)`
  margin-left: 3rem;
  display: block;
  width: 120px;
  height: 100px;
`;

export const WLogoLand = styled(Logo_white)`
  display: block;
  width: 35%;
  height: 40px;
`;

export const TopBar_menu = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TopBar_Menu_left = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
`;

export const TopBar_Menu_right = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

// 탑바에 Workspace, SandBox
export const TopBar_menu_item = styled.div`
  color: #111635;
  margin: 10px;
  text-decoration: none;
  font-size: 1.5em;
  font-weight: bold;
`;

// 남색 배경 탑바의 워크스페이스, 샌드박스 네비게이션 버튼 흰색 버전
export const TopBar_menu_item_dark = styled.div`
  color: #ffffff;
  margin: 10px;
  text-decoration: none;
  font-size: 1.5em;
  font-weight: 500;
`;

//번역 버튼 흰색
export const TranslateBtn_white = styled.button`
  background-image: url(${translateImg_white});
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 10px;
  margin-top: 10px;
  margin-right: 30px;
  background-color: transparent;
  cursor: pointer;
  width: 1.5em;
  height: 1.5em;
`;

// 번역 버튼 남색
export const TranslateBtn_dark = styled.button`
  background-image: url(${translateImg_dark});
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 10px;
  margin: 10px;
  background-color: transparent;
  cursor: pointer;
  width: 1.5em;
  height: 1.5em;
`;

//남색 버튼
export const BtnBlue = styled.button`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "3rem"};
  background-color: #1a2051;
  color: white;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  font-family: "Poppins";
  font-weight: 700;
  font-size: 1rem;

  &:hover:not(.cancel) {
    transform: scale(1.02);
  }
`;

//하얀색 버튼
export const BtnWhite = styled.button`
  margin-right: 3rem;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 900;
  font-size: 1rem;
  width: ${(props) => props.width || "8rem"};
  height: 40px;
  background: white;
  border: 2px solid #2b234a;
  cursor: pointer;
  border-radius: 17px;
  display: block;
`;
/**끝 - 네비바 */

/**창 */
//가장 큰 흰색 부분이라고 보면 됨.
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 92vh;
  flex-direction: column;
`;

//링크
export const LinkNone = styled(Link)`
  text-decoration: none;
`;

export const DivHorizon = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const DivVertical = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
`;

export const LeftDiv = styled.div`
  margin-right: auto;
  text-align: left;
`;

export const RightDiv = styled.div`
  margin-left: auto;
  text-align: right;
`;

//이미지 부모크기 맞게 사이즈 조정
export const ImageWrapper = styled.div`
  width: 500px;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  min-width: 50%;
  min-height: 50%;
`;
