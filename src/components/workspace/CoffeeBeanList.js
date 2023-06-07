import React, { useEffect, useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import CoffeeBean from "./CoffeeBean";
import styled from "styled-components";
import PlusIcon from "../../img/PlusIcon.svg";

// function CoffeeBeanList(props, {fetchData}) {
function CoffeeBeanList(props) {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState(""); //검색해야하는 변수
  const [data, setData] = useState([]);
  const [boxId, setBoxId] = useState(0);

  const searchChange = (event) => {
    //search안에 들어가 있는 value를 바꿈
    setSearchValue(event.target.value);
  };

  const clickSearch = () => {
    //검색을 클릭했을 때 실행되야할 기능 구현
    alert("검색 클릭");
  };

  useEffect(() => {
    console.log("CB List - props: ", props);
    // setData(props.enqList);
    setData(props.boxList);
    setBoxId(props.boxId);
    // if(props.cboxId != undefined) {
    //   setData(props.enqList);
    //   setBoxId(props.cboxId);
    // } else if(props.aboxId != undefined) {
    //   setData(props.ansList);
    //   setBoxId(props.aboxId);
    // }
  }, [props.boxList]);

  useEffect(() => {
    console.log("CB List - props - enqList: ", data);
    // console.log("folder id: ", folderId);
    console.log(data);
    console.log(boxId);
  }, [data, boxId]);

  const cboxList = props.cbList;
  const aboxList = props.abList;

  return (
    <Wrapper>
      {props.boxType === "cbox" && (
        <FormList>
          {data
            .slice()
            .reverse()
            .map((coffeeBean) => (
              <CBContainer
                onDoubleClick={() => {
                  navigate(`/create/${boxId}/${coffeeBean.enqId}`);
                }}
                key={coffeeBean.enqId}
              >
                <CoffeeBean
                  cbId={coffeeBean.enqId}
                  cbName={coffeeBean.enqName}
                  cbStatus={coffeeBean.enqStatus}
                  distType={coffeeBean.distType}
                  updateDate={coffeeBean.updateDate}
                  isShared={coffeeBean.isShared}
                  cbList={cboxList}
                  abList={aboxList}
                  type="cbox"
                />
              </CBContainer>
            ))}
          <Link to={`/create/${boxId}`}>
            <PlusDiv>
              <StyledPlusIcon src={PlusIcon} />
            </PlusDiv>
          </Link>
        </FormList>
      )}

      {props.boxType === "abox" && (
        <FormList>
          {data
            .slice()
            .reverse()
            .map((coffeeBean) => (
              <CBContainer
                onDoubleClick={() => {
                  // navigate(`/answer/${boxId}/${coffeeBean.ansId}`);
                  navigate(`/showanswer/${boxId}/${coffeeBean.ansId}`);
                }}
                key={coffeeBean.ansId}
              >
                <CoffeeBean
                  cbId={coffeeBean.ansId}
                  cbName={coffeeBean.enqName}
                  cbStatus={coffeeBean.ansStatus}
                  distType={coffeeBean.distType}
                  updateDate={coffeeBean.updateDate}
                  isShow={coffeeBean.isShow}
                  cbList={cboxList}
                  abList={aboxList}
                  type="abox"
                />
              </CBContainer>
            ))}
        </FormList>
      )}

      {props.boxType === "sbox" && (
        <FormList>
          {data.map((coffeeBean) => (
            <SBContainer key={coffeeBean.enqId}>
              <CoffeeBean
                cbId={coffeeBean.enqId}
                cbName={coffeeBean.enqName}
                favCount={coffeeBean.favCount}
                fav={coffeeBean.fav}
                cbList={cboxList}
                type="sbox"
              />
            </SBContainer>
          ))}
        </FormList>
      )}

      {props.boxType === "gbox" && (
        <FormList>
          {data.map((coffeeBean) => (
            <CBContainer key={coffeeBean.enqId}>
              <CoffeeBean
                cbId={coffeeBean.enqId}
                cbName={coffeeBean.enqName}
                cbStatus={coffeeBean.enqStatus}
                updateDate={coffeeBean.updateDate}
                distType="GPS"
                abList={aboxList}
                type="gbox"
              />
            </CBContainer>
          ))}
        </FormList>
      )}
    </Wrapper>
  );
}
export default CoffeeBeanList;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  overflow-x: hidden;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;

  scrollbar-width: none; /* 파이어폭스 */
  -ms-overflow-style: none; /* IE, Edge */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const FormList = styled.div`
  display: flex;
  margin: 1rem 2rem;
  flex-wrap: wrap;
`;
const PlusDiv = styled.div`
  width: 5rem;
  height: 10rem;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPlusIcon = styled.img`
  width: 2rem;
  height: 2rem;
  display: inline;
`;

const CBContainer = styled.div`
  position: relative;
  width: 19%;
  height: 200px;
  margin-right: 70px;
  margin-bottom: 30px;
`;

const SBContainer = styled.div`
  position: relative;
  width: 19%;
  height: 200px;
  margin-right: 45px;
  margin-bottom: 30px;
`;
