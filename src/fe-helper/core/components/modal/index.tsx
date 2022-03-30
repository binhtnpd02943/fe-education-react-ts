import DialogImportantIcon from '@/components/Icons/DialogImportantIcon';
import { Modal } from 'antd';
import React from 'react';

import './style.module.less';

const { confirm } = Modal;

export type ModalProps<T = any> = {
  title?: React.ReactNode | string;
  icon?: React.ReactNode | 'delete';
  content: React.ReactNode;
  data?: T;
  onOK?: (data: T) => void;
  onCancel?: (data: T) => void;
};

export const showConfirm = (props: ModalProps) => {
  confirm({
    title: props.title || 'Xác nhận',
    closable: true,
    centered: true,
    icon: props.icon === 'delete' ? <DialogImportantIcon /> : props.icon,
    content: props.content,
    cancelText: 'Hủy',
    okText: 'Đông ý',
    onOk() {
      props.onOK && props.onOK(props.data);
    },
    onCancel() {
      props.onCancel && props.onCancel(props.data);
    },
  });
};
