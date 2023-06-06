import React, { useEffect } from "react";
import {
  Panel,
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
} from "reactflow";

import { toPng } from "html-to-image";
import styled from "styled-components";
import Arrow from "../../img/form/Arrow.svg";
import RyanAnony from "../../img/form/ryan.png";
import Ryan from "../../img/form/ryanface.png";
const Button = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 2px;
  background-color: #f8f8f8;
  color: #1a2051;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  border: 1.5px solid black;
  padding: 3px;
  border-radius: 3px;
  margin-top: 12px;
  font-weight: 800;
  cursor: pointer; /* Add this line */
  &:hover {
    cursor: pointer; /* Override the cursor on hover */
  }
`;

function downloadImage(dataUrl) {
  const a = document.createElement("a");

  a.setAttribute("download", "survein_flowgraph.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton(props) {
  const { getNodes } = useReactFlow();
  useEffect(() => {
    const interval = setInterval(() => {
      if (props.nodes) {
        onSave(props.nodes);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [props.nodes]);

  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight
    );

    toPng(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "#FFFFFF",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

  const onSave = (nodes) => {
    props.editNodes(nodes);
  };

  return (
    <Panel position="top-right">
      <Modal>
        <div>
          {" "}
          <RyanImg src={RyanAnony} alt="" /> : 익명
        </div>
        <div>
          {" "}
          <RyanImg src={Ryan} alt="" />: 실명
        </div>
        <div>⚠️ : 필수</div>
        {/* <Button onClick={() => onSave(props.nodes)}>그래프 저장</Button> */}
        <Button className="download-btn" onClick={onClick}>
          그래프 다운
        </Button>
      </Modal>
    </Panel>
  );
}

export default DownloadButton;

const Modal = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f8f8f8;
  border-radius: 1rem;
  position: fixed;
  bottom: 50px; // 원하는 위치로 조정하세요
  right: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid grey; // 원하는 위치로 조정하세요
`;
const RyanImg = styled.img`
  width: 20px;
  height: 20px;
`;
