
import { Mentions } from 'antd'
import React from 'react'
import { BaseDropdownModel } from '../model/base-dropdown.model'

/**
 * Generate option of dropdown from list data input
 * @param inputData
 */
export const generateMentionOptionFromListBaseDropdown = (inputData: BaseDropdownModel[]) => {
  const children: any[] = []
  inputData.forEach((el, index) => {
    children.push(
      <Mentions.Option key={`${index}`} value={el.id}>
        {el.label}
      </Mentions.Option>
    )
  })

  return children
}
