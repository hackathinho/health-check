import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from '../constants/actionTypes'

import initialState from './initialState'

export default function (state = initialState.dataset, action) {
  switch (action.type) {
    case FETCH_DATA: {
      return state
    }
    case FETCH_DATA_SUCCESS: {
      return action.payload
    }
    case FETCH_DATA_FAILURE: {
      return state
    }
    default:
      return state
  }
}
