import LocalizedStrings from 'react-native-localization'
import STORE from '../store'
import en from './english'
import es from './spanish'

// Translation configuration
export const translate = new LocalizedStrings({
  en,
  es
})

/**
 * Checks the language from the reducer and compares
 * it with the actual set language to change it.
 */
export const checkLanguage = () => {
  const { selectedLanguage } = STORE.store.getState().language
  const currentLanguage = translate.getLanguage()
  if (currentLanguage !== selectedLanguage) {
    translate.setLanguage(selectedLanguage)
  }
}

/**
 * Compares the actual language to change it.
 * Needs refactoring if new translations are added.
 */
export const setLanguage = () => {
  const currentLanguage = translate.getLanguage()
  const languageToChange = currentLanguage === 'en' ? 'es' : 'en'
  translate.setLanguage(languageToChange)
  return languageToChange
}
