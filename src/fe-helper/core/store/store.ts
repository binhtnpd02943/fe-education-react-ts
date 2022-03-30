import rootReducer, { AppDataState } from '@/fe-helper/core/store/rootReducer'
import { history } from '@/shared/helper/history.helper'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { routerMiddleware } from 'connected-react-router'
import { createInjectorsEnhancer } from 'redux-injectors'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import { ApplicationState } from './types'

function configureAppStore(initialState: ApplicationState) {
  const reduxSagaMonitorOptions = {}
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)

  const { run: runSaga } = sagaMiddleware

  // // sagaMiddleware: Makes redux saga works
  // const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer: rootReducer,
      runSaga,
    }),
  ]

  const store = configureStore({
    reducer: rootReducer(),
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ serializableCheck: false }).concat(
      sagaMiddleware, routerMiddleware(history)
      ),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  })

  sagaMiddleware.run(rootSaga)
  return store
}

export { configureAppStore }
export const store = configureAppStore(AppDataState)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
