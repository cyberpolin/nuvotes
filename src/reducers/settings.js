const initialState = {
  isLoading: false,
  isUploading: false,
  isDownloading: false
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
    case 'CHANGE_DOWNLOAD':
      return {
        ...state,
        isDownloading: payload
      }
    default:
      return state
  }
}

export default settings
