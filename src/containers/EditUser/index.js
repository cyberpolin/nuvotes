import React, { Component } from 'react'
import {
  Keyboard,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-picker'
import {
  Icon,
  Input,
  Button
} from 'react-native-elements'
import _ from 'lodash'
import { Loading } from '../../components'
import {
  Label,
  ImageContainer,
  CircleImage,
  InfoContainer,
  FlexRow,
  InputContainer,
  styles
} from './styled'
import { translate } from '../../helpers/localization'
import {
  editUserData,
  invalidPassword,
  validEmail
} from '../../helpers/user'
import { getMessage } from '../../helpers/messages'

class EditUser extends Component {
  constructor (props) {
    super(props)
    const { address, first_name: firstName, last_name: lastName, email, state } = props.user
    this.state = {
      image: '',
      firstName,
      lastName,
      address,
      email,
      state,
      password: '',
      updates: {}
    }
    this.showImagePicker = this.showImagePicker.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
  render () {
    const { firstName, lastName, state, address, email, password } = this.state
    const { isLoading } = this.props.settings
    return (
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.keyboardScrollViewContentStyle}
        keyboardShouldPersistTaps='always'
        keyboardDismissMode='on-drag'
      >
        <ImageContainer onPress={this.showImagePicker}>
          {this.renderAvatar()}
          <Icon
            type='font-awesome'
            name='edit'
            containerStyle={styles.editIconStyle}
          />
        </ImageContainer>
        <InfoContainer>
          <FlexRow>
            <InputContainer width={40}>
              <Label>{translate.firstName}:</Label>
              <Input
                containerStyle={styles.containerStyle}
                autoCorrect={false}
                autoCapitalize='none'
                inputStyle={styles.inputStyle}
                blurOnSubmit={false}
                onSubmitEditing={() => this.lastName.input.focus()}
                value={firstName}
                onChangeText={value => this.onChangeText(value, 'firstName')}
              />
            </InputContainer>
            <InputContainer width={40}>
              <Label >{translate.lastName}:</Label>
              <Input
                containerStyle={styles.containerStyle}
                autoCorrect={false}
                autoCapitalize='none'
                inputStyle={styles.inputStyle}
                blurOnSubmit={false}
                ref={refs => {
                  this.lastName = refs
                }}
                onSubmitEditing={() => this.stateInput.input.focus()}
                value={lastName}
                onChangeText={value => this.onChangeText(value, 'lastName')}
              />
            </InputContainer>
          </FlexRow>
          <InputContainer>
            <Label>{translate.state}:</Label>
            <Input
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              autoCapitalize='none'
              inputStyle={styles.inputStyle}
              blurOnSubmit={false}
              ref={refs => {
                this.stateInput = refs
              }}
              onSubmitEditing={() => this.address.input.focus()}
              value={state}
              onChangeText={value => this.onChangeText(value, 'state')}
            />
          </InputContainer>
          <InputContainer>
            <Label>{translate.address}:</Label>
            <Input
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              autoCapitalize='none'
              inputStyle={styles.inputStyle}
              blurOnSubmit={false}
              ref={refs => {
                this.address = refs
              }}
              onSubmitEditing={() => this.email.input.focus()}
              value={address}
              onChangeText={value => this.onChangeText(value, 'address')}
            />
          </InputContainer>
          <InputContainer>
            <Label>{translate.email}:</Label>
            <Input
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              autoCapitalize='none'
              inputStyle={styles.inputStyle}
              blurOnSubmit={false}
              ref={refs => {
                this.email = refs
              }}
              onSubmitEditing={() => this.password.input.focus()}
              value={email}
              onChangeText={value => this.onChangeText(value, 'email')}
            />
          </InputContainer>
          <InputContainer>
            <Label>{translate.password}:</Label>
            <Input
              containerStyle={styles.containerStyle}
              secureTextEntry
              inputStyle={styles.inputStyle}
              onSubmitEditing={Keyboard.dismiss}
              ref={refs => {
                this.password = refs
              }}
              value={password}
              onChangeText={value => this.onChangeText(value, 'password')}
            />
          </InputContainer>
          <Button
            title={translate.save}
            icon={{
              type: 'font-awesome',
              name: 'save'
            }}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            containerStyle={styles.buttonContainerStyle}
            onPress={this.handleSave}
          />
        </InfoContainer>
        {isLoading && <Loading />}
      </KeyboardAwareScrollView>
    )
  }

  renderAvatar () {
    const { image } = this.state
    const { user } = this.props
    if (image !== '') {
      return <CircleImage source={{uri: image}} />
    }
    if (user && user.avatar) {
      return <CircleImage
        resizeMode='contain'
        source={{uri: user.avatar}}
      />
    }
    return <Icon
      name='user-circle'
      type='font-awesome'
      size={120}
      containerStyle={styles.iconContainerStyle}
    />
  }

  onChangeText (value, field) {
    const { state } = this
    const { updates } = this.state
    state[field] = value
    updates[field] = value
    this.setState({...state, updates})
  }

  handleSave () {
    let { updates } = this.state
    const { editUserData, user, navigation } = this.props
    const { password, email } = updates
    if (!_.isEmpty(updates)) {
      if (password && password.length < 8) {
        const message = getMessage('SHORT_PASSWORD')
        showMessage(message)
      } else if (password && invalidPassword(password)) {
        const message = getMessage('NUMERIC_PASSWORD')
        showMessage(message)
      } else if (email && !validEmail(email)) {
        const message = getMessage('INVALID_EMAIL')
        showMessage(message)
      } else {
        if (password === '') {
          updates = _.omit(updates, ['password'])
        }
        if (email === '') {
          updates = _.omit(updates, ['email'])
        }
        editUserData(user.token, updates, navigation)
      }
    }
  }

  showImagePicker () {
    const options = {
      title: translate.selectAvatar,
      takePhotoButtonTitle: `${translate.takePhoto}...`,
      chooseFromLibraryButtonTitle: `${translate.chooseGallery}...`,
      cancelButtonTitle: translate.cancel
    }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        Alert.alert(translate.uploadError)
      } else {
        const { uri } = response
        this.setState({image: uri})
      }
    })
  }
}

const mapStateToProps = ({ user, settings }) => ({
  user,
  settings
})

const mapDispatchToProps = dispatch => ({
  editUserData: (token, updates, navigation) => dispatch(editUserData(token, updates, navigation))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
