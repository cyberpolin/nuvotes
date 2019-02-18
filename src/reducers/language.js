const initialState = {
  selectedLanguage: 'en'
}

const language = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      return action.lang
    default:
      return state
  }
}

export default language
