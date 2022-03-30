import React from 'react'
import './index.scss'
import { Statistic, Card} from 'antd'

export interface StatisticItemProps {
  icon: React.ReactElement
  label: string
  value: string | number
}

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
  return (
    <div className="site-statistic-demo-card">
      <Card>
        <Statistic 
        title={label} 
        value={value} 
        valueStyle={{ color: '#3f8600' }}
        prefix={icon} />
      </Card>
    </div>
  )
}
