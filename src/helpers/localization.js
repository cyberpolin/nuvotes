import LocalizedStrings from 'react-native-localization'
import STORE from '../store'
import en from './english'
import es from './spanish'

// Translation configuration
export const translate = new LocalizedStrings({
  en,
  es
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
