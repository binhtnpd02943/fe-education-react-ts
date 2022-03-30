import { Action } from '@/fe-helper/core/store/types'
import { STUDENT_ENDPOINT } from '@/modules/callApi'
import { apiCall, getCustomError } from '@/shared/api/aloApi'
import { APIMethod } from '@/shared/api/type'
import { notification } from 'antd'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import {
  deleteStudentFailure,
  deleteStudentRequest,
  deleteStudentSuccess,
  getListStudentFailure,
  getListStudentRequest,
  getListStudentSuccess,
} from './action'

const apiConfig = STUDENT_ENDPOINT

function* getListStudent(action: Action) {
  try {
    if (getListStudentRequest.match(action)) {
      const res = yield call(apiCall, APIMethod.GET, apiConfig.API_GET_LIST_STUDENT.path, action.payload)
      yield put(getListStudentSuccess(res))
    }
  } catch (error) {
    yield put(getListStudentFailure(getCustomError(error)))
  }
}

function* deleteStudent(action: Action) {
  try {
    if (deleteStudentRequest.match(action)) {
      const res = yield call(apiCall, APIMethod.DELETE, apiConfig.API_STUDENT_DELETE.path, action.payload)
      yield put(deleteStudentSuccess(res))
      yield put(getListStudentRequest(action.payload.skipModel))
      notification.info({
        message: `Xóa thành công`,
        description:
          'Bạn đã xóa thành công sinh viên trong danh sách'
      });

    }
  } catch (error) {
    yield put(deleteStudentFailure(getCustomError(error)))
  }
}

function* watchFetchRequest() {
  yield takeEvery(getListStudentRequest.type, getListStudent)
  yield takeEvery(deleteStudentRequest.type, deleteStudent)
}

export default function* studentSaga() {
  yield all([fork(watchFetchRequest)])
}
