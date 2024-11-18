'use client';

import { ModalWithHash } from '@/common/modal';
import { QRCodeDownload, QRCodeDownloadProps } from '@/common/qrcode/qrcode-download';
import { QRCodeIconFill } from '@/components/icons';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

type QrCodeProps = {
  qrInfo?: QRCodeDownloadProps;
};
const QrCodeButton: React.FC<QrCodeProps> = ({ qrInfo }) => {
  const [showQr, setShowQr] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => setShowQr(false));
  return (
    <div>
      <Button type="text" onClick={() => setShowQr(true)}>
        <QRCodeIconFill className="fill-black dark:!fill-primary_text_d" />
      </Button>
      <ModalWithHash
        open={showQr}
        onClose={() => setShowQr(false)}
        hash="modal-qr-code"
        antdModalProps={{
          title: qrInfo?.title,
          className: 'md:max-w-[560px] lg:max-w-[560px] 2xl:max-w-[560px]',
        }}
      >
        <div className="flex justify-center items-center py-6">
          <QRCodeDownload
            title="Quét để điểm danh lớp học"
            {...qrInfo}
            QRCodeProps={{
              value: qrInfo?.value ?? '-',
              className:
                'max-md:!w-[calc(100vw-200px)] max-md:!h-[calc(100vw-200px)] !w-[300px] !h-[300px]',
            }}
          />
        </div>
      </ModalWithHash>
    </div>
  );
};

export default QrCodeButton;
