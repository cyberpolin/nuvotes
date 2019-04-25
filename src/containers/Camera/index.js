import React, { Component } from 'react'
import {
  Modal,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import { RNCamera } from 'react-native-camera'
import { Icon } from 'react-native-elements'
import {
  toggleCamera,
  addPhotos
} from '../../actions/settings'
import {
  Container,
  Options,
  IconContainer,
  styles
} from './styled'
import RF from '../../utils/responsiveFont'
import { getFilename } from '../../helpers/orders'
import { translate } from '../../helpers/localization'

class Camera extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flashOn: false,
      photos: []
    }
    this.takePhoto = this.takePhoto.bind(this)
    this.toggleFlash = this.toggleFlash.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.closeCamera = this.closeCamera.bind(this)
  }
  render () {
    const { flashOn } = this.state
    const { cameraOpen } = this.props.settings
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={cameraOpen}
      >
        <Container>
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
                name='times'
                size={RF(7)}
                onPress={this.handleSave}
                color='rgba(255, 255, 255, 0.8)'
                containerStyle={styles.backIcon}
                underlayColor='transparent'
                reverseColor='rgba(255, 255, 255, 0.4)'
              />
            </IconContainer>
            <IconContainer>
              <Icon
                type='font-awesome'
                name='camera'
                size={RF(7)}
                color='rgba(255, 255, 255, 0.8)'
                onPress={this.takePhoto}
                underlayColor='transparent'
                reverseColor='rgba(255, 255, 255, 0.4)'
              />
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
        </Container>
      </Modal>
    )
  }

  toggleFlash () {
    const { flashOn } = this.state
    this.setState({ flashOn: !flashOn })
  }

  async takePhoto () {
    const { photos } = this.state
    if (this.camera) {
      var data = await this.camera.takePictureAsync({skipProcessing: true})
      const uri = data.uri
      const filename = getFilename(uri)
      data['filename'] = filename
      data['mime'] = 'image/jpg'
      this.setState({ photos: [...photos, data] })
    }
  }

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
