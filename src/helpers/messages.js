import { translate } from '../helpers/localization'

export const getMessage = type => {
  switch (type) {
    case 'EMPTY_FIELDS':
      return {
        message: translate.emptyFieldsMessage,
        description: translate.emptyFieldsDescription,
        type: 'warning',
        icon: 'warning',
        duration: 2000
      }
    case 'LOGIN_ERROR':
      return {
        message: translate.loginErrorMessage,
        description: translate.loginErrorDescription,
        type: 'danger',
        icon: 'danger',
        duration: 2000
      }
    case 'CONNECTION_ERROR':
      return {
        message: translate.connectionErrorMessage,
        description: translate.connectionErrorDescription,
        type: 'danger',
        icon: 'danger',
        duration: 2000
      }
    case 'ERROR':
      return {
        message: translate.errorMessage,
        description: translate.errorDescription,
        type: 'danger',
        icon: 'danger',
        duration: 2000
      }
    case 'SUCCESS_UPLOAD':
      return {
        message: translate.successUploadMessage,
        type: 'success',
        icon: 'success',
        duration: 2000
      }
    case 'START_UPLOAD':
      return {
        message: translate.startUploadMessage,
        description: translate.startUploadDescription,
        type: 'info',
        icon: 'info',
        duration: 2000
      }
    case 'UPLOAD_ERROR':
      return {
        message: translate.uploadError,
        description: translate.uploadErrorDescription,
        type: 'danger',
        icon: 'danger',
        duration: 2000
      }
  }
}
