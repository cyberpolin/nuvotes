import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Icon,
  Input,
  Button
} from 'react-native-elements'
import _ from 'lodash'
import { Loading } from '../../components'
import {
  Label,
  CircleImage,
  FlexRow,
  InputContainer,
  InfoContainer,
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
    const { address, first_name, last_name, email, state } = props.user
    this.state = {
      image: '',
      first_name,
      last_name,
      address,
      email,
      state,
      password: '',
      updates: {}
    }
    this.onChangeText = this.onChangeText.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
  render () {
    const { first_name, last_name, state, address, email, password, updates } = this.state
    const { isLoading } = this.props.settings
    return (
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.keyboardScrollViewContentStyle}
        keyboardShouldPersistTaps='always'
        keyboardDismissMode='on-drag'
      >
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
                value={first_name}
                onChangeText={value => this.onChangeText(value, 'first_name')}
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
                value={last_name}
                onChangeText={value => this.onChangeText(value, 'last_name')}
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
            disabled={_.isEmpty(updates)}
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
    Object.keys(updates).map(field => {
      if (updates[field] === '' || updates[field] === user[field]) {
        updates = _.omit(updates, [field])
      }
    })
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
      editUserData(user.token, updates, navigation)
    }
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
