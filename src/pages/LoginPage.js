import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { uToken } from "../components/TokenAtom";
import { useRecoilState } from "recoil";
import * as cm from "../components/Common";
import * as sl from "../components/SignupLogin";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [token, setToken] = useRecoilState(uToken);

  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;

  const handleLogin = async () => {
    const loginInfo = { email: email, password: password };
    axios
      .post("/api/auth/login", JSON.stringify(loginInfo), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.isSuccess) {
          console.log("rs" + response);
          setToken(String(response.data.result.token));
          console.log(response.data.result);
          // 워크스페이스 이동
          alert("로그인 성공");

          if (state != null) {
            navigate(state.from);
          } else {
            navigate("/workspace");
          } // TODO: /workspace
        } else {
          // 로그인 실패
          alert("이메일 혹은 비밀번호가 맞지 않습니다.");
        }
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

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

      <cm.Wrapper>
        <sl.Modal>
          <sl.Modal_header>
            <cm.BLogo />
          </sl.Modal_header>
          <sl.Modal_main>
            <sl.Modal_main_title>환영합니다!</sl.Modal_main_title>
            <sl.KakaoLogin aria-label="카카오 로그인" onClick={kakaoLogin} />
            <cm.DivHorizon>
              <sl.Line height="22px" />
              <sl.GrayText>이메일로 로그인하기</sl.GrayText>
              <sl.Line height="22px" />
            </cm.DivHorizon>
            <cm.DivVertical>
              <sl.InputTitle>이메일 *</sl.InputTitle>
              <sl.InputBox
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={handleEmailChange}
              />
            </cm.DivVertical>
            <cm.DivVertical>
              <sl.InputTitle>비밀번호 *</sl.InputTitle>
              <sl.InputBox
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={handlePasswordChange}
              />
            </cm.DivVertical>
            <cm.DivHorizon>
              <cm.LeftDiv>
                <sl.CheckboxInput
                  id="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
                <sl.CheckboxLabel htmlFor="checkbox">
                  로그인 상태 유지하기
                </sl.CheckboxLabel>
              </cm.LeftDiv>
              <cm.RightDiv>
                <cm.LinkNone to={"/forgot-password"}>
                  <sl.BlueBoldText style={{ marginRight: "10px" }}>
                    비밀번호 찾기
                  </sl.BlueBoldText>
                </cm.LinkNone>
              </cm.RightDiv>
            </cm.DivHorizon>
            <cm.BtnBlue className="cancel" onClick={handleLogin}>
              로그인
            </cm.BtnBlue>
            <cm.DivHorizon>
              <cm.LeftDiv>
                <sl.GrayText>계정이 없으신가요?</sl.GrayText>
              </cm.LeftDiv>
              <cm.RightDiv>
                <cm.LinkNone to={"/signup"}>
                  <sl.BlueBoldText style={{ marginRight: "10px" }}>
                    서베인에 가입하기
                  </sl.BlueBoldText>
                </cm.LinkNone>
              </cm.RightDiv>
            </cm.DivHorizon>
          </sl.Modal_main>
          <sl.Modal_footer />
        </sl.Modal>
      </cm.Wrapper>
    </>
  );
};

export default LoginPage;
