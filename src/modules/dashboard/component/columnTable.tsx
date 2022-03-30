import { getMarkColor } from '@/fe-helper/core/utility/formatter'
import { generateColumnIndex } from '@/shared/helper/table.helper'

export default function ColumnTable() {
  return generateColumnIndex(
    [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        render: (value) => {
          return <span>{value}</span>
        },
      },
      {
        title: 'mark',
        dataIndex: 'mark',
        key: 'mark',
        align: 'right' as const,
        render: (value) => {
          return <span style={{ color: getMarkColor(value) }}>{value}</span>
        },
      },
    ] as any,(value:any,record: any, index) => {
      return <div>{index + 1}</div>
    },
  )
}
