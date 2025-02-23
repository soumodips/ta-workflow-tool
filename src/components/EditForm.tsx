import {
  FormControlLabel,
  Grid2,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { onFormChange, WorkflowNodeType } from '../common';

export const EditForm = ({
  id,
  data: {
    label,
    priority,
    nodeDetails: { description, dueDate, assignee, reporter, status },
  },
  position: { x, y },
  style: { backgroundColor },
  setNodes,
}: WorkflowNodeType & {
  setNodes: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
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
        },
      },
      position: {
        x,
        y,
      },
      style: { backgroundColor },
    },
  });

  return (
    <form onChange={(e) => onFormChange(e, setNodes, id)}>
      <Controller
        name='data.label'
        control={control}
        key={`data-label-${id}`}
        rules={{ required: true }}
        render={({ field }) => <Input {...field} fullWidth autoFocus />}
      />
      <Controller
        name='data.priority'
        control={control}
        key={`data-priority-${id}`}
        rules={{ required: true }}
        render={({ field }) => (
          <RadioGroup
            {...field}
            row
            aria-labelledby='radio-buttons-group-label'
            name='data.priority'
            onSelect={(e) => onFormChange(e, setNodes, id)}
          >
            <FormControlLabel value='high' control={<Radio />} label='High' />
            <FormControlLabel
              value='medium '
              control={<Radio />}
              label='Medium'
            />
            <FormControlLabel value='low' control={<Radio />} label='Low' />
          </RadioGroup>
        )}
      />
      <label>Status:</label>
      <Controller
        name='data.nodeDetails.status'
        control={control}
        key={`data-nodeDetails-status-${id}`}
        render={({ field }) => (
          <Select
            {...field}
            fullWidth
            onBlur={(e) => onFormChange(e, setNodes, id)}
          >
            <MenuItem value='Not selected' disabled>
              <Typography color='lightgrey'>Not selected</Typography>
            </MenuItem>
            <MenuItem value='Ready'>Ready</MenuItem>
            <MenuItem value='Conditions Pending'>Conditions pending</MenuItem>
            <MenuItem value='Notifications pending'>
              Notifications pending
            </MenuItem>
            <MenuItem value='done'>Done</MenuItem>
          </Select>
        )}
      />
      <label>Due date:</label>
      <Controller
        name='data.nodeDetails.dueDate'
        control={control}
        key={`data-nodeDetails-dueDate-${id}`}
        render={({ field }) => <Input {...field} fullWidth type='date' />}
      />
      <label>Assignee:</label>
      <Controller
        name='data.nodeDetails.assignee'
        control={control}
        key={`data-nodeDetails-assignee-${id}`}
        render={({ field }) => (
          <Input {...field} fullWidth placeholder='Not assigned' />
        )}
      />
      <label>Reporter:</label>
      <Controller
        name='data.nodeDetails.reporter'
        control={control}
        key={`data-nodeDetails-reporter-${id}`}
        render={({ field }) => (
          <Input {...field} fullWidth placeholder='Not assigned' />
        )}
      />
      <label>Color shade:</label>
      <Controller
        name='style.backgroundColor'
        control={control}
        key={`style-backgroundColor-${id}`}
        render={({ field }) => <Input {...field} type='color' fullWidth />}
      />

      <label>Description:</label>
      <Controller
        name='data.nodeDetails.description'
        control={control}
        key={`data-nodeDetails-description-${id}`}
        render={({ field }) => (
          <Input
            {...field}
            fullWidth
            multiline
            rows={5}
            placeholder='Describe the task briefly...'
          />
        )}
      />
      <label>Fine tune position on canvas:</label>
      <Grid2 container spacing={8} marginBlock={4}>
        <Grid2 size={6}>
          <Controller
            name='position.x'
            key={`position-x-${id}`}
            control={control}
            render={({ field }) => <Input {...field} type='number' />}
          />
        </Grid2>
        <Grid2 size={6}>
          <Controller
            name='position.y'
            key={`position-y-${id}`}
            control={control}
            render={({ field }) => <Input {...field} type='number' />}
          />
        </Grid2>
      </Grid2>
    </form>
  );
};
