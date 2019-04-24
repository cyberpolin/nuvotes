import React, { Component } from 'react'
import { Modal } from 'react-native'
import { connect } from 'react-redux'
import { RNCamera } from 'react-native-camera'
import { Icon } from 'react-native-elements'
import { changeCamera } from '../../actions/settings'
import {
  Container,
  Options,
  IconContainer
} from './styled'
import RF from '../../utils/responsiveFont'

class Camera extends Component {
  constructor (props) {
    super(props)
    this.changeVisibility = this.changeVisibility.bind(this)
  }
  render () {
    const { cameraOpen } = this.props.settings
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={cameraOpen}
      >
        <Container>
          <RNCamera
            style={{flex: 1}}
            type='back'
            flashMode='off'
          />
          <Options>
            <IconContainer alignLeft>
              <Icon
                type='font-awesome'
                name='arrow-left'
                size={RF(7)}
                onPress={this.changeVisibility}
                color='gray'
              />
            </IconContainer>
            <IconContainer>
              <Icon
                type='font-awesome'
                name='camera'
                size={RF(7)}
                color='gray'
              />
            </IconContainer>
            <IconContainer />
          </Options>
        </Container>
      </Modal>
    )
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
  changeCamera: isOpen => dispatch(changeCamera(isOpen))
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
