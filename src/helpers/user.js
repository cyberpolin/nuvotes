import { showMessage } from 'react-native-flash-message'
import { getMessage } from './messages'
import { URL } from '../setup'

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
      return jsonResponse.user
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
          const token = responseJson.token
          getUserData(token).then(response => {
            dispatch({ type: 'POPULATE_USER', payload: {...response, token} })
            navigation.navigate('Home')
            dispatch({ type: 'CHANGE_LOADING', payload: false })
          }).catch(error => {
            console.log('ERROR', error)
            dispatch({ type: 'CHANGE_LOADING', payload: false })
            const message = getMessage('ERROR')
            showMessage(message)
          })
        } else {
          dispatch({ type: 'CHANGE_LOADING', payload: false })
          const message = getMessage('LOGIN_ERROR')
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

export const editUserData = (token, updates, navigation) => {
  return dispatch => {
    dispatch({ type: 'CHANGE_LOADING', payload: true })
    return fetch(`${URL}modify-user/`, {
      method: 'POST',
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
