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
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import EnqSetIcon from "../img/workspace/enqSetting.svg";
import FolderSettings from "../components/workspace/FolderSettings";
import { GPSBlank } from "../components/workspace/GPSBlank";
import {
  memNameToken,
  cbListToken,
  abListToken,
  boxToken,
  CorAToken,
} from "../components/TokenAtom";

import KakaoMap from "../components/workspace/KakaoMap";
import { Button } from "antd";
import { DownOutlined, UpOutlined } from '@ant-design/icons';

function Workspace() {
  const tokenValue = useRecoilValue(uToken);
  const navigate = useNavigate();

  // back이랑 소통할 때!
  const [resp, setResp] = useState({});

  const clickSearch = () => {
    alert("검색 클릭");
  };

  // const memName = useRecoilValue(memNameToken);
  const [memName, setMemName] = useRecoilState(memNameToken);
  const [cbList, setCbList] = useRecoilState(cbListToken);
  const [abList, setAbList] = useRecoilState(abListToken);
  // const [box, setBox] = useRecoilState(boxToken);
  const [CorA, setCorA] = useRecoilState(CorAToken);

  const [box, setBox] = useState({});

  // useEffect(() => {
  //   console.log("====WS TEST====");
  //   console.log(memName);
  //   console.log(cbList);
  //   console.log(abList);
  //   // console.log(box); // 비어있어
  //   console.log(CorA);
  // }, []);

  // const [memName, setMemName] = useState("");
  // const [cbList, setCbList] = useState([]);
  // const [abList, setAbList] = useState([]);
  // const [box, setBox] = useState({});
  // const [CorA, setCorA] = useState("");

  // // back이랑 소통할 때!
  // useEffect(() => {
  //   axios
  //     .get("/api/wspace/cbox/0", {
  //       headers: { Authorization: "Bearer " + String(tokenValue) },
  //     })
  //     .then((response) => {
  //       if (response.data) {
  //         console.log("====FIRST====");
  //         console.log(response.data);
  //         console.log(response.data.result);

  //         setMemName(response.data.result.memName);
  //         setCbList(response.data.result.cboxList);
  //         setAbList(response.data.result.aboxList);

  //         if (response.data.result.hasOwnProperty("cbox")) {
  //           setBox(response.data.result.cbox);
  //           setCorA("cbox");
  //         } else if (response.data.result.hasOwnProperty("abox")) {
  //           setBox(response.data.result.abox);
  //           setCorA("abox");
  //         }
  //       } else {
  //         alert("failed to");
  //       }
  //     });
  // }, []);

  const [upFolderData, setUpFolderData] = useState({});
  // const [boxId, setBoxId] = useState(0);
  const handleFolderDataChange = (folderData) => {
    console.log("===WHY NOT===");
    console.log(folderData);
    setUpFolderData(folderData);

    // // URL: workspace/${folderId}
    // if(folderData.hasOwnProperty("cboxId")) {
    //   // setBoxId(folderData.cboxId);
    //   // console.log("FOLDER ID: ", folderData.cboxId);
    //   navigate(`/workspace/cbox/${folderData.cboxId}`);
    // } else if(folderData.hasOwnProperty("aboxId")) {
    //   // setBoxId(folderData.aboxId);
    //   navigate(`/workspace/abox/${folderData.aboxId}`);
    // }
  };
  useEffect(() => {
    if(upFolderData.hasOwnProperty("cboxId")) {
      navigate(`/workspace/cbox/${upFolderData.cboxId}`);
    } else if(upFolderData.hasOwnProperty("aboxId")) {
      navigate(`/workspace/abox/${upFolderData.aboxId}`);
    }
  }, [upFolderData, navigate]);

  useEffect(() => {
    console.log("===YEAH===");
    console.log(upFolderData);
    setBox(upFolderData);
  }, [upFolderData]);
  useEffect(() => {
    console.log("====PLEASE====");
    console.log(box);
  }, [box]);

  const [folderSet, setFolderSet] = useState(false);
  const clickSettings = (boxId) => {
    // alert(boxId + " click settings");
    setFolderSet(true);
  };
  const closeModal = () => {
    setFolderSet(false);
  };

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const handleChangeLat = (changeLat) => {
    setLat(changeLat);
  };
  const handleChangeLng = (changeLng) => {
    setLng(changeLng);
  };

  // 아래 추가
  const [isExpanded, setIsExpanded] = useState(true);
  const handleZoomToggle = () => {
    setIsExpanded(prevExpanded => !prevExpanded);
  };
  
  return (
    <WorkspaceContainer>
      <SideNaviContainer>
        {memName && (
          <SideNavi
            memberName={memName}
            cbList={cbList}
            abList={abList}
            onChangeLat={handleChangeLat}
            onChangeLng={handleChangeLng}
            onFolderDataChange={handleFolderDataChange}
          />
        )}
      </SideNaviContainer>
      <TopBarContainer>
        <cm.TopBarWhite>
          <cm.TopBar_menu style={{ marginLeft: "5rem" }}>
            <cm.TopBar_menu_item
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/workspace/cbox/0")}
            >
              Work Space
            </cm.TopBar_menu_item>
            <cm.TopBar_menu_item
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/sandbox")}
            >
              Sand Box
            </cm.TopBar_menu_item>
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
          {box.hasOwnProperty("GPSBox") && (
            <div>
              GPS 설문함
              <h3>내 주변의 설문지</h3>
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
          {box.cboxName !== "기본 제작함" && box.aboxName !== "기본 참여함" && (
            <div>
              <StyledSetBtn
                src={EnqSetIcon}
                onClick={() =>
                  clickSettings(box.cboxName ? box.cboxId : box.aboxId)
                }
              />
              {folderSet && (
                <FolderSettings
                  onClose={closeModal}
                  boxId={box.cboxName ? box.cboxId : box.aboxId}
                  boxName={box.cboxName ? box.cboxName : box.aboxName}
                  type={box.cboxName ? "cbox" : "abox"}
                />
              )}
            </div>
          )}
        </SearchContainer>
      </MiddleContainer>

      <CoffeeBeanListContainer>
        {box.hasOwnProperty("cboxId") &&
          Object.keys(box).length != 0 &&
          (box.enqList.length != 0 ? (
            // <CoffeeBeanList cboxId={box.cboxId} enqList={box.enqList} cbList={CorA === "cbox" ? cbList : undefined} abList={CorA === "abox" ? abList : undefined} />
            <CoffeeBeanList
              boxType="cbox"
              boxId={box.cboxId}
              boxList={box.enqList}
              cbList={cbList}
              abList={undefined}
            />
          ) : (
            <CboxBlank cboxId={box.cboxId} />
          ))}
        {box.hasOwnProperty("aboxId") &&
          Object.keys(box).length != 0 &&
          (box.ansList.length != 0 ? (
            // <CoffeeBeanList boxType="abox" boxId={box.aboxId} boxList={box.ansList} cbList={CorA === "cbox" ? cbList : undefined} abList={CorA === "abox" ? abList : undefined} />
            <CoffeeBeanList
              boxType="abox"
              boxId={box.aboxId}
              boxList={box.ansList}
              cbList={undefined}
              abList={abList}
            />
          ) : (
            <AboxBlank aboxId={box.aboxId} />
          ))}
        {box.hasOwnProperty("GPSBox") && (
          <div>
            {box.GPSBox.length != 0 ? (
              <CoffeeBeanList
                boxType="gbox"
                boxList={box.GPSBox}
                abList={abList}
              />
            ) : (
              <GPSBlank />
            )}
            <MapWrapper isExpanded={isExpanded}>
              <MapTitle isExpanded={isExpanded}>
                <div style={{marginLeft: "1.4rem"}}>Kakao</div>
                <div style={{marginLeft: "0.3rem", color: "#FFFFFF", fontWeight: "800"}}>Map</div>

                {isExpanded ? (
                  <div style={{marginLeft: "14.3rem"}}>
                    <DownOutlined onClick={handleZoomToggle} />
                  </div>
                ) : (
                  <div style={{marginLeft: "14.3rem"}}>
                    <UpOutlined onClick={handleZoomToggle} />
                  </div>
                )}
              </MapTitle>
              <MapContainer isExpanded={isExpanded}>
                <KakaoMap lat={lat} lng={lng} />
              </MapContainer>
            </MapWrapper>
          </div>
        )}
      </CoffeeBeanListContainer>
    </WorkspaceContainer>
  );
}

export default Workspace;

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
  flex-direction: row;
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

const StyledSetBtn = styled.img`
  width: 0.4rem;
  margin: 0.4rem 1.5rem 3.2rem 0.5rem;
`;

const SubInfoBottom = styled.div`
  position: absolute;
  right: 2rem;
  top: 27rem;
  height: 10vh;
  width: 25vw;
`;

const MapWrapper = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 2vh;
  width: 25vw;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  background: #1a2051;
  z-index: 3;
  
  height: ${props => props.isExpanded ? "40vh" : "5vh"};
  transition: height 0.3s ease;
`;

const MapTitle = styled.div`
  display: flex;
  flex-direction: row;
  height: 4vh;
  align-items: center;
  font-weight: 700;
  // color: #FFFFFF;
  color: #FFE400;;

  // justify-content: ${props => props.isExpanded ? "space-between" : "center"};
`;

const MapContainer = styled.div`
  flex: 1;
  overflow: hidden;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  display: ${props => props.isExpanded ? "block" : "none"};
`;