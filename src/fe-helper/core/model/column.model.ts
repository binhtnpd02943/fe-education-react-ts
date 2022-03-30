//  import ColumnsType  from 'antd'

import { ColumnsType } from "antd/lib/table"

export type ColumnConfig  = {
  isFilter?: boolean,
  editableConfig?: EditableColumnConfig,
} & ColumnsType

export type EditableColumnConfig = {
  data?: any[],
  bindValue?: string,
  bindLabel?: string,
  type: ComponentType,
  component?: any,
  disable?: boolean,
  autocompleteConfig?: AutocompleteConfig
  selectConfig?: SelectedMode
  validateRules?: any[],
}

export interface SelectConfig {
  mode?: SelectedMode
  maxTagCount?: number | 'responsive' | undefined
  placeholder: string
}

export enum ComponentType {
  Input = 'input',
  Combobox = 'combobox',
  CheckBox = 'checkbox',
  DatePicker = 'datepicker',
  DateRangePicker = 'range',
  Custom = 'custom',
  Autocomplete = 'autocomplete',
  Currency = 'currency',
  Number = 'number'
}

export enum SelectedMode {
  MULTIPLE = 'multiple',
  TAGS = 'tags'
}

export type AutocompleteConfig = {
  options?: any,
  titles?: any[],
  dataBinding?: string[],
  dropdownClassName?: string,
  dropdownMatchSelectWidth?: number,
  style?: any,
}