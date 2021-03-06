import React, { Component } from 'react'
import {
  ScrollView,
  Alert,
  Platform,
  AppState
} from 'react-native'
import { connect } from 'react-redux'
import {
  Button,
  Icon,
  CheckBox
} from 'react-native-elements'
import ImageView from 'react-native-image-view'
import Config from 'react-native-config'
import BackgroundUpload from 'react-native-background-upload'
import { showMessage } from 'react-native-flash-message'
import {
  Container,
  ImagesContainer,
  ImageBox,
  styles,
  Photo,
  ButtonsBar,
  Flex,
  CenterContainer,
  PhotoButtonContainer,
  DeleteButtonBar,
  DeleteButtonContainer,
  Touchable,
  MessageContainer,
  MessageText
} from './styled'
import { Camera } from '../index'
import { SafeArea } from '../../components'
import { translate } from '../../helpers/localization'
import {
  uploadPhotos,
  getOrders
} from '../../helpers/orders'
import { getMessage } from '../../helpers/messages'
import {
  changeUploading,
  toggleCamera,
  deleteSelectedPhotos,
  deletePhoto,
  setOrderNumber
} from '../../actions/settings'
import {
  primary,
  secondary
} from '../../colorPalette'

const { URL } = Config
const isAndroid = Platform.OS === 'android'

class UploadPhotos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewerVisible: false,
      selectedIndex: 0,
      totalPhotos: 0,
      completed: 1,
      deleteMode: false,
      selected: {},
      orderNumber: 0,
      appState: AppState.currentState
    }
    this.handleBackgroundSave = this.handleBackgroundSave.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.deleteSelection = this.deleteSelection.bind(this)
    this.closeViewer = this.closeViewer.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.openViewer = this.openViewer.bind(this)
    this.toggleMode = this.toggleMode.bind(this)
    this.selectAll = this.selectAll.bind(this)
  }

  componentDidMount () {
    AppState.addEventListener('change', this.handleStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleStateChange)
  }

  render () {
    const { viewerVisible, selectedIndex, deleteMode, selected } = this.state
    const { navigation } = this.props
    const { isUploading, photos, photosForOrder } = this.props.settings
    const descriptionJob = navigation.getParam('descriptionJob', '')
    const order = navigation.getParam('order', {})
    const { id, number } = order
    const haveSelection = Object.values(selected).includes(true)
    const enableButtons = photosForOrder === '' || photosForOrder === number
    return (
      <SafeArea color={deleteMode ? 'crimson' : primary}>
        <Container>
          {photos && photos.length > 0 && enableButtons
            ? <ScrollView
              bounces={false}
              contentContainerStyle={styles.scrollViewContainer}
              showsVerticalScrollIndicator={false}
            >
              <ImagesContainer>
                {this.renderImages()}
              </ImagesContainer>
            </ScrollView>
            : !enableButtons && <MessageContainer>
              <MessageText>{translate.pendingPhotos}:</MessageText>
              <MessageText style={{ fontWeight: '600' }}>{photosForOrder}</MessageText>
            </MessageContainer>
          }
          <Camera
            type={descriptionJob.description}
            order={order}
          />
          {photos && photos.length > 0 &&
            <ImageView
              isVisible={viewerVisible}
              imageIndex={selectedIndex}
              onClose={this.closeViewer}
              animationType='fade'
              images={photos}
            />
          }
          {deleteMode
            ? <DeleteButtonBar>
              <Flex>
                <Button
                  buttonStyle={{...styles.buttonStyle, ...styles.leftButtonStyle}}
                  titleStyle={styles.buttonTitle}
                  type='outline'
                  title={translate.cancel}
                  onPress={this.toggleMode}
                />
              </Flex>
              <Flex>
                <Button
                  buttonStyle={{...styles.buttonStyle, ...styles.rightButtonStyle}}
                  titleStyle={styles.buttonTitle}
                  type='outline'
                  title={translate.selectAll}
                  onPress={this.selectAll}
                />
              </Flex>
              <CenterContainer>
                <DeleteButtonContainer>
                  <Touchable
                    onPress={this.deleteSelection}
                    disabled={!haveSelection}
                  >
                    <Icon
                      type='font-awesome'
                      name='trash'
                      underlayColor='transparent'
                      size={30}
                      color={haveSelection ? 'black' : 'gray'}
                    />
                  </Touchable>
                </DeleteButtonContainer>
              </CenterContainer>
            </DeleteButtonBar>
            : <ButtonsBar>
              <Flex>
                <Button
                  buttonStyle={{...styles.buttonStyle, ...styles.leftButtonStyle}}
                  titleStyle={styles.buttonTitle}
                  type='outline'
                  title={translate.delete}
                  onPress={this.toggleMode}
                  disabled={!enableButtons || isUploading || photos.length === 0}
                  loadingProps={{color: secondary}}
                  disabledTitleStyle={styles.disabledText}
                  disabledStyle={styles.disabledStyle}
                />
              </Flex>
              <Flex>
                <Button
                  buttonStyle={{...styles.buttonStyle, ...styles.rightButtonStyle}}
                  titleStyle={styles.buttonTitle}
                  type='outline'
                  title={translate.save}
                  onPress={() => this.handleBackgroundSave(id)}
                  disabled={!enableButtons || isUploading || photos.length === 0}
                  loadingProps={{color: secondary}}
                  disabledTitleStyle={styles.disabledText}
                  disabledStyle={styles.disabledStyle}
                />
              </Flex>
              <CenterContainer>
                <PhotoButtonContainer>
                  <Touchable
                    onPress={this.openCamera}
                    disabled={!enableButtons}
                  >
                    <Icon
                      type='font-awesome'
                      name='camera'
                      underlayColor='transparent'
                      color={enableButtons ? 'black' : 'gray'}
                      size={30}
                    />
                  </Touchable>
                </PhotoButtonContainer>
              </CenterContainer>
            </ButtonsBar>}
        </Container>
      </SafeArea>
    )
  }

  handleBackgroundSave (orderId) {
    const { totalPhotos, completed, orderNumber, appState } = this.state
    const { photos, isUploading } = this.props.settings
    const {
      user,
      deletePhoto,
      changeUploading,
      navigation,
      user: { id, token },
      getOrders,
      setOrderNumber
    } = this.props
    if (orderNumber === 0) {
      this.setState({ orderNumber: orderId })
    }
    if (totalPhotos === 0) {
      this.setState({ totalPhotos: photos.length })
    }
    if (!isUploading && appState === 'active') {
      changeUploading(true)
      const message = getMessage('START_UPLOAD')
      showMessage(message)
    }
    if (appState === 'background') {
      changeUploading(false)
      const message = getMessage('WENT_BACKGROUND')
      showMessage(message)
    }
    if (photos.length > 0) {
      const toUpload = photos[0]
      toUpload['uri'] = toUpload['uri'].replace('file://', '')
      const options = {
        url: `${URL}single-photo-upload/`,
        path: toUpload['uri'],
        method: 'POST',
        type: 'multipart',
        field: 'photo',
        headers: {
          Authorization: `Token ${user.token}`,
          'photo-type': toUpload.type,
          'order-id': orderNumber === 0 ? isAndroid ? String(orderId) : orderId : isAndroid ? String(orderNumber) : orderNumber
        }
      }
      const messageOptions = {
        message: translate.uploadMessage,
        description: `${completed}/${totalPhotos === 0 ? photos.length : totalPhotos} ${translate.uploadDescription}`,
        type: 'success',
        autoHide: false
      }
      var timer = setInterval(() => {
        changeUploading(false)
        const message = getMessage('STOPPED_UPLOAD')
        showMessage(message)
      }, 30000)
      BackgroundUpload.startUpload(options).then(uploadId => {
        BackgroundUpload.addListener('error', uploadId, data => {
          clearTimeout(timer)
          if (data.responseCode === 200) {
            const totalCompleted = completed + 1
            this.setState({ completed: totalCompleted })
            deletePhoto(photos, 0)
            showMessage(messageOptions)
            if (photos.length > 0) {
              this.handleBackgroundSave()
            } else {
              setOrderNumber('')
              changeUploading(false)
              this.setState({
                totalPhotos: 0,
                completed: 1
              })
              const message = getMessage('SUCCESS_UPLOAD')
              showMessage(message)
              setTimeout(() => {
                navigation.navigate({
                  routeName: 'Orders',
                  action: getOrders(token, id)
                })
              }, 1000)
            }
          } else {
            const message = getMessage('UPLOAD_ERROR')
            showMessage(message)
          }
        })
        BackgroundUpload.addListener('completed', uploadId, data => {
          clearTimeout(timer)
          const totalCompleted = completed + 1
          this.setState({ completed: totalCompleted })
          deletePhoto(photos, 0)
          this.handleBackgroundSave()
          if (photos.length > 0) {
            showMessage(messageOptions)
          } else {
            setOrderNumber('')
            changeUploading(false)
            this.setState({
              totalPhotos: 0,
              completed: 1
            })
            const message = getMessage('SUCCESS_UPLOAD')
            showMessage(message)
            setTimeout(() => {
              navigation.navigate({
                routeName: 'Orders',
                action: getOrders(token, id)
              })
            }, 1000)
          }
        })
      })
    }
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
          {deleteMode &&
            <CheckBox
              containerStyle={styles.checkboxContainer}
              checked={selected[index]}
              onPress={() => this.selectDelete(index)}
              checkedColor='red'
            />}
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
    if (deleteMode) {
      this.setState({ selected: {} })
    }
    this.setState({ deleteMode: !deleteMode })
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

  handleStateChange (state) {
    this.setState({ appState: state })
  }
}

const mapDispatchToProps = dispatch => ({
  uploadPhotos: (token, photos, orderId) => dispatch(uploadPhotos(token, photos, orderId)),
  changeUploading: isUploading => dispatch(changeUploading(isUploading)),
  toggleCamera: isOpen => dispatch(toggleCamera(isOpen)),
  deleteSelection: (photos, selection) => dispatch(deleteSelectedPhotos(photos, selection)),
  deletePhoto: (photos, index) => dispatch(deletePhoto(photos, index)),
  getOrders: (token, userId) => dispatch(getOrders(token, userId)),
  setOrderNumber: orderNumber => dispatch(setOrderNumber(orderNumber))
})

const mapStateToProp = ({ user, settings }) => ({
  user,
  settings
})

export default connect(mapStateToProp, mapDispatchToProps)(UploadPhotos)
