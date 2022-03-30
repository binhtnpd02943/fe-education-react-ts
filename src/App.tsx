import { Route, Router, Switch, useHistory } from 'react-router-dom'
import './App.css'
import ScreenDashboard from './modules/dashboard/screen/ScreenDashboard'
import ScreenListStudent from './modules/student/screen/list'

function App() {
  const history = useHistory()
  
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={ScreenDashboard} />

          <Route path="/student" component={ScreenListStudent} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
