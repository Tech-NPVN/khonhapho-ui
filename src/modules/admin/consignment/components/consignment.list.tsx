'use client';

import { ConsignmentItem } from './consignment.item';

export const ConsignmentList = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <ConsignmentItem key={index} />
      ))}
    </div>
  );
};
