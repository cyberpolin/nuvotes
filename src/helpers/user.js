import { showMessage } from 'react-native-flash-message'
import { getMessage } from './messages'

const getUserData = (token, username) => {
  return fetch('http://127.0.0.1:8000/api/login/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    body: JSON.stringify({
      username
    })
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
    return fetch('http://127.0.0.1:8000/api/token-auth/', {
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
          getUserData(token, username).then(response => {
            dispatch({ type: 'POPULATE_USER', payload: {...response, token} })
            navigation.navigate('Home')
            dispatch({ type: 'CHANGE_LOADING', payload: false })
          })
        } else {
          dispatch({ type: 'CHANGE_LOADING', payload: false })
          const message = getMessage('LOGIN_ERROR')
          showMessage(message)
        }
      })
      .catch(error => {
        console.log('ERROR', error)
      })
  }
}
