import React, { Component } from 'react'
import {
  ScrollView,
  ActivityIndicator,
  View,
  Platform
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import {
  Text,
  Icon,
  Button,
  Image
} from 'react-native-elements'
import {
  Container,
  FlexRow,
  ButtonsContainer,
  ImagesContainer,
  styles
} from './styled'

export default class UploadPhotos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photos: []
    }
  }
  render () {
    const { photos } = this.state
    return (
      <Container>
        <Text h4>Photos</Text>
        {photos.length > 0 &&
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <ImagesContainer>
              {this.renderImages()}
            </ImagesContainer>
          </ScrollView>
        }
        <ButtonsContainer>
          <Button
            buttonStyle={{...styles.buttonStyle, ...styles.marginButton}}
            titleStyle={styles.buttonTitle}
            type='outline'
            title='Take a photo...'
            onPress={() => this.selectFromCamera()}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            type='outline'
            title='Choose from the gallery...'
            onPress={() => this.selectFromGallery()}
          />
        </ButtonsContainer>
        <FlexRow>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            type='outline'
            title='Cancel'
          />
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            type='outline'
            title='Save'
          />
        </FlexRow>
      </Container>
    )
  }

  renderImages () {
    const { photos } = this.state
    const isAndroid = Platform.OS === 'android'
    return photos.map((photo, index) => {
      const { sourceURL, path } = photo
      return (
        <View key={index}>
          <Image
            source={{uri: isAndroid ? path : sourceURL}}
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Icon
            type='font-awesome'
            name='times'
            containerStyle={styles.deleteIcon}
            color='red'
            onPress={() => this.deletePhoto(index)}
            underlayColor='transparent'
          />
        </View>
      )
    })
  }

  selectFromGallery () {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      const { photos } = this.state
      const newPhotosArray = [...photos, ...images]
      this.setState({photos: newPhotosArray})
    })
  }

  selectFromCamera () {
    ImagePicker.openCamera({
    }).then(image => {
      const { photos } = this.state
      const newPhotosArray = [...photos, image]
      this.setState({photos: newPhotosArray})
    })
  }

  deletePhoto (index) {
    let { photos } = this.state
    photos.splice(index, 1)
    this.setState({photos})
  }
}
