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
    case 'TypeError: Network request failed':
      return {
        message: translate.connectionErrorMessage,
        description: translate.connectionErrorDescription,
        type: 'danger',
        icon: 'danger',
        duration: 2000
      }
    case 'ERROR':
      return {
        message: translate.genericErrorMessage,
        description: translate.genericErrorDescription,
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
    case 'SHORT_PASSWORD':
      return {
        message: translate.shortPasswordMessage,
        description: translate.shortPasswordDescrption,
        type: 'warning',
        icon: 'warning',
        duration: 2000
      }
    case 'NUMERIC_PASSWORD':
      return {
        message: translate.numberPasswordMessage,
        description: translate.numberPasswordDescription,
        type: 'warning',
        icon: 'warning',
        duration: 2000
      }
    case 'INVALID_EMAIL':
      return {
        message: translate.invalidEmailMessage,
        description: translate.invalidEmailDescription,
        type: 'warning',
        icon: 'warning',
        duration: 2000
      }
    case 'USED_EMAIL':
      return {
        message: translate.usedMailMessage,
        description: translate.usedMailDescription,
        type: 'danger',
        icon: 'danger',
        duration: 2000
      }
    case 'USED_USERNAME':
      return {
        message: translate.usedUsernameMessage,
        description: translate.usedUsernameDescription,
        type: 'danger',
        icon: 'danger',
        duration: 2000
      }
    case 'SUCCESS_UPDATE':
      return {
        message: translate.successModify,
        type: 'success',
        icon: 'success',
        duration: 2000
      }
    case 'FILE_ERROR':
      return {
        message: translate.fileErrorMessage,
        description: translate.fileErrorDescription,
        type: 'danger',
        icon: 'danger',
        duration: 2000
      }
    case 'SUCCESS_COMPLETE':
      return {
        message: translate.successComplete,
        type: 'success',
        icon: 'success',
        duration: 2000
      }
  }
}
