import Icon from '@ant-design/icons/lib/components/Icon';
import React from 'react';


const DialogImportantSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C19.9939 15.5203 15.5203 19.9939 10 20ZM9 13V15H11V13H9ZM9 5V11H11V5H9Z"
      fill="#EE4F5A"
    />
  </svg>
);
export default (props: any) => <Icon component={DialogImportantSvg} {...props}></Icon>;
