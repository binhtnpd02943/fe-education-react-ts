import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';

const ProcessingProcedureSvg = (props: any) => (
  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.79662 16.2955C1.52543 16.2955 0.423737 15.2579 0.423737 14.0606V1.29001C0.423737 1.05056 0.593228 0.811107 0.762719 0.73129C0.847465 0.651474 1.01696 0.651474 1.1017 0.651474C1.18645 0.651474 1.35594 0.651474 1.44069 0.73129L4.0678 2.16799L6.69492 0.73129C6.77967 0.651474 6.94916 0.651474 7.03391 0.651474C7.11865 0.651474 7.28814 0.651474 7.37289 0.73129L10 2.16799L12.6271 0.73129C12.7119 0.651474 12.8814 0.651474 12.9661 0.651474C13.0509 0.651474 13.2203 0.651474 13.3051 0.73129C13.4746 0.811107 13.6441 1.05056 13.6441 1.29001V8.63311H16.3559C16.6949 8.63311 17.0339 8.95238 17.0339 9.27165V14.0606C17.0339 15.2579 15.9322 16.2955 14.661 16.2955H2.79662ZM13.6441 14.0606C13.6441 14.6193 14.0678 15.0184 14.661 15.0184C15.2542 15.0184 15.678 14.6193 15.678 14.0606V9.91018H13.6441V14.0606ZM1.77967 14.0606C1.77967 14.6193 2.2034 15.0184 2.79662 15.0184H12.5424L12.4576 14.779C12.3729 14.5395 12.2881 14.3001 12.2881 14.0606V2.40743L10.339 3.44505C10.2542 3.52486 10.0848 3.52486 10 3.52486C9.91526 3.52486 9.74577 3.52486 9.66102 3.44505L7.03391 2.00835L4.40679 3.44505C4.32204 3.52486 4.15255 3.52486 4.0678 3.52486C3.98306 3.52486 3.81357 3.52486 3.72882 3.44505L1.77967 2.40743V14.0606ZM4.49153 13.1028C4.15255 13.1028 3.81357 12.7836 3.81357 12.4643C3.81357 12.145 4.15255 11.8258 4.49153 11.8258H9.57628C9.91526 11.8258 10.2542 12.145 10.2542 12.4643C10.2542 12.7836 9.91526 13.1028 9.57628 13.1028H4.49153ZM4.49153 9.91018C4.15255 9.91018 3.81357 9.59091 3.81357 9.27165C3.81357 8.95238 4.15255 8.63311 4.49153 8.63311H9.57628C9.91526 8.63311 10.2542 8.95238 10.2542 9.27165C10.2542 9.59091 9.91526 9.91018 9.57628 9.91018H4.49153ZM6.18645 6.71752C5.84747 6.71752 5.50848 6.39825 5.50848 6.07899C5.50848 5.75972 5.84747 5.44046 6.18645 5.44046H7.88136C8.22035 5.44046 8.55933 5.75972 8.55933 6.07899C8.55933 6.39825 8.22035 6.71752 7.88136 6.71752H6.18645Z"
      fill={props.fill}
    />
  </svg>
);
export default (props: any) => (
  <Icon component={() => <ProcessingProcedureSvg {...props} />} {...props}></Icon>
);