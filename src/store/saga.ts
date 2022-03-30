// @flow
import citySaga from '@/modules/city/list/saga'
import dashboardSaga from '@/modules/dashboard/saga'
import studentSaga from '@/modules/student/screen/list/saga'
import { all } from 'typed-redux-saga'

export default function* saga(): Generator {
  yield all([dashboardSaga(),studentSaga(),citySaga()])
}
