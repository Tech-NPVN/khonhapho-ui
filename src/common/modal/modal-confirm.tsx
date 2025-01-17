import { sfProPlayFont } from '@/configs/font.config';
import { Button, Modal, type ModalFuncProps } from 'antd';

const modalError = (props: ModalFuncProps) => {
  Modal.confirm({
    type: 'error',
    style: { fontFamily: sfProPlayFont.style.fontFamily, ...props.style },
    footer: (
      <div className="ant-modal-confirm-btns">
        <Button
          onClick={() => {
            if (props.onCancel) props.onCancel();
            Modal.destroyAll();
          }}
          type="text"
          className='rounded-lg'
        >
          {props.cancelText ?? 'Huỷ'}
        </Button>
        <Button
          onClick={() => {
            props.onOk?.();
            Modal.destroyAll();
          }}
          type="primary"
          danger
          className="dark:!bg-error_d rounded-lg font-medium"
        >
          {props.okText ?? 'Đồng ý'}
        </Button>
      </div>
    ),
    ...props,
  });
};

const modalSuccess = (props: ModalFuncProps) => {
  Modal.confirm({
    type: 'success',
    style: { fontFamily: sfProPlayFont.style.fontFamily, ...props.style },
    ...props,
  });
};

const modalWarning = (props: ModalFuncProps) => {
  Modal.confirm({
    type: 'warning',
    style: { fontFamily: sfProPlayFont.style.fontFamily, ...props.style },
    ...props,
  });
};

const modalInfo = (props: ModalFuncProps) => {
  Modal.confirm({
    type: 'info',
    style: { fontFamily: sfProPlayFont.style.fontFamily, ...props.style },
    ...props,
  });
};

export { modalError, modalInfo, modalSuccess, modalWarning };
