import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';

const UploadSvg = (props: any) => (
  <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 20H0V18H14V20Z" fill="white" />
    <path
      d="M13 6L7 -5.24537e-07L1 6L2.41 7.41L6 3.83L6 16L8 16L8 3.83L11.59 7.41L13 6Z"
      fill={props.fill}
    />
  </svg>
);
export default (props: any) => <Icon component={() => <UploadSvg {...props} />} {...props}></Icon>;
