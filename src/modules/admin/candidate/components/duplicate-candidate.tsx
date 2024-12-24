'use client';

import { WarningIcon } from '@/components/icons/warning.icon';
import React, { useState } from 'react';
import ModalDuplicate from './modal-duplicate';
export type DuplicateCandidateProps = {
  candidate_id?: number | string;
};

/** Kết quả trùng ứng viên vòng 0 */
const DuplicateCandidate: React.FC<DuplicateCandidateProps> = ({ candidate_id }) => {
  const [open, setOpen] = useState<boolean>(false);
  if (!candidate_id) return '-';
  return (
    <div className="flex justify-center items-center">
      <div
        className="cursor-pointer hover:bg-black/5 py-2 px-4 rounded"
        onClick={() => setOpen(true)}
      >
        <WarningIcon className="fill-error_l dark:fill-error_d scale-110" />
      </div>
      <ModalDuplicate
        candidate_id={candidate_id}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default DuplicateCandidate;
