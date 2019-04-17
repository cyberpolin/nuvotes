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
