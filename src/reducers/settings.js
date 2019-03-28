const initialState = {
  isLoading: false,
  isUploading: false
}

const settings = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CHANGE_LOADING':
      return {
        ...state,
        isLoading: payload
      }
    case 'CHANGE_UPLOAD':
      return {
        ...state,
        isUploading: payload
      }
    default:
      return state
  }
}

export default settings
