import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {
  Text,
  Button,
  Avatar,
  Badge,
  Icon
} from 'react-native-elements'
import ImageView from 'react-native-image-view'
import Config from 'react-native-config'
import BackgroundUpload from 'react-native-background-upload'
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
  toggleCamera,
  deletePhoto
} from '../../actions/settings'
import {
  white,
  secondary
} from '../../colorPalette'

const { URL } = Config

class UploadPhotos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: props.isVisible,
      viewerVisible: false,
      selectedIndex: 0,
      totalPhotos: 0,
      completed: 0
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.openViewer = this.openViewer.bind(this)
    this.closeViewer = this.closeViewer.bind(this)
    this.handleBackgroundSave = this.handleBackgroundSave.bind(this)
  }
  render () {
    const { viewerVisible, selectedIndex } = this.state
    const { descriptionJob } = this.props
    const { isUploading, photos } = this.props.settings
    console.log('STATE', this.state)
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
            onPress={this.openCamera}
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
            onPress={this.handleBackgroundSave}
            disabled={isUploading || photos.length < 1}
            loading={isUploading}
            loadingProps={{color: secondary}}
            disabledTitleStyle={styles.disabledText}
            disabledStyle={styles.disabledStyle}
          />
        </FlexRow>
        <Camera type={descriptionJob.description} />
        {photos.length > 0 &&
          <ImageView
            isVisible={viewerVisible}
            imageIndex={selectedIndex}
            onClose={this.closeViewer}
            animationType='fade'
            images={photos}
          />
        }
      </Container>
    )
  }

  async handleBackgroundSave () {
    const { totalPhotos, completed, isVisible } = this.state
    const { photos } = this.props.settings
    const { user, deletePhoto, changeVisibility, changeUploading } = this.props
    console.log('PHOTOS', photos)
    if (totalPhotos === 0) {
      this.setState({ totalPhotos: photos.length })
    }
    const toUpload = photos[0]
    toUpload['uri'] = toUpload['uri'].replace('file://', '')
    const options = {
      url: `${URL}upload-photo/`,
      path: toUpload['uri'],
      method: 'POST',
      type: 'multipart',
      field: 'photo',
      headers: {
        Authorization: `Token ${user.token}`
      }
    }
    changeUploading(true)
    // changeVisibility(!isVisible)
    BackgroundUpload.startUpload(options).then(uploadId => {
      BackgroundUpload.addListener('progress', uploadId, data => {
        console.log('PROGRESS DATA', data.progress)
      })
      BackgroundUpload.addListener('error', uploadId, data => {
        console.log('ERROR', data.error)
      })
      BackgroundUpload.addListener('completed', uploadId, data => {
        const totalCompleted = completed + 1
        this.setState({ completed: totalCompleted })
        deletePhoto(photos, 0)
        if (photos.length > 0) {
          this.handleBackgroundSave()
        }
      })
    })
  }

  handleSave () {
    const { isVisible } = this.state
    const { photos } = this.props.settings
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
    const { photos } = this.props.settings
    return photos.map((photo, index) => {
      const { uri } = photo
      return (
        <ImageBox key={index}>
          <Avatar
            source={{uri}}
            size='large'
            containerStyle={styles.avatarContainer}
            onPress={() => this.openViewer(index)}
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

  closeViewer () {
    this.setState({ viewerVisible: false })
  }

  openViewer (index) {
    this.setState({
      viewerVisible: true,
      selectedIndex: index
    })
  }

  openCamera () {
    const { toggleCamera } = this.props
    toggleCamera(true)
  }

  deletePhoto (index) {
    const { deletePhoto, settings } = this.props
    deletePhoto(settings.photos, index)
  }
}

const mapDispatchToProps = dispatch => ({
  uploadPhotos: (token, photos, orderId) => dispatch(uploadPhotos(token, photos, orderId)),
  changeUploading: isUploading => dispatch(changeUploading(isUploading)),
  toggleCamera: isOpen => dispatch(toggleCamera(isOpen)),
  deletePhoto: (photos, index) => dispatch(deletePhoto(photos, index))
})

const mapStateToProp = ({ user, settings }) => ({
  user,
  settings
})

export default connect(mapStateToProp, mapDispatchToProps)(UploadPhotos)
