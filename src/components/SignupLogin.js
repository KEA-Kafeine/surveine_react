import styled from "styled-components";

import kakaoLoginImg from "../img/signuplogin/kakao_login_large_wide.png";

//떠있는 것 같은 네모 창
export const Modal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 90%;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border: 1px solid #dae0e6;
  border-radius: 10px;
`;

//모달 안에 서베인 로고와 하늘색 부분
export const Modal_header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 13%;
  width: 100%;
  background: #fafbfc;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

//모달 footer 하늘색 부분
export const Modal_footer = styled.div`
  height: 11%;
  width: 100%;
  background: #fafbfc;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

//모달 안의 내용
export const Modal_main = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 70%;
`;

//모달 안 타이틀
export const Modal_main_title = styled.p`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding-top: 20px;
  color: hsl(234, 52%, 14%);
  font-family: "Poppins";
  font-style: normal;
  font-weight: bolder;
  font-size: 2rem;
  margin: 1px;
`;

//모달 안 서브 타이틀
export const Modal_main_subtitle = styled.p`
  width: 100%;
  height: 2vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: gray;
  font-family: "Poppins";
  font-style: normal;
  font-weight: normal;
  font-size: 0.8rem;
  margin: 1px;
  padding-botton: 10px;
`;

//카카오 로그인 이미지
export const KakaoLogin = styled.button`
  background-image: url(${kakaoLoginImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0;
  background-color: transparent;
  margin: 10px;
  cursor: pointer;
  width: 100%;
  height: 10%;
  overflow: hidden;
`;

//그레이색 실선
export const Line = styled.div`
  border-bottom: 1px solid hsla(230, 17%, 93%, 1);
  height: ${(props) => props.height || "10px"};
  width: ${(props) => props.width || "30%"};
`;

//입력창 위에 텍스트
export const InputTitle = styled.p`
  color: hsl(234, 52%, 14%);
  font-family: "Poppins";
  font-style: normal;
  font-weight: normal;
  font-size: 0.8rem;
`;

//입력창
export const InputBox = styled.input`
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

//성별선택용 라디오 버튼
export const RadioBtn = styled.input.attrs({ type: "radio" })`
  width: 16px;
  height: 16px;
`;

//라디오버튼 옆 글자
export const RadioTitle = styled.p`
  position: absolute;
  color: hsl(234, 52%, 14%);
  font-family: "Poppins";
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  margin-top: 0px;
  margin-left: 35px;
`;

//체크박스
export const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  margin-top: 10px;
  cursor: pointer;
  &:checked {
    background-color: hsla(220, 60%, 17%, 1);
  }
`;

//체크박스 옆 텍스트
export const CheckboxLabel = styled.label`
  color: hsl(234, 52%, 14%);
  font-family: "Poppins";
  font-style: normal;
  font-weight: bolder;
  font-size: 1rem;
  margin-left: 5px;
  margin-top: 10px;
`;

//파란 링크 글씨
export const BlueBoldText = styled.p`
  color: hsla(220, 92%, 62%, 1);
  font-family: "Poppins";
  font-weight: bolder;
  font-size: 1rem;
  margin-left: 30px;
  margin-top: 8px;
  padding-top: 5px;
  cursor: pointer;
`;

//회색 글씨
export const GrayText = styled.p`
  color: hsla(213, 14%, 43%, 1);
  font-family: "Poppins";
  font-weight: lighter;
  font-size: 1rem;
  margin-top: 10px;
  padding-top: 5px;
`;

//빨간 에러메세지
export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  font-family: "Poppins";
  margin-top: 5px;
`;
