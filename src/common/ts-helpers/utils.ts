import { CustomNodeTypes, WorkflowNodeType } from './types';

export const customTypeMapper = (type: any, color?: boolean) =>
  Object.entries(CustomNodeTypes)
    .filter((n) => n[0] === type)[0][1]
    ?.split('-')[color ? 1 : 0];

export const generateInitialNodeDetails = (type: any) => {
  switch (type) {
    case 'input':
      return {
        description: '',
        dueDate: null,
        assignee: '',
        reporter: '',
        status: 'Not selected',
      };
    case 'output':
      return {
        mode: 'email',
        notificationContent: '',
        notifyTo: '',
        notifyBy: '',
        lastNotified: null,
      };
    default:
      return {
        prerequisites: [],
        responsibility: '',
        notes: '',
      };
  }
};

export const onFormChange = (e: any, setNodes: (arg0: (prevState: any) => any) => void, id: string) => {
  setNodes((prevState: WorkflowNodeType[]) =>
    prevState.map((nd: { id: any; data: { nodeDetails: any; }; style: any; position: any; }) => {
      if (nd?.id === id) {
        switch (e.target.name) {
          case 'data.label':
            return {
              ...nd,
              data: { ...nd.data, label: e.target.value.trim() },
            };
          case 'data.priority':
            return {
              ...nd,
              data: { ...nd.data, priority: e.target.value },
            };
          case 'style.backgroundColor':
            return {
              ...nd,
              style: { ...nd.style, backgroundColor: e.target.value },
            };
          case 'position.x':
            return {
              ...nd,
              position: { ...nd.position, x: Number(e.target.value) },
            };
          case 'position.y':
            return {
              ...nd,
              position: { ...nd.position, y: Number(e.target.value) },
            };
          case 'data.nodeDetails.description':
            return {
              ...nd,
              data: {
                ...nd.data,
                nodeDetails: {
                  ...nd.data.nodeDetails,
                  description: e.target.value.trim(),
                },
              },
            };
          case 'data.nodeDetails.dueDate':
            return {
              ...nd,
              data: {
                ...nd.data,
                nodeDetails: {
                  ...nd.data.nodeDetails,
                  dueDate: e.target.value,
                },
              },
            };
          case 'data.nodeDetails.assignee':
            return {
              ...nd,
              data: {
                ...nd.data,
                nodeDetails: {
                  ...nd.data.nodeDetails,
                  assignee: e.target.value.trim(),
                },
              },
            };
          case 'data.nodeDetails.reporter':
            return {
              ...nd,
              data: {
                ...nd.data,
                nodeDetails: {
                  ...nd.data.nodeDetails,
                  reporter: e.target.value.trim(),
                },
              },
            };
          case 'data.nodeDetails.status':
            return {
              ...nd,
              data: {
                ...nd.data,
                nodeDetails: {
                  ...nd.data.nodeDetails,
                  status: e.target.value,
                },
              },
            };
          default:
            return nd;
        }
      }
      return nd;
    })
  );
};
