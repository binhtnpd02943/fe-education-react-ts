import { DownOutlined } from '@ant-design/icons'
import ProForm, {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
  ProFormField,
  ProFormTimePicker,
} from '@ant-design/pro-form'
import { Card, Col, Dropdown, Row } from 'antd'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import _ from 'lodash'
import React from 'react'

export type LightFilterItemProps = {
  title?: React.ReactNode
  popInner: React.ReactElement<FilterParamProps>
  icon?: React.ReactElement
  filterAtColumn?: boolean
  filterDropDownProps?: FilterDropdownProps
  params: any
  onSubmit: any
}
export type LightFilterItemStateType = {
  visible: boolean
  valueDisplay: string
}

class LightFilterItem extends React.Component<LightFilterItemProps, LightFilterItemStateType> {
  formValues = {}

  constructor(props: LightFilterItemProps) {
    super(props)
    /*COMMENT: add paramsFilterDefault vào formValues để clearValues Filter*/
    props.params && (this.formValues = { ...this.formValues, ...props.params })
    this.state = {
      visible: false,
      valueDisplay: '',
    }
  }

  handleVisibleChange = (flag: boolean) => {
    if (this.props.filterDropDownProps) {
      // this.props.filterDropDownProps.confirm();
    } else {
      this.setState({ visible: flag })
    }
  }
  handleDisplayValue = (): React.ReactElement => {
    const {
      params,
      popInner: {
        props: { name },
      },
    } = this.props
    const currentValue = name && params[name]
    if (typeof currentValue == 'boolean') {
      return <b>{currentValue ? 'Có' : 'Không'}</b>
    }
    if (currentValue && Array.isArray(currentValue) && currentValue.length > 0) {
      const currentValueArray = [...currentValue]
      currentValueArray.sort((v1, v2) => v1 - v2)
      let moreLabel
      if (currentValueArray.length > 1) {
        moreLabel = ',...'
      }
      return (
        <b>
          {this.props.popInner.props.valueSelect?.find((v) => v.value === currentValueArray[0])?.label}
          {moreLabel}
        </b>
      )
    }

    if (currentValue && !(Array.isArray(currentValue) && currentValue.length > 0)) {
      return <b>{currentValue}</b>
    }

    return <b>Tất cả</b>
  }

  render() {
    const PopInner = () => {
      return (
        <Card size="small" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
           <ProForm
            autoComplete="off"
            submitter={{
              searchConfig: {
                resetText: 'Xóa',
                submitText: 'Tìm kiếm',
              },
              resetButtonProps: { size: 'small' },
              submitButtonProps: { size: 'small' },
              render: (props, doms) => {
                return (
                  <Row>
                    <Col span={12}>
                      <Row justify="start">{doms[0]}</Row>
                    </Col>
                    <Col span={12}>
                      <Row justify="end">{doms[1]}</Row>
                    </Col>
                  </Row>
                )
              },
            }}
            onReset={() => {
              const { params } = this.props
              const clearValues = { ...this.formValues }
              const submitParams = { ...params }
              const clearKey: any[] = []
              for (const key in clearValues) {
                clearKey.push(key)
              }

              const submitParamsOmit = _.omit(submitParams, clearKey)

              if (this.props.onSubmit) {
                this.props.onSubmit(submitParamsOmit)
              }

              this.handleVisibleChange(false)
            }}
            onValuesChange={(changeValues) => {
              this.formValues = changeValues
            }}
            initialValues={this.props.params}
            onFinish={async (values: any) => {
              const { params } = this.props
              const submitParams = { ...params }

              for (const key in params) {
                let value = values[key]
                // If key does not existed in values, and
                if (!(key in values)) {
                  value = params[key]
                }
                submitParams[key] = value
              }
              if (this.props.onSubmit) {
                this.props.onSubmit(submitParams)
              }
              this.handleVisibleChange(false)
            }}
          >
            {this.props.popInner}
          </ProForm> 
        </Card>
      )
    }
    let result = <PopInner />
    if (!this.props.filterAtColumn) {
      const valueDisplay = this.handleDisplayValue()
      result = (
        <Dropdown onVisibleChange={this.handleVisibleChange} visible={this.state.visible} overlay={result} trigger={['click']}>
          <div
            className={
              'ant-pro-core-field-label ant-pro-core-field-label-middle ant-pro-core-field-label-active ant-pro-core-field-label-allow-clear'
            }
          >
            {this.props.title}: {valueDisplay} {this.props.icon || <DownOutlined />}
          </div>
        </Dropdown>
      )
    }

    return result
  }
}

export default LightFilterItem
export type ValueSelect = {
  label: string
  value: string | number
}
export type FilterParamProps = {
  name?: string
  valueSelect?: ValueSelect[]
  range?: boolean
}

export const FilterItemText: React.FC<FilterParamProps> = (props: FilterParamProps) => <ProFormField {...props} placeholder="" />

export const FilterItemSelect: React.FC<FilterParamProps> = (props: FilterParamProps) => {
  const render = <ProFormCheckbox.Group {...props} placeholder="" layout="vertical" options={props.valueSelect} />
  return <>{render}</>
}
export const FilterItemDate: React.FC<FilterParamProps> = (props: FilterParamProps) => {
  if (props.range) {
    return <ProFormDateRangePicker {...props} placeholder="" />
  }
  return <ProFormDatePicker {...props} placeholder="" />
}
export const FilterItemTime: React.FC<FilterParamProps> = (props: FilterParamProps) => <ProFormTimePicker {...props} placeholder="" />
export const FilterItemDateTime: React.FC<FilterParamProps> = (props: FilterParamProps) => {
  if (props.range) {
    return <ProFormDateTimeRangePicker {...props} placeholder="" />
  }
  return <ProFormDatePicker {...props} placeholder="" />
}
export const FilterItemCheckBox: React.FC<FilterParamProps> = (props: FilterParamProps) => {
  return (
    <>
      <div style={{ minWidth: 150 }}>
        <ProFormCheckbox {...props}>
          Có/Không
        </ProFormCheckbox>
      </div>
    </>
  )
}
