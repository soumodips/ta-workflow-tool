import {
  Edge,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  customTypeMapper,
  generateInitialNodeDetails,
  useWorkflow,
  WorkflowNodeType,
  WorkflowProvider,
} from './common';
import { AddNodeUnit, SidePanel, Workflow } from './components';

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

      // type clash for reuse in WorkflowContext
      const newNode: Node & any = {
        id: uuidv4(),
        type,
        position,
        data: {
          label: `New ${customTypeMapper(type)}`,
          tags: [],
          priority: '',
          nodeDetails: generateInitialNodeDetails(type),
        },
        style: {
          backgroundColor: customTypeMapper(type, true),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes, nodes.length]
  );

  useEffect(()=>{console.log(nodes)},[nodes])
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

const AppWithProviders = () => (
  <ReactFlowProvider>
    <WorkflowProvider>
      <App />
    </WorkflowProvider>
  </ReactFlowProvider>
);

export default AppWithProviders;
