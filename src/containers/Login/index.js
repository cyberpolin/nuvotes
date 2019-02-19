import React, { Component } from 'react'
import {
  Input,
  Button
} from 'react-native-elements'
import {
  Container,
  LoginBox,
  AvoidingView,
  Title,
  styles
} from './styled'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }
  render () {
    return (
      <Container>
        <AvoidingView
          behavior='padding'
        >
          <Title h2>Nuvote WOMS</Title>
          <LoginBox>
            <Input
              placeholder='Username'
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              onSubmitEditing={() => this.passwordRef.input.focus()}
              autoCorrect={false}
              autoCapitalize='none'
            />
            <Input
              placeholder='Password'
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              ref={refs => {
                this.passwordRef = refs
              }}
              onSubmitEditing={this.handleLogin}
              secureTextEntry
            />
            <Button
              title='Sign In'
              type='outline'
              titleStyle={styles.buttonTitle}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              onPress={this.handleLogin}
            />
          </LoginBox>
        </AvoidingView>
      </Container>
    )
  }

  handleLogin () {
    const { navigation } = this.props
    navigation.navigate('Home')
  }
}
