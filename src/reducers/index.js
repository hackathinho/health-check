import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import datasetReducer from './datasetReducer'

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  dataset: datasetReducer
})

export default rootReducer
