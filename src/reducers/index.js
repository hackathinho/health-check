import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import datasetReducer from './datasetReducer'

const rootReducer = combineReducers({
  routing: routerReducer,
  dataset: datasetReducer
})

export default rootReducer
