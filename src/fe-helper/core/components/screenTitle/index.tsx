
import { Typography } from "antd";
import React, { FC } from "react";

type Props = {
  title?: React.ReactNode | React.ReactNode[],
  textColor?: string,
  children?: React.ReactNode | React.ReactNode[],
};

const ScreenTitle: FC<Props> = (props: Props) => {
  const { title, children } = props;
  let { textColor } = props;
  if(textColor == undefined){
    textColor = '#29374F';
  }
  return (
    <Typography.Text style={{ fontWeight: 'bold', fontSize: '16px', lineHeight: '24.2px', color: textColor }}>{title || children}</Typography.Text>
  );
};

export default ScreenTitle