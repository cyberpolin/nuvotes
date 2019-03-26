import { showMessage } from 'react-native-flash-message'
import { getMessage } from './messages'
import { URL } from '../setup'
import { getOrders } from './orders'

const getUserData = (token) => {
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
              const { user } = response
              const { id } = user
              dispatch({ type: 'POPULATE_USER', payload: {...user, token} })
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
      .catch(error => {
        dispatch({ type: 'CHANGE_LOADING', payload: false })
        const message = getMessage(`${error}`)
        showMessage(message)
      })
  }
}
