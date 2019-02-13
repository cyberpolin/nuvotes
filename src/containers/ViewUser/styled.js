import { Platform } from 'react-native'
import { Image } from 'react-native-elements'
import styled from 'styled-components/native'

const isIOS = Platform.OS === 'ios'

export const Container = styled.View`
  flex: 1;
  align-items: center;
`

export const InfoContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 5%;
`

export const Label = styled.Text`
  font-size: 18px;
`

export const Text = styled.Text`
  margin-bottom: 20px;
`

export const CircleImage = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  ${isIOS && `border-color: #000`};
  ${isIOS && `border-width: 1px;`};
`

export const ImageContainer = styled.View`
  padding-top: 30px;
`
