const initialState = {
  isLoading: false
}

const settings = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CHANGE_LOADING':
      return {
        ...state,
        isLoading: payload
      }
    default:
      return state
  }
}

export default settings
