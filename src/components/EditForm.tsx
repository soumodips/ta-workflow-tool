import { Button, DrawerProps, Grid2 } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import {
  formControllerMapper,
  onFormChange,
  WorkflowNodeType,
} from '../common';

export const EditForm = ({
  id,
  type,
  data: {
    label,
    priority,
    nodeDetails: {
      description,
      dueDate,
      assignee,
      reporter,
      status,
      prerequisites,
      responsibility,
      notes,
      tags,
      mode,
      notificationContent,
      notifyTo,
      notifyBy,
      lastNotifiedOn,
    },
  },
  position: { x, y },
  style: { backgroundColor },
  setNodes,
  onClose,
}: WorkflowNodeType & {
  setNodes: React.Dispatch<React.SetStateAction<any[]>>;
} & DrawerProps) => {
  const formFields = formControllerMapper(type, id, setNodes);
  const { control } = useForm<WorkflowNodeType>({
    defaultValues: {
      data: {
        label,
        priority,
        nodeDetails: {
          description,
          dueDate,
          assignee,
          reporter,
          status,
          prerequisites,
          responsibility,
          notes,
          tags,
          mode,
          notificationContent,
          notifyTo,
          notifyBy,
          lastNotifiedOn,
        },
      },
      position: {
        x,
        y,
      },
      style: { backgroundColor },
    },
  });

  const renderFormFields = () => {
    return formFields.map(
      ({ isGrid2, label, name, key, render }: any, i: number) => {
        if (i > 0 && formFields[i - 1].isGrid2 && isGrid2) return;
        if (isGrid2 && formFields[i + 1].isGrid2) {
          const nextName: any = formFields[i + 1].name;
          const nextLabel = formFields[i + 1].label;
          return (
            <div key={key}>
              {nextLabel === '' && <label>{label}</label>}
              <Grid2 container spacing={8} marginBlock={4}>
                <Grid2 size={6}>
                  {nextLabel !== '' && <label>{label}</label>}
                  <Controller
                    name={name}
                    control={control}
                    key={key + id}
                    rules={{ required: true }}
                    render={render}
                  />
                </Grid2>
                <Grid2 size={6}>
                  {nextLabel !== '' && <label>{nextLabel}</label>}
                  <Controller
                    name={nextName}
                    control={control}
                    key={formFields[i + 1].key + formFields[i + 1].name}
                    rules={{ required: true }}
                    render={formFields[i + 1].render}
                  />
                </Grid2>
              </Grid2>
            </div>
          );
        }
        return (
          <div key={key}>
            <label>{label}</label>
            <Controller
              name={name}
              control={control}
              key={key + id}
              rules={{ required: true }}
              render={render}
            />
          </div>
        );
      }
    );
  };

  const handleSendNotification = (e: any) => {
    onFormChange(e, setNodes, id);
    onClose && onClose(e, 'backdropClick');
    alert('Notification sent and Last Notified date updated!')
  };

  return (
    <form onChange={(e) => onFormChange(e, setNodes, id)}>
      {renderFormFields()}
      {type === 'output' && (
        <Button
          variant='contained'
          name='data.nodeDetails.lastNotifiedOn'
          value={new Date().toJSON().split('T')[0]}
          onClick={handleSendNotification}
          fullWidth
          focusRipple
        >
          Send Notification
        </Button>
      )}
    </form>
  );
};
