import { memo, useState } from "react";
import { Handle, Position, NodeToolbar } from "reactflow";
import styled from "styled-components";
import RyanAnony from "../../img/form/ryan.png";
import Ryan from "../../img/form/ryanface.png";

const TooltipNode = (props) => {
  const [isVisible, setVisible] = useState(false);
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
          {props.data.qst.qstType === "서술형 질문" ? (
            <TextLine>서술형 질문입니다. </TextLine>
          ) : (
            props.data.qst.options.map((option) => (
              <OptStyled key={option.optionId}>
                {props.data.qst.qstType === "객관식 질문" && (
                  <input type="radio" />
                )}
                {props.data.qst.qstType === "체크박스" && (
                  <input type="checkbox" />
                )}

                {option.optionContent}
              </OptStyled>
            ))
          )}
        </Tooltip>
      </NodeToolbar>
      {props.data.qst.branch ? (
        <NodeBranchStyled backgroundColor={props.data.color}>
          <Tag>
            {" "}
            {props.data.qst.anonymous ? (
              <RyanImg src={RyanAnony} alt="" />
            ) : (
              <RyanImg src={Ryan} alt="" />
            )}{" "}
          </Tag>
          <TagEssen> {props.data.qst.essential ? "⚠️" : ""}</TagEssen>
          {props.data.qst.qstTitle.length > 15
            ? `${props.data.qst.qstTitle.slice(0, 15)}...`
            : props.data.qst.qstTitle}{" "}
        </NodeBranchStyled>
      ) : (
        <NodeStyled>
          <Tag>
            {" "}
            {props.data.qst.anonymous ? (
              <RyanImg src={RyanAnony} alt="" />
            ) : (
              <RyanImg src={Ryan} alt="" />
            )}{" "}
          </Tag>
          <TagEssen> {props.data.qst.essential ? "⚠️" : ""}</TagEssen>
          {props.data.qst.qstTitle.length > 15
            ? `${props.data.qst.qstTitle.slice(0, 15)}...`
            : props.data.qst.qstTitle}{" "}
        </NodeStyled>
      )}
      <Handle type="target" position={Position.Bottom} />
      <Handle type="source" position={Position.Top} />
    </div>
  );
};

export default memo(TooltipNode);

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
  height: 20px;
  display: flex;
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
  height: 20px;
  display: flex;
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
  height: 30px;
  padding-right: 10px;
  padding-bottom: 5px;
  display: inline-block;
  font-size: 30px;
  border-radius: 3px;
  color: white;
`;
// Tooltip Nodes
const Tooltip = styled.div`
  width: 200px;
  background-color: #eef3ff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 23px;
`;

const TooltipTitle = styled.div`
  width: 190px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;

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
