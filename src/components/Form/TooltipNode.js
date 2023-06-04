import { memo, useState } from "react";
import { Handle, Position, NodeToolbar } from "reactflow";
import styled from "styled-components";
import RyanAnony from "../../img/form/ryan.png";
import Ryan from "../../img/form/ryanface.png";
const Tooltip = styled.div`
  width: 200px;
  height: 50px;
  background-color: #e5e5e5;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;
const TooltipNode = (props) => {
  const [isVisible, setVisible] = useState(false);
  console.log(props);
  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <NodeToolbar isVisible={isVisible} position={props.toolbarPosition}>
        <Tooltip>
          {"질문제목 - " + props.data.qst.qstTitle} <br />
          {props.data.qst.options.map((option) => (
            <OptStyled key={option.optionId}>{option.optionContent}</OptStyled>
          ))}
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
            {props.data.qst.essential ? "⚠️" : ""}
          </Tag>

          {props.data.qst.qstTitle}
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
            {props.data.qst.essential ? "⚠️" : ""}
          </Tag>
          {props.data.qst.qstTitle}
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
`;
const RyanImg = styled.img`
  width: 30px;
  height: 30px;
`;
const NodeStyled = styled.div`
  width: 120px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #e7ebf0;
  background-blend-mode: soft-light, normal;
  box-shadow: -2.5px -2.5px 5px #fafbff, 2.5px 2.5px 5px #a6abbd;
  border-radius: 20px;
  font-weight: 700;
  border-radius: 13px;
  font-size: 10px;
  color: black;
`;

const NodeBranchStyled = styled.div`
  width: 120px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: ${(props) => props.backgroundColor};
  background-blend-mode: soft-light, normal;
  box-shadow: -2.5px -2.5px 5px #fafbff, 2.5px 2.5px 5px #a6abbd;
  border-radius: 20px;
  font-weight: 700;
  border-radius: 17px;
  font-size: 10px;
  color: white;
`;

const Tag = styled.div`
  height: 30px;
  margin-bottom: -80px;
  margin-left: -70px;
  display: inline-block;
  font-size: 30px;
  border-radius: 3px;
  color: red;
`;
