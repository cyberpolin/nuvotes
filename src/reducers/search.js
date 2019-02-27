const initialState = ''

const search = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_SEARCH':
      return payload
    default:
      return state
  }
}

export default search
