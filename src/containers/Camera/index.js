import React, { Component } from 'react'
import {
  Modal,
  Alert,
  Text,
  CameraRoll,
  PermissionsAndroid,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import { RNCamera } from 'react-native-camera'
import DeviceInfo from 'react-native-device-info'
import {
  Icon,
  Button
} from 'react-native-elements'
import Toast from 'react-native-easy-toast'
import {
  toggleCamera,
  addPhotos
} from '../../actions/settings'
import {
  Container,
  Options,
  IconContainer,
  MessageContainer,
  styles
} from './styled'
import RF from '../../utils/responsiveFont'
import { getFilename } from '../../helpers/orders'
import { translate } from '../../helpers/localization'

const isAndroid = Platform.OS === 'android'

class Camera extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flashOn: false,
      photos: [],
      isLoading: false,
      showMessage: true
    }
    this.takePhoto = this.takePhoto.bind(this)
    this.toggleFlash = this.toggleFlash.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.closeCamera = this.closeCamera.bind(this)
    this.closeMessage = this.closeMessage.bind(this)
    this.lowStorage = this.lowStorage.bind(this)
  }
  render () {
    const { flashOn, isLoading } = this.state
    const { cameraOpen } = this.props.settings
    this.requestCameraPermission()
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={cameraOpen}
        onRequestClose={this.handleSave}
      >
        <Container>
          {this.lowStorage()}
          <RNCamera
            style={styles.camera}
            type='back'
            flashMode={flashOn ? 'on' : 'off'}
            captureAudio={false}
            ref={ref => {
              this.camera = ref
            }}
          />
          <Options>
            <IconContainer alignLeft>
              <Icon
                type='font-awesome'
                name='arrow-left'
                size={RF(7)}
                onPress={this.handleSave}
                color='rgba(255, 255, 255, 0.8)'
                containerStyle={styles.backIcon}
                underlayColor='transparent'
                reverseColor='rgba(255, 255, 255, 0.4)'
              />
            </IconContainer>
            <IconContainer>
              {isLoading
                ? <Button
                  loading={isLoading}
                  disabled={isLoading}
                  disabledStyle={{backgroundColor: 'transparent'}}
                />
                : <Icon
                  type='font-awesome'
                  name='camera'
                  size={RF(7)}
                  color='rgba(255, 255, 255, 0.8)'
                  onPress={this.takePhoto}
                  underlayColor='transparent'
                  reverseColor='rgba(255, 255, 255, 0.4)'
                />
              }
            </IconContainer>
            <IconContainer alignRight>
              <Icon
                type='material'
                name={flashOn ? 'flash-on' : 'flash-off'}
                size={RF(7)}
                color='rgba(255, 255, 255, 0.8)'
                underlayColor='transparent'
                onPress={this.toggleFlash}
                reverseColor='rgba(255, 255, 255, 0.4)'
              />
            </IconContainer>
          </Options>
          <Toast
            ref={ref => {
              this.toast = ref
            }}
          />
        </Container>
      </Modal>
    )
  }

  async requestCameraPermission () {
    if (isAndroid) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: translate.storagePermission,
          message: translate.storagePermissionDescription,
          buttonNeutral: translate.askLater,
          buttonNegative: 'No',
          buttonPositive: 'OK'
        }
      )
    }
  }

  // Shows a Message if internal storage is less than 200MB
  lowStorage () {
    const { showMessage } = this.state
    const freeDiskStorage = DeviceInfo.getFreeDiskStorage()
    const megabytes = ((freeDiskStorage / 1024) / 1024)
    if (megabytes < 200 && showMessage) {
      return (
        <MessageContainer onPress={this.closeMessage}>
          <Text>{translate.lowFreeSpace}</Text>
          <Text>{translate.lowFreeSpaceDescription}</Text>
        </MessageContainer>
      )
    }
  }

  closeMessage () {
    this.setState({ showMessage: false })
  }

  toggleFlash () {
    const { flashOn } = this.state
    this.setState({ flashOn: !flashOn })
  }

  // async method to take a photo
  async takePhoto () {
    const { photos } = this.state
    this.setState({ isLoading: true })
    const options = {
      orientation: 'portrait',
      width: 560
    }
    if (this.camera) {
      var data = await this.camera.takePictureAsync(options)
      this.toast.show(translate.photoTaked)
      const uri = data.uri
      const filename = getFilename(uri)
      CameraRoll.saveToCameraRoll(uri)
      data['filename'] = filename
      data['mime'] = 'image/jpg'
      data['source'] = {
        uri
      }
      this.setState({ photos: [...photos, data] })
      this.setState({ isLoading: false })
    }
  }

  // Shows an alert to choose how to save the photos.
  handleSave () {
    const { photos } = this.state
    const { type, toggleCamera } = this.props
    if (photos.length > 0) {
      if (type !== 'Inspection') {
        Alert.alert(
          translate.savePhotoAlertTitle,
          translate.savePhotoAlertMessage,
          [
            {text: translate.before, onPress: () => this.closeCamera(photos, 'before')},
            {text: translate.inProgress, onPress: () => this.closeCamera(photos, 'in_progress')},
            {text: translate.after, onPress: () => this.closeCamera(photos, 'after')}
          ], {cancelable: false}
        )
      } else {
        this.closeCamera(photos, 'property')
      }
    } else {
      toggleCamera(false)
    }
  }

  // Method to save the photos to the reducer with an assigned type
  closeCamera (photos, type) {
    const { toggleCamera, addPhotos } = this.props
    const sortedPhotos = photos.map(photo => {
      photo['type'] = type
      return photo
    })
    addPhotos(sortedPhotos, type)
    toggleCamera(false)
    this.setState({ photos: [] })
  }
}

const mapStateToProps = ({ settings }) => ({
  settings
})

const mapDispatchToProps = dispatch => ({
  toggleCamera: isOpen => dispatch(toggleCamera(isOpen)),
  addPhotos: photo => dispatch(addPhotos(photo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
