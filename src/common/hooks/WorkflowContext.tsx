import { createContext, useContext, useState } from 'react';

const WorkflowContext = createContext([null, (_: any) => {}]);

export const WorkflowProvider = ({ children }: any) => {
  const [type, setType] = useState(null);

  return (
    <WorkflowContext.Provider value={[type, setType]}>
      {children}
    </WorkflowContext.Provider>
  );
};

export default WorkflowContext;

export const useWorkflow = () => {
  return useContext(WorkflowContext);
};
