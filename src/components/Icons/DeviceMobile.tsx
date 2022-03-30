import React from 'react'
import Icon from '@ant-design/icons/lib/components/Icon';

const DeviceMobileSvg: React.FC<any> = (props: any) => (
  <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.33301 15.3327H1.66634C0.929961 15.3327 0.333008 14.7357 0.333008 13.9994V1.94135C0.36408 1.22771 0.95203 0.665341 1.66634 0.666016H8.33301C9.06939 0.666016 9.66634 1.26297 9.66634 1.99935V13.9994C9.66634 14.7357 9.06939 15.3327 8.33301 15.3327ZM1.66634 1.99935V13.9994H8.33301V1.99935H6.99967C6.99967 2.73573 6.40272 3.33268 5.66634 3.33268H4.33301C3.59663 3.33268 2.99967 2.73573 2.99967 1.99935H1.66634Z"
      fill="#455570"
    />
  </svg>
)
export default (props: any) => <Icon component={() => <DeviceMobileSvg {...props} />} {...props}></Icon>
