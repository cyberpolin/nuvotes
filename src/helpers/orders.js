import { Platform } from 'react-native'
import _ from 'lodash'
import moment from 'moment'
import { showMessage } from 'react-native-flash-message'
import { getMessage } from './messages'
import { URL } from '../setup'

const isIOS = Platform.OS === 'ios'

const ordersByDate = orders => {
  const sortedOrders = _.orderBy(orders, ['end_date'], ['asc'])
  return sortedOrders
}

export const filterOrders = (orders, orderType) => {
  if (orderType === 'Pending') {
    const filteredOrders = orders.filter(order => {
      const { description } = order.status
      return description === 'Pending Completion'
    })
    return ordersByDate(filteredOrders)
  }
  return ordersByDate(orders)
}

export const filterOrderBySearch = (orders, search) => {
  return orders.filter(order => {
    if (!isNaN(search) && _.includes(order.id.toString(), search)) {
      return order
    } else if (_.includes(order.number, search)) {
      return order
    }
  })
}

export const getDateDiff = date => {
  const today = moment()
  const momentDate = moment(date, 'YYYY-MM-DD')
  const daysDiff = momentDate.diff(today, 'days') + 1
  return daysDiff
}

export const sortPhotos = (photos, type) => {
  return photos.filter(photo => {
    const { status } = photo
    return status.description === type
  })
}

export const getOrders = (token, userId) => {
  return dispatch => {
    dispatch({ type: 'CHANGE_LOADING', payload: true })
    return fetch(`${URL}get-orders/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        'user_id': userId
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(jsonResponse => {
        const { orders } = jsonResponse
        dispatch({ type: 'POPULATE_ORDERS', payload: orders })
        dispatch({ type: 'CHANGE_LOADING', payload: false })
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: 'CHANGE_LOADING', payload: false })
        const message = getMessage('CONNECTION_ERROR')
        showMessage(message)
      })
  }
}

const photoFormData = (photos) => {
  const data = new FormData()
  photos.map((photo, index) => {
    data.append(`photo${index}`, {
      uri: isIOS ? photo.sourceURL : photo.path,
      type: photo.mime,
      name: photo.filename,
      status: photo.type
    })
  })
  return data
}

export const uploadPhotos = (token, photos) => {
  return dispatch => {
    dispatch({ type: 'CHANGE_LOADING', payload: true })
    const data = photoFormData(photos)
    return fetch(`${URL}upload-photo/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`
      },
      body: data
    })
      .then(response => {
        if (response.ok) {
          dispatch({ type: 'CHANGE_LOADING', payload: false })
          const message = getMessage('SUCCESS_UPLOAD')
          showMessage(message)
        }
      })
      .catch(error => console.log(error))
  }
}
