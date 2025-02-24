import {
  FormControlLabel,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import { CustomNodeTypes } from './types';
import { onFormChange } from './utils';

export const customTypeMapper = (type: any, color?: boolean) =>
  Object.entries(CustomNodeTypes)
    .filter((n) => n[0] === type)[0][1]
    ?.split('-')[color ? 1 : 0];

export const formControllerMapper = (
  type: string,
  id: string,
  setNodes: React.Dispatch<React.SetStateAction<any[]>>
) => {
  switch (type) {
    case 'input':
      return [
        {
          isGrid2: false,
          label: '',
          name: 'data.label',
          key: 'data-label-',
          render: ({ field }: any) => <Input {...field} fullWidth autoFocus />,
        },
        {
          isGrid2: true,
          label: 'Priority',
          name: 'data.priority',
          key: 'data-priority-',
          render: ({ field }: any) => (
            <RadioGroup
              {...field}
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
          ),
        },
        {
          isGrid2: true,
          label: 'Color shade',
          name: 'style.backgroundColor',
          key: 'style-backgroundColor-',
          render: ({ field }: any) => (
            <Input {...field} type='color' fullWidth sx={{ fontSize: 60 }} />
          ),
        },
        {
          isGrid2: false,
          label: 'Status',
          name: 'data.nodeDetails.status',
          key: 'data-nodeDetails-status-',
          render: ({ field }: any) => (
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
          ),
        },
        {
          isGrid2: false,
          label: 'Due date',
          name: 'data.nodeDetails.dueDate',
          key: 'data-nodeDetails-dueDate-',
          render: ({ field }: any) => (
            <Input {...field} fullWidth type='date' />
          ),
        },
        {
          isGrid2: false,
          label: 'Assignee',
          name: 'data.nodeDetails.assignee',
          key: 'data-nodeDetails-assignee-',
          render: ({ field }: any) => (
            <Input {...field} fullWidth placeholder='Not assigned' />
          ),
        },
        {
          isGrid2: false,
          label: 'Reporter',
          name: 'data.nodeDetails.reporter',
          key: 'data-nodeDetails-reporter-',
          render: ({ field }: any) => (
            <Input {...field} fullWidth placeholder='Not assigned' />
          ),
        },
        {
          isGrid2: false,
          label: 'Description',
          name: 'data.nodeDetails.description',
          key: 'data-nodeDetails-description-',
          render: ({ field }: any) => (
            <Input
              {...field}
              fullWidth
              multiline
              rows={5}
              placeholder='Describe the task briefly...'
            />
          ),
        },
        {
          isGrid2: true,
          label: 'Fine tune position on canvas',
          name: 'position.x',
          key: 'position-x-',
          render: ({ field }: any) => <Input {...field} type='number' />,
        },
        {
          isGrid2: true,
          label: '',
          name: 'position.y',
          key: 'position-y-',
          render: ({ field }: any) => <Input {...field} type='number' />,
        },
      ];

    case 'output':
      return [
        {
          isGrid2: false,
          label: '',
          name: 'data.label',
          key: 'data-label-',
          render: ({ field }: any) => <Input {...field} fullWidth autoFocus />,
        },
        {
          isGrid2: true,
          label: 'Priority',
          name: 'data.priority',
          key: 'data-priority-',
          render: ({ field }: any) => (
            <RadioGroup
              {...field}
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
          ),
        },
        {
          isGrid2: true,
          label: 'Color shade',
          name: 'style.backgroundColor',
          key: 'style-backgroundColor-',
          render: ({ field }: any) => (
            <Input {...field} type='color' fullWidth sx={{ fontSize: 60 }} />
          ),
        },
        {
          isGrid2: false,
          label: 'Mode of Notification',
          name: 'data.nodeDetails.mode',
          key: 'data-nodeDetails-mode-',
          render: ({ field }: any) => (
            <Select
              {...field}
              fullWidth
              onBlur={(e) => onFormChange(e, setNodes, id)}
            >
              <MenuItem value='Not selected' disabled>
                <Typography color='lightgrey'>Not selected</Typography>
              </MenuItem>
              <MenuItem value='Email'>Email</MenuItem>
              <MenuItem value='Phone' disabled>
                Phone
              </MenuItem>
              <MenuItem value='Meeting' disabled>
                Meeting
              </MenuItem>
            </Select>
          ),
        },
        {
          isGrid2: false,
          label: 'Notification Content',
          name: 'data.nodeDetails.notificationContent',
          key: 'data-nodeDetails-notificationContent-',
          render: ({ field }: any) => (
            <Input
              {...field}
              fullWidth
              multiline
              rows={6}
              defaultValue='Hi there, this is to notify you that the task has been successfully completed, and all conditions have been met. Thanks!'
              placeholder='Hi there, this is to notify you that the task has been successfully completed, and all conditions have been met. Thanks!'
            />
          ),
        },
        {
          isGrid2: false,
          label: 'Notify To',
          name: 'data.nodeDetails.notifyTo',
          key: 'data-nodeDetails-notifyTo-',
          render: ({ field }: any) => (
            <Input {...field} fullWidth placeholder='Not assigned' />
          ),
        },
        {
          isGrid2: false,
          label: 'Notify By',
          name: 'data.nodeDetails.notifyBy',
          key: 'data-nodeDetails-notifyBy-',
          render: ({ field }: any) => (
            <Input {...field} fullWidth placeholder='Not assigned' />
          ),
        },
        {
          isGrid2: false,
          label: 'Last Notified',
          name: 'data.nodeDetails.lastNotifiedOn',
          key: 'data-nodeDetails-lastNotifiedOn-',
          render: ({ field }: any) => (
            <Input {...field} fullWidth type='date' disabled />
          ),
        },
        {
          isGrid2: true,
          label: 'Fine tune position on canvas',
          name: 'position.x',
          key: 'position-x-',
          render: ({ field }: any) => <Input {...field} type='number' />,
        },
        {
          isGrid2: true,
          label: '',
          name: 'position.y',
          key: 'position-y-',
          render: ({ field }: any) => <Input {...field} type='number' />,
        },
      ];

    default:
      return [
        {
          isGrid2: false,
          label: '',
          name: 'data.label',
          key: 'data-label-',
          render: ({ field }: any) => <Input {...field} fullWidth autoFocus />,
        },
        {
          isGrid2: true,
          label: 'Priority',
          name: 'data.priority',
          key: 'data-priority-',
          render: ({ field }: any) => (
            <RadioGroup
              {...field}
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
          ),
        },
        {
          isGrid2: true,
          label: 'Color shade',
          name: 'style.backgroundColor',
          key: 'style-backgroundColor-',
          render: ({ field }: any) => (
            <Input {...field} type='color' fullWidth sx={{ fontSize: 60 }} />
          ),
        },
        {
          isGrid2: false,
          label: 'Prerequisites',
          name: 'data.nodeDetails.prerequisites',
          key: 'data-nodeDetails-prerequisites-',
          render: ({ field }: any) => (
            <Select
              {...field}
              fullWidth
              onBlur={(e) => onFormChange(e, setNodes, id)}
            >
              <MenuItem value='Not selected' disabled>
                <Typography color='lightgrey'>Not selected</Typography>
              </MenuItem>
              <MenuItem value='Commenced'>Commenced</MenuItem>
              <MenuItem value='Requested'>Requested</MenuItem>
              <MenuItem value='Granted'>Granted</MenuItem>
              <MenuItem value='Logged'>Logged</MenuItem>
            </Select>
          ),
        },
        {
          isGrid2: false,
          label: 'Responsibility',
          name: 'data.nodeDetails.responsibility',
          key: 'data-nodeDetails-responsibility-',
          render: ({ field }: any) => (
            <Input {...field} fullWidth placeholder='Not assigned' />
          ),
        },
        {
          isGrid2: false,
          label: 'Notes',
          name: 'data.nodeDetails.notes',
          key: 'data-nodeDetails-notes-',
          render: ({ field }: any) => (
            <Input
              {...field}
              fullWidth
              multiline
              rows={5}
              placeholder='Jot down key takeways or blockers...'
            />
          ),
        },
        {
          isGrid2: false,
          label: 'CSV Tags',
          name: 'data.nodeDetails.tags',
          key: 'data-nodeDetails-tags-',
          render: ({ field }: any) => (
            <Input
              {...field}
              fullWidth
              placeholder='Enter comma-separated issue tags...'
            />
          ),
        },
        {
          isGrid2: true,
          label: 'Fine tune position on canvas',
          name: 'position.x',
          key: 'position-x-',
          render: ({ field }: any) => <Input {...field} type='number' />,
        },
        {
          isGrid2: true,
          label: '',
          name: 'position.y',
          key: 'position-y-',
          render: ({ field }: any) => <Input {...field} type='number' />,
        },
      ];
  }
};
