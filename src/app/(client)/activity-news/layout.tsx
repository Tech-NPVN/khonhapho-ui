'use client';
import React, { useEffect } from 'react';

const ActivityLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.history.pushState(null, '', `#`);
  }, []);
  return <>{children}</>;
};

export default ActivityLayout;
