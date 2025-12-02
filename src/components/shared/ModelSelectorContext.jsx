import React, { createContext, useContext, useState } from "react";
import { Brain, BarChart3 } from "lucide-react";

const ModelSelectorContext = createContext();

export const researchModels = [
  {
    id: 'unified',
    labelKey: 'models.unified_graph',
    descriptionKey: 'models.unified_graph_desc',
    icon: '⚡'
  },
  {
    id: 'harmony-network',
    labelKey: 'models.harmony_network',
    descriptionKey: 'models.harmony_network_desc',
    icon: '🌐'
  },
  {
    id: 'org-info',
    labelKey: 'models.org_info',
    descriptionKey: 'models.org_info_desc',
    icon: '🏢'
  }
];

export function ModelSelectorProvider({ children }) {
  const [selectedModel, setSelectedModel] = useState('unified');

  const currentModel = researchModels.find(m => m.id === selectedModel) || researchModels[0];

  return (
    <ModelSelectorContext.Provider value={{ selectedModel, setSelectedModel, currentModel, researchModels }}>
      {children}
    </ModelSelectorContext.Provider>
  );
}

export function useModelSelector() {
  const context = useContext(ModelSelectorContext);
  if (!context) {
    throw new Error('useModelSelector must be used within ModelSelectorProvider');
  }
  return context;
}