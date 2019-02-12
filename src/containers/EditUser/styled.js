import { Platform, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { black, white } from '../../colorPalette'

export const styles = {
  inputStyle: {
    fontSize: 14,
    minHeight: 30,
    padding: 0
  },
  containerStyle: {
    paddingHorizontal: 0
  },
  buttonStyle: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: black
  },
  titleStyle: {
    color: black
  },
  buttonContainerStyle: {
    width: '40%',
    alignSelf: 'center',
    marginTop: 'auto'
  },
  iconContainerStyle: {
    height: 150
  },
  keyboardScrollViewContentStyle: {
    flex: 1,
    alignItems: 'center'
  }
}

const isIOS = Platform.OS === 'ios'
const isBigScreen = Dimensions.get('window').height > 680

export const Text = styled.Text`
  margin-bottom: 5%;
`

export const Label = styled.Text`
  font-size: 18px;
`

export const InfoContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 5%;
`

export const CircleImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: ${isIOS ? '60px' : '80px'};
  ${isIOS && 'border-color: #000'};
  ${isIOS && 'border-width: 1px'};
`

export const ImageContainer = styled.View`
  padding-top: 10%;
  ${isBigScreen && 'margin-bottom: 20px'};
`

export const FlexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const InputContainer = styled.View`
  width: ${({width}) => width ? `${width}%` : '60%'};
  margin-bottom: 5%;
`
