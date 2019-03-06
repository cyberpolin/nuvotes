import _ from 'lodash'
import Orders from '../../orders'

export const filterOrders = (orderType) => {
  if (orderType === 'Overdue') {
    return Orders.filter(order => {
      return order.status === 'overdue'
    })
  } else if (orderType === 'InProgress') {
    return Orders.filter(order => {
      return order.status === 'inProgress'
    })
  }
  return Orders
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
