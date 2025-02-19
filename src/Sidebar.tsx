import React from 'react';
import { useDnD } from './DnDContext';
import { CustomNodeTypes } from './types';

export default () => {
  const [_, setType] = useDnD();
 
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    setType && setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, "input")} draggable>
        {CustomNodeTypes.input}
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "default")} draggable>
      {CustomNodeTypes.default}
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, "output")} draggable>
      {CustomNodeTypes.output}
      </div>
    </aside>
  );
};