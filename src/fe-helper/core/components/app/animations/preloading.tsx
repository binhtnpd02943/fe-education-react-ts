
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import '../styles/preloading.scss';

const Preloading: React.FC = () => {
  const [showSpin, setShowSpin] = useState<boolean>(true);
  useEffect(() => {
    if (showSpin) {
      setTimeout(() => {
        setShowSpin(false);
      }, 2000)
    }
  })
  if (showSpin) {
    return (
      <CenterSpin/>
    )
  } else {
    return <></>
  }
}
export const CenterSpin: React.FC = () => {
  return <div className="main-wrap main-wrap--white">
  {/* <div className="spinnerLoading"></div> */}
  <Spin spinning size='large'/>
</div>
}
export default Preloading