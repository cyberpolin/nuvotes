import React, { Component } from 'react'
import ImageBrowser from 'react-native-interactive-image-gallery'
import { Text } from 'react-native-elements'
import { Container } from './styled'
import { translate } from '../../helpers/localization'
import { photosByID } from '../../helpers/orders'
import _ from 'lodash'

export default class Gallery extends Component {
  render () {
    const { navigation } = this.props
    const photos = navigation.getParam('sortedPhotos', {})
    const photosURL = !_.isEmpty(photos) ? this.getPhotoURL(photos) : []
    return (
      <Container>
        {photos && !_.isEmpty(photos)
          ? <ImageBrowser images={photosURL} />
          : <Text>{translate.noPhotos}</Text>}
      </Container>
    )
  }

  getPhotoURL (photos) {
    const orderedPhotos = photosByID(photos)
    return orderedPhotos.map((photo, index) => {
      const splitted = photo.photo.photo.split('.')
      splitted.splice(splitted.length - 1, 0, 'thumbnail')
      const thumbnail = splitted.join('.')
      const description = photo.status ? photo.status.description : ''
      return {
        URI: photo.photo.photo,
        id: `${index}`,
        description: description,
        thumbnail
      }
    })
  }
}
