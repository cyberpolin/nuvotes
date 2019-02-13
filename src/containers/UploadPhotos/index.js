import React, { Component } from 'react'
import {
  Text,
  Icon,
  Button
} from 'react-native-elements'
import {
  Container,
  FlexRow
} from './styled'

export default class UploadPhotos extends Component {
  render () {
    return (
      <Container>
        <Text h4>Photos</Text>
        <FlexRow>
          <Button
            title='Cancel'
          />
          <Button
            title='Save'
          />
        </FlexRow>
      </Container>
    )
  }
}
