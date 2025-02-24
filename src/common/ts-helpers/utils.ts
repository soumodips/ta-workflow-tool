import { WorkflowNodeType } from './types';

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
        mode: 'Not selected',
        notificationContent: '',
        notifyTo: '',
        notifyBy: '',
        lastNotifiedOn: null,
      };
    default:
      return {
        prerequisites: [],
        responsibility: '',
        notes: '',
        tags: [],
      };
  }
};

export const onFormChange = (
  e: any,
  setNodes: (arg0: (prevState: any) => any) => void,
  id: string
) => {
  e.preventDefault();
  setNodes((prevState: WorkflowNodeType[]) =>
    prevState.map(
      (nd: {
        id: any;
        data: { nodeDetails: any };
        style: any;
        position: any;
      }) => {
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
            case 'data.nodeDetails.prerequisites':
              return {
                ...nd,
                data: {
                  ...nd.data,
                  nodeDetails: {
                    ...nd.data.nodeDetails,
                    prerequisites: 
                      e.target.value,
                  },
                },
              };

            case 'data.nodeDetails.responsibility':
              return {
                ...nd,
                data: {
                  ...nd.data,
                  nodeDetails: {
                    ...nd.data.nodeDetails,
                    responsibility: e.target.value.trim(),
                  },
                },
              };

            case 'data.nodeDetails.notes':
              return {
                ...nd,
                data: {
                  ...nd.data,
                  nodeDetails: {
                    ...nd.data.nodeDetails,
                    notes: e.target.value.trim(),
                  },
                },
              };

            case 'data.nodeDetails.tags':
              return {
                ...nd,
                data: {
                  ...nd.data,
                  nodeDetails: {
                    ...nd.data.nodeDetails,
                    tags: e.target.value,
                  },
                },
              };

            case 'data.nodeDetails.mode':
              return {
                ...nd,
                data: {
                  ...nd.data,
                  nodeDetails: {
                    ...nd.data.nodeDetails,
                    mode: e.target.value,
                  },
                },
              };

            case 'data.nodeDetails.notificationContent':
              return {
                ...nd,
                data: {
                  ...nd.data,
                  nodeDetails: {
                    ...nd.data.nodeDetails,
                    notificationContent: e.target.value.trim(),
                  },
                },
              };

            case 'data.nodeDetails.notifyTo':
              return {
                ...nd,
                data: {
                  ...nd.data,
                  nodeDetails: {
                    ...nd.data.nodeDetails,
                    notifyTo: e.target.value.trim(),
                  },
                },
              };

            case 'data.nodeDetails.notifyBy':
              return {
                ...nd,
                data: {
                  ...nd.data,
                  nodeDetails: {
                    ...nd.data.nodeDetails,
                    notifyBy: e.target.value.trim(),
                  },
                },
              };

            case 'data.nodeDetails.lastNotifiedOn':
              return {
                ...nd,
                data: {
                  ...nd.data,
                  nodeDetails: {
                    ...nd.data.nodeDetails,
                    lastNotifiedOn: e.target.value,
                  },
                },
              };

            default:
              return nd;
          }
        }
        return nd;
      }
    )
  );
};
