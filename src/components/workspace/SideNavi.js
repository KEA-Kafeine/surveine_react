import React,{ useState, useEffect } from "react";
import styled from "styled-components";
import LogoWhite from "../../img/sideNavi/logo_white.svg";
import defaultProfile from "../../img/sideNavi/default_profile.svg";
import GPSwhite from "../../img/sideNavi/GPS_white.svg";
import plusWhite from "../../img/sideNavi/plus_white.svg";
import settingsWhite from "../../img/sideNavi/settings_white.svg";
import toggleClose from "../../img/sideNavi/toggle_close.svg";
import toggleOpen from "../../img/sideNavi/toggle_open.svg";
import { Fort } from "@mui/icons-material";
import { click } from "@testing-library/user-event/dist/click";
import EditModal from "./EditModal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { uToken } from "../TokenAtom";
import { useRecoilValue } from "recoil";

export function SideNavi(props) {
  const tokenValue = useRecoilValue(uToken);
  const navigate = useNavigate();

  const Test = () => {
    console.log(props.memberName);
  };

  const [allCBList, setAllCBList] = useState([]);
  const [allABList, setAllABList] = useState([]);
  const [height, setHeight] = useState("0%");

  useEffect(() => {
    console.log("======TEST======");
    console.log(props);
    console.log(props.memberName);
    console.log(props.cbList);
    console.log(props.abList);

    setAllCBList([
      props.cbList[0],
      ...props.cbList
        .slice(1)
        .sort((a, b) => a.cboxName.localeCompare(b.cboxName)),
    ]);
    setAllABList([
      props.abList[0],
      ...props.abList
        .slice(1)
        .sort((a, b) => a.aboxName.localeCompare(b.aboxName)),
    ]);
  }, []);
  // [props.abList, props.cbList]

  // useEffect(() => {
  //   console.log("====TEST All List====");
  //   console.log(allCBList);
  //   console.log(allABList);
  // }, []);
  // [allCBList, allABList]

  const [CBToggle, setCBToggle] = useState(true);
  const [ABToggle, setABToggle] = useState(false);

  const handleCBToggle = () => {
    setCBToggle(!CBToggle);

    if(CBToggle == false)
    {
      setHeight("100%");
    }
    else{
      setHeight(`{height+10}`);
    }
   
  };
  const handleABToggle = () => {
    setABToggle(!ABToggle);
  };

  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folderType, setFolderType] = useState("");

  const addFolder = (folderType) => {
    setFolderType(folderType);
    setShowNewFolder(true);
  }
  const handleNewFolderSave = (folderName) => {
    setNewFolderName(folderName);
    setShowNewFolder(false);
  }

  const clickFolder = (folderType, folderId, folderName) => {
    // alert("CLICK " + folderType + ": " + folderId + ": " + folderName);

    // 폴더 조회: cbox, abox 따로
    let url = `api/wspace/cbox/${folderId}`;
    if(folderType === "abox") {
        url = `api/wspace/abox/${folderId}`;
    }

    axios.get(url, {
      headers: { Authorization: "Bearer " + String(tokenValue) },
    }).then((response) => {
      if(response.data) {
        let updatedFolderData = {};
        if(response.data.result.hasOwnProperty("cbox")) {
          updatedFolderData = response.data.result.cbox;
        } else if(response.data.result.hasOwnProperty("abox")) {
          updatedFolderData = response.data.result.abox;
        }
        props.onFolderDataChange(updatedFolderData);
      } else {
        alert("failed to");
      }
    }).catch(error => {
      console.error(error);
    });

    // <cm.TopBar_menu_item onClick={() => navigate("/workspace")}>Work Space</cm.TopBar_menu_item>
    // navigate(`/workspace/${}`)
  };

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  useEffect(() => {
    if(lat && lng) {
      // // TODO: Back
      // axios.put("/api/wspace/gps", {"lat": lat, "lng": lng}, {
      //   headers: { Authorization: "Bearer " + String(tokenValue) },
      // })
      // .then((response) => {
      //   if(response.data.isSuccess) {
      //     let GPSBoxData = [];
      //     GPSBoxData = response.data.result.GPSBox;
      //     props.onFolderDataChange(GPSBoxData);
      //     props.onChangeLat(lat);
      //     props.onChangeLng(lng);
      //   } else {
      //     alert("failed to");
      //   }
      // })
      // .catch((error) => {
      //   console.error("[ERROR] get GPS coffeebean list", error);
      // });

      // 하드코딩
      let GPSData = {
        "result": {
          // "abList": [
          //   {"aboxId": 1, "aboxName": "기본 참여함", "ansCnt": 2},
          //   {"aboxId": 2, "aboxName": "배고파", "ansCnt": 0}
          // ],
          "GPSBox": [
            {"enqId": 1, "enqName": "설문지1", "enqStatus": "SAVE", "updateDate": "2023.5.31"},
            {"enqId": 2, "enqName": "설문지2", "enqStatus": "SUBMIT", "updateDate": "2023.6.2"},
            {"enqId": 3, "enqName": "설문지3", "enqStatus": "WAIT", "updateDate": "2023.6.3"},
            {"enqId": 4, "enqName": "설문지4", "enqStatus": "WAIT", "updateDate": "2023.6.3"},
            {"enqId": 5, "enqName": "설문지1", "enqStatus": "SAVE", "updateDate": "2023.5.31"},
            {"enqId": 6, "enqName": "설문지2", "enqStatus": "SUBMIT", "updateDate": "2023.6.2"},
            {"enqId": 7, "enqName": "설문지3", "enqStatus": "WAIT", "updateDate": "2023.6.3"},
            {"enqId": 8, "enqName": "설문지4", "enqStatus": "WAIT", "updateDate": "2023.6.3"},
            {"enqId": 9, "enqName": "설문지1", "enqStatus": "SAVE", "updateDate": "2023.5.31"},
            {"enqId": 10, "enqName": "설문지2", "enqStatus": "SUBMIT", "updateDate": "2023.6.2"},
            {"enqId": 11, "enqName": "설문지3", "enqStatus": "WAIT", "updateDate": "2023.6.3"},
            {"enqId": 12, "enqName": "설문지3", "enqStatus": "WAIT", "updateDate": "2023.6.3"}
          ]
        }
      };
      let GPSBoxData = {};
      GPSBoxData = GPSData.result;
      props.onFolderDataChange(GPSBoxData);
      props.onChangeLat(lat);
      props.onChangeLng(lng);
    }
  }, [lat, lng]);

  const clickGPS = () => {
    // alert("GPS 설문함 클릭");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      (error) => {
        console.log("[ERROR] GPS: ", error);
        alert("위치에 엑세스 할 수 있도록 위치 권한을 허용해주세요.");
      }
    );
  };

  return (
    <>
      <Wrapper>
        <TopWapper>
          <Link to="/workspace/0">
            <Logo src={LogoWhite} />
          </Link>
          <Link to="/mypage">
            <EditProf src={settingsWhite} />
          </Link>
          <Profile src={defaultProfile} onClick={Test} />
          <ProfName>{props.memberName}</ProfName>
          <Line />
          <Category onClick={clickGPS}>
            <GPSIcon src={GPSwhite} />
            GPS 설문함
          </Category>
        </TopWapper>
        <BottomWapper>
          <Container>
            <FolderRow>
              <FolderCategory onClick={handleCBToggle}>
                <img src={CBToggle ? toggleOpen : toggleClose} onClick={handleCBToggle} />
                &nbsp; 제작함
              </FolderCategory>
              <div>
                <PlusBtn src={plusWhite} onClick={() => addFolder("제작함")} />
                {showNewFolder && (
                  <EditModal onClose={() => setShowNewFolder(false)} onSave={handleNewFolderSave} type={folderType} what="newFolder" />
                )}
              </div>
            </FolderRow>
            <FolderContainerTop height={height}>
              {CBToggle && (
                <div style={{display: "flex", flexDirection: "column"}}>
                  {allCBList.map((cbList) => (
                    <div key={cbList.cboxId}>
                      <Folder
                        key={cbList.cboxName}
                        onClick={() => clickFolder("cbox", cbList.cboxId, cbList.cboxName)}
                      > 
                        <FolderList>
                          <div>{cbList.cboxName}</div>
                          <div>{cbList.enqCnt}</div>
                        </FolderList>
                      </Folder>
                    </div>
                  ))}
                </div>
              )}
            </FolderContainerTop>

            <FolderRow>
              <FolderCategory onClick={handleABToggle}>
                <img src={ABToggle ? toggleOpen : toggleClose} onClick={handleABToggle} />
                &nbsp; 참여함
              </FolderCategory>
              <div>
                <PlusBtn src={plusWhite} onClick={() => addFolder("참여함")} />
                {showNewFolder && (
                  <EditModal onClose={() => setShowNewFolder(false)} onSave={handleNewFolderSave} type={folderType} what="newFolder" />
                )}
              </div>
            </FolderRow>
            <FolderContainerBottom>
              {ABToggle && (
                <div style={{display: "flex", flexDirection: "column"}}>
                  {allABList.map((abList) => (
                    <div key={abList.aboxId}>
                      <Folder
                        key={abList.aboxName}
                        onClick={() => clickFolder("abox", abList.aboxId, abList.aboxName)}
                      >
                        <FolderList>
                          <div>{abList.aboxName}</div>
                          <div>{abList.ansCnt}</div>
                        </FolderList>
                      </Folder>
                    </div>
                  ))}
                </div>
              )}
            </FolderContainerBottom>
          </Container>
        </BottomWapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #111536;
  flex-direction: column;
  align-items: center;
  vertical-align: center;
  font-family: "Poppins";
  color: white;
  
`;

const TopWapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
`;

const BottomWapper = styled.div`
  width: 100%;
  height: 50%;
  background-color: #111536;
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  position: absolute;
  top: 8px;
  left: 20px;
`;

const Profile = styled.img`
  position: absolute;
  top: 135px;
`;

const EditProf = styled.img`
  position: absolute;
  top: 95px;
  left: 195px;
`;

const ProfName = styled.div`
  position: absolute;
  top: 280px;
  font-weight: 900;
  font-size: 21px;
`;

const Line = styled.div`
  position: absolute;
  width: 196.67px;
  height: 0px;
  top: 335px;
  border: 0.5px solid white;
`;

const Category = styled.div`
  position: absolute;
  top: 370px;
  left: 45px;
  display: flex;
  flex-direction: row;
  font-weight: 700;
  font-size: 19px;
  cursor: pointer;
`;

const GPSIcon = styled.img`
  position: absolute;
  margin-right: 10px;
  left: -25px;
`;

const FolderRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const FolderList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
`;

const PlusBtn = styled.img`
  margin-right: 5px;
  cursor: pointer;
`;

const FolderCategory = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 102px;
  font-weight: 700;
  font-size: 19px;
  cursor: default;
`;

const Folder = styled.div`
  font-weight: 400;
  margin-top: 10px;
  margin-left: 26px;
  flex-basis: 100%;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FolderContainerTop = styled.div`
  width:95%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 0.001;
  margin-bottom: 20px;
  overflow-y: scroll;
  cursor: pointer;
`;

const FolderContainerBottom = styled.div`
  width: 95%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 0.001;
  margin-bottom: 20px;
  overflow-y: scroll;
  cursor: pointer;
`;