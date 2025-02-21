import { CustomNodeTypes } from './types';

export const customTypeMapper = (type: any, color?: boolean) =>
  Object.entries(CustomNodeTypes)
    .filter((n) => n[0] === type)[0][1]
    ?.split('-')[color ? 1 : 0];
