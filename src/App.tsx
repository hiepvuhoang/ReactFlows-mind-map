import React, { useState } from 'react';
import ReactFlow, {
  Controls,
  ReactFlowProvider,
  NodeOrigin,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  getOutgoers,
  getConnectedEdges,
  Node,
} from 'reactflow';
import { shallow } from 'zustand/shallow';

import useStore, { RFState } from './store';
import MindMapNode from './MindMapNode';

import './index.css';

// we need to import the React Flow styles to make it work
import 'reactflow/dist/style.css';

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const nodeTypes = {
  mindmap: MindMapNode,
};

const nodeOrigin: NodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: 'pink', strokeWidth: 2 };
const defaultEdgeOptions = { style: connectionLineStyle, type: 'float' };

function Flow() {
  // whenever you use multiple values, you should use shallow for making sure that the component only re-renders when one of the values change
  const { nodes: layoutedNodes, edges: layoutedEdges } = useStore(
    selector,
    shallow,
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [hidden, setHidden] = useState(true);

  const hide = (hidden: boolean, childEdgeID: string | any[], childNodeID: string | any[]) => (nodeOrEdge: any) => {
    if (
      childEdgeID.includes(nodeOrEdge.id) ||
      childNodeID.includes(nodeOrEdge.id)
    )
      nodeOrEdge.hidden = hidden;
    return nodeOrEdge;
  };

  const checkTarget = (edge, id) => {
    const edges = edge.filter((ed) => {
      return ed.target !== id;
    });
    return edges;
  };

  const outgoers: Node<any, string | undefined>[] = [];
  const connectedEdges: any[] = [];
  const stack = [];

  const nodeClick = (some, node) => {
    const currentNodeID = node.id;
    stack.push(node);
    while (stack.length > 0) {
      const lastNOde = stack.pop();
      const childnode = getOutgoers(lastNOde, nodes, edges);
      const childedge = checkTarget(
        getConnectedEdges([lastNOde], edges),
        currentNodeID
      );
      childnode.map((goer, key) => {
        stack.push(goer);
        outgoers.push(goer);
      });
      childedge.map((edge, key) => {
        connectedEdges.push(edge);
      });
    }

    const childNodeID = outgoers.map((node) => {
      return node.id;
    });
    const childEdgeID = connectedEdges.map((edge) => {
      return edge.id;
    });

    setNodes((node) => node.map(hide(hidden, childEdgeID, childNodeID)));
    setEdges((edge) => edge.map(hide(hidden, childEdgeID, childNodeID)));
    setHidden(!hidden);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      nodeOrigin={nodeOrigin}
      connectionLineStyle={connectionLineStyle}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={ConnectionLineType.Straight}
      onNodeClick={nodeClick}
      fitView
    >
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
