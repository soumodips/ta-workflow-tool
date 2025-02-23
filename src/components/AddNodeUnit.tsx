import { styled, Tooltip } from '@mui/material';
import { DragEvent } from 'react';
import { customTypeMapper, useWorkflow } from '../common';

//types
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

// Styled Components
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

const WorkflowNode = styled('div')(
  () => `
   padding: 6px 10px;
  margin: 10px 8px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  cursor: grab;
  width: 120px;
  transition: all 0.2s ease;
  background-color: lightyellow;
  &:hover {
    box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.2);
    width: 110px;
  }
`
);

const WorkflowInputNode = styled(WorkflowNode)(
  () => `
  background-color: lightblue;
`
);

const WorkflowOutputNode = styled(WorkflowNode)(
  () => `
  background-color: lightgreen;
`
);

export const AddNodeUnit = ({ onDrop }: AddNodeUnitPropType) => {
  const [type, setType] = useWorkflow();

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    // check if the dropped element is valid
    if (!type) return;

    if (setType) setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <AddNodeUnitContainer>
      <Tooltip
        title='Click or drag-and-drop to add a task to the canvas'
        arrow
        placement='right'
      >
        <WorkflowInputNode
          onDragStart={(event) => onDragStart(event, 'input')}
          onMouseDown={() => setType && setType('input')}
          draggable
          onMouseUp={(event) => onDrop(event, true)}
        >
          {customTypeMapper('input')}
        </WorkflowInputNode>
      </Tooltip>
      <Tooltip
        title='Click or drag-and-drop to add a condition to the canvas'
        arrow
        placement='right'
      >
        <WorkflowNode
          onDragStart={(event) => onDragStart(event, 'default')}
          onMouseDown={() => setType && setType('default')}
          draggable
          onMouseUp={(event) => onDrop(event, true)}
        >
          {customTypeMapper('default')}
        </WorkflowNode>
      </Tooltip>
      <Tooltip
        title='Click or drag-and-drop to add a notification to the canvas'
        arrow
        placement='right'
      >
        <WorkflowOutputNode
          onDragStart={(event) => onDragStart(event, 'output')}
          onMouseDown={() => setType && setType('output')}
          draggable
          onMouseUp={(event) => onDrop(event, true)}
        >
          {customTypeMapper('output')}
        </WorkflowOutputNode>
      </Tooltip>
    </AddNodeUnitContainer>
  );
};
