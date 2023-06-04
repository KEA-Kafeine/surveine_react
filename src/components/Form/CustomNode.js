import { memo } from "react";
import { Handle, Position, NodeToolbar } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <>
      <NodeToolbar
        isVisible={data.toolbarVisible}
        position={data.toolbarPosition}
      >
        <div>안녕하세요</div>
      </NodeToolbar>
      <div style={{ padding: "10px 40px" }}>{data.label}</div>
      <Handle type="target" position={Position.Bottom} />
      <Handle type="source" position={Position.Top} />
    </>
  );
};

export default memo(CustomNode);
