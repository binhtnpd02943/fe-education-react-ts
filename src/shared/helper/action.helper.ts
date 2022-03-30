import { Builder } from '@/shared/helper/builder.helper'
import { ActionName, ActionType } from '@/shared/model/action.type'
import { createAction } from '@reduxjs/toolkit'
import { SelectedRowNgxTable } from '@/fe-helper/core/components/ngx-table/type'

/**
 * Builder action type for ngx-table
 * @param moduleName
 */
export const builderActionType = (moduleName: string) => {
  return Builder<ActionType>()
    .SET_ROW_SELECTED_STATE(`@@${moduleName}/SET_ROW_SELECTED_STATE`)
    .SET_COLUMNS_DISPLAY_STATE(`@@${moduleName}/SET_COLUMNS_DISPLAY_STATE`)
    .SET_BASE_STATE(`@@${moduleName}/SET_BASE_STATE`)
    .build()
}

/**
 * Builder action for ngx-table
 * @param actionType
 */
export const createBaseActionTable = (actionType: ActionType) => {
  return Builder<ActionName>()
    .setSelectedRowStateNgxTable(
      createAction<SelectedRowNgxTable>(
        actionType.SET_ROW_SELECTED_STATE,
      ),
    )
    .setColumnSettingNgxTable(
      createAction<any[]>(
        actionType.SET_COLUMNS_DISPLAY_STATE,
      ),
    )
    .setBaseStateNgxTable(
      createAction<any>(
        actionType.SET_BASE_STATE,
      ),
    )
    .build()
}