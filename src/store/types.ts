import { CityState } from "@/modules/city/list/type"
import { DashboardState } from "@/modules/dashboard/type"
import { StudentState } from "@/modules/student/screen/list/type"

type AppState = {
  dashboard: DashboardState,
  student: StudentState,
  city: CityState
  }
  
  export default AppState