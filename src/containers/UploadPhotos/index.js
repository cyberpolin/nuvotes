import React, { Component } from 'react'
import ImagePicker from 'react-native-image-crop-picker'
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
  constructor (props) {
    super(props)
    this.selectFromGallery = this.selectFromGallery.bind(this)
  }
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
            onPress={() => this.selectFromGallery()}
          />
        </FlexRow>
      </Container>
    )
  }

  selectFromGallery () {
    ImagePicker.openPicker({
      multiple: true
    }).then(image => {
      console.log(image)
    })
  }
}
