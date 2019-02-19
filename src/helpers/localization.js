import LocalizedStrings from 'react-native-localization'
import STORE from '../store'

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
    email: 'Email',
    signOut: 'Sign Out',
    profile: 'Profile',
    languageAlertTitle: 'Change Language',
    languageAlertDescription: 'Do you want to change the language to spanish?',
    yes: 'Yes',
    orders: 'Orders',
    inProgress: 'In Progress',
    overdue: 'Overdue',
    inspection: 'Inspection',
    insurance: 'Insurance',
    repair: 'Repair'
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
    email: 'Correo Electrónico',
    signOut: 'Cerrar Sesión',
    profile: 'Perfil',
    languageAlertTitle: 'Cambiar Idioma',
    languageAlertDescription: '¿Desea cambiar el idioma a inglés?',
    yes: 'Sí',
    orders: 'Órdenes',
    inProgress: 'En Proceso',
    overdue: 'Atrasados',
    inspection: 'Inspección',
    insurance: 'Seguro',
    repair: 'Reparación'
  }
})

export const checkLanguage = () => {
  const { selectedLanguage } = STORE.store.getState().language
  const currentLanguage = translate.getLanguage()
  if (currentLanguage !== selectedLanguage) {
    translate.setLanguage(selectedLanguage)
  }
}

export const setLanguage = () => {
  const currentLanguage = translate.getLanguage()
  const languageToChange = currentLanguage === 'en' ? 'es' : 'en'
  translate.setLanguage(languageToChange)
  return languageToChange
}
