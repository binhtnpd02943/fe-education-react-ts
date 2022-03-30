/**
 * Builder base reducer for ngx table
 * @param builder
 * @param actionTable
 */
import { ActionConfigModel } from '@/shared/model/action.type'
import { accessObjectByArrayStringPath } from '@/fe-helper/core/utility/utils-functions'

export const builderBaseReducerTable: any = (builder: any, actionTable: any) => {
  return builder
    .addCase(actionTable.setSelectedRowStateNgxTable, (state, action) => {
      state.tableSelection = action.payload
    })
    .addCase(actionTable.setColumnSettingNgxTable, (state, action) => {
      state.columnsSetting = action.payload
    })
    .addCase(actionTable.setBaseStateNgxTable, (state, action) => {
      state.paramState = action.payload
    })
}

/**
 * Builder base reducer for multiple table on screen
 * @param builder
 * @param actionTable
 */
export const builderBaseReducerWithMultipleTable: any = (builder: any, actionTable: ActionConfigModel[]) => {
  actionTable.forEach((el: ActionConfigModel) => {
    builder
      .addCase(el.action.setSelectedRowStateNgxTable, (state, action) => {
        accessObjectByArrayStringPath(state, el.stateName).tableSelection = action.payload
      })
      .addCase(el.action.setColumnSettingNgxTable, (state, action) => {
        accessObjectByArrayStringPath(state, el.stateName).columnsSetting = action.payload
      })
      .addCase(el.action.setBaseStateNgxTable, (state, action) => {
        accessObjectByArrayStringPath(state, el.stateName).paramState = action.payload
      })
  })

  return builder
}
