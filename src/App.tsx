import {
  addEdge,
  Background,
  Controls,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { useCallback, useRef, useState } from 'react';

import '@xyflow/react/dist/style.css';

import { v4 as uuidv4 } from 'uuid';
import { AddNodeUnit } from './AddNodeUnit';
import { DnDProvider, useDnD } from './DnDContext';
import { SidePanel } from './SidePanel';
import { customTypeMapper } from './utils';
// const initialNodes = [
//   {
//     id: '1',
//     type: 'input',
//     data: { label: 'Start here...' },
//     position: { x: -150, y: 0 },
//   },
//   {
//     id: '2',
//     type: 'input',
//     data: { label: '...or here!' },
//     position: { x: 150, y: 0 },
//   },
//   { id: '3', data: { label: 'Delete me.' }, position: { x: 0, y: 100 } },
//   { id: '4', data: { label: 'Then me!' }, position: { x: 0, y: 200 } },
//   {
//     id: '5',
//     type: 'output',
//     data: { label: 'End here!' },
//     position: { x: 0, y: 300 },
//   },
// ];

// const initialEdges = [
//   { id: '1->3', source: '1', target: '3' },
//   { id: '2->3', source: '2', target: '3' },
//   { id: '3->4', source: '3', target: '4' },
//   { id: '4->5', source: '4', target: '5' },
// ];

let id = 0;
const getId = () => uuidv4();

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [selectedNodeId, setSelectedNodeId] = useState<false | string>(false);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const { screenToFlowPosition } = useReactFlow();

  const [type] = useDnD();

  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );

  const onNodesDelete = useCallback(
    (deleted: any[]) => {
      console.log(deleted);
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
    [nodes, edges]
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

  const onDrop = useCallback(
    (
      event: { preventDefault: () => void; clientX: any; clientY: any },
      isClicked?: boolean
    ) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: isClicked
          ? Math.round(Math.random() * 400) + 180 - nodes.length
          : event.clientX,
        y: isClicked
          ? Math.round(Math.random() * 400) + 150 - nodes.length
          : event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `New ${customTypeMapper(type)}` },
        style: {
          backgroundColor: customTypeMapper(type, true),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  return (
    <div className='dndflow'>
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
          onNodeClick={(e: any) => setSelectedNodeId(e?.target?.dataset?.id)}
          fitView
        >
          <Controls />
          <MiniMap position='top-left' />
          <Background />
        </ReactFlow>
      </div>
      <AddNodeUnit onDrop={onDrop} />
      <SidePanel
        open={Boolean(selectedNodeId)}
        onClose={() => setSelectedNodeId(false)}
        selectedNodeId={selectedNodeId}
      />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
