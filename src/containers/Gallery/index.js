import React, { Component } from 'react'
import ImageBrowser from 'react-native-interactive-image-gallery'
import { Text } from 'react-native-elements'
import {
  Container
} from './styled'

export default class Gallery extends Component {
  render () {
    const photos = []
    return (
      <Container>
        {photos.length > 0
          ? <ImageBrowser images={photos} />
          : <Text>There are no photos to show.</Text>}
      </Container>
    )
  }
}
