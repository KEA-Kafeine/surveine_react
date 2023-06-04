import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "reactflow/dist/style.css";
import * as t from "../components/Form/FromStyled";
import { useParams } from "react-router";
import QuestionResult from "../components/Form/QuestionResult";

const DATA = [];

function FormResult() {
  const [answerArr, setAnswerArr] = useState([]);
  const { enqId } = useParams();
  const [title, setTitle] = useState(""); // 설문 제목
  const [result, setResult] = useState("");

  const [name, setName] = useState(""); // 커피콩에 보일 제목
  const [qstArr, setQstArr] = useState(DATA); // 질문 배열

  const [showFlow, setShowFlow] = useState(false); // 플로우 화면 보여주기 선택

  const handleArrayUpdate = (updatedArr) => {
    setAnswerArr(updatedArr);
  };

  useEffect(() => {
    axios.get(`/api/enq/${enqId}`).then((response) => {
      console.log(response);
      const newQstArr = response.data.result.cont;
      setQstArr(newQstArr); // 기존의 qstArr 배열을 새로운 배열로 복사합니다.
    });

    axios.get(`/api/result/${enqId}`).then((response) => {
      console.log(response.data);
      setResult(response.data.result);
    });
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

  return (
    <>
      <FormMain>
        <FormSection>
          <Header>
            <HeaderHalf direction="left">
              <Menu></Menu>
            </HeaderHalf>
            <HeaderHalf direction="right">
              <HeadBtn>
                <QstBtn>
                  <t.FormButton onClick={onShowFlow}>Flow</t.FormButton>
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
                  (answer) => answer.optId === qst.branchOpt
                ) !== -1
              ) {
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
                    qstArr.findIndex(
                      (qstfind) => qstfind.qstId === qst.branchQst
                    ) + 1
                  }
                  branchOpt={qst.branchOpt}
                  answerArr={answerArr}
                  onUpdateArray={handleArrayUpdate}
                  result={
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
      </FormMain>
    </>
  );
}

export default FormResult;

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
