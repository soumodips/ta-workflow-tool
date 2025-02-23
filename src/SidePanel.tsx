import Drawer, { DrawerProps } from '@mui/material/Drawer';
import * as React from 'react';
import { DefaultForm } from './DefaultForm';
import { NotificationForm } from './NotificationForm';
import { TaskForm } from './TaskForm';
import { WorkflowNodeType } from './types';

export const SidePanel = ({
  open,
  onClose,
  selectedNode,
  setNodes,
}: DrawerProps & {
  selectedNode: WorkflowNodeType | null;
  setNodes: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const generateRelevantForm = () => {
    if (!selectedNode) return;
    else
      switch (selectedNode?.type) {
        case 'input':
          return <TaskForm {...selectedNode} setNodes={setNodes} />;
        case 'output':
          return <NotificationForm {...selectedNode} setNodes={setNodes} />;
        default:
          return <DefaultForm {...selectedNode} setNodes={setNodes} />;
      }
  };

  return (
    <Drawer open={open} onClose={onClose} anchor='right'>
      {generateRelevantForm()}
    </Drawer>
  );
};
