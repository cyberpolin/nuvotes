import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {
  Input,
  Button
} from 'react-native-elements'
import { translate } from '../../helpers/localization'
import {
  Container,
  LoginBox,
  AvoidingView,
  Title,
  styles
} from './styled'

class Login extends Component {
  render () {
    const { navigation } = this.props
    return (
      <Container>
        <AvoidingView
          behavior='padding'
        >
          <Title h2>Nuvote WOMS</Title>
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
              onSubmitEditing={() => Keyboard.dismiss()}
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

const mapStateToProps = ({language}) => ({
  language
})

export default connect(mapStateToProps, null)(Login)
