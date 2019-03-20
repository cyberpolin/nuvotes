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
  }
}
