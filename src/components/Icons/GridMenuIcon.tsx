import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';

const GridMenuSvg = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0.723755H4.5V5.37884H0V0.723755Z" fill="white" />
    <path d="M0 7.70639H4.5V12.3615H0V7.70639Z" fill="white" />
    <path d="M4.5 14.689H0V19.3441H4.5V14.689Z" fill="white" />
    <path d="M6.75 0.723755H11.25V5.37884H6.75V0.723755Z" fill="white" />
    <path d="M11.25 7.70639H6.75V12.3615H11.25V7.70639Z" fill="white" />
    <path d="M6.75 14.689H11.25V19.3441H6.75V14.689Z" fill="white" />
    <path d="M18 0.723755H13.5V5.37884H18V0.723755Z" fill="white" />
    <path d="M13.5 7.70639H18V12.3615H13.5V7.70639Z" fill="white" />
    <path d="M18 14.689H13.5V19.3441H18V14.689Z" fill="white" />
  </svg>
);
export default (props: any) => <Icon component={GridMenuSvg} {...props}></Icon>;
