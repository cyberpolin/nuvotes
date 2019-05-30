[Return](../../../README.md)

# Localization

## Add new translations

New languages or translations can be added at anytime. In the helpers folder there are 3 related files, `english.js`, `spanish.js` and `localization.js`.

To add new translations just add a new object key in all translation files, in this case, english and spanish:

```javascript
english.js
{
  website: 'Web Site'
}
```

```javascript
spanish.js
{
  website: 'Sitio web'
}
```

## Add a new language

To add a new language you need to create a file with the language name, for example french. Then, add all translation keys used in the other languages, and finally set the language into translate varible located in `localization.js` file.

If a translation object key is not found, it will be show the default key, in our case, english.

Example:

### 1. Create a file
```javascript
french.js

const fr = {
  hello: 'Bonjour',
  goodbye: 'Au revoir'
}

export default fr
```

### 2. Set into translate variable

NOTE: The first language will be always the default language.

```javascript
localization.js

import fr from './french'
export const translate = new LocalizedStrings({
  en, // <-- Default language
  es,
  fr // <-- New language
})
```

## Usage

To use any translation simply import the translate and use it as string, and it will show the current language translation.

```javascript
import { translate } from './helpers/localization'

<Text>{translate.hello}</Text>
```