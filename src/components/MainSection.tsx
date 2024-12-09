import { useCallback } from "react";
import { nanoid } from "nanoid";
import {
  Background,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  OnConnect,
  useReactFlow,
  Connection,
  Node,
  getOutgoers,
  Edge,
  OnSelectionChangeParams,
  useOnSelectionChange,
  UseOnSelectionChangeOptions,
} from "@xyflow/react";
import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import CustomControls from "./controls/CustomControls";
import Sidebar from "./sidebar";
import useDragDrop from "../hooks/useDragDrop";
import { CustomEdges } from "../constants/constants";
import { useSelection } from "../context/SelectionContext";

const MainSection = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => {
      const newConnection = { ...connection, id: nanoid(), type: CustomEdges.BUTTON_EDGE };
      setEdges((edges) => addEdge(newConnection, edges))
    },
    [setEdges]
  )

  const { setSelectedNode} = useSelection()

  const { getNodes, getEdges } = useReactFlow();

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // we are using getNodes and getEdges helpers here
      // to make sure we create isValidConnection function only once
      const nodes = getNodes();
      const edges = getEdges();
      const target = nodes.find((node) => node.id === connection.target);
  
      if (!target) {
        // If target node is not found, we cannot validate the connection
        return false;
      }
  
      const hasCycle = (node: Node, visited = new Set<string>()): boolean => {
        if (visited.has(node.id)) return false;
  
        visited.add(node.id);
  
        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
  
        return false;
      };
  
      if (target.id === connection.source) return false;
      return !hasCycle(target);
    },
    [getNodes, getEdges],
  );

  const [onDragOver,onDrop]  = useDragDrop(setNodes)

  const onChange = useCallback(({ nodes }: OnSelectionChangeParams) => {
    setSelectedNode(nodes[0]);
  }, [setSelectedNode]);

  useOnSelectionChange({
    onChange,
  } as unknown as UseOnSelectionChangeOptions);

  return (
    <div className="h-full w-full flex overflow-y-hidden divide-x divide-gray-200">
      <ReactFlow
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        fitView
      >
        <Background />
        <CustomControls />
      </ReactFlow>
      <Sidebar />
    </div>
  );
};

export default MainSection;
