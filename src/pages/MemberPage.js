import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { uToken } from "../components/TokenAtom";
import { useRecoilValue } from "recoil";
import defaultProfile from "../img/sideNavi/default_profile.svg";
import KakaoSocial from "../img/memberPage/kakao_social.svg";
import GoogleSocial from "../img/memberPage/google_social.svg";
import LeftArrow from "../img/memberPage/left_arrow.svg";
import * as cm from "../components/Common";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MemberPage() {
  const tokenValue = useRecoilValue(uToken);
  const navigate = useNavigate();

  const [member, setMember] = useState({});
  const [enqCount, setEnqCount] = useState(0);
  const [ansCount, setAnsCount] = useState(0);

  useEffect(() => {
    axios
      .get("/api/member/profile", {
        headers: { Authorization: "Bearer " + String(tokenValue) },
      })
      .then((response) => {
        if (response.data) {
          setMember(response.data.result.member);
          setEnqCount(response.data.result.enqCount);
          setAnsCount(response.data.result.ansCount);
        } else {
          alert("failed to");
        }
      });
  }, []);

  // const EnqDataEx = {
  //   isSuccess: true,
  //   message: "성공",
  //   result: {
  //     member: {
  //       name: "jin",
  //       gender: "MAN",
  //       email: "1@1.com",
  //       birthday: "2023-01-01",
  //     },
  //     enqCount: 20,
  //     ansCount: 23,
  //   },
  // };

  const NowMemberLocation = {
    address: "경기도 성남시 복정동 가천대학교 AI관",
    lat: 39.2393,
    lng: 23.2393,
  };

  const clickLeftArrowBtn = () => {
    navigate("/workspace");
  };

  const clickChangePassword = () => {
    alert("비밀번호 변경 페이지 이동");
  };

  const clickKakaoSocial = () => {
    alert("카카오 소셜 연동");
  };

  const clickGoogleSocial = () => {
    alert("구글 소셜 연동");
  };

  return (
    <MemberPageContainer>
      <cm.TopBarDark>
        <cm.TopBar_Menu_left>
          {" "}
          <cm.WLogo style={{cursor: "pointer"}} onClick={() => navigate("/workspace")} />
        </cm.TopBar_Menu_left>
        <cm.TopBar_menu style={{ marginLeft: "5rem" }}>
          <cm.TopBar_menu_item_dark style={{cursor: "pointer"}} onClick={() => navigate("/workspace")}>Work Space</cm.TopBar_menu_item_dark>
          <cm.TopBar_menu_item_dark style={{cursor: "pointer"}} onClick={() => navigate("/sandbox")}>Sand Box</cm.TopBar_menu_item_dark>
        </cm.TopBar_menu>
        <cm.TopBar_Menu_right>
          <cm.LinkNone to="/login">
            <cm.BtnWhite>Login</cm.BtnWhite>
          </cm.LinkNone>
          <cm.TranslateBtn_white />
        </cm.TopBar_Menu_right>
      </cm.TopBarDark>

      <ArrowNavButton src={LeftArrow} onClick={clickLeftArrowBtn} />

      <TitleContainer>
        <div>
          설정창
          <h3>사용자 정보</h3>
        </div>
      </TitleContainer>

      <MemberMainContainer>
        <MainInfoContainer>
          <MemberInfoContainer>
            <MemberProfileImgBox>
              <ProfileKey>프로필 사진</ProfileKey>
              <ProfileImg src={defaultProfile} />
            </MemberProfileImgBox>
            <MemberProfileBox>
              <ProfileKey>이름</ProfileKey>
              <ProfileValue>{member.name}</ProfileValue>
            </MemberProfileBox>
            <MemberProfileBox>
              <ProfileKey>성별</ProfileKey>
              {member.gender == "MAN" ? (
                <ProfileValue>남성</ProfileValue>
              ) : (
                <ProfileValue>여성</ProfileValue>
              )}
            </MemberProfileBox>
            <MemberProfileBox>
              <ProfileKey>이메일</ProfileKey>
              <ProfileValue>{member.email}</ProfileValue>
            </MemberProfileBox>
            <MemberProfileBox>
              <ProfileKey>생년월일</ProfileKey>
              <ProfileValue>{member.birthday}</ProfileValue>
            </MemberProfileBox>
          </MemberInfoContainer>
          <ResetPasswordContainer onClick={clickChangePassword}>
            <ResetPasswordText>비밀번호 재설정 하기</ResetPasswordText>
            <ResetPasswordArrow>→</ResetPasswordArrow>
          </ResetPasswordContainer>
        </MainInfoContainer>

        <SubInfoContainer>
          <SubInfoTopContainer>
            <WsandSocialContainer>
              <WsBox>
                <WsText>
                  제작한 설문 :<WsValue>{enqCount}</WsValue>개
                </WsText>
                <WsText>
                  응답한 설문 :<WsValue>{ansCount}</WsValue>개
                </WsText>
              </WsBox>
              <SocialBox>
                <KakaoSocialLogo src={KakaoSocial} onClick={clickKakaoSocial} />
                <GoogleSocialLogo
                  src={GoogleSocial}
                  onClick={clickGoogleSocial}
                />
              </SocialBox>
            </WsandSocialContainer>
            <LocationInfoContainer>
              <LocationTitle>현재 위치</LocationTitle>
              <LocationAddress>{NowMemberLocation.address}</LocationAddress>
              <LocationLatLng>
                <LatLngText>
                  위도 -<LatLngValue>{NowMemberLocation.lat}</LatLngValue>
                </LatLngText>
                <LatLngText>
                  경도 -<LatLngValue>{NowMemberLocation.lng}</LatLngValue>
                </LatLngText>
              </LocationLatLng>
            </LocationInfoContainer>
          </SubInfoTopContainer>
          <SubInfoBottomContainer></SubInfoBottomContainer>
        </SubInfoContainer>
      </MemberMainContainer>
    </MemberPageContainer>
  );
}

const MemberPageContainer = styled.div`
  display: block;
`;

const ArrowNavButton = styled.img`
  margin-top: 4vh;
  margin-left: 3vw;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  margin-top: 0.5vh;
  margin-left: 13vw;
`;

const MemberMainContainer = styled.div`
  display: flex;
`;

const MainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 13vw;
  margin-right: 11vw;
  height: 67vh;
  width: 26vw;
`;

const MemberInfoContainer = styled.div`
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  margin-bottom: 4vh;
  height: 55vh;
`;

const MemberProfileImgBox = styled.div`
  height: 15vh;
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  height: 13vh;
  margin-left: auto;
  margin-right: 1.5vw;
`;

const MemberProfileBox = styled.div`
  height: 10vh;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
`;

const ProfileKey = styled.p`
  font-weight: 600;
  font-size: 2.2vh;
  margin-left: 2.7vw;
`;

const ProfileValue = styled.p`
  font-weight: 400;
  font-size: 2.1vh;
  margin-left: auto;
  margin-right: 2.7vw;
`;

const ResetPasswordContainer = styled.div`
  display: flex;
  align-items: center;
  background: #1a2051;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  height: 8vh;
  cursor: pointer;
`;

const ResetPasswordText = styled.p`
  margin-left: 2.7vw;
  color: #ffffff;
  font-weight: 600;
  font-size: 2vh;
`;

const ResetPasswordArrow = styled.p`
  color: #ffffff;
  font-weight: 600;
  font-size: 3vh;
  margin-left: auto;
  margin-right: 2.7vw;
`;

const SubInfoContainer = styled.div`
  width: 42vw;
  height: 67vh;
`;

const SubInfoTopContainer = styled.div`
  display: flex;

  height: 22vh;
  margin-bottom: 4vh;
`;

const WsandSocialContainer = styled.div`
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-right: 2.7vw;
  height: 22vh;

  width: 22vw;
`;

const WsBox = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  height: 11vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WsText = styled.p`
  font-size: 2vh;
  font-weight: 500;
  margin-top: 0.4vh;
  margin-bottom: 0.4vh;
`;

const WsValue = styled.span`
  margin-left: 0.6vw;
  margin-right: 0.1vw;
  font-size: 2vh;
  font-weight: 600;
`;

const SocialBox = styled.div`
  height: 11vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KakaoSocialLogo = styled.img`
  width: 7vh;
  height: 7vh;
  margin-right: 1vw;
  cursor: pointer;
`;
const GoogleSocialLogo = styled.img`
  width: 7vh;
  height: 7vh;
  margin-left: 1vw;
  cursor: pointer;
`;

const LocationInfoContainer = styled.div`
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: #1a2051;
  color: #ffffff;
  width: 28vw;
  height: 22vh;
`;

const LocationTitle = styled.p`
  margin-top: 2.4vh;
  margin-left: 2vw;
  font-size: 2.1vh;
  font-weight: 700;
`;

const LocationAddress = styled.p`
  margin-left: 2vw;
  font-size: 2vh;
  font-weight: 500;
`;

const LocationLatLng = styled.div`
  margin-top: 3.8vh;
  margin-left: 2vw;
`;

const LatLngText = styled.p`
  font-size: 1.6vh;
  font-weight: 500;
`;

const LatLngValue = styled.span`
  margin-left: 0.3vw;
  font-size: 1.6vh;
  font-weight: 600;
`;

const SubInfoBottomContainer = styled.div`
  border-radius: 12px;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  height: 41vh;

  background: #81c147;
`;

export default MemberPage;
