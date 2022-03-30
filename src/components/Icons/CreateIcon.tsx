import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';

const CreateSvg = (props: any) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8V14H6V8H0V6H6V0H8V6H14V8H8Z" fill={props.fill} />
  </svg>
);
export default (props: any) => <Icon component={() => <CreateSvg {...props} />} {...props}></Icon>;
