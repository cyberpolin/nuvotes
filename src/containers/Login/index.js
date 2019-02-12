import React, { Component } from 'react'
import { Keyboard } from 'react-native'
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
              onSubmitEditing={() => Keyboard.dismiss()}
              secureTextEntry
            />
            <Button
              title='Sign In'
              type='outline'
              titleStyle={styles.buttonTitle}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
            />
          </LoginBox>
        </AvoidingView>
      </Container>
    )
  }
}
