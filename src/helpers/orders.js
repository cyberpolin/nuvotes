import _ from 'lodash'
import moment from 'moment'
import { showMessage } from 'react-native-flash-message'
import Config from 'react-native-config'
import { getMessage } from './messages'

const { URL } = Config

export const photosByID = photos => {
  const orderedPhotos = _.orderBy(photos, ['id'], ['desc'])
  return orderedPhotos
}

// Sort orders by end date in ascended order.
const ordersByDate = orders => {
  const sortedOrders = _.orderBy(orders, ['end_date'], ['asc'])
  return sortedOrders
}

// Filter orders by the selected screen(active orders, pending, all orders)
export const filterOrders = (orders, orderType) => {
  if (orderType === 'Pending') {
    const filteredOrders = orders.filter(order => {
      const { description } = order.status
      return description === 'Pending Completion'
    })
    return ordersByDate(filteredOrders)
  } else if (orderType === 'Orders') {
    const filteredOrders = orders.filter(order => {
      const { description } = order.status
      return description !== 'Pending Completion' && description !== 'Completed'
    })
    return ordersByDate(filteredOrders)
  }
  return ordersByDate(orders)
}

// Filter orders by a search and order type.
export const filterOrderBySearch = (orders, search, orderType) => {
  if (orderType === 'Pending') {
    const filteredOrders = orders.filter(order => {
      const { description } = order.status
      return description === 'Pending Completion'
    })
    return filteredOrders.filter(order => {
      if (!isNaN(search) && _.includes(order.id.toString(), search)) {
        return order
      } else if (_.includes(order.number, search)) {
        return order
      }
    })
  } else if (orderType === 'Orders') {
    const filteredOrders = orders.filter(order => {
      const { description } = order.status
      return description !== 'Pending Completion' && description !== 'Completed'
    })
    return filteredOrders.filter(order => {
      if (!isNaN(search) && _.includes(order.id.toString(), search)) {
        return order
      } else if (_.includes(order.number, search)) {
        return order
      }
    })
  }
  return orders.filter(order => {
    if (!isNaN(search) && _.includes(order.id.toString(), search)) {
      return order
    } else if (_.includes(order.number, search)) {
      return order
    }
  })
}

// Get the difference between two dates, today and a given date.
export const getDateDiff = date => {
  const today = moment()
  const momentDate = moment(date, 'YYYY-MM-DD')
  const daysDiff = momentDate.diff(today, 'days') + 1
  return daysDiff
}

// Sort photos by type
export const sortPhotos = (photos, type) => {
  return photos.filter(photo => {
    const { description } = photo.status
    return description === type
  })
}

// Fetch function to get orders
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
        dispatch({ type: 'CHANGE_LOADING', payload: false })
        const message = getMessage(`${error}`)
        showMessage(message)
      })
  }
}

// Get the filename of a give path
export const getFilename = path => {
  const splitted = path.split('/')
  return splitted[splitted.length - 1]
}

// Creates a form data to insert the photos
const photoFormData = (photos, orderId) => {
  const data = new FormData()
  let before = []
  let inProgress = []
  let after = []
  photos.map((photo, index) => {
    const { type } = photo
    const filename = photo.filename
    type === 'before' ? before.push(filename)
      : type === 'in_progress' ? inProgress.push(filename)
        : type === 'after' && after.push(filename)
    data.append(`photo${index}`, {
      uri: photo.uri,
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

// Fetch function to upload photos
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
        if (jsonResponse.photos) {
          const { photos } = jsonResponse
          dispatch({ type: 'UPDATE_PHOTOS', payload: { orderId, photos } })
          dispatch({ type: 'CHANGE_UPLOAD', payload: false })
          dispatch({ type: 'CLEAN_PHOTOS' })
          const message = getMessage('SUCCESS_UPLOAD')
          showMessage(message)
        } else {
          dispatch({ type: 'CHANGE_UPLOAD', payload: false })
          const message = getMessage(jsonResponse.error)
          showMessage(message)
        }
      })
      .catch(error => {
        dispatch({ type: 'CHANGE_UPLOAD', payload: false })
        const message = getMessage(`${error}`)
        showMessage(message)
      })
  }
}

// Insert new photos to a given order
export const updateOrderPhotos = (orders, orderId, newPhotos) => {
  const orderIndex = _.findIndex(orders, { 'id': orderId })
  orders[orderIndex].photos.push(...newPhotos)
  return orders
}

// Fetch function to complete an order.
export const completeOrder = (token, orderId, userId, navigation) => {
  return dispatch => {
    dispatch({ type: 'CHANGE_UPLOAD', payload: true })
    return fetch(`${URL}complete-order/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'user_id': userId,
        'order_id': orderId
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        dispatch({ type: 'CHANGE_UPLOAD', payload: false })
      })
      .then(jsonResponse => {
        const { message } = jsonResponse
        dispatch({ type: 'CHANGE_UPLOAD', payload: false })
        if (message === 'SUCCESS') {
          dispatch(getOrders(token, userId))
          const flashMessage = getMessage('SUCCESS_COMPLETE')
          showMessage(flashMessage)
          setTimeout(() => {
            navigation.goBack()
          })
        }
      })
      .catch(error => {
        dispatch({ type: 'CHANGE_UPLOAD', payload: false })
        const message = getMessage(`${error}`)
        showMessage(message)
      })
  }
}
