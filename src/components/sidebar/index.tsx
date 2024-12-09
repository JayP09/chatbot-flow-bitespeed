import React, { useMemo } from "react";
import {
  CustomNodeType,
  DRAG_DATA_TRANSFER,
  SidebarNodes,
} from "../../constants/constants";
import {
  useNodes,
} from "@xyflow/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import NodeDataPanel from "./NodeDataPanel";
import { useSelection } from "../../context/SelectionContext";

// Sidebar component for managing the currently selected node and enabling drag-and-drop functionality
const Sidebar = () => {
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData(DRAG_DATA_TRANSFER, type);
    e.dataTransfer.effectAllowed = "move";
  };

  const nodes = useNodes();

  const { selectedNode, setSelectedNode } = useSelection();

  const selectedNodeData = useMemo(() => {
    if (selectedNode) {
      return nodes.find((n) => n.id === selectedNode.id);
    }
  }, [nodes, selectedNode]);

  return (
    <div className="max-w-sm w-96 relative">
      {selectedNodeData ? (
        <div className="w-full h-full">
          <div className="h-10 px-4 py-1 flex items-center border-b">
            <ArrowLeftIcon
              strokeWidth={2}
              className="h-4 w-4 cursor-pointer"
              onClick={() => setSelectedNode(null)}
            />
            <p className="ml-6">Message</p>
          </div>
          <NodeDataPanel
            id={selectedNodeData.id}
            type={selectedNodeData.type as CustomNodeType}
            data={selectedNodeData.data}
          />
        </div>
      ) : (
        <div className="w-full h-full p-4">
          {SidebarNodes.map(({ type, icon: Icon, title }) => (
            <div
              key={type}
              className="cursor-grab flex items-center gap-5 p-2.5 border border-blue-100 rounded-xl shadow-sm bg-white text-gray-900 select-none transition hover:ring-2 hover:ring-blue-500"
              draggable
              onDragStart={(e) => handleDragStart(e, type)}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100">
                <Icon className="w-6 h-6" />
              </div>
              <p className="font-medium leading-normal">{title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
