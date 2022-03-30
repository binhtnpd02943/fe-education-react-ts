import { Action } from '@/fe-helper/core/store/types'
import { apiCall, getCustomError } from '@/shared/api/aloApi'
import { APIMethod } from '@/shared/api/type'
import { ListResponse } from '@/shared/model/base-response.comon'
import { City } from '@/shared/model/city.model'
import { Student } from '@/shared/model/student.model'
import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { CITY_ENDPOINT, STUDENT_ENDPOINT } from '../callApi'
import {
  fetchDataDashboard,
  fetchDataFailedDashboard,
  fetchDataSuccessDashboard,
  setHighestStudentList,
  setLowestStudentList,
  setRankingByCityList,
  setStatistics,
} from './action'
import { RankingByCity } from './type'

function* fetchStatistics() {
  const response: Array<ListResponse<Student>> = yield all([
    call(apiCall, APIMethod.GET, STUDENT_ENDPOINT.API_GET_LIST_STUDENT.path, { _page: 1, _limit: 1, gender: 'male' }),
    call(apiCall, APIMethod.GET, STUDENT_ENDPOINT.API_GET_LIST_STUDENT.path, { _page: 1, _limit: 1, gender: 'female' }),
    call(apiCall, APIMethod.GET, STUDENT_ENDPOINT.API_GET_LIST_STUDENT.path, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(apiCall, APIMethod.GET, STUDENT_ENDPOINT.API_GET_LIST_STUDENT.path, { _page: 1, _limit: 1, mark_lte: 5 }),
  ])

  const statisticList = response.map((x) => x.pagination._totalRows)

  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList
  yield put(setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount }))
}

function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(apiCall, APIMethod.GET, STUDENT_ENDPOINT.API_GET_LIST_STUDENT.path, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  })  
  yield put(setHighestStudentList(data))
}


function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(apiCall, APIMethod.GET, STUDENT_ENDPOINT.API_GET_LIST_STUDENT.path, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  })
  yield put(setLowestStudentList(data))
}

function* fetchRankingCityList() {
  // Fetch city list
  const { data: cityList }: ListResponse<City> = yield call(apiCall, APIMethod.GET, CITY_ENDPOINT.API_GET_LIST_CITY.path, {
    _page: 1,
    _limit: 10,
  })

  //Fetch ranking per city
  const callList = cityList.map((x) =>
    call(apiCall, APIMethod.GET, STUDENT_ENDPOINT.API_GET_LIST_STUDENT.path, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      city: x.code,
    }),
  )

  const response: Array<ListResponse<Student>> = yield all(callList)

  const rankingByCityList: Array<RankingByCity> = response.map((x, index) => ({
    cityId: cityList[index].code,
    cityName: cityList[index].name,
    rankingList: x.data,
  }))

  // Update static
  yield put(setRankingByCityList(rankingByCityList))
}

function* fetchDashboardData(action: Action) {
  try {
    if (fetchDataDashboard.match(action)) {
      yield all([
        call(fetchHighestStudentList), 
        call(fetchLowestStudentList), 
        call(fetchStatistics), 
        call(fetchRankingCityList)
      ]);
      yield put(fetchDataSuccessDashboard({}))
    }
  } catch (error) {
    yield put(fetchDataFailedDashboard(getCustomError(error)))
  }
}

function* watchGetRequest() {
  yield takeLatest(fetchDataDashboard.type, fetchDashboardData)
}

export default function* dashboardSaga() {
  yield all([fork(watchGetRequest)])
}
