import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "reactflow/dist/style.css";
import * as t from "../components/Form/FromStyled";
import { useParams } from "react-router";
import QuestionResult from "../components/Form/QuestionResult";
import { uToken } from "../components/TokenAtom";
import { useRecoilValue, useRecoilState } from "recoil";
import DnDFlow from "../components/Form/DnDFlow";
const ALL = {};
const DATA = [];
const colors = [
  "#FF6384",
  "#dd524f",
  "#f28613",
  "#331a99",
  "#36A2EB",
  "#ff56cc",
  "#565fff",
  "#32CD32",
  "#FFD700",
  "#40E0D0",
  "#1E90FF",
  "#FF00FF",
  "#6A5ACD",
  "#FF69B4",
  "#00FF7F",
  "#DB7093",
  "#8B008B",
  "#FFA07A",
  "#20B2AA",
  "#87CEFA",
  "#778899",
  "#B0C4DE",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF4500",
  "#DC143C",
  "#00CED1",
  "#8B0000",
  "#9400D3",
  "#FF1493",
  "#00BFFF",
  "#696969",
  "#FF8C00",
  "#00FA9A",
  "#1E90FF",
  "#D8BFD8",
  "#C71585",
  "#0000CD",
  "#BC8F8F",
  "#708090",
  "#00FF00",
  "#4682B4",
  "#FFDAB9",
  "#CD5C5C",
  "#8FBC8F",
  "#B22222",
  "#FF6347",
  "#F0E68C",
  "#7B68EE",
];

function FormResult() {
  const [nodes, setNodes] = useState([]); //플로우 노드에 질문 추가
  const [edges, setEdges] = useState([]); // 플로우 관계 추가
  const [posNodes, setPosNodes] = useState([]);

  const [answerArr, setAnswerArr] = useState([]);
  const { enqId } = useParams();
  const [title, setTitle] = useState(""); // 설문 제목
  const [result, setResult] = useState("");
  const tokenValue = useRecoilValue(uToken);
  const [name, setName] = useState(""); // 커피콩에 보일 제목
  const [qstArr, setQstArr] = useState(DATA); // 질문 배열

  const [showFlow, setShowFlow] = useState(false); // 플로우 화면 보여주기 선택

  const handleArrayUpdate = (updatedArr) => {
    setAnswerArr(updatedArr);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await axios.get(`/api/enq/result/${enqId}`, {
          headers: { Authorization: "Bearer " + String(tokenValue) },
        });
        console.log(response2.data);
        setResult(response2.data.result);

        const response1 = await axios.get(`/api/enq/${enqId}`, {
          headers: { Authorization: "Bearer " + String(tokenValue) },
        });
        console.log(response1);
        const newQstArr = response1.data.result.cont;

        setQstArr(newQstArr);
        setTitle(response1.data.result.enqTitle);
        setPosNodes(response1.data.result.nodes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // 분기 플로우 만드는 부분
  useEffect(() => {
    let count = 0;
    //분기 플로우에 값 추가 만약 분기일시 id : "분기부모 - 분기자식", 라벨 : 질문 내용  , 위치  { x : 100 + ( 100 * 부모질문 값) y : 질문번호 * 100 }
    setNodes(
      qstArr.map((qst, index) => {
        //만약 질문이 브랜치일 경우
        if (qst.branch && qst.branchQst != "" && qst.branchOpt != "") {
          const xOffset = -100;

          // branchQstNode의 position 객체를 복사하여 변경합니다.

          return {
            id: qst.qstId,
            data: {
              qst: qst,
              qstResult:
                result.ansQstDto[
                  result.ansQstDto.findIndex((obj) => obj.qstId === qst.qstId)
                ],
              color:
                colors[
                  qstArr.findIndex((q) => q.qstId === qst.branchQst) % 100
                ],
            },

            position: {
              // 브랜치일 경우 부모 노드의 x 값  - 220 만큼 x값을 이동 시킴
              x: posNodes.find((node) => node.id === qst.qstId)
                ? posNodes.find((node) => node.id === qst.qstId).position.x
                : nodes.find((node) => node.id === qst.qstId)
                ? nodes.find((node) => node.id === qst.qstId).position.x
                : nodes.find((node) => node.id === qst.branchQst)
                ? nodes.find((node) => node.id === qst.branchQst).position.x +
                  -30 * (index % 5)
                : -100,
              //브랜치일 경우 부모 노드의 y값 + 100 + 질문번호 * 30 만큼 y값을 이동시킴
              y: posNodes.find((node) => node.id === qst.qstId)
                ? posNodes.find((node) => node.id === qst.qstId).position.y
                : nodes.find((node) => node.id === qst.qstId)
                ? nodes.find((node) => node.id === qst.qstId).position.y
                : 150 + nodes.find((node) => node.id === qst.branchQst)
                ? nodes.find((node) => node.id === qst.branchQst).position.y +
                  100
                : 100,
            },
            type: "result",
          };
        } else {
          // 만약 브랜치가 아니라 공통 질문일 경우에는 지금까지의 공통 질문중에 가장 질문 번호가 큰 것 바로 밑으로 가도록 한다.

          return {
            id: qst.qstId,
            data: {
              qst: qst,
              qstResult:
                result.ansQstDto[
                  result.ansQstDto.findIndex((obj) => obj.qstId === qst.qstId)
                ],
            },
            position: {
              x: posNodes.find((node) => node.id === qst.qstId)
                ? posNodes.find((node) => node.id === qst.qstId).position.x
                : nodes.find((node) => node.id === qst.qstId)
                ? nodes.find((node) => node.id === qst.qstId).position.x
                : 400, // 공통 질문일 경우에는 x값이 400으로 고정됨
              y: posNodes.find((node) => node.id === qst.qstId)
                ? posNodes.find((node) => node.id === qst.qstId).position.y
                : nodes.find((node) => node.id === qst.qstId)
                ? nodes.find((node) => node.id === qst.qstId).position.y
                : nodes[index - 1]
                ? nodes[index - 1].position.y + 200
                : 100,
            },
            type: "result",
          };
        }
      })
    );

    // 앳지 == 관계 선을 정의하는 코드
    setEdges(
      //질문 배열 을 map
      qstArr.map((qst, index) => {
        if (qst.branch && qst.branchQst !== "" && qst.branchOpt !== "") {
          // 만약 브랜치일 경우에는
          return {
            id: qst.qstId,
            source: qst.qstId,
            target:
              qstArr.find((q) => q.qstId === qst.branchQst)?.qstId || null,
            label: qstArr.find((q) => q.qstId === qst.branchQst)?.options
              ? qstArr
                  .find((q) => q.qstId === qst.branchQst)
                  ?.options.find((opt) => opt.optionId === qst.branchOpt)
                  ?.optionContent || "옵션없음"
              : "부모없음",
            arrowHeadType: "arrowclosed",
            style: {
              stroke:
                colors[qstArr.findIndex((q) => q.qstId === qst.branchQst)],
              strokeWidth: 3,
            },
            labelStyle: { fontSize: 13 },
          };
        } else {
          let maxIndex = index - 1;
          for (let i = index - 1; i >= 0; i--) {
            if (!qstArr[i].branch) {
              maxIndex = i;
              break;
            }
          }

          return {
            id: qst.qstId,
            source: qst.qstId,
            target: qstArr[maxIndex] ? qstArr[maxIndex].qstId : null,
            label: "공통질문",
            style: {
              stroke: "#1a2051",
              strokeWidth: 3,
            },
            labelStyle: { fontSize: 13 },
          };
        }
      })
    );
  }, [qstArr]);

  // 위치 변경된 flow 저장 , 저장할때마다 적용
  function editNodes(nodes) {
    setNodes(nodes);
    setPosNodes(
      nodes.map((node) => ({
        id: node.id,
        position: node.position,
      }))
    );
  }

  //제목 설정
  const onChangeInput = (e) => {
    setTitle(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onShowFlow = () => {
    setShowFlow(!showFlow);
  };

  return (
    <>
      {result && qstArr && (
        <FormMain>
          <FormSection>
            <Header>
              <HeaderHalf direction="left">
                <Menu></Menu>
              </HeaderHalf>
              <HeaderHalf direction="right">
                <HeadBtn>
                  <QstBtn>
                    <t.FormButton onClick={onShowFlow}>
                      결과 그래프
                    </t.FormButton>
                  </QstBtn>
                </HeadBtn>
              </HeaderHalf>
            </Header>
            <TitleInput>
              <TitleField>{title}</TitleField>
            </TitleInput>
            {qstArr &&
              qstArr.map((qst, index) => {
                if (qst.branch) {
                  return (
                    <QuestionResult
                      qstArr={qstArr}
                      qstNum={index + 1}
                      qstId={qst.qstId}
                      qstTitle={qst.qstTitle}
                      qstType={qst.qstType}
                      options={qst.options}
                      qstImg={qst.qstImg}
                      anonymous={qst.anonymous}
                      essential={qst.essential}
                      branch={qst.branch}
                      branchQst={qst.branchQst}
                      branchQstIndex={
                        qstArr &&
                        qstArr.findIndex(
                          (qstfind) => qstfind.qstId === qst.branchQst
                        ) + 1
                      }
                      branchOpt={qst.branchOpt}
                      answerArr={answerArr}
                      onUpdateArray={handleArrayUpdate}
                      result={
                        result &&
                        result.ansQstDto[
                          result.ansQstDto.findIndex(
                            (obj) => obj.qstId === qst.qstId
                          )
                        ]
                      }
                    />
                  );
                } else {
                  return (
                    <QuestionResult
                      qstArr={qstArr}
                      qstNum={index + 1}
                      qstId={qst.qstId}
                      qstTitle={qst.qstTitle}
                      qstType={qst.qstType}
                      options={qst.options}
                      qstImg={qst.qstImg}
                      anonymous={qst.anonymous}
                      essential={qst.essential}
                      branch={qst.branch}
                      branchQst={qst.branchQst}
                      branchQstIndex={
                        qstArr &&
                        qstArr.findIndex(
                          (qstfind) => qstfind.qstId === qst.branchQst
                        ) + 1
                      }
                      branchOpt={qst.branchOpt}
                      answerArr={answerArr}
                      onUpdateArray={handleArrayUpdate}
                      result={
                        result &&
                        result.ansQstDto[
                          result.ansQstDto.findIndex(
                            (obj) => obj.qstId === qst.qstId
                          )
                        ]
                      }
                    />
                  );
                }
              })}
          </FormSection>
          {showFlow && (
            <FlowFrame>
              {/* <ReactFlowProvider>
              <div style={{ height: 1000, backgroundColor: "white" }}>
                <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
                  <DownloadButton />
                  <Background variant="plain" />
                </ReactFlow>
              </div>
            </ReactFlowProvider> */}
              <DnDFlow nodes={nodes} edges={edges} editNodes={editNodes} />
            </FlowFrame>
          )}
        </FormMain>
      )}
    </>
  );
}

export default FormResult;
const FlowFrame = styled.div`
  width: 60%;
  height: 92%;
  background-color: white;
  border-radius: 2rem 2rem 2rem 2rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 15px 2px;
  z-index: -0.1;
  overflow: hidden;
  margin-left: 0.2rem;
  margin-right: 0.5rem;
`;
const FormMain = styled.div`
  background: #f5f5f5;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const FormSection = styled.div`
  width: 92vw;
  height: 92vh;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.45) 3px 3px 15px 0px;
  border-radius: 2rem 2rem 2rem 2rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  background-color: white;
`;

const HeaderHalf = styled.div`
  width: 50%;
  height: 10vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.direction};
  margin-left: 3rem;
  margin-right: 3rem;
`;
const Menu = styled.p`
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a2051;
`;

const TitleInput = styled.div`
  width: 100%;
  height: 5em;
  display: flex;
  justify-content: center;
  margin-top: 0rem;
  margin-bottom: 1rem;
`;

const TitleField = styled.div`
  width: 30rem;
  height: 3em;
  display: block;
  text-align: center;
  font-size: 1.1rem;
  border-radius: 1rem;
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameField = styled.input`
  &:focus {
    outline: none;
  }
  width: 15rem;
  height: 1em;
  display: block;
  text-align: center;
  font-size: 1rem;
  border-radius: 1rem;
  border: none;
`;

const HeadBtn = styled.div`
  display: flex;
  flex-direction: row;
`;

const QstBtn = styled.div`
  margin-left: 10px;
`;
