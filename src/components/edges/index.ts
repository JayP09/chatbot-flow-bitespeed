import type { Edge, EdgeTypes } from "@xyflow/react";
import ButtonEdge from "./ButtonEdge";
import { CustomEdges } from "../../constants/constants";

export const initialEdges = [
  { id: "a->b", source: "a", target: "b", type: CustomEdges.BUTTON_EDGE },
] satisfies Edge[];

export const edgeTypes = {
  [CustomEdges.BUTTON_EDGE]: ButtonEdge
  // Add any of your custom Edges here!
} satisfies EdgeTypes;
