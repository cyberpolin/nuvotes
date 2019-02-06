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
  Title
} from './styled'
import { black } from '../../colorPalette'

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
              inputContainerStyle={{
                borderColor: black
              }}
              containerStyle={{
                width: '70%',
                marginBottom: 20
              }}
              onSubmitEditing={() => this.passwordRef.input.focus()}
              autoCorrect={false}
              autoCapitalize='none'
            />
            <Input
              placeholder='Password'
              inputContainerStyle={{
                borderColor: black
              }}
              containerStyle={{
                width: '70%',
                marginBottom: 30
              }}
              ref={refs => {
                this.passwordRef = refs
              }}
              onSubmitEditing={() => Keyboard.dismiss()}
              secureTextEntry
            />
            <Button
              title='Sign In'
              type='outline'
              titleStyle={{
                color: black
              }}
              containerStyle={{
                width: '60%'
              }}
              buttonStyle={{
                borderColor: black
              }}
            />
          </LoginBox>
        </AvoidingView>
      </Container>
    )
  }
}
