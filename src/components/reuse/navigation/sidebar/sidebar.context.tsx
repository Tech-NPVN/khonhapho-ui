'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type SidebarType = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  toggleCollapse: () => void;
};

const Sidebar = createContext<SidebarType | undefined>(undefined);

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Sidebar.Provider value={{ collapsed, setCollapsed, toggleCollapse }}>
      {children}
    </Sidebar.Provider>
  );
};

const useSidebar = () => {
  const context = useContext(Sidebar);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export { SidebarProvider, useSidebar };
