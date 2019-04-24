import React, { Component } from 'react'
import {
  ScrollView,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import {
  Text,
  Button,
  Avatar,
  Badge,
  Icon
} from 'react-native-elements'
import _ from 'lodash'
import {
  Container,
  FlexRow,
  ButtonsContainer,
  ImagesContainer,
  ImageBox,
  styles
} from './styled'
import { Camera } from '../index'
import { translate } from '../../helpers/localization'
import { uploadPhotos } from '../../helpers/orders'
import {
  changeUploading,
  changeCamera
} from '../../actions/settings'
import {
  white,
  secondary
} from '../../colorPalette'

class UploadPhotos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photos: [],
      isVisible: props.isVisible
    }
    this.handleClose = this.handleClose.bind(this)
    this.selectFromCamera = this.selectFromCamera.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
  render () {
    const { photos } = this.state
    const { isUploading } = this.props.settings
    return (
      <Container>
        <Text h4>{translate.photos}</Text>
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
            title={`${translate.takePhoto}...`}
            onPress={this.selectFromCamera}
          />
        </ButtonsContainer>
        <FlexRow>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            type='outline'
            title={translate.cancel}
            onPress={this.handleClose}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            type='outline'
            title={translate.save}
            onPress={this.handleSave}
            disabled={isUploading || photos.length < 1}
            loading={isUploading}
            loadingProps={{color: secondary}}
          />
        </FlexRow>
        <Camera />
      </Container>
    )
  }

  handleSave () {
    const { photos, isVisible } = this.state
    const { user, uploadPhotos, orderId, changeVisibility, changeUploading } = this.props
    changeUploading(true)
    setTimeout(() => {
      changeVisibility(!isVisible)
      uploadPhotos(user.token, photos, orderId)
    }, 1000)
  }

  handleClose () {
    const { changeVisibility } = this.props
    const { isVisible } = this.state
    changeVisibility(!isVisible)
  }

  renderImages () {
    const { photos } = this.state
    const isAndroid = Platform.OS === 'android'
    return photos.map((photo, index) => {
      const { sourceURL, path } = photo
      return (
        <ImageBox key={index}>
          <Avatar
            source={{uri: isAndroid ? path : sourceURL || path}}
            size='large'
            containerStyle={styles.avatarContainer}
          />
          <Badge
            value={
              <Icon
                type='font-awesome'
                name='times'
                size={12}
                color={white}
              />
            }
            containerStyle={styles.badgeStyle}
            status='error'
            onPress={() => this.deletePhoto(index)}
          />
        </ImageBox>
      )
    })
  }

  savePhoto (images, type) {
    const { photos } = this.state
    if (_.isArray(images)) {
      images = images.map(image => {
        image.type = type
        return image
      })
      const newPhotosArray = [...photos, ...images]
      this.setState({photos: newPhotosArray})
    } else {
      images['type'] = type
      const newPhotosArray = [...photos, images]
      this.setState({photos: newPhotosArray})
    }
  }

  selectFromCamera () {
    const { changeCamera } = this.props
    changeCamera(true)
  }

  deletePhoto (index) {
    let { photos } = this.state
    photos.splice(index, 1)
    this.setState({photos})
  }
}

const mapDispatchToProps = dispatch => ({
  uploadPhotos: (token, photos, orderId) => dispatch(uploadPhotos(token, photos, orderId)),
  changeUploading: isUploading => dispatch(changeUploading(isUploading)),
  changeCamera: isOpen => dispatch(changeCamera(isOpen))
})

const mapStateToProp = ({ user, settings }) => ({
  user,
  settings
})

export default connect(mapStateToProp, mapDispatchToProps)(UploadPhotos)
