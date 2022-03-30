import { Action } from '@/fe-helper/core/store/types'
import { CITY_ENDPOINT } from '@/modules/callApi'
import { apiCall, getCustomError } from '@/shared/api/aloApi'
import { APIMethod } from '@/shared/api/type'
import { ListResponse } from '@/shared/model/base-response.comon'
import { City } from '@/shared/model/city.model'
import { all, call, fork, put, takeLatest } from '@redux-saga/core/effects'
import { fetchCityListFailed, fetchCityListRequest, fetchCityListSuccess } from './action'

const apiConfig = CITY_ENDPOINT

function* fetchCityList(action: Action) {
  try {
    if (fetchCityListRequest.match(action)) {
      const response: ListResponse<City> = yield call(apiCall, APIMethod.GET, apiConfig.API_GET_LIST_CITY.path, {
        _page: 1,
        _limit: 10,
      })
      
      yield put(fetchCityListSuccess(response))
    }
  } catch (error) {
    yield put(fetchCityListFailed(getCustomError(error)))
  }
}

function* watchGetRequest() {
  yield takeLatest(fetchCityListRequest.type, fetchCityList)
}

export default function* citySaga() {
  yield all([fork(watchGetRequest)])
}
