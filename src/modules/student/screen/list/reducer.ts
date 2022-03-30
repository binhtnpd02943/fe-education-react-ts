import { Builder } from '@/shared/helper/builder.helper'
import { builderBaseReducerTable } from '@/shared/helper/reducer.helper'
import { createReducer } from '@reduxjs/toolkit'
import { actionTable, deleteStudentFailure, deleteStudentRequest, deleteStudentSuccess, getListStudentFailure, getListStudentRequest, getListStudentSuccess } from './action'
import { StudentState } from './type'

export const listStudentInitialState: StudentState = Builder<StudentState>()
  .isLoading(false)
  .tableSelection([])
  .columnsSetting([])
  .totalAmount(0)
  .paramState({
    _page: 0,
    _limit: 10,
    _totalRows: 10,
    filterParams: null,
  })
  .data([])
  .build()

const reducerListStudent = (builder) => {
  //   const actionConfig: ActionConfigModel[] = [{ stateName: 'student', action: actionTable }]

  return builderBaseReducerTable(builder, actionTable)
    .addCase(getListStudentRequest, (state) => {
      state.isLoading = true
    })
    .addCase(getListStudentSuccess, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    .addCase(getListStudentFailure, (state) => {
      state.isLoading = false
    })
    .addCase(deleteStudentRequest, (state) => {
        state.isLoading = true
    })
    .addCase(deleteStudentSuccess, (state) => {
        state.isLoading = false
    })
    .addCase(deleteStudentFailure, (state) => {
        state.isLoading = false
    })
}

const reducer = createReducer(listStudentInitialState, (builder) => {
  return {
    ...reducerListStudent(builder),
  }
})

export default reducer
