import axios from 'axios'

import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from '../constants/actionTypes'

import URL from '../constants/urls.js'

const URLs = new URL()

export function fetchDataset () {
  return dispatch => {
    dispatch({
      type: FETCH_DATA
    })

    axios.get(URLs.fetchDataset())
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: FETCH_DATA_SUCCESS,
            payload: response.data
          })
        } else {
          dispatch({
            type: FETCH_DATA_FAILURE,
            payload: response.data
          })
        }
      })
      .catch(error => {
        dispatch({
          type: FETCH_DATA_FAILURE,
          payload: error
        })
      })
  }
}

export function test () {
}
