import { Row, RowProps } from "antd";
import React from "react"


interface IndentWrapperProps extends RowProps{
  padding?: {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number
  } | number,
  margin?: {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number
  } | number
}

const BASE_UNIT = 10;

/**
 * Follow fibonaci range of numbers.
 */
export const IndentSize = {
  ONE_UNIT: 1,
  TWO_UNIT: 2,
  THREE_UNIT: 3,
  FIVE_UNIT: 5,
  EIGHT_UNIT: 8,
  THIRTEEN_UNIT: 13,
}

export const IndentWrapper: React.FC<IndentWrapperProps> = (props: React.ComponentProps<any>) => {
  const { padding, margin } = props
  let style = {};
  
  //Handle padding is a number
  if(padding && typeof padding === 'number'){
    style={ padding: `${(padding > 0)? (padding * BASE_UNIT): 0 }px` }
  }

  //Handle padding is an object.
  if(padding && typeof padding === 'object'){
    const { left, right, top, bottom } = padding;
    
    if(left > 0){
      style = {
        ...style,
        paddingLeft: `${ left * BASE_UNIT }px`,
      }
    }

    if(right > 0){
      style = {
        ...style,
        paddingRight: `${ right * BASE_UNIT }px`,
      }
    }

    if(top > 0){
      style = {
        ...style,
        paddingTop: `${ top * BASE_UNIT }px`,
      }
    }
    
    if(bottom > 0){
      style = {
        ...style,
        paddingBottom: `${ bottom * BASE_UNIT }px`,
      }
    }
  }

  //Handle margin is an number.
  if(margin && typeof margin === 'number'){
    style={ ...style, margin: `${(margin > 0? (margin * BASE_UNIT): 1) }px` }
  }

  //Handle margin is an object.
  if(margin  && typeof margin === 'object'){
    const { left, right, top, bottom } = margin;
   
    if(left > 0){
      style = {
        ...style,
        marginLeft: `${ left * BASE_UNIT }px`,
      }
    }

    if(right > 0){
      style = {
        ...style,
        marginRight: `${ right * BASE_UNIT }px`,
      }
    }

    if(top > 0){
      style = {
        ...style,
        marginTop: `${ top * BASE_UNIT }px`,
      }
    }
    
    if(bottom > 0){
      style = {
        ...style,
        marginBottom: `${ bottom * BASE_UNIT }px`,
      }
    }
  }
  const clonedProps = {...props};
  delete clonedProps["margin"];
  delete clonedProps["padding"];
  return (
    <Row {...clonedProps} style={{...style, width: '100%'}}>
      {props.children}
    </Row>
  )
}