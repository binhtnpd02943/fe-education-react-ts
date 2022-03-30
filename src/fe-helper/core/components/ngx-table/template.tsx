import React from 'react'
import { TablePaginationConfig } from 'antd'
import _ from 'lodash'
import EditableRow from './ngx-edit-table/row'
import EditableCell from './ngx-edit-table/cell'

/**
 * Builder editable setting row and cell
 */
export const builderEditableSetting = () => {
  return {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }
}

/**
 * Map column if editable column setting
 * @param columnsState
 * @param columnProps
 * @param handleSave
 * @param displayErrorEditable
 * @param handleClick
 */
export const mapColumnNgxEditTable = (
  columnsState,
  columnProps,
  handleSave,
  displayErrorEditable,
  handleClick,
  ) => {
  return columnsState
    ?.filter((column) => {
      return !column.hide
    })
    .map((column) => {
      return {
        ...column,
        onCell: (record: any, rowIndex) => ({
          onClick: () => handleClick ? handleClick({column: column.dataIndex, record}) : ({}),
          record,
          editable: column.editable,
          dataIndex: [rowIndex, column.dataIndex],
          title: column.title,
          handleSave: handleSave,
          config: findDataOnColumnWhenHaveEditable(column.dataIndex, columnProps)?.editableConfig,
          rowIndex: rowIndex,
          isValidate: displayErrorEditable,
        }),
      }
    })
}

/**
 * Set function validate and state submit on edit table
 * @param record
 * @param rowIndex
 * @param displayErrorEditable
 * @param handleErrorValidateTable
 */
export const mapRowSetting = (record, rowIndex, displayErrorEditable, handleErrorValidateTable): any => {
  return {
    record,
    index: rowIndex,
    setFieldsError: handleErrorValidateTable,
    isValidate: displayErrorEditable,
  }
}

/**
 * Get filter default
 * @param columns
 */
export const getFilterInit = (columns) => {
  let filterDefault = {}
  columns && columns.map((column) => {
    column.filterDefault && (filterDefault = { ...filterDefault, ...column.filterDefault })
  })
  return filterDefault
}

/**
 * Find column data index
 * @param inputDataIndex
 * @param columns
 */
const findDataOnColumnWhenHaveEditable = (inputDataIndex, columns) => {
  return columns.find((el) => el.dataIndex === inputDataIndex)
}

/**
 * Builder base pagination when no have config from parent component
 * @param props
 * @param ngxTableState
 * @param filterParams
 * @param intl
 * @param dispatch
 */
export const builderPagination = (props, ngxTableState, filterParams, intl, dispatch) => {
  return {
    showSizeChanger: true,
    total: props.total,
    pageSize: ngxTableState.size,
    current: ngxTableState.page,
    showTotal: (total, range) => `${range[0]}-${range[1]}/${total} Bản ghi`,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '50', '100', '200'],
    responsive: true,
    locale: 'vi',
    onChange: (page: number, pageSize?: number) => {
      const submitData = { page: page - 1, size: pageSize, filterParams }
      dispatch(props.setTableState(submitData))
      fetchDataAction({ ...ngxTableState, paramState: { ...submitData } }, props)
    },
  } as TablePaginationConfig
}

/**
 * Builder row selection config and handle click row with selected key
 * @param key
 * @param tableSelection
 * @param props
 * @param dispatch
 */
export const builderRowSelection = (key, tableSelection, props, dispatch) => {
  return {
    selectedRowKeys: tableSelection.map(function(item) {
      return item instanceof Object ? item[key] : item
    }),
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      let diff: any[] = []
      if (tableSelection.length > selectedRows.length) {
        diff = _.differenceBy(tableSelection, selectedRows, key)
      }
      let newSelectedRows = [...tableSelection, ...selectedRows]
      newSelectedRows = _.unionBy(newSelectedRows, key)
      _.remove(newSelectedRows, (elem) => {
        return diff.findIndex((diffElem) => diffElem[key] === elem[key]) !== -1
      })
      if (!props.selectedKey) {
        dispatch(props.setRowSelectedState(newSelectedRows))
      } else {
        const mapSelectionByKey: string[] = []
        newSelectedRows.forEach((el) => {
          if (el[key]) {
            mapSelectionByKey.push(el[key])
          }
        })
        dispatch(props.setRowSelectedState(mapSelectionByKey))
      }
    },
  }
}

/**
 * Fetch data and send to parent component
 * @param dataSubmit
 * @param props
 */
export const fetchDataAction = (dataSubmit, props) => {
  if (props.fetchData) {
    props.fetchData(dataSubmit)
  }
}