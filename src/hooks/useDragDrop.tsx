import React, { Dispatch, SetStateAction, useCallback } from "react";
import { CustomNodes, DRAG_DATA_TRANSFER } from "../constants/constants";
import { useReactFlow } from "@xyflow/react";
import { generateNodeWithDefaultData } from "../utils/utils";
import { AppNode } from "../components/nodes";

const useDragDrop = (setNodes: Dispatch<SetStateAction<AppNode[]>>) => {

  const reactFlowInstance = useReactFlow()
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      if (!reactFlowInstance)
        return;

      e.preventDefault();

      const type = e.dataTransfer.getData(DRAG_DATA_TRANSFER);
      if (typeof type === "undefined" || !type) return;

      const pos = reactFlowInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      const newNode = generateNodeWithDefaultData(type as CustomNodes, {
        position: pos,
      });

      setNodes((nodes) => nodes.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return [onDragOver,onDrop]
};

export default useDragDrop;
