import type { Node, NodeTypes, BuiltInNode } from "@xyflow/react";
import TextMessageNode from "./TextMessageNode";
import { CustomNodes, CustomNodeType } from "../../constants/constants";

export type TextMessageData = {
  message?: string;
};

export type TextMessageNodeData = Node<
  TextMessageData,
  CustomNodes.TEXT_MESSAGE_NODE
>;

export type AppNodeData<T extends CustomNodeType> =
  T extends `${CustomNodes.TEXT_MESSAGE_NODE}`
    ? TextMessageData
    : Record<string, any>;

export type AppNode = BuiltInNode | TextMessageNodeData; // Add custom Node type in OR

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: CustomNodes.TEXT_MESSAGE_NODE,
    position: { x: 100, y: 100 },
    data: { message: "Test Message 1" },
  },
  {
    id: "b",
    type: CustomNodes.TEXT_MESSAGE_NODE,
    position: { x: 400, y: -50 },
    data: { message: "Test Message 2" },
  },
];

export const nodeTypes = {
  [CustomNodes.TEXT_MESSAGE_NODE]: TextMessageNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
