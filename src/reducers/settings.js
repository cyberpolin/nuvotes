const initialState = {
  isLoading: false,
  isUploading: false,
  isDownloading: false,
  cameraOpen: false,
  photos: []
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
    case 'CHANGE_CAMERA':
      return {
        ...state,
        cameraOpen: payload
      }
    case 'ADD_PHOTOS':
      return {
        ...state,
        photos: [...state.photos, ...payload]
      }
    case 'CLEAN_PHOTOS':
      return {
        ...state,
        photos: initialState.photos
      }
    case 'DELETE_PHOTO':
      return {
        ...state,
        photos: payload
      }
    case 'RESET_SETTINGS':
      return {
        ...state,
        isLoading: false,
        isUploading: false,
        isDownloading: false,
        cameraOpen: false
      }
    default:
      return state
  }
}

export default settings
