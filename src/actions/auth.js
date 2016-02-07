import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER
} from '../constants'

import { pushState } from 'redux-router'

export function loginUserSuccess (token) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure (error) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest () {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout () {
  return {
    type: LOGOUT_USER
  }
}

export function logoutAndRedirect () {
  return (dispatch) => {
    dispatch(logout())
    dispatch(pushState(null, '/login'))
  }
}

export function loginUser (username, password, redirect = '/') {
  return function loginUserAction (dispatch) {
    dispatch(loginUserRequest())

    return window.fetch('http://localhost:3000/auth/getToken/', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then(checkHttpStatus)
    .then(response => response.json())
    .then(response => {
      dispatch(loginUserSuccess(response.token))
      dispatch(pushState(null, redirect))
    })
    .catch(error => {
      dispatch(loginUserFailure(error))
    })
  }
}

export function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
