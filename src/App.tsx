import React, { useCallback, useLayoutEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
} from 'reactflow';
import { shallow } from 'zustand/shallow';
import ELK from 'elkjs/lib/elk.bundled.js'

import useStore, { RFState } from './store';

import './index.css';

// we need to import the React Flow styles to make it work
import 'reactflow/dist/style.css';

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};

const getLayoutedElements = (nodes, edges, options = {}) => {
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: 'left',
      sourcePosition: 'right',

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children?.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

function Flow() {
  const { nodes: layoutedNodes, edges: layoutedEdges } = useStore(
    selector,
    shallow,
  );
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { 'elk.direction': direction, ...elkOptions };
      const ns = useInitialNodes ? layoutedNodes : nodes;
      const es = useInitialNodes ? layoutedEdges : edges;

      getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        window.requestAnimationFrame(() => fitView());
      });
    },
    [nodes, edges]
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: 'RIGHT', useInitialNodes: true });
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
    </ReactFlow>
  );
}

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
