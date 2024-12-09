// Context object for tracking the currently selected node
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Node } from '@xyflow/react';

interface SelectionContextType {
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  return (
    <SelectionContext.Provider value={{ selectedNode, setSelectedNode }}>
      {children}
    </SelectionContext.Provider>
  );
};

// Function to access the Selection Context
export const useSelection = (): SelectionContextType => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
