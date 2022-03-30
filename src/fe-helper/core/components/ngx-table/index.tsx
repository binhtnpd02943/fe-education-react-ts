import { Col, Row, Space, Table } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { IndentSize, IndentWrapper } from '../indent-wrapper'
import ScreenTitle from '../screenTitle'
import { TableAction } from './ngx-actions'
import ColumnSetting from './ngx-column'
import CustomLightFilter from './ngx-filter'
import { renderSummary } from './ngx-summary'
import {
  builderEditableSetting,
  builderPagination,
  builderRowSelection,
  fetchDataAction,
  getFilterInit,
  mapColumnNgxEditTable,
  mapRowSetting,
} from './template'
import { Props, TableListParams } from './type'
import './style.module.scss'
import { accessObjectByArrayStringPath } from '@/fe-helper/core/utility/utils-functions'

export const NgxTableType = {
  REPORT: 'REPORT',
  FORM: 'FORM',
}

const NgxTable: FC<Props> = (props: Props) => {
  const intl = useIntl()
  const dispatch = useAppDispatch()
  const key = props.selectedKey || 'id'
  const ngxTableState: any = useAppSelector((s) => accessObjectByArrayStringPath(s, props.stateName))

  const tableSelection = ngxTableState.tableSelection || []
  const expandSelection = ngxTableState.expandSelection || []
  const [collapsedRowKeys, SetCollapsedRowKeys] = useState([])
  const columnsSettings = ngxTableState.columnsSetting && !!ngxTableState.columnsSetting.length ? ngxTableState.columnsSetting : props.columns

  const { filterParams } = ngxTableState.paramState
  const isEditTable = props.columns?.find((el) => el?.editable)
  const exactlyColumn = ngxTableState.columnsSetting.length === 0 ? props.columns : ngxTableState.columnsSetting

  const onInit = () => {
    dispatch(props.setColumnDisplayState?.(props.columns))
    setFilterParams(getFilterInit(props && props?.columns))
  }

  useEffect(onInit, [])

  /**
   * Save data when change cell
   * @param row
   * @param rowIndex
   * @param columnEdit
   */
  const handleSave = (row: any, rowIndex: number, columnEdit) => {
    props.onEditCellComplete({ ...row, rowIndex: rowIndex, columnEdit: columnEdit })
  }

  /**
   * Validate error from editable and send it to parent
   * @param error
   */
  const handleErrorValidateTable = (error) => {
    if (props?.getFieldsError) {
      props.getFieldsError(error)
    }
  }

  const columnNgxEditTable = mapColumnNgxEditTable(columnsSettings, props.columns, handleSave, props?.displayErrorEditable, props?.onClickCell)

  /**
   * Set columnsSetting redux state when change column setting
   * |@param setColumnsMap
   */
  const setColumnsMap = (setColumnsMap) => {
    dispatch(props.setColumnDisplayState(setColumnsMap))
  }

  /**
   * Set Filter params when filter on change
   * @param values
   */
  const setFilterParams = (values) => {
    const submitData = {
      _page: ngxTableState.paramState._page,
      _limit: ngxTableState.paramState._limit,
      filterParams: values,
    }
    dispatch(props.setTableState(submitData))
    fetchDataAction({ ...ngxTableState, paramState: { ...submitData } }, props)
  }

  /**
   * Filter data from light filter
   * @param values
   */
  const filterData = (values: TableListParams) => {
    setFilterParams(values)
  }

  const isShowAction = tableSelection.length > 0 || props?.isAlwaysOnDisplayAction
  const tableSize = props.reportTable ? 'small' : props.size
  let tableClass = `ant-table-common ${isEditTable ? 'ant-editable' : ''}`

  if (props.tableType === NgxTableType.REPORT) {
    tableClass = `${tableClass} table-report`
  }

  if (props.tableType === NgxTableType.FORM) {
    tableClass = `${tableClass} table-inside-form`
  }

  const titlePortion = (
    <Col span={24}>
      <Row align="middle" className={'title-portion'}>
        {props.title && (
          <Col span={8} className="title-wrapper">
            <ScreenTitle title={props.title} />
          </Col>
        )}
        {(props.portionActions || !!(Array.isArray(props.portionActions) && props.portionActions?.length)) && (
          <Col span={props.title ? 16 : 24}>
            <Row justify="end">{props.portionActions}</Row>
          </Col>
        )}
        {(props.mainToolbar || !!(Array.isArray(props.mainToolbar) && props.mainToolbar?.length)) && (
          <Col span={props.title ? 16 : 24}>
            <Row justify="end">{props.mainToolbar}</Row>
          </Col>
        )}
      </Row>
    </Col>
  )
  const columnSettings = (
    <Col span={24}>
      <IndentWrapper align="bottom" margin={{ bottom: IndentSize.ONE_UNIT }}>
        <Col span={props.hideColumnSetting ? 24 : 23}>
          <TableAction isShowAction={isShowAction} actions={props.actions} tableSelection={tableSelection} />
        </Col>
        {!props.hideColumnSetting ? (
          <Col span={1}>
            <Row justify="end">
              <Space>
                <ColumnSetting columns={exactlyColumn} setColumnsMap={setColumnsMap} />
              </Space>
            </Row>
          </Col>
        ) : (
          <></>
        )}
      </IndentWrapper>
    </Col>
  )

  return (
    <IndentWrapper gutter={8} className={tableClass}>
      {!props.tableType || props.tableType !== NgxTableType.FORM ? titlePortion : <></>}

      {props.filter && (
        <Col span={24} className="filter-wrapper">
          <CustomLightFilter
            params={filterParams}
            setFilterParams={setFilterParams.bind(this)}
            columns={columnNgxEditTable}
            filterData={filterData.bind(this)}
          />
        </Col>
      )}
      {!props.hideColumnSetting || isShowAction ? columnSettings : <></>}

      <Row style={{ width: '100%' }}>
        <Col span={24}>
          <Table
            onRow={(record, rowIndex) => mapRowSetting(record, rowIndex, props?.displayErrorEditable, handleErrorValidateTable)}
            dataSource={props.dataSource}
            rowClassName={props.rowClassName}
            loading={props.loading}
            components={builderEditableSetting()}
            pagination={props.pagination ? builderPagination(props, ngxTableState, filterParams, intl, dispatch) : false}
            rowKey={key}
            scroll={props.scroll}
            rowSelection={props.useRowSelect ? builderRowSelection(key, tableSelection, props, dispatch) : undefined}
            footer={() => props.footer}
            columns={columnNgxEditTable}
            bordered
            summary={() => renderSummary(columnNgxEditTable, props.summary)}
            expandable={{
              onExpandedRowsChange: (expandedRows) => {
                SetCollapsedRowKeys(expandSelection.filter((key) => !expandedRows.some((expandKey) => expandKey === key)))
              },
              expandedRowKeys: expandSelection.filter((key) => !collapsedRowKeys.some((collapsedKey) => collapsedKey === key)),
            }}
            size={tableSize}
          />
        </Col>
      </Row>
    </IndentWrapper>
  )
}

export default NgxTable
