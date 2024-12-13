'use client';

import { AddIcon } from '@/components/icons';
import { Button } from 'antd';
import { useState } from 'react';
import ReferralModal from './referral-modal';
import { ReferralTable } from './referral-table';

const Referralindex = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <div className="m-4 bg-white rounded-lg p-4 ms-0">
        <div className="flex justify-between">
          <div className="text-xl uppercase font-semibold">Quản lý giới thiệu</div>
          <Button
            type="primary"
            className="text-base h-10"
            icon={<AddIcon />}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Thêm mới
          </Button>
        </div>
        <div>
          <ReferralTable />
        </div>
      </div>
      <ReferralModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      />
    </>
  );
};

export default Referralindex;
