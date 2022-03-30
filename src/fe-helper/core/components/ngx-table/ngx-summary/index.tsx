import React from 'react';
import { cloneDeep } from 'lodash';
import { Table, Typography } from 'antd';
import { Summary } from '../type';

const { Text } = Typography;


export const renderSummary = (columnSettings, summary?: Summary) => {
  if(!columnSettings || !columnSettings.length || !summary || Object.keys(summary).length === 0){
    return <></>;
  }

  let cntSpan = 1; // Default render sumary as empty.
  // Do a deep copy here, to not mutate the params.
  const summaryCells = cloneDeep(columnSettings).map(item => {
    const { value, colSpan: colSpanProp, classConfig } = summary[item.dataIndex] || {};

    //Column span is intentionally configured, from the page. Its configuration is 0. Render an INVISIBLE cell.
    if(colSpanProp == 0){
      // In this case, ignore the previous span.
      cntSpan = 1; //summary configuration detected, reset cntSpan.
      item.colSpan = colSpanProp;
      item.summaryValue = null;
      item.classConfig = classConfig
      return item;
    }

    //Column is NOT configured for summary rendering, and merging is ENABLE. Render an INVISIBLE cell.
    if(colSpanProp === undefined && cntSpan > 1){
      cntSpan = cntSpan - 1;
      item.colSpan = 0;
      item.summaryValue = null;
      item.classConfig = classConfig
      return item;
    }

    //In this case, column merging is configured.
    if(colSpanProp >= 1){
      cntSpan = colSpanProp;
      item.colSpan = colSpanProp;
      item.summaryValue = value;
      item.classConfig = classConfig
      return item;
    }

    /**
     * Remained case (Default): colSpanProp === undefined && cntSpan === 1
     * Column is NOT configured for summary rendering, and merging is not enabled. Render an empty cell.
     */
    item.colSpan = 1;
    item.summaryValue = null;
    item.classConfig = classConfig
    return item;
  });

  return (
      <>
        <Table.Summary.Row className="ngx-summary">
          {summaryCells.map(item => {
            return (
                <Table.Summary.Cell key={item.dataIndex} className={item?.classConfig}
                                    colSpan={item.colSpan} index={item.dataIndex}>
                  <Text>{item.summaryValue || null}</Text>
                </Table.Summary.Cell>
            )
          })}
        </Table.Summary.Row>
      </>
  );
}