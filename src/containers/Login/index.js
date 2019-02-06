import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import {
  Text,
  Input,
  Button
} from 'react-native-elements'
import {
  Container,
  LoginBox,
  AvoidingView
} from './styled'
import { black } from '../../colorPalette'

export default class Login extends Component {
  render () {
    return (
      <Container>
        <AvoidingView
          behavior='padding'
        >
          <Text h2
            style={{marginBottom: 30}}
          >
            Nuvote WOMS
          </Text>
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
