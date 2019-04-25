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

export function changeCamera (isOpen) {
  return {
    type: 'CHANGE_CAMERA',
    payload: isOpen
  }
}

export function addPhoto (photo) {
  return {
    type: 'ADD_PHOTO',
    payload: photo
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
