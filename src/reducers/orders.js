import { updateOrderPhotos } from '../helpers/orders'

const initialState = []

const orders = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'POPULATE_ORDERS':
      return payload
    case 'EMPTY_ORDERS':
      return initialState
    case 'UPDATE_PHOTOS':
      const { orderId, photos } = payload
      const orders = updateOrderPhotos(state, orderId, photos)
      return {
        ...state,
        ...orders
      }
    default:
      return state
  }
}

export default orders
