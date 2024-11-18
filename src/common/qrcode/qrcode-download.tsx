import { DownLoadIcon } from '@/components/icons';
import { Button, Modal, QRCode, QRCodeProps } from 'antd';
import React, { useRef, useState } from 'react';

export interface QRCodeDownloadProps {
  className?: string;
  value?: string;
  title?: string;
  QRCodeProps?: QRCodeProps;
  download?: boolean;
  downloadProps?: {
    filename?: string;
    description?: string[];
  };
  showOnClick?: boolean;
}
const QRCodeDownload: React.FC<QRCodeDownloadProps> = ({
  value = 'Empty',
  download = true,
  downloadProps,
  title = 'QR Code',
  className,
  QRCodeProps,
  showOnClick = false,
}) => {
  const [open, setOpen] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const handleDownload = () => {
    if (qrCodeRef.current) {
      const canvas = document.createElement('canvas');
      const qrCanvas = qrCodeRef.current.querySelector('canvas');

      if (qrCanvas) {
        const qrWidth = 520;
        const qrHeight = 520;

        const outerPadding = 200;
        const titlePaddingTop = 50;
        const titlePaddingBottom = 80;
        const infoPaddingTop = 100;
        const infoPaddingBottom = 50;
        const titleFontSize = 48;
        const infoFontSize = 36;
        const description = downloadProps?.description ?? [];

        // Tính toán kích thước canvas mới
        const infoHeight =
          description.length * (infoFontSize + 10) + infoPaddingTop + infoPaddingBottom;
        canvas.width = qrWidth + outerPadding * 2;
        canvas.height =
          outerPadding * 2 +
          titleFontSize +
          titlePaddingTop +
          titlePaddingBottom +
          qrHeight +
          infoHeight;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Vẽ nền trắng
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Vẽ tiêu đề với khoảng cách trên và dưới
          ctx.fillStyle = '#000000';
          ctx.font = `bold ${titleFontSize}px Arial`;
          ctx.textAlign = 'center';
          ctx.fillText(title, canvas.width / 2, outerPadding + titlePaddingTop + titleFontSize);

          // Vẽ QR code vào canvas với khoảng cách dưới tiêu đề
          ctx.drawImage(
            qrCanvas,
            outerPadding,
            outerPadding + titlePaddingTop + titleFontSize + titlePaddingBottom,
            qrWidth,
            qrHeight,
          );

          // Vẽ thông tin bên dưới QR code với khoảng cách trên và dưới
          ctx.fillStyle = '#000000';
          ctx.font = `${infoFontSize}px Arial`;
          ctx.textAlign = 'center';
          description.forEach((text, index) => {
            ctx.fillText(
              text,
              canvas.width / 2,
              outerPadding +
                titlePaddingTop +
                titleFontSize +
                titlePaddingBottom +
                qrHeight +
                infoPaddingTop +
                index * (infoFontSize + 10),
            );
          });

          // Tải xuống ảnh
          const imageURL = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = imageURL;
          downloadLink.download = `${title ?? 'QrCode'}.png`;
          downloadLink.click();
        } else {
          console.error('Không thể lấy ngữ cảnh của canvas');
        }
      } else {
        console.error('QR canvas không được tìm thấy');
      }
    }
  };
  return (
    <>
      <div className={`text-center ${className ?? ''}`}>
        <div
          ref={qrCodeRef}
          className="mb-2"
          onClick={() => {
            setOpen(true);
          }}
        >
          <QRCode
            {...QRCodeProps}
            className={`!w-40 !h-40 ${QRCodeProps?.className ?? ''}`}
            size={520}
            value={value}
            icon="/logo-light.png"
            bgColor="white"
            color="black"
          />
        </div>
        {download && (
          <Button className="text-color_l" onClick={handleDownload} type="text">
            <DownLoadIcon className="!fill-color_l" width={16} height={16} /> Tải mã QR
          </Button>
        )}
      </div>
      {showOnClick && (
        <Modal
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
          centered
          title={title}
          onClose={() => {
            setOpen(false);
          }}
          className="text-center"
        >
          <div>
            {downloadProps?.description?.map((text, index) => (
              <div key={index}>{text}</div>
            ))}
          </div>
          <QRCodeDownload
            value={value}
            downloadProps={downloadProps}
            QRCodeProps={QRCodeProps}
            download
            title={title}
            className="w-full flex flex-col items-center justify-center"
          />
        </Modal>
      )}
    </>
  );
};

export { QRCodeDownload };
