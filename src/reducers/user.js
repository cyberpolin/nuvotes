const initialState = {}

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'POPULATE_USER':
      return {
        ...state,
        ...payload
      }
    case 'LOG_OUT':
      return initialState
    default:
      return state
  }
}

export default user
