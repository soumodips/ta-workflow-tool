import {
  Edge,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow
} from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';

import '@xyflow/react/dist/style.css';

import { v4 as uuidv4 } from 'uuid';
import { AddNodeUnit } from './AddNodeUnit';
import { SidePanel } from './SidePanel';
import { WorkflowNodeType } from './types';
import { customTypeMapper, generateInitialNodeDetails } from './utils';
import { Workflow } from './Workflow';
import { useWorkflow, WorkflowProvider } from './WorkflowContext';
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

const getId = () => uuidv4();

const App = () => {
  const [selectedNode, setSelectedNode] = useState<WorkflowNodeType | null>(
    null
  );
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();

  const [type] = useWorkflow();

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
      const newNode: Node & any = {
        id: getId(),
        type,
        position,
        data: {
          label: `New ${customTypeMapper(type)}`,
          tags: [],
          priority: 'Medium',
          nodeDetails: generateInitialNodeDetails(type),
        },
        style: {
          backgroundColor: customTypeMapper(type, true),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );


  useEffect(() => console.log(edges), [edges]);
  return (
    <div className='app'>
      <Workflow
        nodes={nodes}
        edges={edges}
        setEdges={setEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        setSelectedNode={setSelectedNode}
        onDrop={onDrop}
      />
      <AddNodeUnit onDrop={onDrop} />
      <SidePanel
        open={Boolean(selectedNode)}
        onClose={() => setSelectedNode(null)}
        selectedNode={selectedNode}
        setNodes={setNodes}
      />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <WorkflowProvider>
      <App />
    </WorkflowProvider>
  </ReactFlowProvider>
);
