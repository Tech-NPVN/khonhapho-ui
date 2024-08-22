import { Button, Modal, type ModalFuncProps } from 'antd';

const modalError = (props: ModalFuncProps) => {
  Modal.confirm({
    type: 'error',
    footer: (
      <div className="ant-modal-confirm-btns">
        <Button
          onClick={() => {
            if (props.onCancel) props.onCancel();
            Modal.destroyAll();
          }}
          type="text"
        >
          {props.cancelText ?? 'Huỷ'}
        </Button>
        <Button onClick={props.onOk} type="primary" danger>
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
    ...props,
  });
};

const modalWarning = (props: ModalFuncProps) => {
  Modal.confirm({
    type: 'warning',
    ...props,
  });
};

const modalInfo = (props: ModalFuncProps) => {
  Modal.confirm({
    type: 'info',
    ...props,
  });
};

export { modalError, modalInfo, modalSuccess, modalWarning };
