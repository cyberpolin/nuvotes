import { showMessage } from 'react-native-flash-message'
import Config from 'react-native-config'
import { getMessage } from './messages'
import { getOrders } from './orders'

const { URL } = Config

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
              const { id } = response.user
              dispatch({ type: 'POPULATE_USER', payload: {...response.user, token} })
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
      .catch(error => {
        console.log('ERROR', error)
        dispatch({ type: 'CHANGE_LOADING', payload: false })
        const message = getMessage('ERROR')
        showMessage(message)
      })
  }
}

export const invalidPassword = password => {
  const regex = new RegExp('^[0-9]*$')
  return regex.test(password)
}

export const validEmail = email => {
  const regex = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/
  return regex.test(email)
}
