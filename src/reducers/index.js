import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import entities from './entities'
import ui from './ui'

export default combineReducers({
  entities,
  routing: routeReducer,
  ui
})
