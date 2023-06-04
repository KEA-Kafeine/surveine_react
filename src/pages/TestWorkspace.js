import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CoffeeBeanList from "../components/workspace/CoffeeBeanList";
import { ReactComponent as DefaultProfile } from "../img/33242.svg";
import ChatBot from "../components/workspace/ChatBot";
// import SideNavi from "../components/SideBar/SideNavi";
import { SideNavi } from "../components/sidenavi/SideNavi";
import { Nav } from "react-bootstrap";
import SearchIcon from "../img/search.svg";
import axios from "axios";
import * as cm from "../components/Common";
import Blank from "../components/workspace/Blank";
import { uToken } from "../components/TokenAtom";
import { useRecoilValue } from "recoil";

// //테스트용 JSON
const EnqDataEx = {
  isSuccess: true,
  message: "성공",
  result: {
    memberName: "Gina Ryu",
    cboxList: [
      { cboxId: 1, cboxName: "기본 제작함", enqCnt: 2 },
      { cboxId: 2, cboxName: "deep learning", enqCnt: 0 },
      { cboxId: 3, cboxName: "딥러닝", enqCnt: 0 },
      { cboxId: 4, cboxName: "강의자료", enqCnt: 1 },
    ],
    aboxList: [
      { aboxId: 1, aboxName: "기본 참여함", enqCnt: 1 },
      { aboxId: 2, aboxName: "하이", enqCnt: 3 },
      { aboxId: 3, aboxName: "computer vision", enqCnt: 0 },
      { aboxId: 4, aboxName: "강의", enqCnt: 1 },
    ],
    cbox: {
      cboxId: 1,
      cboxName: "기본 제작함",
      enqList: [
        {
          enqId: 1,
          enqName: "제목 없는 설문지 1",
          enqStatus: "ENQ_MAKE", // ENQ_MAKE, DEPLOY_WAIT, DEPLOY_DONE, ENQ_DONE
          distType: "LINK", // NULL, GPS, LINK
          updateDate: "2023-05-04", // "2023-05-04"
          isShared: true, // 샌드박스에 공유
        },
        {
          enqId: 2,
          enqName: "제목 없는 설문지 2",
          enqStatus: "DIST_DONE", // ENQ_MAKE, DEPLOY_WAIT, DEPLOY_DONE, ENQ_DONE
          distType: "GPS", // NULL, GPS, LINK
          updateDate: "2023-04-30", // "2023-05-04"
          isShared: false,
        },
        {
          enqId: 3,
          enqName: "제목 없는 설문지 3",
          enqStatus: "DIST_WAIT", // ENQ_MAKE, DEPLOY_WAIT, DEPLOY_DONE, ENQ_DONE
          distType: "GPS", // NULL, GPS, LINK
          updateDate: "2023-05-05", // "2023-05-04"
          isShared: false,
        },
        {
          enqId: 4,
          enqName: "제목 없는 설문지 4",
          enqStatus: "ENQ_DONE", // ENQ_MAKE, DEPLOY_WAIT, DEPLOY_DONE, ENQ_DONE
          distType: "GPS", // NULL, GPS, LINK
          updateDate: "2023-05-11", // "2023-05-04"
          isShared: true,
        },
      ],
    },
  },
};

function Workspace() {
  const tokenValue = useRecoilValue(uToken);

  // back이랑 소통할 때!
//   const [resp, setResp] = useState({});
  const [resp, setResp] = useState(EnqDataEx.result);

  const clickSearch = () => {
    alert("검색 클릭");
  };

//   const [memName, setMemName] = useState("");
//   const [cbList, setCbList] = useState([]);
//   const [abList, setAbList] = useState([]);
//   const [cb, setCb] = useState({});

  // back이랑 소통할 때!
//   useEffect(() => {
//     console.log("test: " + String(tokenValue));
//     console.log("type: " + typeof tokenValue);
//     console.log(tokenValue);
//     let headerToken = "Bearer " + String(tokenValue);
//     console.log("header: " + headerToken);

//     axios
//       .get("/api/wspace", {
//         headers: { Authorization: "Bearer " + String(tokenValue) },
//       })
//       .then((response) => {
//         if (response.data) {
//           console.log("====FIRST====");
//           console.log(response.data);
//           console.log(response.data.result);
//           // setResp(response.data);
//           // setResp(response.data.result);
//           setMemName(response.data.result.memberName);
//           setCbList(response.data.result.cboxList);
//           setAbList(response.data.result.aboxList);
//           setCb(response.data.result.cbox);
//         } else {
//           alert("failed to");
//         }
//       });
//     console.log(cb);
//   }, []);

//   useEffect(() => {
//     // console.log(resp);
//     // console.log(resp.cboxList);
//     // console.log(typeof resp.cboxList);
//     console.log("====TEST TEST ====");
//     console.log("memName: " + memName);
//     console.log("cbList: " + cbList);
//     console.log(cbList);
//     console.log("abList: " + abList);
//   }, []);

  return (
    <Container>
      <div id="sidebar">
        {/* <SideNavi memberName={memName} cbList={cbList} abList={abList} /> */}
        <SideNavi memberName={resp.memberName} cbList={resp.cboxList} abList={resp.aboxList} />
      </div>
      <div id="content">
        <cm.TopBarWhite>
          <cm.TopBar_menu style={{ marginLeft: "5rem" }}>
            <cm.TopBar_menu_item>Work Space</cm.TopBar_menu_item>
            <cm.TopBar_menu_item>Sand Box</cm.TopBar_menu_item>
          </cm.TopBar_menu>
          <cm.TranslateBtn_dark />
        </cm.TopBarWhite>

        <Top>
          <Title>
            <div>
              제작함
              {/* <br/>token: {tokenValue} */}
              {/* <h3 style={{ width: "100vw" }}>{cb.cboxName}</h3> */}
              <h3 style={{ width: "100vw" }}>{resp.cbox.cboxName}</h3>
            </div>
          </Title>

          <SearchDiv>
            <SearchInput placeholder="검색하세요"></SearchInput>
            <SearchBtn onClick={clickSearch}>
              <StyledSerachBtn src={SearchIcon} />
            </SearchBtn>
          </SearchDiv>
        </Top>
        {/* console.log("cb length: " + cb.enqList.length); */}

        {/* {cbList.length == 0 && <Blank />}
        {cbList.length != 0 && <CoffeeBeanList enqList={cb.enqList} />} */}
        {/* {cb.enqList.length != 0 ? <CoffeeBeanList enqList={cb.enqList} /> : <Blank />} */}

        {/* {Object.keys(cb).length != 0 && (cb.enqList.length != 0 ? <CoffeeBeanList enqList={cb.enqList} /> : <Blank />)} */}

        {resp.cboxList.length == 0 && <Blank />}
        {resp.cboxList.length != 0 && (
          <CoffeeBeanList enqList={resp.cbox.enqList} />
        )}

        <ChatBotStyle>
          <ChatBot />
        </ChatBotStyle>
      </div>
    </Container>
  );
}

export default Workspace;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
`;

const TopNavi = styled.div`
  height: 13vh;
  justify-content: center;
  align-items: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 85px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 70px;
  position: absolute;
  width: 90px;
`;

const ChatBotStyle = styled.div`
  top: 49%;
  left: 70%;
  width: 25%;
  height: 40%;
  position: fixed;
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: 2rem;
  background: rgba(248, 248, 248, 0.7);
  border-radius: 10px;
  border: 2px solid #1a2051;
  margin-left: 955px;
`;

const SearchInput = styled.input`
  background: rgba(248, 248, 248, 0.7);
  &:focus {
    outline: none;
  }
  width: 12rem;
  height: 1rem;
  border: none;
  margin-left: 1rem;
  border-radius: 10px;
  border-right: 0px;
  border-top: 0px;
  boder-left: 0px;
  boder-bottom: 0px;
`;

const SearchBtn = styled.div`
  border-right: 0px;
  border-top: 0px;
  boder-left: 0px;
  boder-bottom: 0px;
`;

const StyledSerachBtn = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
`;

const CBContainer = styled.div`
  position: relative;
  width: calc((100% - 16px) / 4);
  height: 200px;
  margin-right: 25px;
`;
