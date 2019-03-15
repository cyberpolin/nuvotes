import React, { Component } from 'react'
import ImageBrowser from 'react-native-interactive-image-gallery'
import { Text } from 'react-native-elements'
import { Container } from './styled'
import { translate } from '../../helpers/localization'
import _ from 'lodash'

export default class Gallery extends Component {
  render () {
    const { navigation } = this.props
    const photos = navigation.getParam('sortedPhotos', {})
    const photosURL = this.getPhotoURL(photos)
    return (
      <Container>
        {photos && !_.isEmpty(photos)
          ? <ImageBrowser images={photosURL} />
          : <Text>{translate.noPhotos}</Text>}
      </Container>
    )
  }

  getPhotoURL (photos) {
    return photos.map((photo, index) => {
      return {
        URI: photo.photo.photo,
        id: `${index}`,
        description: photo.status.description,
        thumbnail: photo.photo.photo
      }
    })
  }
}
