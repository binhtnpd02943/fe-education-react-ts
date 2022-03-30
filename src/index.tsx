import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { IntlProvider } from 'react-intl'
import App from './App'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import * as serviceWorker from './serviceWorker'
import { store } from './fe-helper/core/store/store'
import { history } from './shared/helper/history.helper'
import intl from './fe-helper/config/locale.config'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider {...intl}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
