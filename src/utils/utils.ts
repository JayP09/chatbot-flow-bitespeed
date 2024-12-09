import { nanoid } from "nanoid";
import { AppNode, AppNodeData } from "../components/nodes";
import { CustomNodes, CustomNodeType } from "../constants/constants";

export function generateNodeData<T extends CustomNodeType>(
  type: T,
  data: AppNodeData<T>
) {
  return {
    id: nanoid(),
    type,
    data,
  };
}

const DEFAULT_NODE_DATA_OBJ: Record<CustomNodeType, Record<string, any>> = {
  [CustomNodes.TEXT_MESSAGE_NODE]: { message: "Test Message" },
};

export function generateNodeWithDefaultData(
  type: CustomNodeType,
  data?: Partial<AppNode>
) {
  const defaultData = DEFAULT_NODE_DATA_OBJ[type];
  if (!defaultData)
    throw new Error(`No default data found for given node type "${type}"`);

  return Object.assign(generateNodeData(type, defaultData), data) as AppNode;
}
