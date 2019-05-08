import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {
  Button,
  Badge,
  Icon,
  Image
} from 'react-native-elements'
import ImageView from 'react-native-image-view'
import {
  Container,
  FlexRow,
  ButtonsContainer,
  ImagesContainer,
  ImageBox,
  styles,
  Photo
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
import { heightPercentageToDP as hp } from '../../utils/layout'

class UploadPhotos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewerVisible: false,
      selectedIndex: 0
    }
    this.handleSave = this.handleSave.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.openViewer = this.openViewer.bind(this)
    this.closeViewer = this.closeViewer.bind(this)
  }
  render () {
    const { viewerVisible, selectedIndex } = this.state
    const { navigation } = this.props
    const { isUploading, photos } = this.props.settings
    const descriptionJob = navigation.getParam('descriptionJob', '')
    return (
      <Container>
        {photos.length > 0 &&
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}
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
            title={translate.save}
            onPress={this.handleSave}
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

  handleSave () {
    const { photos } = this.props.settings
    const { user, uploadPhotos, changeUploading, navigation } = this.props
    const orderId = navigation.getParam('id', 0)
    changeUploading(true)
    setTimeout(() => {
      uploadPhotos(user.token, photos, orderId)
    }, 1000)
  }

  renderImages () {
    const { photos } = this.props.settings
    return photos.map((photo, index) => {
      const { uri } = photo
      return (
        <ImageBox key={index}>
          <Photo
            source={{uri}}
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
