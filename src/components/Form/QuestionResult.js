import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "reactflow/dist/style.css";
import * as t from "../Form/FromStyled";
import AnonyTrue from "../../img/form/on.svg";
import AnonyFalse from "../../img/form/off.svg";
import ResultChart from "../Form/ResultChart";
import ResultBarChart from "./ResultBarChart";
import { PropaneSharp } from "@mui/icons-material";

const QuestionResult = (props) => {
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
        {(props.qstType === "체크박스" || props.qstType === "객관식 질문") && (
          <>
            <ChartMainWrapper>
              <ChartWrapper>
                {" "}
                <ResultChart
                  options={props.options.map((option) => option.optionContent)}
                  category={"전체응답"}
                  result={
                    props.result &&
                    props.result.qstAnsKind.all.map((option) => option.optCnt)
                  }
                />
              </ChartWrapper>
              <ChartWrapperChild>
                {" "}
                <Child>
                  <ResultChart
                    options={props.options.map(
                      (option) => option.optionContent
                    )}
                    result={
                      props.result &&
                      props.result.qstAnsKind.gender.man.map(
                        (option) => option.optCnt
                      )
                    }
                    category={"남자"}
                  />
                </Child>
                <ChildT>
                  <ResultChart
                    options={props.options.map(
                      (option) => option.optionContent
                    )}
                    result={
                      props.result &&
                      props.result.qstAnsKind.gender.woman.map(
                        (option) => option.optCnt
                      )
                    }
                    category={"여자"}
                  />
                </ChildT>
              </ChartWrapperChild>
            </ChartMainWrapper>
            <BarChartWrapper>
              <ResultBarChart
                age={props.result && props.result.qstAnsKind.age}
                qst={props.options}
              />
            </BarChartWrapper>
            {props.options.map((option, index) => (
              <t.OptionListItem key={index}>
                <input
                  type="checkbox"
                  value={option.optionId}
                  checked={props.answerArr.some(
                    (answer) => answer.optionId === option.optionId
                  )}
                />
                <t.OptionContent>{option.optionContent}</t.OptionContent>
                <t.OptionContent>
                  {props.result &&
                    props.result.qstAnsKind.all.find(
                      (obj) => obj.optId === option.optionId
                    )?.optCnt}
                </t.OptionContent>
              </t.OptionListItem>
            ))}
          </>
        )}

        {props.qstType === "객관식 질문" && (
          <>
            {props.options.map((option, index) => (
              <t.OptionListItem key={index}>
                <input type="radio" value={option.optionId} />
                <t.OptionContent>{option.optionContent}</t.OptionContent>
              </t.OptionListItem>
            ))}
          </>
        )}

        {props.qstType === "서술형 질문" && (
          <t.AnswerBox>
            {props.result.qstAns.map((qst) => {
              return <p>{qst}</p>;
            })}
          </t.AnswerBox>
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

export default QuestionResult;

const ChartMainWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  margin-bottom: 1rem;
`;

const ChartWrapper = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 1px 1px 1px 1px gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
`;

const BarChartWrapper = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 1px 1px 1px 1px gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  margin-bottom: 1rem;
`;

const ChartWrapperChild = styled.div`
  width: 100%;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 1rem;
`;

const Child = styled.div`
  width: 100%;
  height: 50%;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 1px 1px 1px 1px gray;
  margin-bottom: 5px;
`;

const ChildT = styled.div`
  width: 100%;
  height: 50%;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 1px 1px 1px 1px gray;
`;
