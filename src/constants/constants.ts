import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

export const DRAG_DATA_TRANSFER = "drag-node-type";

export enum CustomNodes {
  TEXT_MESSAGE_NODE = "textMessageNode",
}

export enum CustomEdges {
  BUTTON_EDGE = 'buttonEdge'
}

export type CustomNodeType = `${CustomNodes}`;

export const SidebarNodeDetails: Record<CustomNodes, {icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, title: string}> = {
  [CustomNodes.TEXT_MESSAGE_NODE]: {
    icon: ChatBubbleOvalLeftIcon,
    title: 'Message'
  }
}

export const SidebarNodes = Object.entries(SidebarNodeDetails).map(([key, value]) => ({
  ...value,
  type: key
}))