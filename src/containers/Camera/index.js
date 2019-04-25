import React, { Component } from 'react'
import { Modal } from 'react-native'
import { connect } from 'react-redux'
import { RNCamera } from 'react-native-camera'
import { Icon } from 'react-native-elements'
import {
  changeCamera,
  addPhoto
} from '../../actions/settings'
import {
  Container,
  Options,
  IconContainer,
  styles
} from './styled'
import RF from '../../utils/responsiveFont'
import { getFilename } from '../../helpers/orders'

class Camera extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flashOn: false
    }
    this.changeVisibility = this.changeVisibility.bind(this)
    this.takePhoto = this.takePhoto.bind(this)
    this.toggleFlash = this.toggleFlash.bind(this)
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
                onPress={this.changeVisibility}
                color='rgba(255, 255, 255, 0.6)'
                containerStyle={styles.backIcon}
                underlayColor='transparent'
              />
            </IconContainer>
            <IconContainer>
              <Icon
                type='font-awesome'
                name='camera'
                size={RF(7)}
                color='rgba(255, 255, 255, 0.6)'
                onPress={this.takePhoto}
                underlayColor='transparent'
              />
            </IconContainer>
            <IconContainer alignRight>
              <Icon
                type='material'
                name={flashOn ? 'flash-on' : 'flash-off'}
                size={RF(7)}
                color='rgba(255, 255, 255, 0.6)'
                underlayColor='transparent'
                onPress={this.toggleFlash}
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
    const { saveAs, addPhoto } = this.props
    if (this.camera) {
      var data = await this.camera.takePictureAsync()
      const uri = data.uri
      const filename = getFilename(uri)
      data['filename'] = filename
      data['mime'] = 'image/jpg'
      data['type'] = saveAs
      addPhoto(data)
    }
  }

  changeVisibility () {
    const { changeCamera } = this.props
    changeCamera(false)
  }
}

const mapStateToProps = ({ settings }) => ({
  settings
})

const mapDispatchToProps = dispatch => ({
  changeCamera: isOpen => dispatch(changeCamera(isOpen)),
  addPhoto: photo => dispatch(addPhoto(photo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
