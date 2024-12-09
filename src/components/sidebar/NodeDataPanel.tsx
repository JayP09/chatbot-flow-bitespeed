import { ComponentType } from "react";
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

  // Function to update node data
  const updateData = (newData: Partial<any>) => {
    console.log("newData", newData);
    setNodes((nds) =>
      nds.map((nodeData) => {
        if (nodeData.id === id) {
          nodeData.data = { ...nodeData.data, ...newData };
          return {...nodeData};
        } else {
          return nodeData;
        }
      })
    );
  };

  return PanelComponent && data ? (
    <PanelComponent id={id} type={type} data={data} updateData={updateData} />
  ) : (
    <></>
  );
};

export default NodeDataPanel;
