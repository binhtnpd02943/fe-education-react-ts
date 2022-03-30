import config from '@/config/app.config'
import { ApiEndPointModel } from '@/shared/model/api.model'

const { environment } = config
const backendUrl = environment.BACK_END_API.BASE_URL

export const STUDENT_ENDPOINT: { [key: string]: ApiEndPointModel } = {
  API_GET_LIST_STUDENT: {
    path: `${backendUrl}/students`,
  },
  API_GET_STUDENT_BY_ID: {
    path: `${backendUrl}/students`,
  },
  API_STUDENT_CREATE: {
    path: `${backendUrl}/students`,
  },
  API_STUDENT_UPDATE: {
    path: `${backendUrl}/students`,
  },
  API_STUDENT_DELETE: {
    path: `${backendUrl}/students`,
  },
}

export const CITY_ENDPOINT: { [key: string]: ApiEndPointModel } = {
  API_GET_LIST_CITY: {
    path: `${backendUrl}/cities`,
  },
}
