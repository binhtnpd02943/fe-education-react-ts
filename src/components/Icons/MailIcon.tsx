import React from 'react'
import Icon from '@ant-design/icons/lib/components/Icon';

const MailSvg: React.FC<any> = (props: any) => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.333 11.3327H1.66634C0.929961 11.3327 0.333008 10.7357 0.333008 9.99935V1.94135C0.36408 1.22771 0.95203 0.665341 1.66634 0.666016H12.333C13.0694 0.666016 13.6663 1.26297 13.6663 1.99935V9.99935C13.6663 10.7357 13.0694 11.3327 12.333 11.3327ZM1.66634 3.24468V9.99935H12.333V3.24468L6.99967 6.79935L1.66634 3.24468ZM2.19967 1.99935L6.99967 5.19935L11.7997 1.99935H2.19967Z"
      fill="#455570"
    />
  </svg>
)
export default (props: any) => <Icon component={() => <MailSvg {...props} />} {...props}></Icon>
