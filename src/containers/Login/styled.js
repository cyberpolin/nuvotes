import { Platform } from 'react-native'
import styled from 'styled-components/native'
import {
  white,
  black,
  primary
} from '../../colorPalette'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from '../../utils/layout'

const isAndroid = Platform.OS === 'android'

export const styles = {
  inputContainer: {
    backgroundColor: 'rgba(255,255,255, .7)',
    borderRadius: 15,
    paddingHorizontal: wp(5)
  },
  inputStyle: {
    marginBottom: hp(3)
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
    marginTop: hp(3),
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
  height: ${wp(75)};
  align-items: center;
  justify-content: center;
  padding-horizontal: ${wp(8)};
`

export const AvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
  align-content: center;
  justify-content: center;
`

export const LogoContainer = styled.View`
 height: 100px;
 width: 80%;
 align-self: center;
 margin-bottom: ${hp(3)};
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
  justify-content: center;
`
