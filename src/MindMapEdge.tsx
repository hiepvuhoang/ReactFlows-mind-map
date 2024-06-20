import React from 'react';
import {
  BaseEdge,
  EdgeProps,
  getBezierPath,
  getSmoothStepPath,
} from 'reactflow';

export default function MindMapEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
  target,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        strokeWidth: '3',
        stroke: (data?.isHovered || data?.isCollapsed) ? '#5959EB' : '#a0a0a0',
      }}
    />
  );
}
