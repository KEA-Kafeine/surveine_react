import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { uToken } from "../components/TokenAtom";
import { useRecoilValue } from "recoil";
import * as cm from "../components/Common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../img/search.svg";
import CoffeeBeanList from "../components/workspace/CoffeeBeanList";
import { SboxBlank } from "../components/workspace/SboxBlank";

function SandBoxPage() {
  const tokenValue = useRecoilValue(uToken);
  const navigate = useNavigate();
  
  const [SBList, setSBList] = useState([]);
  const [cboxList, setCboxList] = useState([]);
  const [type, setType] = useState("sandbox");

  useEffect(() => {
    axios
      .get("/api/sbox", {
        headers: { Authorization: "Bearer " + String(tokenValue) },
      })
      .then((response) => {
        if (response.data.isSuccess) {
          console.log("===SAND BOX===");
          console.log(response.data.result);
          setSBList(response.data.result.sandboxCBList);
          setCboxList(response.data.result.cbList);
          setType("sandbox");
        } else {
          alert("failed to");
        }
      });
  }, []);

  const [selectedMenu, setSelectedMenu] = useState("sandbox")

  // Sand Box 메뉴 클릭
  const handleClickSandBox = (menu) => {
    setSelectedMenu(menu);

    axios
      .get("/api/sbox", {
        headers: { Authorization: "Bearer " + String(tokenValue) },
      })
      .then((response) => {
        if (response.data.isSuccess) {
          console.log("===SAND BOX===");
          console.log(response.data.result);
          setSBList(response.data.result.sandboxCBList);
          setCboxList(response.data.result.cbList);
          setType("sandbox");
        } else {
          alert("failed to");
        }
      });
  }

  // 추후 삭제
  useEffect(() => {
    console.log("====After SB===");
    console.log(SBList);
  }, [SBList]);

  // 관심 템플릿 메뉴 클릭
  const handleClickFavorite = (menu) => {
    setSelectedMenu(menu);

    axios
      .get("/api/sbox/favlist", {
        headers: { Authorization: "Bearer " + String(tokenValue) },
      })
      .then((response) => {
        if (response.data.isSuccess) {
          console.log("===FAVORITE TEMPLATE===");
          console.log(response.data.result);
          setSBList(response.data.result.favEnqList);
          setCboxList(response.data.result.cbList);
          setType("sandbox");
        } else {
          alert("failed to");
        }
      });
  }

  const clickSearch = () => {
    alert("검색 클릭");
  };

  return (
    <SandBoxPageContainer>
      <cm.TopBarDark>
        <cm.TopBar_Menu_left>
          {" "}
          <cm.WLogo style={{cursor: "pointer"}} onClick={() => navigate("/workspace/cbox/0")} />
        </cm.TopBar_Menu_left>
        <cm.TopBar_menu style={{ marginLeft: "5rem" }}>
          <cm.TopBar_menu_item_dark style={{cursor: "pointer"}} onClick={() => navigate("/workspace/cbox/0")}>Work Space</cm.TopBar_menu_item_dark>
          <cm.TopBar_menu_item_dark style={{cursor: "pointer"}} onClick={() => navigate("/sandbox")}>Sand Box</cm.TopBar_menu_item_dark>
        </cm.TopBar_menu>
        <cm.TopBar_Menu_right>
          <cm.LinkNone to="/login">
            <cm.BtnWhite>Login</cm.BtnWhite>
          </cm.LinkNone>
          <cm.TranslateBtn_white />
        </cm.TopBar_Menu_right>
      </cm.TopBarDark>

      <MenuWrapper>
        <MenuItem isSelected={selectedMenu === "sandbox"} onClick={() => handleClickSandBox("sandbox")}>
          Sand Box
        </MenuItem>
        <VerticalLine />
        <MenuItem isSelected={selectedMenu === "favTemplate"} onClick={() => handleClickFavorite("favTemplate")}>
          관심 템플릿
        </MenuItem>

        <SearchContainer>
          <SearchDiv>
            <SearchInput placeholder="검색하세요"></SearchInput>
            <SearchBtn onClick={clickSearch}>
              <StyledSerachBtn src={SearchIcon} />
            </SearchBtn>
          </SearchDiv>
        </SearchContainer>
      </MenuWrapper>

      <SBCBConatiner>
        {type === "sandbox" && (
          SBList.length != 0 ? (
            <CoffeeBeanList boxType="sbox" boxList={SBList} cbList={cboxList} />
          ) : (
            <SboxBlank />
          )
        )}
      </SBCBConatiner>

    </SandBoxPageContainer>
  );
}
export default SandBoxPage;

const SandBoxPageContainer = styled.div`
  display: block;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 11vh;
  margin-left: 7vw;
`;

const MenuItem = styled.div`
  margin: 0 1rem;
  cursor: pointer;
  font-size: 18px;
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 1.5rem;
  background-color: #6F6D6D;
  margin: 0 0.5rem;
`;

const SearchContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  margin-left: 35rem;
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
  margin-right: 1rem;
`;

const SearchInput = styled.input`
  background: rgba(248, 248, 248, 0.7);
  &:focus {
    outline: none;
  }
  width: 15rem;
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

const SBCBConatiner = styled.div`
  grid-area: contains;
  margin-left: 65px;
  margin-top: 30px;
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
