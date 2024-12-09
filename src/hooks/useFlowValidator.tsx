// Custom Hook for validating the current chatbot flow
import { Edge, Node, getConnectedEdges, useReactFlow } from "@xyflow/react";

const findEdges = (node: Node, connectedEdges: Edge[]) => {
  const outgoingEdges = connectedEdges.filter(
    (edge) => edge.source === node.id
  );
  const incomingEdges = connectedEdges.filter(
    (edge) => edge.target === node.id
  );
  return { outgoingEdges, incomingEdges };
};

const useFlowValidator = (onValidate?: (isValid: boolean) => void) => {
  const { getNodes, getEdges } = useReactFlow();

  const validate = () => {
    const nodes = getNodes();
    const edges = getEdges();

    if (nodes.length === 1) {
      onValidate?.(true);
      return;
    }

    const connectedEdges = getConnectedEdges(nodes, edges);

    const hasUnconnectedNodes = nodes.some(node => {
      const { incomingEdges, outgoingEdges } = findEdges(node, connectedEdges);
      return incomingEdges.length === 0 && outgoingEdges.length === 0;
    });

    onValidate?.(!hasUnconnectedNodes);
  };

  return [validate];
};

export default useFlowValidator;
