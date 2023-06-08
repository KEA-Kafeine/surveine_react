import { memo, useState } from "react";
import { Handle, Position, NodeToolbar } from "reactflow";
import styled from "styled-components";
import RyanAnony from "../../img/form/ryan.png";
import Ryan from "../../img/form/ryanface.png";
import ResultNodeChart from "./ResultNodeChart";
const ResultNode = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [toggle, setToggle] = useState(false);

  const clickNode = () => {
    setToggle(!toggle);
  };

  console.log(props.data.qst.options);
  console.log(props.data.qstResult);
  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <NodeToolbar isVisible={isVisible} position={props.toolbarPosition}>
        <Tooltip>
          {props.data.qst.qstTitle.length > 0 && (
            <TooltipTitle textLength={props.data.qst.qstTitle.length}>
              {props.data.qst.qstTitle.length > 30
                ? `${props.data.qst.qstTitle.slice(0, 30)}...`
                : props.data.qst.qstTitle}{" "}
            </TooltipTitle>
          )}

          {(props.data.qst.qstType === "객관식 질문" ||
            props.data.qst.qstType === "체크박스") && (
            <ResultNodeChart
              options={props.data.qst.options.map(
                (option) => option.optionContent
              )}
              category={"전체응답"}
              result={props.data.qstResult.qstAnsKind.all.map(
                (option) => option.optCnt
              )}
            />
          )}
          {props.data.qst.qstType === "서술형 질문" && (
            <Answer>서술형 답변은 좌측에서 확인하세요</Answer>
          )}
        </Tooltip>
      </NodeToolbar>
      {props.data.qst.branch ? (
        <NodeBranchStyled
          backgroundColor={props.data.color}
          onClick={clickNode}
        >
          <TagEssen>
            {" "}
            {props.data.qst.anonymous ? (
              <RyanImg src={RyanAnony} alt="" />
            ) : (
              <RyanImg src={Ryan} alt="" />
            )}{" "}
            {props.data.qst.essential ? "⚠️" : ""}
          </TagEssen>
          {props.data.qst.qstTitle}

          {toggle && (
            <>
              {props.data.qst.options.map((option) => {
                const resultIndex =
                  props.data.qstResult.qstAnsKind.all.findIndex(
                    (result) => result.optId === option.optionId
                  );
                const optionContent = option.optionContent;
                const result =
                  resultIndex !== -1
                    ? props.data.qstResult.qstAnsKind.all[resultIndex].optCnt
                    : "";

                return (
                  <p key={option.optionId}>
                    <ResultText textLength={optionContent.length}>
                      {optionContent} <ResultCnt>{result}</ResultCnt>
                    </ResultText>
                  </p>
                );
              })}
            </>
          )}
        </NodeBranchStyled>
      ) : (
        <NodeStyled onClick={clickNode}>
          <TagEssen>
            {" "}
            {props.data.qst.anonymous ? (
              <RyanImg src={RyanAnony} alt="" />
            ) : (
              <RyanImg src={Ryan} alt="" />
            )}{" "}
            {props.data.qst.essential ? "⚠️" : ""}
          </TagEssen>
          {props.data.qst.qstTitle}

          {toggle && (
            <>
              {props.data.qst.options.map((option) => {
                const resultIndex =
                  props.data.qstResult.qstAnsKind.all.findIndex(
                    (result) => result.optId === option.optionId
                  );
                const optionContent = option.optionContent;
                const result =
                  resultIndex !== -1
                    ? props.data.qstResult.qstAnsKind.all[resultIndex].optCnt
                    : "";

                return (
                  <p key={option.optionId}>
                    <ResultText>
                      {optionContent} <ResultCnt>{result}</ResultCnt>
                    </ResultText>
                  </p>
                );
              })}
            </>
          )}
        </NodeStyled>
      )}
      <Handle type="target" position={Position.Bottom} />
      <Handle type="source" position={Position.Top} />
    </div>
  );
};

export default memo(ResultNode);

const OptStyled = styled.div`
  display: block;
  margin-top: 10px;
  padding-left: 5px;
  font-size: 13px;
`;

const TextLine = styled.div`
  display: block;

  width: 200px;
  height: 20px;
  padding-top: 20px;
  border-bottom: 1px solid grey;
  font-size: 13px;
`;
const RyanImg = styled.img`
  width: 30px;
  height: 30px;
`;
const NodeStyled = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #1a2051;
  background-blend-mode: soft-light, normal;
  box-shadow: -2.5px -2.5px 5px #fafbff, 2.5px 2.5px 5px #a6abbd;
  border-radius: 20px;
  font-weight: 700;
  border-radius: 13px;
  font-size: 10px;
  color: white;
`;

const NodeBranchStyled = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.backgroundColor};
  background-blend-mode: soft-light, normal;
  box-shadow: -2.5px -2.5px 5px #fafbff, 2.5px 2.5px 5px #a6abbd;
  border-radius: 20px;
  font-weight: 700;
  border-radius: 13px;
  font-size: 10px;
  color: white;
`;

const Tag = styled.div`
  height: 30px;
  padding-right: 10px;
  display: inline-block;
  font-size: 30px;
  border-radius: 3px;
  color: red;
`;

const TagEssen = styled.div`
  width: 100%;
  height: 30px;
  padding-right: 10px;
  padding-bottom: 5px;
  display: flex;
  justify-content: center;
  font-size: 30px;
  border-radius: 3px;
  color: white;
`;
// Tooltip Nodes
const Tooltip = styled.div`
  background-color: #eef3ff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 23px;
`;

const TooltipTitle = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  margin-bottom: 20px;

  font-size: ${(props) => {
    const textLength = props.textLength;
    if (textLength > 20) {
      return "9px"; // Adjust the font size as desired for longer text
    } else if (textLength > 10) {
      return "12px"; // Adjust the font size as desired for medium-length text
    } else {
      return "14px"; // Default font size for shorter text
    }
  }};
`;

const Answer = styled.div`
  width: 140px;

  font-size: 10px;
`;

const ResultText = styled.div`
  width: 150px;
  font-size: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 3px;
  padding: 3px;
  color: black;
`;
const ResultCnt = styled.div`
  margin-left: 10px;
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background-color: #b1bfc7;
  color: black;
  padding: 2px;
`;
