import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';

const DialogWarningIconSvg = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.2659 17.998H1.73288C1.37562 17.998 1.04551 17.8074 0.866878 17.498C0.688252 17.1886 0.688254 16.8074 0.866885 16.498L10.1329 0.497992C10.3117 0.189104 10.6415 -0.00109863 10.9984 -0.00109863C11.3553 -0.00109863 11.6851 0.189104 11.8639 0.497992L21.1299 16.498C21.3084 16.8072 21.3085 17.1882 21.1301 17.4975C20.9518 17.8069 20.622 17.9976 20.2649 17.998H20.2659ZM9.99988 12.998V14.998H10.9329H10.9979H11.0629H11.9979V12.998H9.99988ZM9.99988 5.99799V10.998H11.9999V5.99799H9.99988Z"
      fill="#FFA113"
    />
  </svg>
);
export default (props: any) => <Icon component={DialogWarningIconSvg} {...props}></Icon>;
