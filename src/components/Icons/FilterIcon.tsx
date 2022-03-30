import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';

const FilterSvg = (props: any) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.36485 17.2463V8.41711L0.193006 1.26918C-0.137298 0.864653 -0.100185 0.0333252 0.753408 0.0333252H17.2166C18.0182 0.0333252 18.2038 0.768159 17.777 1.26918L11.7536 8.22784V13.6908C11.7536 13.9135 11.6794 14.1028 11.4901 14.2512L7.63782 17.8067C7.19247 18.137 6.36485 17.9588 6.36485 17.2463ZM2.40121 1.53268L7.67864 7.63032C7.78998 7.77877 7.86421 7.93093 7.86421 8.1165V15.5613L10.258 13.3902V7.96805C10.258 7.78248 10.3322 7.63032 10.4435 7.48187L15.5688 1.53268H2.40121Z"
      fill={props.fill}
    />
  </svg>
);
export default (props: any) => <Icon component={() => <FilterSvg {...props} />} {...props}></Icon>;
