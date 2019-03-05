import React, { Component } from 'react'
import {
  Input,
  Button
} from 'react-native-elements'
import { translate } from '../../helpers/localization'
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

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }
  render () {
    return (
      <Container>
        <AvoidingView behavior='padding'>
          <Background source={Assets.tools}>
            <LogoContainer>
              <Logo
                resizeMode='contain'
                source={Assets.logo}
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
        </AvoidingView>
      </Container>
    )
  }

  handleLogin () {
    const { navigation } = this.props
    navigation.navigate('Home')
  }
}
