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
