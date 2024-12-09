import { ArrowsPointingOutIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  Panel,
  useViewport,
  useStore,
  useReactFlow,
  PanelProps,
} from "@xyflow/react";
import ControlButton from "./ControlButton";
import React from "react";
import { twMerge } from "tailwind-merge";

const CustomControls = React.forwardRef<
  HTMLDivElement,
  Omit<PanelProps, "children">
>(({ className, ...props }) => {
  const { zoom } = useViewport();
  const { zoomIn, zoomOut, fitView } = useReactFlow();
 
  const { minZoom, maxZoom } = useStore(
    (state) => ({
      minZoom: state.minZoom,
      maxZoom: state.maxZoom,
    }),
    (a, b) => a.minZoom !== b.minZoom || a.maxZoom !== b.maxZoom,
  );
 
  return (
    <Panel className={twMerge("bottom-0 top-auto! border border-gray-100 p-1 rounded-lg flex flex-col shadow-md z-10 bg-white gap-1",className)} style={{top: 'auto'}} {...props}>
      <ControlButton onClick={() => zoomIn({ duration: 300 })} disabled={zoom === maxZoom}>
        <PlusIcon className="w-5 h-5" />
      </ControlButton>
      <ControlButton onClick={() => zoomOut({ duration: 300 })} disabled={zoom === minZoom}>
        <MinusIcon className="w-5 h-5" />
      </ControlButton>
      <ControlButton onClick={() => fitView({ duration: 300 })}>
        <ArrowsPointingOutIcon className="w-5 h-5" />
      </ControlButton>
    </Panel>
  )
});

export default CustomControls