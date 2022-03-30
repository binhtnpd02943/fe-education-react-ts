import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';

const EditSvg = (props: any) => (
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.826578 15C0.595628 14.9996 0.375464 14.9022 0.219804 14.7316C0.061273 14.5624 -0.0175016 14.3335 0.00327494 14.1026L0.204984 11.8846L9.52313 2.56977L12.4352 5.48097L3.11948 14.795L0.901499 14.9967C0.875976 14.9992 0.850454 15 0.826578 15ZM13.0164 4.89889L10.1052 1.98769L11.8514 0.241464C12.0059 0.0868664 12.2154 0 12.4339 0C12.6524 0 12.862 0.0868664 13.0164 0.241464L14.7626 1.98769C14.9172 2.14212 15.0041 2.35166 15.0041 2.57018C15.0041 2.78869 14.9172 2.99824 14.7626 3.15266L13.0172 4.89807L13.0164 4.89889Z"
      fill={props.fill}
    />
  </svg>
);

const EditIcon = (props: any) => <Icon component={() => <EditSvg {...props} />} {...props}></Icon>;
export default EditIcon