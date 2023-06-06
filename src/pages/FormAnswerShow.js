import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import "reactflow/dist/style.css";
import * as t from "../components/Form/FromStyled";
import Dots from "../img/form/dots.svg";
import AnonyTrue from "../img/form/on.svg";
import AnonyFalse from "../img/form/off.svg";
import { useParams } from "react-router";
import { uToken } from "../components/TokenAtom";
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

let ALL = {};
const DATA = [];

const FormQuestion = (props) => {
  const [text, setText] = useState("");

  const handleCheckboxChange = (qstId, qstType, optionId) => {
    const newAnswer = {
      qstId: qstId,
      qstType: qstType,
      optionId: optionId,
      answerText: "",
    };

    let updatedCheckedOptions = [...props.answerArr];

    const existingAnswerIndex = updatedCheckedOptions.findIndex(
      (answer) => answer.qstId === qstId && answer.optionId === optionId
    );

    if (existingAnswerIndex !== -1) {
      updatedCheckedOptions.splice(existingAnswerIndex, 1);
    } else {
      updatedCheckedOptions.push(newAnswer);
    }

    props.onUpdateArray(updatedCheckedOptions);
    console.log(props.answerArr);
  };

  const handleRadioChange = (qstId, qstType, optionId) => {
    const newAnswer = {
      qstId: qstId,
      qstType: qstType,
      optionId: optionId,
      answerText: "",
    };

    let updatedCheckedOptions = [...props.answerArr];

    const existingAnswerIndex = updatedCheckedOptions.findIndex(
      (answer) => answer.qstId === qstId && answer.optionId === optionId
    );

    if (existingAnswerIndex !== -1) {
      updatedCheckedOptions.splice(existingAnswerIndex, 1);
    } else {
      updatedCheckedOptions = updatedCheckedOptions.filter(
        (answer) => answer.qstId !== qstId
      );
      updatedCheckedOptions.push(newAnswer);
    }

    props.onUpdateArray(updatedCheckedOptions);
    console.log(props.answerArr);
  };

  const handleBlur = (qstId, qstType) => {
    // 포커스가 사라질 때 실행되는 로직을 작성합니다
    const newAnswer = {
      qstId: qstId,
      qstType: qstType,
      optionId: "",
      answerText: text,
    };
    const answerIndex = props.answerArr.findIndex(
      (answer) => answer.qstId === qstId
    );
    if (answerIndex !== -1) {
    } else {
      props.onUpdateArray([...props.answerArr, newAnswer]);
    }

    console.log(props.answerArr);
  };

  const onChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <t.MainFrameView>
      <t.QuestNum>
        {props.branch && props.branchQst !== "" && props.branchOpt !== "" ? (
          <>
            질문 {props.qstNum + " "}(
            {props.branchQstIndex !== 0
              ? `${props.branchQstIndex}-`
              : "부모 삭제됨 -"}
            {
              props.qstArr[props.branchQstIndex - 1]?.options?.find(
                (option) => option.optionId === props.branchOpt
              )?.optionContent
            }
            )
          </>
        ) : (
          "질문 " + props.qstNum
        )}
      </t.QuestNum>
      <t.QstFrame>
        <t.QstTitle>{props.qstTitle}</t.QstTitle>
      </t.QstFrame>
      <t.OptList>
        {props.qstType === "체크박스" &&
          props.options.map((it, index) => (
            <t.OptionListItem key={index}>
              <input
                type="checkbox"
                value={it}
                checked={props.answerArr.some(
                  (answer) => answer.optionId === it.optionId
                )}
                onChange={() =>
                  handleCheckboxChange(props.qstId, props.qstType, it.optionId)
                }
              />
              <t.OptionContent>{it.optionContent}</t.OptionContent>
            </t.OptionListItem>
          ))}
        {props.qstType === "객관식 질문" &&
          props.options.map((it, index) => (
            <t.OptionListItem key={index}>
              <input
                type="radio"
                value={it}
                checked={
                  props.answerArr.some(
                    (answer) => answer.optionId === it.optionId
                  )
                    ? true
                    : false
                }
                onClick={() =>
                  handleRadioChange(props.qstId, props.qstType, it.optionId)
                }
              />
              <t.OptionContent>{it.optionContent}</t.OptionContent>
            </t.OptionListItem>
          ))}

        {props.qstType === "서술형 질문" && (
          <t.SubjOptionCreate>
            <t.QstAnswer
              type="text"
              value={text}
              placeholder="질문에 대한 답변을 입력해주세요"
              onChange={onChange}
              onBlur={() => handleBlur(props.qstId, props.qstType)}
            />
          </t.SubjOptionCreate>
        )}
      </t.OptList>

      <t.Bottom>
        <t.BottomRight>
          {props.anonymous ? (
            <>
              <t.TagsEssen>익명</t.TagsEssen>
              <t.CheckImg src={AnonyTrue} alt="" />
            </>
          ) : (
            <>
              <t.TagsEssen>익명</t.TagsEssen>
              <t.CheckImg src={AnonyFalse} alt="" />
            </>
          )}
          {props.essential ? (
            <>
              <t.TagsEssen>필수</t.TagsEssen>
              <t.CheckImg src={AnonyTrue} alt="" />
            </>
          ) : (
            <>
              <t.TagsEssen>필수</t.TagsEssen>
              <t.CheckImg src={AnonyFalse} alt="" />
            </>
          )}
        </t.BottomRight>
        <t.BottomLeft></t.BottomLeft>
      </t.Bottom>
    </t.MainFrameView>
  );
};

function FormAnswer() {
  const [answerArr, setAnswerArr] = useState([]);
  const tokenValue = useRecoilValue(uToken);
  const { aboxId, ansId } = useParams();
  const [title, setTitle] = useState(""); // 설문 제목
  const [enqId, setEnqId] = useState("");
  const [name, setName] = useState(""); // 커피콩에 보일 제목
  const [qstArr, setQstArr] = useState(DATA); // 질문 배열
  const [memberId, setMemberId] = useState("");

  const [showFlow, setShowFlow] = useState(false); // 플로우 화면 보여주기 선택
  const [token, setToken] = useRecoilState(uToken);
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(aboxId);
  // console.log(ansId);
  const handleArrayUpdate = (updatedArr) => {
    setAnswerArr(updatedArr);
  };

  useEffect(() => {
    if (tokenValue == "") {
      console.log("로그인하세요");
      const from = location.pathname;
      console.log(from);
      navigate("/login", { state: { from } });
      return; // 로그인 페이지로
    }

    // console.log(url);
    // console.log(tokenValue);

    // axios
    //   .get(`/api/enq/url/${url}`, {
    //     headers: { Authorization: "Bearer " + String(tokenValue) },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     console.log(response.data.result.enqTitle);
    //     console.log(response.data.result.cont);
    //     console.log("아이디" + response.data.result.id);
    //     setMemberId(response.data.result.member_id);
    //     setEnqId(response.data.result.id);

    //     const newQstArr = response.data.result.cont; // 기존의 qstArr 배열을 새로운 배열로 복사합니다.
    //     setQstArr(newQstArr);
    //   });
  }, []);

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

  const postAns = async () => {
    if (ansId == "") {
      // ALL.memberId = memberId;
      ALL.aboxId = 1;
      ALL.enqId = enqId;
      ALL.ansCont = answerArr;
      console.log("token - " + tokenValue);

      axios
        .post("/api/ans/save", ALL, {
          headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
          console.log(response);
          alert("저장되었습니다");

          ALL = {};
        });
      console.log(JSON.stringify(ALL));
    } else {
      ALL.ansId = ansId;
      ALL.name = "설문";
      ALL.ansCont = answerArr;
      console.log("and Id는" + ansId);
      axios
        .put(`/api/ans/update/${ansId}`, ALL, {
          headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
          console.log(response);
          alert("저장되었습니다");
        });
    }
  };

  const submitAns = () => {
    postAns();

    axios
      .put(`/api/ans/submit/${ansId}`, null, {
        headers: { Authorization: "Bearer " + String(tokenValue) },
      })
      .then((response) => {
        console.log(response);
        alert("제출되었습니다.");
      });
  };

  return (
    <>
      <FormMain>
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
                  <t.FormButton onClick={postAns}>저장</t.FormButton>
                </QstBtn>
                <QstBtn>
                  <t.Export onClick={submitAns}>제출</t.Export>
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
          {qstArr.map((qst, index) => {
            if (qst.branch) {
              if (
                answerArr.findIndex(
                  (answer) => answer.optionId === qst.branchOpt
                ) !== -1
              ) {
                return (
                  <FormQuestion
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
                      qstArr.findIndex(
                        (qstfind) => qstfind.qstId === qst.branchQst
                      ) + 1
                    }
                    branchOpt={qst.branchOpt}
                    answerArr={answerArr}
                    onUpdateArray={handleArrayUpdate}
                  />
                );
              } else {
                return null;
              }
            } else {
              return (
                <FormQuestion
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
                    qstArr.findIndex(
                      (qstfind) => qstfind.qstId === qst.branchQst
                    ) + 1
                  }
                  branchOpt={qst.branchOpt}
                  answerArr={answerArr}
                  onUpdateArray={handleArrayUpdate}
                />
              );
            }
          })}
        </FormSection>
      </FormMain>
    </>
  );
}

export default FormAnswer;

// 도경 부분
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
