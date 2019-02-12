[Return](../../../README.md)

# Collapsable


| Prop | Type | Default Value| isRequired | Description |
|------|------|--------------|------------|-------------|
|`label`|`string`|`none`|`yes`|`string to show button label`|
|`isCollapsed`|`boolean`|`none`|`yes`|`boolean to show content`|
|`children`|`element`|`none`|`yes`|`render jsx elements or components`|

![OrderCard](./img/Collapsable.png)

## Usage

```javascript
import { Collapsable } from './components'

<Collapsable
  label='Attachments'
  isCollapsed={true}
>
  <Text>I am the collapsed text!</Text>
</Collapsable>
```