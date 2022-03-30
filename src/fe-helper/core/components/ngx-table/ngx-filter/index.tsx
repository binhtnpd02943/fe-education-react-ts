import { DownOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons/lib/components/Icon'
import { LightFilter } from '@ant-design/pro-form'
import { ActionType } from '@ant-design/pro-table'
import { Col, Row, Space, Typography } from 'antd'
import React from 'react'
import LightFilterItem, { FilterItemCheckBox, FilterItemDate, FilterItemSelect, FilterItemText, ValueSelect } from './lightFilterItem'
export type FilterProp = {
  params?: any
  actionRef?: React.MutableRefObject<ActionType | undefined>
  columns?: any[] | []
  setFilterParams?: any
  filterData?: any
}
const DEFAULT_MAX_FILTER_DISPLAY = 4
const IconSetting = () => {
  return (
    <Icon
      component={() => (
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.7834 1.462H6.37631C6.08938 0.61486 5.28778 0 4.34045 0C3.39311 0 2.59152 0.61486 2.30914 1.462H0.683176C0.305152 1.462 0 1.76715 0 2.14518C0 2.5232 0.305152 2.82836 0.683176 2.82836H2.30914C2.59607 3.68005 3.39766 4.29036 4.345 4.29036C5.29234 4.29036 6.09393 3.6755 6.38087 2.82836H16.7879C17.1659 2.82836 17.4711 2.5232 17.4711 2.14518C17.4711 1.76715 17.1614 1.462 16.7834 1.462ZM4.34045 2.92855C3.91232 2.92855 3.56163 2.57786 3.56163 2.14973C3.56163 1.72161 3.91232 1.36636 4.34045 1.36636C4.76857 1.36636 5.11927 1.71705 5.11927 2.14518C5.11927 2.5733 4.77312 2.92855 4.34045 2.92855Z"
            fill="#8695B1"
          />
          <path
            d="M16.7834 7.31911H15.1574C14.8705 6.46742 14.0689 5.85712 13.1215 5.85712C12.1742 5.85712 11.3726 6.47198 11.0857 7.31911H0.683176C0.305152 7.31911 0 7.62427 0 8.00229C0 8.38032 0.305152 8.68547 0.683176 8.68547H11.0902C11.3772 9.53716 12.1788 10.1475 13.1261 10.1475C14.0734 10.1475 14.875 9.53261 15.162 8.68547H16.7879C17.1659 8.68547 17.4711 8.38032 17.4711 8.00229C17.4711 7.62427 17.1614 7.31911 16.7834 7.31911ZM13.1215 8.78111C12.6934 8.78111 12.3427 8.43042 12.3427 8.00229C12.3427 7.57417 12.6934 7.22347 13.1215 7.22347C13.5497 7.22347 13.9004 7.57417 13.9004 8.00229C13.9004 8.43042 13.5542 8.78111 13.1215 8.78111Z"
            fill="#8695B1"
          />
          <path
            d="M16.7834 13.1717H9.30487C9.01793 12.32 8.21634 11.7097 7.269 11.7097C6.32166 11.7097 5.52007 12.3245 5.23313 13.1717H0.683177C0.305152 13.1717 0 13.4768 0 13.8548C0 14.2329 0.305152 14.538 0.683177 14.538H5.23313C5.52007 15.3897 6.32166 16 7.269 16C8.21634 16 9.01793 15.3852 9.30487 14.538H16.7834C17.1614 14.538 17.4666 14.2329 17.4666 13.8548C17.4666 13.4768 17.1614 13.1717 16.7834 13.1717ZM7.269 14.6337C6.84088 14.6337 6.49018 14.283 6.49018 13.8548C6.49018 13.4267 6.84088 13.076 7.269 13.076C7.69713 13.076 8.04782 13.4267 8.04782 13.8548C8.04782 14.283 7.69713 14.6337 7.269 14.6337Z"
            fill="#8695B1"
          />
        </svg>
      )}
    />
  )
}

type CustomLightFilterState = {
  maxFilterDisplay: number
  accordionButtonVisible: boolean
  accordionButtonExpandState: boolean
  ligthFilterItemAreaRefList: Array<React.RefObject<HTMLDivElement>>
}

class CustomLightFilter extends React.Component<FilterProp, CustomLightFilterState> {
  ligthFilterAreaRef = React.createRef<HTMLDivElement>() // This variable never got modified.
  filterAreaRef = React.createRef<HTMLDivElement>() // This variable never got modified.

  constructor(props: FilterProp) {
    super(props)
    // Initialize the references for filter items, later will use this to calculate the width.

    const { columns } = props
    const filteringColumns = (columns || []).filter((column) => column.isFilter === true)
    const ligthFilterItemAreaRefList: Array<React.RefObject<HTMLDivElement>> = []
    for (const index in filteringColumns) {
      const ref = React.createRef<HTMLDivElement>()
      ligthFilterItemAreaRefList[index] = ref
    }
    this.state = {
      maxFilterDisplay: DEFAULT_MAX_FILTER_DISPLAY,
      accordionButtonVisible: true,
      accordionButtonExpandState: false,
      ligthFilterItemAreaRefList,
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { ligthFilterItemAreaRefList } = state
    const { columns } = props
    const filteringColumns = (columns || []).filter((column) => column.isFilter === true)
    if (filteringColumns.length > ligthFilterItemAreaRefList.length) {
      //If any changes of column settings. Then make all filter items available.
      return { accordionButtonVisible: false, accordionButtonExpandState: true, ligthFilterItemAreaRefList }
    }
    if (filteringColumns.length < ligthFilterItemAreaRefList.length) {
      //If any changes of column settings. Then make all filter items available.
      return { accordionButtonVisible: false, accordionButtonExpandState: true, ligthFilterItemAreaRefList }
    }
    return null
  }

  clearAllFilter() {
    const { filterData, setFilterParams } = this.props
    setFilterParams({})
    filterData({})
  }

  renderFilterItems() {
    const { columns, params, filterData } = this.props
    const { ligthFilterItemAreaRefList } = this.state
    const filteringColumns = (columns || []).filter((column) => column.isFilter === true)
    if ((filteringColumns || []).length > ligthFilterItemAreaRefList.length) {
      for (let index = ligthFilterItemAreaRefList.length; index < (filteringColumns || []).length; index++) {
        const ref = React.createRef<HTMLDivElement>()
        ligthFilterItemAreaRefList[index] = ref
      }
    }

    if ((filteringColumns || []).length < ligthFilterItemAreaRefList.length) {
      for (let index = (filteringColumns || []).length; index < ligthFilterItemAreaRefList.length; index++) {
        delete ligthFilterItemAreaRefList[index]
      }
    }

    let filterItemKey = -1
    //Only render columns which are configured to be filtered.
    const filterRenderItems: any[] = []

    for (const index in filteringColumns) {
      const column = filteringColumns[index]
      let filterItem = <></>
      filterItemKey++
      //Render selectbox
      const { valueEnum, title, isFilter } = column
      if (valueEnum && !!valueEnum.length) {
        const values: ValueSelect[] = valueEnum.map((item) => {
          return { label: valueEnum[item]?.text, value: isNaN(item) ? item : parseInt(item) }
        })
        filterItem = <FilterItemSelect name={column.dataIndex?.toString()} valueSelect={values} />
      }

      /*COMMENT: Thêm trường hợp filter là checkbox (2 giá trị true/false)*/
      switch (column.valueType) {
        case 'checked-label':
        case 'checkbox': {
          filterItem = <FilterItemCheckBox name={column.dataIndex?.toString()} {...column} style={{ width: '100%' }} />
          break
        }
        case 'date': {
          filterItem = <FilterItemDate name={column.dataIndex?.toString()} {...column} style={{ width: '100%' }} />
          break
        }
        default: {
          filterItem = <FilterItemText name={column.dataIndex?.toString()} {...column} style={{ width: '100%' }} />
          break
        }
      }

      filterRenderItems.push(
        <Col
          style={{ marginBottom: 10 }}
          ref={ligthFilterItemAreaRefList[filterItemKey]} //mapping reference to filter item.
          key={`filter-${filterItemKey}`}
        >
          <LightFilterItem
            key={`${column.dataIndex}-${filterItemKey}`}
            params={{ [column.dataIndex]: null, ...params }}
            title={title}
            popInner={filterItem}
            icon={<DownOutlined />}
            onSubmit={filterData.bind(this)}
          />
        </Col>,
      )
    }
    return filterRenderItems
  }

  componentDidUpdate(props, state) {
    //Use references to control display, not state to avoid re-rendering.
    const { ligthFilterAreaRef } = this
    const { ligthFilterItemAreaRefList } = this.state
    const { accordionButtonVisible } = this.state // Take out the latest state. Not the privous state passed in as params.
    const maxWidthExtendable = ligthFilterAreaRef?.current?.clientWidth || 0
    const COLLAPSE_BUTTON_WIDTH = 110
    //In case filter is collapsed, only show 1 line including "Hiển thị thêm" button.
    let curentWidth = 0
    for (const item of ligthFilterItemAreaRefList) {
      //Make sure item.current is not undefined or null.
      if (!item || !item.current) {
        continue
      }
      item.current.hidden = false // show the item to get the width available.
      curentWidth += item.current?.clientWidth || 0

      if (accordionButtonVisible && curentWidth >= maxWidthExtendable - COLLAPSE_BUTTON_WIDTH) {
        item.current.hidden = true
        continue
      }
      item.current.hidden = false
    }
  }

  toggleCollapse() {
    const { accordionButtonVisible, accordionButtonExpandState } = this.state
    this.setState({ accordionButtonVisible: !accordionButtonVisible, accordionButtonExpandState: !accordionButtonExpandState })
  }

  render() {
    const { params } = this.props
    const { accordionButtonExpandState } = this.state

    return (
      <Row style={{ width: '100%' }} gutter={8} align="top">
        <Col span={2} className="table-filter">
          <IconSetting /> <Typography.Text ellipsis>Bộ lọc</Typography.Text>:
        </Col>
        <Col span={20} ref={this.ligthFilterAreaRef}>
          <LightFilter
            collapse={accordionButtonExpandState}
            layout="horizontal"
            style={{ width: '100%' }}
            onFinish={async (values: any) => {
              for (const key in values) {
                const value = values[key]
                params[key] = value
              }
            }}
          ></LightFilter>
          <Row align="middle" justify="space-between">
            <Col span={24}>
              <Row ref={this.filterAreaRef} gutter={10}>
                {this.renderFilterItems()}
                <Col span={undefined}>
                  <Space>
                    <a onClick={() => this.toggleCollapse()}>
                      <Space>{accordionButtonExpandState ? 'Ẩn' : 'Hiển thị thêm...'}</Space>
                    </a>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={2}>
          <Row justify="end">
            <Col>
              <a
                onClick={() => {
                  this.clearAllFilter()
                }}
              >
                Xóa tất cả
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
export default CustomLightFilter
