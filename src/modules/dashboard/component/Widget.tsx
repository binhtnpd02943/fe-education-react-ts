import { Card, Col, Row } from 'antd'
import './index.scss'

export interface WidgetProps {
  title: string
  children: any
}

export default function Widget({ title, children }: WidgetProps) {
  return (
    <div>
      <Row className="root">
        <Card bordered={false} title={title}>
          <Col style={{ marginTop: '5px' }}>{children}</Col>
        </Card>
      </Row>
    </div>
  )
}
