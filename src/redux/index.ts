import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from './reducers/index'
import sagas from './sagas/index'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(logger, sagaMiddleware)
  )
)

sagaMiddleware.run(sagas)

export default store
