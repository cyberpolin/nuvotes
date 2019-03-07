import _ from 'lodash'
import Orders from '../../orders'
import moment from 'moment'

const ordersByDate = orders => {
  const sortedOrders = _.orderBy(orders, ['endDate'], ['asc'])
  return sortedOrders
}

export const filterOrders = orderType => {
  if (orderType === 'Search') {
    const filteredOrders = Orders.filter(order => {
      return order.status === 'overdue'
    })
    return ordersByDate(filteredOrders)
  } else if (orderType === 'Pending') {
    const filteredOrders = Orders.filter(order => {
      return order.status === 'inProgress'
    })
    return ordersByDate(filteredOrders)
  }
  return ordersByDate(Orders)
}

export const filterOrderBySearch = (orders, search) => {
  return orders.filter(order => {
    if (!isNaN(search) && _.includes(order.id.toString(), search)) {
      return order
    } else if (_.includes(order.name, search)) {
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
