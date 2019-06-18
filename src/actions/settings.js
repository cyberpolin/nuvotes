export function changeLoading (isLoading) {
  return {
    type: 'CHANGE_LOADING',
    payload: isLoading
  }
}

export function changeUploading (isUploading) {
  return {
    type: 'CHANGE_UPLOAD',
    payload: isUploading
  }
}

export function changeDownload (isDownloading) {
  return {
    type: 'CHANGE_DOWNLOAD',
    payload: isDownloading
  }
}

export function toggleCamera (isOpen) {
  return {
    type: 'CHANGE_CAMERA',
    payload: isOpen
  }
}

export function addPhotos (photos) {
  return {
    type: 'ADD_PHOTOS',
    payload: photos
  }
}

export function cleanPhotos () {
  return {
    type: 'CLEAN_PHOTOS'
  }
}

export function deletePhoto (photos, index) {
  photos.splice(index, 1)
  return {
    type: 'DELETE_PHOTO',
    payload: photos
  }
}

export const resetSettings = () => ({
  type: 'RESET_SETTINGS'
})

export function deleteSelectedPhotos (photos, photosToDelete) {
  const selectionKeys = Object.keys(photosToDelete)
  const filteredPhotos = photos.filter((photo, index) => {
    if (!selectionKeys.includes(index) && !photosToDelete[index] === true) {
      return photo
    }
  })
  return {
    type: 'DELETE_PHOTO',
    payload: filteredPhotos
  }
}
