import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";


// Custom Edge with Button at the center
const ButtonEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style = {},
}: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <button
          className="group nodrag nopan pointer-events-auto absolute bg-white size-5 flex items-center justify-center rounded-full text-red-500 transition-colors hover:bg-gray-200 hover:text-black"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          onClick={() =>
            setEdges((edges) => edges.filter((edge) => edge.id !== id))
          }
        >
          <XMarkIcon className="size-3 transition group-hover:scale-75" />
        </button>
      </EdgeLabelRenderer>
    </>
  );
};

export default ButtonEdge;
