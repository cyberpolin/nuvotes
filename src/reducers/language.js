const initialState = {
  selectedLanguage: 'en'
}

const language = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        selectedLanguage: payload
      }
    default:
      return state
  }
}

export default language
