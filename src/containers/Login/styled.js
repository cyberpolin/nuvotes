import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { Text } from 'react-native-elements'
import {
  white,
  black,
  primary
} from '../../colorPalette'

const isAndroid = Platform.OS === 'android'

export const styles = {
  inputContainer: {
    backgroundColor: 'rgba(255,255,255, .7)',
    borderRadius: 15,
    paddingHorizontal: '5%'
  },
  inputStyle: {
    marginBottom: 20
  },
  buttonTitle: {
    color: black
  },
  buttonContainer: {
    width: '95%',
    backgroundColor: isAndroid ? 'transparent' : undefined,
    paddingBottom: 10
  },
  buttonStyle: {
    borderColor: black,
    marginTop: 10,
    backgroundColor: primary,
    borderRadius: 10
  }
}

export const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${white}
`

export const LoginBox = styled.View`
  height: 250px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 8%;
`

export const AvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
  align-content: center;
  justify-content: center;
`

export const Title = styled(Text)`
  margin-bottom: 30px;
  align-self: center;
`

export const LogoContainer = styled.View`
 height: 100px;
 width: 80%;
 align-self: center;
 margin-bottom: 25px;
 background-color: rgba(255,255,255, .7);
 border-radius: 15px;
`

export const Logo = styled.Image`
  width: 100%;
  height: 100%;
`

export const Background = styled.ImageBackground`
  height: 100%;
  width: 100%;
  justify-content: center;ß
`
