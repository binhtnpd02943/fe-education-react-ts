
import { Col, Row, Space, Typography } from 'antd'
import React from 'react'

type TableActionProps = {
  actions?: React.ReactNode | React.ReactNode[]
  tableSelection?: any[]
  isShowAction: boolean | undefined
}
/**
 * Display actions position if actions elements available.
 * @param props
 * @returns
 */
export const TableAction: React.FC<TableActionProps> = (props: TableActionProps) => {
  const { isShowAction, tableSelection, actions } = props
  if (!actions || (Array.isArray(actions) && !actions.length)) {
    return <></>
  }

  return (
    <Row className="table-action">
      <Col span={24}>
        <Space>
          {isShowAction ? (
            <Typography.Link href="#" target="_blank" onClick={(e) => e.preventDefault()} strong>
              Đang chọn {(tableSelection || []).length}
            </Typography.Link>
          ) : (
            <></>
          )}

          {isShowAction && <>{actions}</>}
        </Space>
      </Col>
    </Row>
  )
}
