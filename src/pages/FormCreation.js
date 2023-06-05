import React, { useEffect, useState } from "react";
import FormQuestion from "../components/FormQuestion";
import styled from "styled-components";
import { nanoid } from "nanoid";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactFlow, { Controls, Background, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import * as t from "../components/Form/FromStyled";
import Dots from "../img/form/dots.svg";
import Edit from "../img/form/edit.svg";
import X from "../img/form/x.svg";
import Add from "../img/form/add.svg";
import Check from "../img/form/check.svg";
import AnonyTrue from "../img/form/on.svg";
import AnonyFalse from "../img/form/off.svg";
import { useParams } from "react-router";
import { uToken } from "../components/TokenAtom";
import { useRecoilValue } from "recoil";
import Distribution from "../components/Distribution";
import TooltipNode from "../components/Form/TooltipNode";
import CustomNode from "../components/Form/CustomNode";
import { useNavigate } from "react-router-dom";
import DnDFlow from "../components/Form/DnDFlow";
import PickModal from "../components/Form/PickModal";
const ALL = {};
const DATA = [];
const colors = [
  "#FF6384",
  "#4BC0C0",
  "#FFCE56",
  "#E7E9ED",
  "#36A2EB",
  "#FF7F50",
  "#BA55D3",
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

const nodeTypes = {
  tooltip: TooltipNode,
  custom: CustomNode,
};
//저장

// const initialNodes2 = [
//   {
//     id: "Q-gt64hEhpXvuL_-lgIuHph",
//     position: {
//       x: 666.2302680956254,
//       y: 110.28325416034312,
//     },
//   },
// ];

// const firstQst = [
//   {
//     qstId: "Q-gt64hEhpXvuL_-lgIuHph",
//     qstTitle: "",
//     qstType: "체크박스",
//     options: [],
//     qstImg: "",
//     anonymous: false,
//     essential: false,
//     branch: false,
//     branchQst: "",
//     branchOpt: "",
//     qstNum: 1,
//     optionIndex: 0,
//   },
// ];
function FormCreation() {
  const navigate = useNavigate();
  const tokenValue = useRecoilValue(uToken);
  let { cboxId, enqId } = useParams();
  const [nodes, setNodes] = useState([]); //플로우 노드에 질문 추가
  const [edges, setEdges] = useState([]); // 플로우 관계 추가
  const [posNodes, setPosNodes] = useState([]);

  const [distribute, setDistribute] = useState(false);

  const [pick, setPick] = useState(false);
  const [title, setTitle] = useState(""); // 설문 제목

  const [name, setName] = useState(""); // 커피콩에 보일 제목

  const [qstArr, setQstArr] = useState(DATA); // 질문 배열

  const [type, setType] = useState("체크박스"); // 질문 타입
  const [qstTitle, setQstTitle] = useState("");

  const [input, setInput] = useState(""); //질문 옵션 input
  const [options, setOptions] = useState([]); // 질문 옵션
  const [qstImg, setQstImg] = useState(""); // 옵션 이미지
  const [anonymous, setAnonymous] = useState(false); //질문 익명 여부
  const [essential, setEssential] = useState(false); //질문 필수 여부

  const [branch, setBranch] = useState(false); // 질문 분기 여부
  const [branchQst, setBranchQst] = useState(""); // 분기 부모 질문 번호
  const [branchOpt, setBranchOpt] = useState(""); // 분기 부모 옵션

  const [showFlow, setShowFlow] = useState(false); // 플로우 화면 보여주기 선택
  const [qstNum, setQstNum] = useState(1); //질문 번호
  const [optionIndex, setOptionIndex] = useState(0);
  const [enqResponseId, setEnqResponseId] = useState("");

  // 옵션 Edit
  const [isEditingOptions, setEditingOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputEditOption, setInputEditOption] = useState("");
  const [enqStatus, setEnqStatus] = useState("ENQ_MAKE");

  useEffect(() => {
    if (enqId != null) {
      console.log(enqId);
      setEnqResponseId(enqId);

      axios
        .get(`/api/enq/${enqId}`, {
          headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
          console.log(response);
          console.log(response.data.result.enqTitle);
          console.log(response.data.result.cont);
          console.log(response.data.result.enqStatus);
          const newQstArr = response.data.result.cont; // 기존의 qstArr 배열을 새로운 배열로 복사합니다.
          setQstArr(newQstArr);

          setName(response.data.result.name);
          setEnqStatus(response.data.result.enqStatus);
        });
    } else {
    }
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
              color:
                colors[
                  qstArr.findIndex((q) => q.qstId === qst.branchQst) % 100
                ],
            },

            position: {
              // 브랜치일 경우 부모 노드의 x 값  - 220 만큼 x값을 이동 시킴
              x: nodes.find((node) => node.id === qst.qstId)
                ? nodes.find((node) => node.id === qst.qstId).position.x
                : nodes.find((node) => node.id === qst.branchQst)
                ? nodes.find((node) => node.id === qst.branchQst).position.x +
                  -30 * (index % 5)
                : -100,
              //브랜치일 경우 부모 노드의 y값 + 100 + 질문번호 * 30 만큼 y값을 이동시킴
              y: nodes.find((node) => node.id === qst.qstId)
                ? nodes.find((node) => node.id === qst.qstId).position.y
                : 150 + nodes.find((node) => node.id === qst.branchQst)
                ? nodes.find((node) => node.id === qst.branchQst).position.y +
                  100
                : 100,
            },
            type: "tooltip",
          };
        } else {
          // 만약 브랜치가 아니라 공통 질문일 경우에는 지금까지의 공통 질문중에 가장 질문 번호가 큰 것 바로 밑으로 가도록 한다.

          return {
            id: qst.qstId,
            data: {
              label: `${qst.anonymous ? "[익명] " : ""}${
                qst.essential ? "[필수] " : ""
              }${qst.qstTitle.slice(0, 40)}`,
              qst: qst,
            },
            position: {
              x: nodes.find((node) => node.id === qst.qstId)
                ? nodes.find((node) => node.id === qst.qstId).position.x
                : 400, // 공통 질문일 경우에는 x값이 400으로 고정됨
              y: nodes.find((node) => node.id === qst.qstId)
                ? nodes.find((node) => node.id === qst.qstId).position.y
                : nodes[index - 1]
                ? nodes[index - 1].position.y + 200
                : 100,
            },
            type: "tooltip",
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
    console.log(nodes);

    setPosNodes(
      nodes.map((node) => ({
        id: node.id,
        position: node.position,
      }))
    );
    console.log(posNodes);
  }

  //브랜치 설정
  const onToggle = (e) => {
    setBranch(!branch);
  };

  //익명 설정
  const onToggleAnony = (e) => {
    setAnonymous(!anonymous);
  };

  //필수 설정
  const onToggleEssen = (e) => {
    setEssential(!essential);
  };

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

  //질문 제목 설정
  const onQstTitleChange = (e) => {
    setQstTitle(e.target.value);
  };

  const clickDistriubtion = (e) => {
    postEnq();
    setDistribute(!distribute);
  };

  const clickPick = (e) => {
    setPick(!pick);
  };
  //질문 타입 설정
  const selectType = (e) => {
    setType(e.target.value);
  };

  //분기할 부모 질문 선택
  const selectBranchQst = (e) => {
    setBranchQst(qstArr[e.target.value - 1].qstId);
  };

  //분기할 부모 질문 옵션 선택
  const selectBranchOpt = (e) => {
    const selectedOption = qstArr.find((qst) => qst.qstId === branchQst)
      .options[e.target.selectedIndex - 1];
    console.log(selectedOption.optionId);
    setBranchOpt(selectedOption.optionId);
    setOptionIndex(e.target.selectedIndex);
  };

  // 질문 편집
  function editOption(event, option) {
    event.preventDefault();
    const editOptionList = options.map((opt) => {
      if (option.optionId === opt.optionId) {
        return {
          ...opt,
          optionContent: inputEditOption,
        };
      }
      return opt;
    });

    setOptions(editOptionList);
    setEditingOptions(!isEditingOptions);
  }

  function setEditingOptionState(e, it) {
    e.preventDefault();
    onSetSelectedOption(e, it.optionId);
  }
  const handleOptionEditChange = (e) => {
    setInputEditOption(e.target.value);
  };

  const onSetSelectedOption = (event, optionId) => {
    event.preventDefault();
    setSelectedOption(optionId);
    setEditingOptions(!isEditingOptions);
  };

  //질문 drag drop
  const handleDragDrop = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderQst = [...qstArr];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedQst] = reorderQst.splice(sourceIndex, 1);
      reorderQst.splice(destinationIndex, 0, removedQst);

      return setQstArr(reorderQst);
    }
  };

  // 새로 생성된 질문 배열에 추가
  const addQst = (event) => {
    event.preventDefault();

    const newQst = {
      qstId: "Q-" + nanoid(),
      qstTitle: qstTitle,
      qstType: type,
      options: options,
      qstImg: qstImg,
      anonymous: branch
        ? qstArr.find((q) => q.qstId == branchQst)?.anonymous // 부모의 익명 여부를 확인하고 부모가 익명일시 -> 자식도 익명 부모가 익명이 아니면 -> 자식은 마음대로 해도됨
          ? true
          : anonymous
        : anonymous,
      essential: essential,
      branch: branch,
      branchQst: branchQst,
      branchOpt: branchOpt,
      qstNum: qstNum,
      optionIndex: optionIndex,
    };

    if (newQst.branch === true) {
      const reorderQst = [...qstArr];
      const sourceIndex = qstArr.findIndex(
        (qst) => qst.qstId == newQst.branchQst
      );

      reorderQst.splice(sourceIndex + 1, 0, newQst);
      setQstArr(reorderQst);
    } else {
      setQstArr([...qstArr, newQst]);
      console.log(newQst);
    }

    setQstTitle("");
    setOptions([]);
    setQstNum(qstNum + 1);
    setBranch(false);
    setBranchQst(0);
    setBranchOpt("");
    setAnonymous(false);
    setEssential(false);
  };

  const postEnq = async () => {
    if (enqResponseId === "") {
      ALL.cboxId = cboxId;
      ALL.enqName = name;
      ALL.enqTitle = title;
      ALL.enqCont = qstArr;

      axios
        .put("/api/enq/create", ALL, {
          headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
          setEnqResponseId(response.data.result.enqId);
          alert("저장되었습니다");
        });
      console.log(tokenValue);
      console.log(JSON.stringify(ALL));
    } else {
      ALL.enqName = name;
      ALL.enqId = enqResponseId;
      ALL.enqCont = qstArr;

      enqId = enqResponseId;
      axios
        .put(`/api/enq/update/${enqId}`, ALL, {
          headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
          console.log(response);
        });
    }
  };

  //질문 편집하기
  function editQst(qstId, qstTitle, qstType, options, anonymous, essential) {
    const editedQstList = qstArr.map((qst) => {
      if (qstId === qst.qstId) {
        console.log(options);
        return {
          ...qst,
          qstTitle: qstTitle,
          qstType: qstType,
          options: options,
          qstImg: qstImg,
          anonymous: qst.branch
            ? qstArr.find((q) => q.qstId == qst.branchQst)?.anonymous
              ? true
              : anonymous
            : anonymous,
          essential: essential,
        };
      }
      return qst;
    });

    for (let i = 0; i < editedQstList.length; i++) {
      editedQstList[i].anonymous = editedQstList[i].branch
        ? editedQstList.find((q) => q.qstId == editedQstList[i].branchQst)
            ?.anonymous
          ? true
          : editedQstList[i].anonymous
        : editedQstList[i].anonymous;
    }
    setQstArr(editedQstList);
  }

  //질문 지우기
  function deleteQst(qstId, qstNum) {
    let remainingQst = qstArr.filter((task) => qstId !== task.qstId);
    setQstArr(remainingQst);
  }

  function openResult() {
    navigate(`/result/${enqId}`);
  }
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //옵션 추가하기
  function AddOption(e) {
    e.preventDefault();
    console.log("Success!");
    console.log(input);
    if (!input || /^\s*$/.test(input)) {
      return;
    }

    const newOption = {
      optionContent: input,
      optionId: "O-" + nanoid(),
    };

    const newOptions = [...options, newOption];

    setOptions(newOptions);
    setInput("");
  }

  function DeleteOption(event, option) {
    event.preventDefault();
    let remainingOptions = options.filter(
      (it) => it.optionId !== option.optionId
    );
    setOptions(remainingOptions);
  }

  const QstList = qstArr.map((qst, index) => (
    <Draggable draggableId={qst.qstId} index={index} key={qst.qstId}>
      {(provided) => (
        <div
          className="qst-container"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <FormQuestion
            qstArr={qstArr}
            qstNum={index + 1}
            qstId={qst.qstId}
            qstTitle={qst.qstTitle}
            deleteTask={deleteQst}
            editTask={editQst}
            qstType={qst.qstType}
            options={qst.options}
            qstImg={qst.qstImg}
            anonymous={qst.anonymous}
            essential={qst.essential}
            branch={qst.branch}
            branchQst={qst.branchQst}
            branchQstIndex={
              qstArr.findIndex((qstfind) => qstfind.qstId === qst.branchQst) + 1
            }
            branchOpt={qst.branchOpt}
          />
        </div>
      )}
    </Draggable>
  ));

  return (
    <>
      <FormMain distribute={distribute}>
        <FormSection>
          <Header>
            <HeaderHalf direction="left">
              <Menu>
                {" "}
                <NameField
                  type="text"
                  value={name}
                  placeholder="파일 이름을 입력하세요"
                  onChange={onChangeName}
                />
              </Menu>
            </HeaderHalf>
            <HeaderHalf direction="right">
              <HeadBtn>
                <QstBtn>
                  <t.FormButton onClick={onShowFlow}>Flow</t.FormButton>
                </QstBtn>
                <QstBtn>
                  <t.FormButton onClick={postEnq}>저장</t.FormButton>
                </QstBtn>
                <QstBtn>
                  <t.ResponseStatus>
                    <t.FormButton onClick={clickPick}>추첨</t.FormButton>
                  </t.ResponseStatus>
                </QstBtn>
                <QstBtn>
                  <t.ResponseStatus>
                    <t.FormButton onClick={openResult}>결과분석</t.FormButton>
                  </t.ResponseStatus>
                </QstBtn>
                <QstBtn>
                  <t.Export onClick={clickDistriubtion}>배포</t.Export>
                </QstBtn>
                <QstBtn>
                  <t.Dots src={Dots} alt="Dots" />
                </QstBtn>
              </HeadBtn>
            </HeaderHalf>
          </Header>
          <TitleInput>
            <TitleField
              type="text"
              value={title}
              placeholder="설문 제목을 입력하세요"
              onChange={onChangeInput}
            />
          </TitleInput>
          {
            <div>
              <DragDropContext onDragEnd={handleDragDrop}>
                <Droppable droppableId="ROOT" type="group">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {QstList}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          }
          <t.MainFrame>
            <t.QuestNum>질문</t.QuestNum>
            <t.QuesTitle
              type="text"
              value={qstTitle}
              placeholder="질문 제목을 입력하세요"
              onChange={onQstTitleChange}
            />

            <t.TypeSelect>
              <t.SelectOption onChange={selectType}>
                <option id="checkBox">체크박스</option>
                <option>객관식 질문</option>
                <option>서술형 질문</option>
              </t.SelectOption>
            </t.TypeSelect>

            {type === "체크박스" && (
              <div>
                <t.OptList>
                  {options.map((it, index) => (
                    <t.OptionListItem key={index}>
                      <t.OptionListItemLeft>
                        <input type="checkbox" value={it.optionId} />
                        {selectedOption === it.optionId && isEditingOptions ? (
                          <t.AddOptionInput
                            type="text"
                            placeholder="옵션 편집"
                            value={inputEditOption}
                            name="text"
                            onChange={handleOptionEditChange}
                          />
                        ) : (
                          <t.OptionContent>{it.optionContent}</t.OptionContent>
                        )}
                      </t.OptionListItemLeft>

                      <t.OptionListItemRight>
                        {selectedOption === it.optionId && isEditingOptions ? (
                          <t.OptionEdit
                            src={Check}
                            alt="Check"
                            onClick={(event) => editOption(event, it)}
                          />
                        ) : (
                          <t.OptionEdit
                            src={Edit}
                            alt="Edit"
                            onClick={(event) =>
                              setEditingOptionState(event, it)
                            }
                          />
                        )}
                        <t.Delete
                          src={X}
                          alt="x"
                          onClick={(event) => DeleteOption(event, it)}
                        />
                      </t.OptionListItemRight>
                    </t.OptionListItem>
                  ))}
                </t.OptList>

                <t.OptionListItem>
                  <t.OptionListItemLeft>
                    <t.AddOption src={Add} alt="Add" onClick={AddOption} />

                    <t.AddOptionInput
                      type="text"
                      placeholder="옵션"
                      value={input}
                      name="text"
                      onChange={handleChange}
                    />
                  </t.OptionListItemLeft>
                </t.OptionListItem>
              </div>
            )}

            {type === "객관식 질문" && (
              <div>
                <t.OptList>
                  {options.map((it, index) => (
                    <t.OptionListItem key={index}>
                      <t.OptionListItemLeft>
                        <input type="radio" value={it.optionId} />
                        {selectedOption === it.optionId && isEditingOptions ? (
                          <t.AddOptionInput
                            type="text"
                            placeholder="옵션 편집"
                            value={inputEditOption}
                            name="text"
                            onChange={handleOptionEditChange}
                          />
                        ) : (
                          <t.OptionContent>{it.optionContent}</t.OptionContent>
                        )}
                      </t.OptionListItemLeft>

                      <t.OptionListItemRight>
                        {selectedOption === it.optionId && isEditingOptions ? (
                          <t.OptionEdit
                            src={Check}
                            alt="Check"
                            onClick={(event) => editOption(event, it)}
                          />
                        ) : (
                          <t.OptionEdit
                            src={Edit}
                            alt="Edit"
                            onClick={(event) =>
                              setEditingOptionState(event, it)
                            }
                          />
                        )}
                        <t.Delete
                          src={X}
                          alt="x"
                          onClick={(event) => DeleteOption(event, it)}
                        />
                      </t.OptionListItemRight>
                    </t.OptionListItem>
                  ))}
                </t.OptList>
                <t.OptionListItem>
                  <t.OptionListItemLeft>
                    <t.AddOption src={Add} alt="Add" onClick={AddOption} />

                    <t.AddOptionInput
                      type="text"
                      placeholder="옵션"
                      value={input}
                      name="text"
                      onChange={handleChange}
                    />
                  </t.OptionListItemLeft>
                </t.OptionListItem>
              </div>
            )}

            {type === "서술형 질문" && (
              <t.SubjOption>
                텍스트
                <hr align="left" size="1" width="570px" color="gray" />
              </t.SubjOption>
            )}

            <t.OptionWrapper>
              <t.RightOptionWrapper>
                <t.TagsEssen>익명</t.TagsEssen>
                {anonymous ? (
                  <t.CheckImg
                    src={AnonyTrue}
                    alt="Edit"
                    onClick={onToggleAnony}
                  />
                ) : (
                  <t.CheckImg
                    src={AnonyFalse}
                    alt="Edit"
                    onClick={onToggleAnony}
                  />
                )}
                <t.TagsEssen>필수</t.TagsEssen>
                {essential ? (
                  <t.CheckImg
                    src={AnonyTrue}
                    alt="Edit"
                    onClick={onToggleEssen}
                  />
                ) : (
                  <t.CheckImg
                    src={AnonyFalse}
                    alt="Edit"
                    onClick={onToggleEssen}
                  />
                )}
                <t.TagsEssen>분기</t.TagsEssen>
                {branch ? (
                  <t.CheckImg src={AnonyTrue} alt="Edit" onClick={onToggle} />
                ) : (
                  <t.CheckImg src={AnonyFalse} alt="Edit" onClick={onToggle} />
                )}

                {branch && (
                  //질문 브랜치 선택하기
                  <>
                    <t.SelectOption
                      onChange={selectBranchQst}
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>
                        질문선택
                      </option>

                      {qstArr.map(
                        (value, index) =>
                          value.options.length > 0 && (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                      )}
                    </t.SelectOption>
                    <t.SelectOption
                      onChange={selectBranchOpt}
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>
                        옵션선택
                      </option>
                      {qstArr.map(
                        (value, index) =>
                          value.qstId == branchQst &&
                          value.options.map((value, index) => (
                            <option key={index}>{value.optionContent}</option>
                          ))
                      )}
                    </t.SelectOption>
                  </>
                )}
              </t.RightOptionWrapper>
              <t.LeftOptionWrapper>
                <t.OptionEdit src={Check} alt="check" onClick={addQst} />
              </t.LeftOptionWrapper>
            </t.OptionWrapper>
          </t.MainFrame>
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
      {distribute ? (
        <Distribution
          clickDistriubtion={clickDistriubtion}
          enqStatus={enqStatus}
          enqId={enqResponseId}
        />
      ) : null}

      {pick ? <PickModal /> : null}
    </>
  );
}

export default FormCreation;

const FlowFrame = styled.div`
  width: 60%;
  height: 92%;
  background-color: white;
  border-radius: 2rem 2rem 2rem 2rem;

  border: 1px solid black;
  overflow: hidden;
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
  ${({ distribute }) => distribute && `filter: blur(2px);`}
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

const TitleField = styled.input`
  width: 30rem;
  height: 3em;
  display: block;
  text-align: center;
  font-size: 1rem;
  border-radius: 1rem;
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
