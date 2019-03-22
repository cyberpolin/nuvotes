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

const photoFormData = (photos, orderId) => {
  const data = new FormData()
  let before = []
  let inProgress = []
  let after = []
  photos.map((photo, index) => {
    const { type, filename } = photo
    type === 'before' ? before.push(filename)
      : type === 'in_progress' ? inProgress.push(filename)
        : type === 'after' && after.push(filename)
    data.append(`photo${index}`, {
      uri: isIOS ? photo.sourceURL : photo.path,
      type: photo.mime,
      name: filename
    })
  })
  data.append('before', JSON.stringify(before))
  data.append('in_progress', JSON.stringify(inProgress))
  data.append('after', JSON.stringify(after))
  data.append('count', photos.length)
  data.append('order_id', orderId)
  return data
}

export const uploadPhotos = (token, photos, orderId) => {
  return dispatch => {
    const message = getMessage('START_UPLOAD')
    showMessage(message)
    const data = photoFormData(photos, orderId)
    return fetch(`${URL}upload-photo/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`
      },
      body: data
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(jsonResponse => {
        if (jsonResponse.error) {
          dispatch({ type: 'CHANGE_UPLOAD', payload: false })
          const message = getMessage(jsonResponse.error)
          showMessage(message)
        } else {
          dispatch({ type: 'CHANGE_UPLOAD', payload: false })
          const message = getMessage('SUCCESS_UPLOAD')
          showMessage(message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: 'CHANGE_UPLOAD', payload: false })
      })
  }
}
