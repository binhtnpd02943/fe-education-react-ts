import { SettingFilled } from '@ant-design/icons'
import { Checkbox, Popover, Space, Tooltip, Tree } from 'antd'
import { cloneDeep } from 'lodash'
import React, { FC } from 'react'

type Props = {
  columns?: any[]
  setColumnsMap: any
}

const ColumnSetting: FC<Props> = (props: Props) => {
  const { columns, setColumnsMap } = props
  const defaultCheckedKeys: any[] = []
  const plainOptions: any[] = []
  let defaultIndeterminate = false
  let defaultCheckAll = true
  const treeData = (columns || []).map((item) => {
    if (!item.hide) {
      defaultCheckedKeys.push(item.dataIndex)
      if (!defaultIndeterminate) {
        defaultIndeterminate = true
        defaultCheckAll = false
      }
    }
    plainOptions.push(item.dataIndex)
    return {
      title: item.title,
      key: item.dataIndex,
      disabled: item.fixedSetting,
      // checkable: (item.fixed)?false:true
    }
  })
  const [indeterminate, setIndeterminate] = React.useState(defaultIndeterminate)
  const [checkAll, setCheckAll] = React.useState(defaultCheckAll)
  const [checkedList, setCheckedList] = React.useState(defaultCheckedKeys)

  const reGenColumns = (checkedKeys: any[]) => {
    if (checkedKeys.length === 0) {
      const listCheckedFixed = columns?.filter((el) => el.fixed)
      setCheckedList(listCheckedFixed && listCheckedFixed.length > 0 ? listCheckedFixed.map((element) => element.dataIndex) : [])
    } else {
      setCheckedList(checkedKeys)
    }

    const newColumns = columns?.map((column) => {
      const itemIndex = checkedKeys.findIndex((item) => item === column.dataIndex)
      return { ...column, hide: !column.fixed ? itemIndex == -1 : false }
    })
    setColumnsMap(newColumns)

    if (checkedKeys.length == plainOptions.length) {
      setCheckAll(true)
      setIndeterminate(false)
    }
  }
  const onCheck = (checkedKeys: any, info?: any) => {
    setIndeterminate(true)
    reGenColumns(checkedKeys)
  }

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
    reGenColumns(e.target.checked ? plainOptions : [])
  }
  const onDrop = (e) => {
    const { dragNodesKeys, dropPosition } = e
    let newColumn = cloneDeep(columns) || []
    const dragIndex = columns?.findIndex((item) => item.key == dragNodesKeys[0])
    const dragNode = newColumn[dragIndex || 0]
    newColumn = newColumn?.filter((item) => item.key != dragNodesKeys[0])
    newColumn?.splice(dropPosition - 1, 0, dragNode)
    setColumnsMap(newColumn)
  }

  return (
    <Popover
      arrowPointAtCenter
      title={
        <Space>
          <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={onCheckAllChange}>
            Tất cả
          </Checkbox>
        </Space>
      }
      trigger="click"
      placement="bottomRight"
      content={
        <Tree
          checkable
          draggable
          blockNode
          checkedKeys={checkedList}
          treeData={treeData}
          onCheck={(checkedKeys, info) => onCheck(checkedKeys, info)}
          onDrop={onDrop}
        />
      }
    >
      <Tooltip title={'Ẩn hiện cột'}>
        <SettingFilled />
      </Tooltip>
    </Popover>
  )
}

export default ColumnSetting
