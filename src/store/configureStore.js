import { syncHistory } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import promise from 'redux-promise-middleware'
import rootReducer from '../reducers'
import DevTools from '../components/DevTools'

/**
 * Export the main fuction which create a new store
 * for the provided initial state
 *
 * @return Store
 **/
export default function configureStore (initialState, history) {
  const logger = createLogger()
  const routing = syncHistory(history)
  const promiseTypeSuffixes = ['PENDENTE', 'SUCESSO', 'ERRO']

  const createStoreWithMiddleware = compose(
    applyMiddleware(routing, thunk, promise({promiseTypeSuffixes}), logger),
    DevTools.instrument()
  )(createStore)

  const store = createStoreWithMiddleware(rootReducer, initialState)
  routing.listenForReplays(store)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
