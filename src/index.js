import './style'
import 'webrtc-adapter-test'
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { HomeView, NotaView, ScannerView, DevTools } from './components'
import { DevContainer } from './components/development'

const root = document.getElementById('root')
const store = configureStore(window.__INITIAL_STATE__, browserHistory)

const App = ({children}) => (
  <div className='app rounded border' style={{height: '100vh'}}>
    <DevContainer>
      <div className='devtools'>
        <DevTools />
      </div>
    </DevContainer>
    {children}
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={HomeView}/>
        <Route path='camera' component={ScannerView}/>
        <Route path='nota/:numero' component={NotaView}/>
      </Route>
    </Router>
  </Provider>
, root)
