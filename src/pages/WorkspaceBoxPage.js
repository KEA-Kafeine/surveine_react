// 안 쓰는 페이지 ? (제가 확인하고 지우겠습니다!)
// by Gina

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CoffeeBeanList from "../components/workspace/CoffeeBeanList";
import { ReactComponent as DefaultProfile } from "../img/33242.svg";
import ChatBot from "../components/workspace/ChatBot";
// import SideNavi from "../components/SideBar/SideNavi";
import { SideNavi } from "../components/workspace/SideNavi";
import { Nav } from "react-bootstrap";
import SearchIcon from "../img/search.svg";
import axios from "axios";
import * as cm from "../components/Common";
import CboxBlank from "../components/workspace/CboxBlank";
import { AboxBlank } from "../components/workspace/AboxBlank";
import { uToken } from "../components/TokenAtom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

function WorkspaceBox() {
  const tokenValue = useRecoilValue(uToken);
  const navigate = useNavigate();

  // back이랑 소통할 때!
  const [resp, setResp] = useState({});

  const clickSearch = () => {
    alert("검색 클릭");
  };

  const [memName, setMemName] = useState("");
  const [cbList, setCbList] = useState([]);
  const [abList, setAbList] = useState([]);
  const [box, setBox] = useState({});
  const [CorA, setCorA] = useState("");

  // back이랑 소통할 때!
  useEffect(() => {
    axios
      .get("/api/wspace/cbox/0", {
        headers: { Authorization: "Bearer " + String(tokenValue) },
      })
      .then((response) => {
        if (response.data) {
          console.log("====FIRST====");
          console.log(response.data);
          console.log(response.data.result);

          setMemName(response.data.result.memberName);
          setCbList(response.data.result.cboxList);
          setAbList(response.data.result.aboxList);

          if (response.data.result.hasOwnProperty("cbox")) {
            setBox(response.data.result.cbox);
            setCorA("cbox");
          } else if (response.data.result.hasOwnProperty("abox")) {
            setBox(response.data.result.abox);
            setCorA("abox");
          }
        } else {
          alert("failed to");
        }
      });
  }, []);

  // useEffect(() => {
  //   console.log("====TEST TEST TEST====");
  //   console.log(box);
  // }, [box]);

  const [upFolderData, setUpFolderData] = useState({});
  const handleFolderDataChange = (folderData) => {
    console.log("===WHY NOT===");
    console.log(folderData);
    setUpFolderData(folderData);
  };
  useEffect(() => {
    console.log("===YEAH===");
    console.log(upFolderData);
    setBox(upFolderData);
  }, [upFolderData]);
  useEffect(() => {
    console.log("====PLEASE====");
    console.log(box);
  }, [box]);

  return (
    <WorkspaceContainer>
      <SideNaviContainer>{memName && <SideNavi memberName={memName} cbList={cbList} abList={abList} onFolderDataChange={handleFolderDataChange} />}</SideNaviContainer>
      <TopBarContainer>
        <cm.TopBarWhite>
          <cm.TopBar_menu style={{ marginLeft: "5rem" }}>
            <cm.TopBar_menu_item style={{cursor: "pointer"}} onClick={() => navigate("/workspace")}>Work Space</cm.TopBar_menu_item>
            <cm.TopBar_menu_item style={{cursor: "pointer"}} onClick={() => navigate("/sandbox")}>Sand Box</cm.TopBar_menu_item>
          </cm.TopBar_menu>
          <cm.TranslateBtn_dark />
        </cm.TopBarWhite>
      </TopBarContainer>
      <MiddleContainer>
        <Title>
          {box.hasOwnProperty("cboxId") && (
            <div>
              제작함
              <h3>{box.cboxName}</h3>
            </div>  
          )}
          {box.hasOwnProperty("aboxId") && (
            <div>
              참여함
              <h3>{box.aboxName}</h3>
            </div>  
          )}
        </Title>
        <SearchContainer>
          <SearchDiv>
            <SearchInput placeholder="검색하세요"></SearchInput>
            <SearchBtn onClick={clickSearch}>
              <StyledSerachBtn src={SearchIcon} />
            </SearchBtn>
          </SearchDiv>
        </SearchContainer>
      </MiddleContainer>

      <CoffeeBeanListContainer>
        {box.hasOwnProperty("cboxId") && Object.keys(box).length != 0 &&
          (box.enqList.length != 0 ? (
            // <CoffeeBeanList cboxId={box.cboxId} enqList={box.enqList} cbList={CorA === "cbox" ? cbList : undefined} abList={CorA === "abox" ? abList : undefined} />
            <CoffeeBeanList cboxId={box.cboxId} enqList={box.enqList} cbList={cbList} abList={undefined} />
          ) : (
            <CboxBlank cboxId={box.cboxId} />
          ))}
        {box.hasOwnProperty("aboxId") && Object.keys(box).length != 0 &&
          (box.ansList.length != 0 ? (
            <CoffeeBeanList aboxId={box.aboxId} ansList={box.ansList} cbList={CorA === "cbox" ? cbList : undefined} abList={CorA === "abox" ? abList : undefined} />
          ) : (
            <AboxBlank aboxId={box.aboxId} />
          ))}
      </CoffeeBeanListContainer>
    </WorkspaceContainer>
  );
}

export default WorkspaceBox;

const WorkspaceContainer = styled.div`
  display: grid;
  grid-template-columns: 15rem auto;
  grid-template-rows: 1fr 1fr 6fr;
  grid-template-areas:
    "header top"
    "header aside"
    "header contains";
  width: 100vw;
  height: 100vh;
`;

const MiddleContainer = styled.div`
  grid-area: aside;
  display: flex;
`;

const CoffeeBeanListContainer = styled.div`
  grid-area: contains;
  max-height: 100%;
  min-width: 70rem;
  overflow-y: scroll;
  /* 스크롤바 제거 */
  .scroll::-webkit-scrollbar {
    display: none;
  }

  .scroll {
    -ms-overflow-style: none; /* IE11 */
    scrollbar-width: none; /* Firefox */
  }
`;

const TopBarContainer = styled.div`
  grid-area: top;
  overflow: hidden;
`;

const SideNaviContainer = styled.div`
  grid-area: header;
`;

const Title = styled.div`
  width: 50%;
  margin-left: 3rem;
  margin-top: 1rem;
`;

// const ChatBotStyle = styled.div`
//   top: 49%;
//   left: 70%;
//   width: 25%;
//   height: 40%;
//   position: fixed;
// `;

const SearchContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
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
  margin-right: 1rem;
`;

const SearchInput = styled.input`
  background: rgba(248, 248, 248, 0.7);
  &:focus {
    outline: none;
  }
  width: 12rem;
  height: 1rem;
  border: none;
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