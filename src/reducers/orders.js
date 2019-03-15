const initialState = []

const orders = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'POPULATE_ORDERS':
      return payload
    case 'EMPTY_ORDERS':
      return initialState
    default:
      return state
  }
}

export default orders
