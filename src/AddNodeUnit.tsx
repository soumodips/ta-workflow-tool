import React from 'react';
import { useWorkflow } from './WorkflowContext';
import { customTypeMapper } from './utils';
import { styled, Tooltip } from '@mui/material';

type AddNodeUnitPropType = {
  onDrop: (
    event: {
      preventDefault: () => void;
      clientX: any;
      clientY: any;
    },
    isClicked?: boolean
  ) => void;
};

const AddNodeUnitContainer = styled('div')(
  () => `
  position: absolute;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  left: 50px;
  bottom: 15px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  &:hover {
   box-shadow: 0 0 4px 4px rgba(0, 0, 0.1, 0.08);
   padding: 10px;
  }
`
);

export const AddNodeUnit = ({ onDrop }: AddNodeUnitPropType) => {
  const [type, setType] = useWorkflow();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    setType && setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <AddNodeUnitContainer>
      {/* <div className="description">You can drag these nodes to the pane on the right.</div> */}
      <Tooltip
        title='Click or drag-and-drop to add a task to the canvas'
        arrow
        placement='right'
      >
        <div
          className='workflownode input'
          onDragStart={(event) => onDragStart(event, 'input')}
          onMouseDown={() => setType && setType('input')}
          draggable
          onMouseUp={(event) => onDrop(event, true)}
        >
          {customTypeMapper('input')}
        </div>
      </Tooltip>
      <Tooltip
        title='Click or drag-and-drop to add a condition to the canvas'
        arrow
        placement='right'
      >
        <div
          className='workflownode'
          onDragStart={(event) => onDragStart(event, 'default')}
          onMouseDown={() => setType && setType('default')}
          draggable
          onMouseUp={(event) => onDrop(event, true)}
        >
          {customTypeMapper('default')}
        </div>
      </Tooltip>
      <Tooltip
        title='Click or drag-and-drop to add a notification to the canvas'
        arrow
        placement='right'
      >
        <div
          className='workflownode output'
          onDragStart={(event) => onDragStart(event, 'output')}
          onMouseDown={() => setType && setType('output')}
          draggable
          onMouseUp={(event) => onDrop(event, true)}
        >
          {customTypeMapper('output')}
        </div>
      </Tooltip>
    </AddNodeUnitContainer>
  );
};
