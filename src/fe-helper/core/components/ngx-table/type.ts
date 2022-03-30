import { EditableColumnConfig } from '@/fe-helper/core/model/column.model';
import { TablePaginationConfig, TableProps as RcTableProps } from 'antd';
import React from 'react';



export type EditableRowProps = {
  index?: number;
  isValidate?: boolean,
  setFieldsError?: any
}

export type EditableCellProps = {
  title: React.ReactNode;
  editable: boolean;
  config: EditableColumnConfig,
  children: React.ReactNode;
  dataIndex: string;
  record: any;
  handleSave: (row:any, rowIndex: number, columnEdit) => void;
  rowIndex: number,
  suffix: string,
  isValidate: boolean,
  handleError: any,
}

export type Props = {
  title?: React.ReactNode | React.ReactNode[];
  components?: any;
  dataSource: any[];
  columns: any;
  loading?: boolean;
  total: number;
  fetchData?: (submitData: Record<string, unknown>) => void;
  scroll?: RcTableProps<any>['scroll'] & {
    scrollToFirstRowOnChange?: boolean;
  };
  expandableRow?: any;
  hideColumnSetting?: boolean;
  columnSetting?: any[];
  filter?: boolean;
  actions?: React.ReactNode | React.ReactNode[];
  isAlwaysOnDisplayAction?: boolean;
  mainToolbar?: React.ReactNode | React.ReactNode[];
  tableSelect?: any[];
  pagination?: boolean | TablePaginationConfig;
  useRowSelect?: boolean;
  selectedKey?: string;
  setRowSelectedState: (action) => any;
  setColumnDisplayState: (action) => any;
  setTableState: (action) => any;
  stateName: string;
  onEditCellComplete?: any;
  footer?: any;
  rowClassName?: any;
  summary?: Summary;
  displayErrorEditable?: boolean;
  getFieldsError?: any;
  onClickCell?: any;
  size?: 'small' | 'middle' | 'large' | undefined;
  reportTable?: boolean | false;
  portionActions?: React.ReactNode | React.ReactNode[];
  tableType?: string;
};

export type NgxTableState = {
  tableSelection?: SelectedRowNgxTable[],
  columnsSetting: any[],
  paramState: any | TablePaginationAndFilterConfig,
  totalAmount: number,
  expandSelection: string[]
}

export type TablePaginationAndFilterConfig = {
  _page: number;
  _limit: number;
  _totalRows: number;
  filterParams?: any,
}


export type SelectedRowNgxTable = any[];

export type TableListParams = {
  pageSize?: number;
  current?: number;
  isFilter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

export type Summary = {
  [dataIndex: string]: {
    value: any;
    colSpan: number;
    classConfig?: string;
  };
};

export type EditableStateModel = {
  isValid?: boolean;
  errors?: any[];
  isSubmit?: boolean;
};
