import { connectRouter } from 'connected-react-router';
import dashboardReducer, { dashboardInitialState } from "@/modules/dashboard/reducer"
import AppState from "./types"
import { history } from '@/shared/helper/history.helper';
import reducerListStudent, { listStudentInitialState } from '@/modules/student/screen/list/reducer';
import cityReducer, { cityInitialState } from '@/modules/city/list/reducer';

export const AppInitialState: AppState = {
  dashboard: dashboardInitialState,
  student: listStudentInitialState,
  city: cityInitialState
}

const AppReducer = {
  router: connectRouter(history),
  dashboard: dashboardReducer,
  student: reducerListStudent,
  city: cityReducer
}

export default AppReducer
