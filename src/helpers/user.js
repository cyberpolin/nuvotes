import { showMessage } from 'react-native-flash-message'
import Config from 'react-native-config'
import { getMessage } from './messages'
import { getOrders } from './orders'

const { URL } = Config

/**
 * Fetch function to get user data using his token
 */
const getUserData = token => {
  return fetch(`${URL}login/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(jsonResponse => {
      return jsonResponse
    })
}

// Fetch function to get user data and token using his credentials.
export const getLogin = (username, password, navigation) => {
  return dispatch => {
    dispatch({ type: 'CHANGE_LOADING', payload: true })
    return fetch(`${URL}token-auth/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson['token']) {
          const { token } = responseJson
          getUserData(token).then(response => {
            if (response) {
              const { id } = response.user
              const { type } = response
              dispatch({ type: 'POPULATE_USER', payload: {...response.user, token, type} })
              navigation.navigate('Home')
              dispatch(getOrders(token, id))
            } else {
              dispatch({ type: 'CHANGE_LOADING', payload: false })
              const message = getMessage('ERROR')
              showMessage(message)
            }
          })
        } else {
          dispatch({ type: 'CHANGE_LOADING', payload: false })
          const message = getMessage('LOGIN_ERROR')
          showMessage(message)
        }
      })
      .catch(() => {
        dispatch({ type: 'CHANGE_LOADING', payload: false })
        const message = getMessage('FAILED_CONNECTION')
        showMessage(message)
      })
  }
}

// Fetch function to update user data.
export const editUserData = (token, updates, navigation) => {
  return dispatch => {
    dispatch({ type: 'CHANGE_LOADING', payload: true })
    return fetch(`${URL}modify-user/`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(updates)
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(responseJSON => {
        if (responseJSON.error) {
          dispatch({ type: 'CHANGE_LOADING', payload: false })
          const error = responseJSON.error
          const message = getMessage(error)
          showMessage(message)
        } else {
          dispatch({ type: 'CHANGE_LOADING', payload: false })
          dispatch({ type: 'POPULATE_USER', payload: responseJSON.user })
          navigation.goBack()
          const message = getMessage('SUCCESS_UPDATE')
          showMessage(message)
        }
      })
      .catch(() => {
        dispatch({ type: 'CHANGE_LOADING', payload: false })
        const message = getMessage('ERROR')
        showMessage(message)
      })
  }
}

// Regular expression to valide password
export const invalidPassword = password => {
  const regex = new RegExp('^[0-9]*$')
  return regex.test(password)
}

// Regular expression to validate email
export const validEmail = email => {
  const regex = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/
  return regex.test(email)
}
