import { CustomNodeTypes } from "./types"

export const customTypeMapper = (type: any) => Object.entries(CustomNodeTypes).filter(n => n[0] === type)[0][1]