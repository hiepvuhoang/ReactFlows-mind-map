import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

export type NodeData = {
  label: string;
  status?: string;
  isCollapsable?: boolean;
  isEmpty?: boolean;
};

function MindMapNode({ id, data }: NodeProps<NodeData>) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={`tonode ${data.isEmpty ? 'tonode__empty' : ''}`}>
          <div className="label">{data.label}</div>
          <div className="status">{data?.status}</div>
        </div>
        {data?.isCollapsable && <button className="edgebutton"></button>}
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default MindMapNode;
