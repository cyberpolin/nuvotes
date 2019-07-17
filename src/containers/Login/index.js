import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import {
  Input,
  Button
} from 'react-native-elements'
import { connect } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import _ from 'lodash'
import { Loading } from '../../components'
import { translate } from '../../helpers/localization'
import { getLogin } from '../../helpers/user'
import { getMessage } from '../../helpers/messages'
import { getOrders } from '../../helpers/orders'
import { getSearch } from '../../actions/search'
import {
  toggleCamera,
  cleanPhotos,
  resetSettings
} from '../../actions/settings'
import {
  Container,
  LoginBox,
  AvoidingView,
  LogoContainer,
  Logo,
  Background,
  styles
} from './styled'
import Assets from '../../assets/img'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }

  componentWillMount () {
    const {
      user,
      navigation,
      getOrders,
      getSearch,
      toggleCamera,
      resetSettings
    } = this.props
    // Clears app cache, like temporal photos.
    // Clean photos reducer, and reset the settings reducer to default values.
    toggleCamera(false)
    resetSettings()
    // If there's an user info in the reducer, moves to Home screen.
    if (!_.isEmpty(user)) {
      const { id, token } = user
      navigation.navigate('Home')
      getSearch('')
      getOrders(token, id)
    }
  }

  render () {
    const { isLoading } = this.props.settings
    return (
      <Container>
        <AvoidingView behavior='padding'>
          <Background source={Assets.tools3}>
            <LogoContainer>
              <Logo
                resizeMode='contain'
                source={Assets.logo2}
              />
            </LogoContainer>
            <LoginBox>
              <Input
                placeholder={translate.userName}
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.inputStyle}
                onSubmitEditing={() => this.passwordRef.input.focus()}
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={(value) => this.onChangeText(value, 'username')}
                blurOnSubmit={false}
              />
              <Input
                placeholder={translate.password}
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.inputStyle}
                ref={refs => {
                  this.passwordRef = refs
                }}
                onSubmitEditing={this.handleLogin}
                secureTextEntry
                onChangeText={(value) => this.onChangeText(value, 'password')}
                autoCapitalize='none'
              />
              <Button
                title={translate.signIn}
                titleStyle={styles.buttonTitle}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                onPress={this.handleLogin}
              />
            </LoginBox>
          </Background>
          {isLoading && <Loading />}
        </AvoidingView>
      </Container>
    )
  }

  onChangeText (value, field) {
    const { state } = this
    state[field] = value
    this.setState(state)
  }

  handleLogin () {
    const { navigation, getLogin } = this.props
    const { username, password } = this.state
    if (username === '' || password === '') {
      const message = getMessage('EMPTY_FIELDS')
      showMessage(message)
    } else {
      Keyboard.dismiss()
      getLogin(username, password, navigation)
    }
  }
}

const mapStateToProps = ({ settings, user }) => ({
  settings,
  user
})

const mapDispatchToProps = dispatch => ({
  getLogin: (username, password, navigation) => dispatch(getLogin(username, password, navigation)),
  getOrders: (token, userId) => dispatch(getOrders(token, userId)),
  getSearch: search => dispatch(getSearch(search)),
  toggleCamera: isOpen => dispatch(toggleCamera(isOpen)),
  cleanPhotos: () => dispatch(cleanPhotos()),
  resetSettings: () => dispatch(resetSettings())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
