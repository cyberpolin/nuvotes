import LocalizedStrings from 'react-native-localization'

export const translate = new LocalizedStrings({
  en: {
    signIn: 'Sign In',
    password: 'Password',
    userName: 'Username',
    changeLanguage: 'Change Language',
    firstName: 'First Name',
    lastName: 'Last Name',
    state: 'State',
    address: 'Address',
    email: 'Email'
  },
  es: {
    signIn: 'Iniciar Sesión',
    password: 'Contraseña',
    userName: 'Usuario',
    changeLanguage: 'Cambiar Idioma',
    firstName: 'Nombre',
    lastName: 'Apellido',
    state: 'Estado',
    address: 'Dirección',
    email: 'Correo Electrónico'
  }
})

export const getLanguageToChange = (language) => {
  const languageToChange = language === 'es' ? 'en' : 'es'
  return translate.setLanguage(languageToChange)
}
