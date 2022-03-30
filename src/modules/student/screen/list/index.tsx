import Sidebar from '@/components/common/Sidebar'
import { ApplicationState } from '@/fe-helper/core/store/types'
import { Button, Col, Row } from 'antd'
import React, { useEffect } from 'react'
import NgxTable from '@/fe-helper/core/components/ngx-table'
import { useDispatch, useSelector } from 'react-redux'
import { actionTable, deleteStudentRequest, getListStudentRequest } from './action'
import { castParamFilter, StudentColumnTable, tableActions } from '../../component/StudentTable'
import { Builder } from '@/shared/helper/builder.helper'
import { ListStudentModel } from './type'
import { PlusOutlined } from '@ant-design/icons'
import { mapListDataWithNewColumnIndex } from '@/shared/helper/table.helper'
import { Link } from 'react-router-dom'
import { showConfirm } from '@/fe-helper/core/components/modal'
import { BaseInDto } from '@/shared/indto/base.indto'
import { selectCityMap } from '@/modules/city/list/reducer'
import { fetchCityListRequest } from '@/modules/city/list/action'

export default function ScreenListStudent() {
  const dispatch = useDispatch()
  const listStudentState: any = useSelector<ApplicationState | null>((s) => s?.student)
  const cityMap = useSelector(selectCityMap)
  const { _page, _limit } = listStudentState.paramState
  const { tableSelection, dataSource } = Builder<ListStudentModel>()
    .tableSelection(listStudentState?.tableSelection)
    .dataSource(mapListDataWithNewColumnIndex(listStudentState?.data, _page, _limit))
    .build()

  const totalRows = listStudentState.data?.reduce((total, currentValue) => (currentValue ? total + 1 : total), 0)

  useEffect(() => {
    dispatch(getListStudentRequest({}))
    dispatch(fetchCityListRequest())
  }, [dispatch])

  const deleteStudent = () => {
    showConfirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có muốn xóa sinh viên đã chọn hay không?',
      icon: 'delete',
      onOK: () => {
        dispatch(
          deleteStudentRequest(
            Builder<BaseInDto>()
              .ids(tableSelection?.map((el) => el.id))
              .skipModel(castParamFilter(listStudentState.paramState, listStudentState))
              .build(),
          ),
        )
        dispatch(actionTable.setSelectedRowStateNgxTable([]))
      },
    })
  }

  const mainToolbar = (
    <Button type="primary">
      <Link to={'/student/add'}>
        <PlusOutlined />
        Thêm mới
      </Link>
    </Button>
  )

  return (
    <Sidebar>
      <Row className={'student list'}>
        <Col span={24}>
          <NgxTable
            stateName={'student'}
            title="Danh sách sinh viên"
            size="middle"
            columns={StudentColumnTable(cityMap)}
            loading={listStudentState.isLoading}
            actions={tableActions(listStudentState, tableSelection, deleteStudent)}
            filter={true}
            hideColumnSetting
            useRowSelect={true}
            pagination={true}
            dataSource={dataSource}
            total={totalRows}
            mainToolbar={mainToolbar}
            setRowSelectedState={actionTable.setSelectedRowStateNgxTable}
            setColumnDisplayState={actionTable.setColumnSettingNgxTable}
            setTableState={actionTable.setBaseStateNgxTable}
            summary={{
              id: {
                value: `Số dòng = ${totalRows}`,
                colSpan: 5,
              },
            }}
          ></NgxTable>
        </Col>
      </Row>
    </Sidebar>
  )
}
