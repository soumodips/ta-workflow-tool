import { XYPosition } from '@xyflow/react';

export const CustomNodeTypes = {
  input: 'Task-#add8e6',
  default: 'Condition-#ffffed',
  output: 'Notification-#90ee90',
};

export type WorkflowNodeType = {
  id: string;
  type: 'input' | 'default' | 'output';
  position: XYPosition;
  data: {
    label: string;
    priority: 'high' | 'medium' | 'low';
    nodeDetails: TaskDetailsType &
      ConditionDetailsType &
      NotificationDetailsType;
  };
  style: {
    backgroundColor: string;
  };
};

export type TaskDetailsType = {
  description: string;
  dueDate: Date;
  assignee: string;
  reporter: string;
  status: 'ready' | 'conditions-pending' | 'notifications-pending' | 'done';
};

export type ConditionDetailsType = {
  prerequisites: PrerequisitesType[];
  responsibility: string;
  notes: string;
  tags: string[];
};

export type NotificationDetailsType = {
  mode: 'email' | 'phone';
  notificationContent: string;
  notifyTo: string;
  notifyBy: string;
  lastNotifiedOn: Date;
};

export type PrerequisitesType = {
  label: string;
  isMet: boolean;
};
