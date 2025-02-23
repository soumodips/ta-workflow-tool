import { Container, Divider, Typography } from '@mui/material';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { Dispatch, SetStateAction } from 'react';
import { WorkflowNodeType } from '../common';
import { EditForm } from '../components';

export const SidePanel = ({
  open,
  onClose,
  selectedNode,
  setNodes,
}: DrawerProps & {
  selectedNode: WorkflowNodeType | null;
  setNodes: Dispatch<SetStateAction<any[]>>;
}) => {
  if (!selectedNode) return <></>;

  return (
    <Drawer open={open} onClose={onClose} anchor='right'>
      <Container maxWidth='xs'>
        <Divider />
        <Typography variant='h4' align='center' marginBlock={2}>
          Edit Task Details
        </Typography>
        <EditForm {...selectedNode} setNodes={setNodes} />
        <Divider />
      </Container>
    </Drawer>
  );
};
