'use client';
import { SectionBody } from '@/components/common';
import { AddIcon } from '@/components/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { CandidateTable, Header } from './components';
import ModalCandidate from './components/modal-candidate.form';

const CandidateIndex: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const Title = () => {
    return (
      <div className="flex items-center gap-3 h-8 justify-between">
        <span>Danh Sách ứng viên vòng 0</span>
        <Button type="primary" icon={<AddIcon />} onClick={() => setOpenModal(true)}>
          Thêm mới
        </Button>
      </div>
    );
  };
  return (
    <>
      <div className="w-full">
        <SectionBody title={Title()}>
          <Header />
          <div className="mt-2">
            <CandidateTable />
          </div>
        </SectionBody>
      </div>
      <ModalCandidate open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default CandidateIndex;
