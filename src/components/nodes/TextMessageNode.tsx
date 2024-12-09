import {
  Handle,
  NodeProps,
  Position,
  useHandleConnections,
} from "@xyflow/react";
import { TextMessageNodeData } from ".";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

type TextMessageNodeProps = NodeProps<TextMessageNodeData>;

// Custom Text message node
const TextMessageNodeRaw = ({
  isConnectable,
  selected,
  data,
}: TextMessageNodeProps) => {
  const connections = useHandleConnections({
    type: "source",
  });

  return (
    <>
      <div
        className={twMerge(
          "w-44 overflow-clip border border-blue-100 rounded-lg bg-white shadow-sm backdrop-blur-xl transition divide-y divide-blue-100",
          selected && "border-blue-400"
        )}
      >
        <div className="bg-green-300/50 px-2 py-1 flex items-center">
          <ChatBubbleOvalLeftIcon className="size-3" />
          <span className="ml-1.5 text-xs font-medium leading-none tracking-wide">
            Send Message
          </span>
        </div>
        {data.message?.trim() === "" ? (
          <div className="px-2 py-3 italic text-xs">No message yet...</div>
        ) : (
          <div className="px-2 py-3 text-xs">{data.message}</div>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={connections.length === 0} // Check for only one connection from Source Handle
      />
    </>
  );
};

export default TextMessageNodeRaw;
