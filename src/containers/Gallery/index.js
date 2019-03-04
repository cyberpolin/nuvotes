import React, { Component } from 'react'
import ImageBrowser from 'react-native-interactive-image-gallery'
import { Text } from 'react-native-elements'
import {
  Container
} from './styled'
import { translate } from '../../helpers/localization'
import _ from 'lodash'

export default class Gallery extends Component {
  render () {
    const { photos } = this.props
    return (
      <Container>
        {photos && !_.isEmpty(photos)
          ? <ImageBrowser images={photos} />
          : <Text>{translate.noPhotos}</Text>}
      </Container>
    )
  }
}
