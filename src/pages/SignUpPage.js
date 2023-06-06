import React, { useState, useEffect } from "react";
import * as cm from "../components/Common";
import * as sl from "../components/SignupLogin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ValidOK = styled.p`
  color: green;
  margin: 3px;
  padding: 0;
  font-size: 5pt;
`;

const ValidNO = styled.p`
  color: red;
  margin: 3px;
  padding: 0;
  font-size: 5pt;
`;

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);

  const [nameStatus, setNameStatus] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);
  const [passwordStatus, setPasswordStatus] = useState(null);
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(null);

  //검증 코드
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!~*])[A-Za-z\d!~*]{8,15}$/;

  const navigate = useNavigate();

  useEffect(() => {
    if (name === "") {
      setNameStatus(null);
    } else if (name.length < 2) {
      setNameStatus(<ValidNO>2글자 이상 입력해 주세요.</ValidNO>);
    } else {
      setNameStatus(<ValidOK>사용 가능한 이름입니다.</ValidOK>);
    }
  }, [name]);

  useEffect(() => {
    if (email === "") {
      setEmailStatus(null);
    } else if (!emailRegex.test(email)) {
      setEmailStatus(<ValidNO>이메일 형식이 올바르지 않습니다.</ValidNO>);
    } else {
      setEmailStatus(<ValidOK>사용 가능한 이메일입니다.</ValidOK>);
    }
  }, [email]);

  useEffect(() => {
    if (password === "") {
      setPasswordStatus(null);
    } else if (!passwordRegex.test(password)) {
      setPasswordStatus(<ValidNO>8~15자의 영문, 숫자, 특수문자(!, ~, *)를 입력해야합니다.</ValidNO>);
    } else {
      setPasswordStatus(<ValidOK>사용 가능한 비밀번호입니다.</ValidOK>);
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword === "") {
      setConfirmPasswordStatus(null);
    } else if (password !== confirmPassword) {
      setConfirmPasswordStatus(<ValidNO>비밀번호가 일치하지 않습니다.</ValidNO>);
    } else {
      setConfirmPasswordStatus(<ValidOK>비밀번호가 일치합니다.</ValidOK>);
    }
  }, [password, confirmPassword]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleTermsCheckedChange = (e) => {
    setTermsChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 이름 필드 검증
    if (name.length < 2) {
      alert("이름은 2글자 이상이어야 합니다.");
      return;
    }

    // 성별 필드 검증
    if (!gender) {
      alert("성별은 반드시 선택해야 합니다.");
      return;
    }

    // 생년월일 필드 검증
    const today = new Date();
    const birthdayDate = new Date(birthday);

    if (!birthday) {
      alert("생년월일을 입력해주세요.");
      return;
    }
    if (birthdayDate >= today) {
      alert("생년월일은 현재 날짜보다 작아야 합니다.");
      return;
    }

    // 이메일 필드 검증
    if (!emailRegex.test(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    //가능한 비밀번호 예시: kafeine1~!
    // 비밀번호 필드 검증
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 8~15자의 영문, 숫자, 특수문자(!, ~, *)를 혼합해야 합니다.");
      return;
    }

    // 비밀번호 확인 필드 검증
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 약관 필드 검증
    if (!termsChecked) {
      alert("약관에 동의해야 합니다.");
      return;
    }

    //검증이 모두 통과되면 회원가입 처리
    alert("회원가입이 완료되었습니다.");
    const signupInfo = { name, email, password, gender, birthday }; //데이터 전송
    axios.post("/api/auth/signup", signupInfo).then((response) => {
      if (response.data.isSuccess) {
        console.log("rs" + response);
        console.log(response.data.result);
        // 로그인 창 이동
        alert("로그인을 진행해주세요.");
        navigate("/login");
      } else {
        // 회원가입 실패
        alert("회원가입에 실패했습니다.");
      }
    });
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
        <sl.Modal style={{ height: "80%" }}>
          <sl.Modal_header>
            <cm.BLogo />
          </sl.Modal_header>
          <sl.Modal_main>
            <sl.Modal_main_title>회원가입</sl.Modal_main_title>
            <sl.Modal_main_subtitle>회원가입을 위해 정보를 입력해주세요.</sl.Modal_main_subtitle>
            <cm.DivVertical>
              <sl.InputTitle>성함 *</sl.InputTitle>
              <sl.InputBox type="text" placeholder="성함을 입력하세요" value={name} onChange={handleNameChange} />
              {nameStatus}
            </cm.DivVertical>
            <cm.DivHorizon>
              <cm.DivVertical>
                <sl.InputTitle>성별 *</sl.InputTitle>
                <cm.DivHorizon>
                  <cm.DivHorizon style={{ alignItems: "left" }}>
                    <sl.RadioBtn name="gender" value="WOMAN" checked={gender === "WOMAN"} onChange={handleGenderChange} />
                    <sl.RadioTitle>여</sl.RadioTitle>
                  </cm.DivHorizon>
                  <cm.DivHorizon style={{ position: "absolute", marginLeft: "100px" }}>
                    <sl.RadioBtn name="gender" value="MAN" checked={gender === "MAN"} onChange={handleGenderChange} />
                    <sl.RadioTitle>남</sl.RadioTitle>
                  </cm.DivHorizon>
                </cm.DivHorizon>
              </cm.DivVertical>
              <cm.DivVertical>
                <sl.InputTitle>생년월일 *</sl.InputTitle>
                <sl.InputBox type="date" value={birthday} onChange={handleBirthdayChange} />
              </cm.DivVertical>
            </cm.DivHorizon>
            <cm.DivVertical>
              <sl.InputTitle>이메일 *</sl.InputTitle>
              <sl.InputBox type="email" placeholder="이메일을 입력하세요" value={email} onChange={handleEmailChange} />
              {emailStatus}
            </cm.DivVertical>
            <cm.DivHorizon>
              <cm.DivVertical>
                <sl.InputTitle>비밀번호 *</sl.InputTitle>
                <sl.InputBox
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={handlePasswordChange}
                  style={{ marginRight: "0px" }}
                />
                {passwordStatus}
              </cm.DivVertical>
              <cm.DivVertical>
                <sl.InputTitle style={{ marginLeft: "5px" }}>비밀번호 확인 *</sl.InputTitle>
                <sl.InputBox
                  type="password"
                  placeholder="비밀번호를 재입력 하세요"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  style={{ marginLeft: "5px" }}
                />
                {confirmPasswordStatus}
              </cm.DivVertical>
            </cm.DivHorizon>
            <cm.LeftDiv>
              <sl.CheckboxInput id="checkbox" checked={termsChecked} onChange={handleTermsCheckedChange} />
              <sl.CheckboxLabel htmlFor="checkbox">약관 및 개인정보 보호정책에 동의합니다.</sl.CheckboxLabel>
            </cm.LeftDiv>
          </sl.Modal_main>
          <sl.Modal_footer
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <cm.BtnBlue className="cancel" width="25%" height="70%" onClick={handleSubmit} style={{ marginLeft: "auto", marginRight: "20px" }}>
              회원가입하기 {">"}{" "}
            </cm.BtnBlue>
          </sl.Modal_footer>
        </sl.Modal>
      </cm.Wrapper>
    </>
  );
};

export default SignUpPage;
