import React, { Component } from 'react'
import ImageBrowser from 'react-native-interactive-image-gallery'
import { Text } from 'react-native-elements'
import {
  Container
} from './styled'
import { translate } from '../../helpers/localization'

export default class Gallery extends Component {
  render () {
    const { photos } = this.props
    return (
      <Container>
        {photos && photos.length > 0
          ? <ImageBrowser images={photos} />
          : <Text>{translate.noPhotos}</Text>}
      </Container>
    )
  }
}
