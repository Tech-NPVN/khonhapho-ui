'use client';

import { createContext, useContext, useState } from 'react';

type FeedsContextType = {
  collapsed: boolean;
  toggleCollapse: () => void;
};

const FeedsContext = createContext<FeedsContextType | undefined>(undefined);

const FeedsProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <FeedsContext.Provider value={{ collapsed, toggleCollapse }}>{children}</FeedsContext.Provider>
  );
};

const useFeeds = () => {
  const context = useContext(FeedsContext);
  if (context === undefined) {
    throw new Error('useFeeds must be used within a FeedsProvider');
  }
  return context;
};

export { FeedsProvider, useFeeds };
