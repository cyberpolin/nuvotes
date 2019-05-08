import React, { Component } from 'react'
import {
  ScrollView,
  Alert,
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import {
  Button,
  Badge,
  Icon,
  CheckBox
} from 'react-native-elements'
import ImageView from 'react-native-image-view'
import Collapsable from 'react-native-collapsible'
import {
  Container,
  ImagesContainer,
  ImageBox,
  styles,
  Photo,
  ButtonsBar,
  Flex,
  IconText,
  PhotoButton,
  CenterContainer
} from './styled'
import { Camera } from '../index'
import { translate } from '../../helpers/localization'
import { uploadPhotos } from '../../helpers/orders'
import {
  changeUploading,
  toggleCamera,
  deletePhoto,
  deleteSelectedPhotos
} from '../../actions/settings'
import {
  white,
  secondary
} from '../../colorPalette'
import { widthPercentageToDP as wp } from '../../utils/layout'

class UploadPhotos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewerVisible: false,
      selectedIndex: 0,
      deleteMode: false,
      selected: {},
      style: {
        display: 'flex'
      }
    }
    this.deleteSelection = this.deleteSelection.bind(this)
    this.animationEnd = this.animationEnd.bind(this)
    this.closeViewer = this.closeViewer.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.openViewer = this.openViewer.bind(this)
    this.toggleMode = this.toggleMode.bind(this)
    this.selectAll = this.selectAll.bind(this)
  }
  render () {
    const { viewerVisible, selectedIndex, deleteMode, selected, style } = this.state
    const { navigation } = this.props
    const { isUploading, photos } = this.props.settings
    const descriptionJob = navigation.getParam('descriptionJob', '')
    const haveSelection = Object.values(selected).includes(true)
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
        <ButtonsBar style={style}>
          <Flex />
          <CenterContainer>
            <PhotoButton onPress={this.openCamera}>
              <Icon
                type='font-awesome'
                name='camera'
                underlayColor='transparent'
                size={30}
              />
            </PhotoButton>
            <IconText>{translate.takePhoto}</IconText>
          </CenterContainer>
          <Flex>
            {photos.length > 0 &&
              <Button
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitle}
                type='outline'
                title={translate.save}
                onPress={this.handleSave}
                disabled={isUploading}
                loading={isUploading}
                loadingProps={{color: secondary}}
                disabledTitleStyle={styles.disabledText}
                disabledStyle={styles.disabledStyle}
              />}
          </Flex>
        </ButtonsBar>
        <Collapsable collapsed={!deleteMode} onAnimationEnd={!deleteMode ? this.animationEnd : undefined}>
          <View style={{backgroundColor: 'red', height: 50, width: wp(100), flexDirection: 'row'}}>
            <Flex>
              <Button
                title={translate.cancel}
                onPress={this.toggleMode}
              />
            </Flex>
            <Flex>
              <Button
                title={translate.delete}
                disabled={!haveSelection}
                onPress={this.deleteSelection}
              />
            </Flex>
            <Flex>
              <Button
                title={translate.selectAll}
                onPress={this.selectAll}
              />
            </Flex>
          </View>
        </Collapsable>
      </Container>
    )
  }

  animationEnd () {
    this.setState({ style: { display: 'flex' } })
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
    const { deleteMode, selected } = this.state
    const { photos } = this.props.settings
    return photos.map((photo, index) => {
      const { uri } = photo
      return (
        <ImageBox
          key={index}
          onPress={deleteMode ? () => this.selectDelete(index) : () => this.openViewer(index)}
          onLongPress={!deleteMode ? this.toggleMode : undefined}
        >
          <Photo source={{uri}} />
          {deleteMode
            ? <CheckBox
              containerStyle={styles.checkboxContainer}
              checked={selected[index]}
              onPress={() => this.selectDelete(index)}
              checkedColor='red'
            />
            : <Badge
              value={
                <Icon
                  type='font-awesome'
                  name='times'
                  size={20}
                  color={white}
                />
              }
              containerStyle={styles.badgeStyle}
              badgeStyle={styles.badgeContainer}
              status='error'
              onPress={() => this.deletePhoto(index)}
            />
          }
        </ImageBox>
      )
    })
  }
  selectAll () {
    const { photos } = this.props.settings
    const { selected } = this.state
    photos.map((photo, index) => {
      selected[index] = true
    })
    this.setState({ selected })
  }

  deleteSelection () {
    Alert.alert(
      translate.deletePhotos,
      translate.deletePhotosDescription,
      [
        {text: translate.cancel, style: 'cancel'},
        {text: translate.yes,
          onPress: () => {
            const { settings: { photos }, deleteSelection } = this.props
            const { selected } = this.state
            deleteSelection(photos, selected)
            this.setState({ selected: {} })
          }}
      ]
    )
  }

  selectDelete (index) {
    const { selected } = this.state
    if (selected[index]) {
      selected[index] = false
    } else {
      selected[index] = true
    }
    this.setState({ selected })
  }

  toggleMode () {
    const { deleteMode } = this.state
    this.setState({ deleteMode: !deleteMode, style: { display: 'none' } })
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
  deletePhoto: (photos, index) => dispatch(deletePhoto(photos, index)),
  deleteSelection: (photos, selection) => dispatch(deleteSelectedPhotos(photos, selection))
})

const mapStateToProp = ({ user, settings }) => ({
  user,
  settings
})

export default connect(mapStateToProp, mapDispatchToProps)(UploadPhotos)
