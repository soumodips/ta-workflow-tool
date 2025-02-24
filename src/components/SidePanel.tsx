import { Container, Divider } from '@mui/material';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { Dispatch, SetStateAction } from 'react';
import { customTypeMapper, WorkflowNodeType } from '../common';
import { DetailsCard, EditForm } from '../components';

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
      <Container maxWidth='sm' >
        <Divider />
        <DetailsCard
          title={`Edit ${customTypeMapper(selectedNode.type)} Details`}
          subheader={selectedNode.data.label}
          footer={JSON.stringify(selectedNode)}
        >
            <EditForm {...selectedNode} setNodes={setNodes} onClose={onClose} />
        </DetailsCard>
        <Divider />
      </Container>
    </Drawer>
  );
};
