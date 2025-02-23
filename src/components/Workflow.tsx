import {
  addEdge,
  Background,
  Controls,
  Edge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  MiniMap,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
} from '@xyflow/react';
import { Dispatch, SetStateAction, useCallback, useRef } from 'react';
import { WorkflowNodeType } from '../common';

export const Workflow = ({
  nodes,
  edges,
  setEdges,
  setSelectedNode,
  onNodesChange,
  onEdgesChange,
  onDrop,
}: {
  nodes: Node[] & any;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedNode: Dispatch<SetStateAction<WorkflowNodeType | null>>;
  onNodesChange: OnNodesChange<Node & any>;
  onEdgesChange: OnEdgesChange<Edge>;
  onDrop: (
    event: { preventDefault: () => void; clientX: any; clientY: any },
    isClicked?: boolean
  ) => void;
}) => {
  const reactFlowWrapper = useRef(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodesDelete = useCallback(
    (deleted: any[]) => {
      setEdges(
        deleted.reduce((acc: any[], node: any) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge: any) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges, setEdges]
  );

  const onDragOver = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { dropEffect: string };
    }) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    []
  );

  const handleNodeClick = (e: any) => {
    const nodeData: any = nodes.find(
      (nd: { id: any }) => nd.id === e?.target?.dataset?.id
    );
    setSelectedNode(nodeData);
  };
  return (
    <div
      className='reactflow-wrapper'
      ref={reactFlowWrapper}
      style={{ height: window.innerHeight }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={handleNodeClick}
        fitView
      >
        <Controls />
        <MiniMap position='top-left' />
        <Background />
      </ReactFlow>
    </div>
  );
};
