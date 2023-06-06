import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import TooltipNode from "./TooltipNode";
import ResultNode from "./ResultNode";
import DownloadButton from "../Form/DownloadButton";
import styled from "styled-components";
const nodeTypes = {
  tooltip: TooltipNode,
  result: ResultNode,
};

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = (props) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const changeClick = () => {
    console.log("바뀌었음");
  };

  useEffect(() => {
    setNodes(props.nodes);
    setEdges(props.edges);
  }, [props.nodes, props.edges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      // props.editNodes(getId(), position);
      changeClick();
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div ref={reactFlowWrapper} style={{ height: 1000 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          ></ReactFlow>

          <DownloadButton nodes={nodes} editNodes={props.editNodes} />
        </div>
      </ReactFlowProvider>
      <Modal />
    </div>
  );
};

export default DnDFlow;

const Modal = styled.div`
  width: 300px;
  height: 300px;
  background-color: red;
`;
