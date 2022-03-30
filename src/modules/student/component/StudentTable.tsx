import { ColumnConfig } from '@/fe-helper/core/model/column.model'
import { capitalizeString, getMarkColor } from '@/fe-helper/core/utility/formatter'
import { City } from '@/shared/model/city.model'
import { DeleteOutlined, FileAddOutlined, FileOutlined, PrinterOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

export function StudentColumnTable(cityMap: { [key: string]: City }) {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      ellipsis: true,
      valueType: 'text',
      range: true,
      render: (value) => {
        return <span>{value}</span>
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ellipsis: true,
      valueType: 'text',
      isFilter: true,
      range: true,
      fixedSetting: true,
      render: (name: string) => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      ellipsis: true,
      valueType: 'text',
      isFilter: true,
      fixedSetting: true,
      render: (value) => {
        return <span>{capitalizeString(value)}</span>
      },
    },
    {
      title: 'Mark',
      dataIndex: 'mark',
      key: 'mark',
      align: 'right' as const,
      ellipsis: true,
      valueType: 'text',
      isFilter: true,
      fixedSetting: true,
      render: (value) => {
        return <span style={{ color: getMarkColor(value) }}>{value}</span>
      },
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      align: 'center',
      ellipsis: true,
      valueType: 'text',
      isFilter: true,
      fixedSetting: true,
      render: (value: any) => {
        return <div>{cityMap[value]?.name}</div>
      },
    },
  ] as ColumnConfig
}

/**
 * Render table actions when there is at least one row is selected.
 * @param listStudentState
 * @param tableSelection
 * @param deleteStudent
 * @returns
 */
export const tableActions = (listStudentState, tableSelection, deleteStudent) => {
  const selectedRowsExists = !!(tableSelection || []).length

  return (
    <>
      <Button type="primary" loading={listStudentState.isLoading} danger icon={<DeleteOutlined />} onClick={() => deleteStudent()}>
        Xóa
      </Button>
      <Button type="primary" icon={<PrinterOutlined />}>
        In
      </Button>
      <Button type="primary" icon={<FileAddOutlined />} disabled={selectedRowsExists} loading={listStudentState.isLoading}>
        Ghi sổ
      </Button>
      <Button type={'primary'} icon={<FileOutlined />} disabled={selectedRowsExists} loading={listStudentState.isLoading}>
        Xóa sổ
      </Button>
    </>
  )
}
/**
 * Cast param filter after submit form
 * @param filterParamProps
 * @param outPutData
 */
export const castParamFilter = (filterParamProps, outPutData) => {
  return {
    _page: outPutData.paramState._page,
    _limit: outPutData.paramState._limit,
    ...filterParamProps,
  }
}
