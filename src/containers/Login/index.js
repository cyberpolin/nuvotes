import React, { Component } from 'react'
import { Keyboard } from 'react-native'
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
  styles
} from './styled'
import Assets from '../../assets/img'

export default class Login extends Component {
  render () {
    const { navigation } = this.props
    return (
      <Container>
        <AvoidingView behavior='padding'>
          <LogoContainer>
            <Logo
              resizeMode='contain'
              source={Assets.logo}
            />
          </LogoContainer>
          <LoginBox>
            <Input
              placeholder={translate.userName}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              onSubmitEditing={() => this.passwordRef.input.focus()}
              autoCorrect={false}
              autoCapitalize='none'
            />
            <Input
              placeholder={translate.password}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              ref={refs => {
                this.passwordRef = refs
              }}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry
            />
            <Button
              title={translate.signIn}
              type='outline'
              titleStyle={styles.buttonTitle}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              onPress={() => navigation.navigate('Home')}
            />
          </LoginBox>
        </AvoidingView>
      </Container>
    )
  }
}
