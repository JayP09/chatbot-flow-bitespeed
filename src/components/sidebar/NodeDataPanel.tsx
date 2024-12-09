import { ComponentType, useCallback } from "react";
import { produce } from "immer";
import { CustomNodes, CustomNodeType } from "../../constants/constants";
import { useReactFlow } from "@xyflow/react";
import TextMessageNodePanel from "./TextMessageNodePanel";

type NodeDataPanel = Readonly<{ id: string; type: CustomNodeType; data: any }>;

const NODE_PROPERTY_PANEL_COMPONENTS: Partial<
  Record<
    CustomNodeType,
    ComponentType<{
      id: string;
      type: CustomNodeType;
      data: any;
      updateData: (data: Partial<any>) => void;
    }>
  >
> = {
  [CustomNodes.TEXT_MESSAGE_NODE]: TextMessageNodePanel,
};

const NodeDataPanel = ({ id, type, data }: NodeDataPanel) => {
  const PanelComponent = NODE_PROPERTY_PANEL_COMPONENTS[type];

  const { setNodes } = useReactFlow();

  // Function to updateNode Data
  const updateData = useCallback(
    (newData: Partial<any>) => {
      setNodes((nds) =>
        produce(nds, (draft) => {
          const node = draft.find((n) => n.id === id);
          if (node) node.data = { ...node.data, ...newData };
        })
      );
    },
    [id, setNodes]
  );

  return PanelComponent && data ? (
    <PanelComponent id={id} type={type} data={data} updateData={updateData} />
  ) : (
    <></>
  );
};

export default NodeDataPanel;
