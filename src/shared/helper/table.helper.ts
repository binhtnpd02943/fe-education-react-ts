/**
 * Add new column STT to list data
 * @param dataSource
 * @param page
 * @param size
 */

import { formatMoney } from '@/fe-helper/core/utility/formatter'

export const mapListDataWithNewColumnIndex = (dataSource: any[], page: number, size: number) => {
  return dataSource?.map((el, index) => {
    return {
      ...el,
      totalAmount: formatMoney(el?.totalAmount | 0),
      index: (page * size) + (index + 1),
    }
  })
}

/**
 * Add column STT to list column
 * @param listColumns
 * @param render
 */
export const generateColumnIndex = (listColumns: any, render: any) => {
  listColumns.unshift(
    {
      title: 'STT',
      dataIndex: 'index',
      className: `text-center`,
      render: render,
    },
  )
  return listColumns
}