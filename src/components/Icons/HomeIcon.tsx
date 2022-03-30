import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';

const HomeSvg: React.FC<any> = (props: any) => (
  <svg width="18" height="17" viewBox="0 0 18 17" fill={props.fill || 'white'} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.666687 8.83334L8.41085 1.08917C8.73627 0.763855 9.26377 0.763855 9.58919 1.08917L17.3334 8.83334H15.6667V15.5C15.6667 15.9602 15.2936 16.3333 14.8334 16.3333H10.6667V10.5H7.33335V16.3333H3.16669C2.70645 16.3333 2.33335 15.9602 2.33335 15.5V8.83334H0.666687Z"
    />
  </svg>
);
export default (props: any) => <Icon component={() => <HomeSvg {...props} />} {...props}></Icon>;
