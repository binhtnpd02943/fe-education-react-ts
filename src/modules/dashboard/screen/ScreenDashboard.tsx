import Sidebar from '@/components/common/Sidebar'
import { ApplicationState } from '@/fe-helper/core/store/types'
import { TeamOutlined } from '@ant-design/icons'
import { Col, Form, Row, Table, Typography } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataDashboard } from '../action'
import ColumnTable from '../component/columnTable'
import StatisticItem from '../component/StatisticItem'
import Widget from '../component/Widget'

export default function ScreenDashboard() {
  const dispatch = useDispatch()
  const dashboardState: any = useSelector<ApplicationState | null>((state) => state?.dashboard)
  const { loading, statistics, highestStudentList, lowestStudentList, rankingByCityList } = dashboardState

  useEffect(() => {
    dispatch(fetchDataDashboard({}))
  }, [dispatch])

  return (
    <Sidebar>
      {/* Statistic Section */}
      <Row gutter={16} className="mb-5">
        <Col span={6}>
          <StatisticItem icon={<TeamOutlined />} label="male" value={statistics.maleCount} />
        </Col>
        <Col span={6}>
          <StatisticItem icon={<TeamOutlined />} label="female" value={statistics.femaleCount} />
        </Col>
        <Col span={6}>
          <StatisticItem icon={<TeamOutlined />} label="mark >= 8" value={statistics.highMarkCount} />
        </Col>
        <Col span={6}>
          <StatisticItem icon={<TeamOutlined />} label="mark <= 5" value={statistics.lowMarkCount} />
        </Col>
      </Row>

      {/* All student ranking */}
      <Row>
        <Col span={24}>
          <Form wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} labelAlign="left" layout="vertical">
            <Row gutter={16}>
              <Col span={24} style={{ marginTop: '15px' }}>
                <Typography.Title level={3}>All Student</Typography.Title>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <Widget title="Student with highest mart">
                  <Table
                    columns={ColumnTable()}
                    dataSource={highestStudentList}
                    loading={loading}
                    tableLayout="fixed"
                    size="small"
                    rowKey="id"
                    pagination={false}
                  />
                </Widget>
              </Col>

              <Col xs={24} md={12} lg={6}>
                <Widget title="Student with lowest mart">
                  <Table
                    columns={ColumnTable()}
                    dataSource={lowestStudentList}
                    loading={loading}
                    tableLayout="fixed"
                    size="small"
                    rowKey="id"
                    pagination={false}
                  />
                </Widget>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {/* Rankings by city */}
      <Row>
        <Col span={24}>
          <Form wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} labelAlign="left" layout="vertical">
            <Row gutter={16}>
              <Col span={24} style={{ marginTop: '15px' }}>
                <Typography.Title level={3}>Rankings by city</Typography.Title>
              </Col>
              {rankingByCityList.map((ranking) => (
                <Col key={ranking.cityId} xs={24} md={12} lg={6}>
                  <Widget title={ranking.cityName}>
                    <Table
                      columns={ColumnTable()}
                      dataSource={ranking.rankingList}
                      loading={loading}
                      tableLayout="fixed"
                      size="small"
                      rowKey="id"
                      pagination={false}
                    />
                  </Widget>
                </Col>
              ))}
            </Row>
          </Form>
        </Col>
      </Row>
    </Sidebar>
  )
}
