import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { black, primary } from '../../colorPalette'
import RF from '../../utils/responsiveFont'

const isIOS = Platform.OS === 'ios'

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
    borderColor: black,
    marginTop: 10,
    backgroundColor: primary,
    borderRadius: 10
  },
  titleStyle: {
    color: black
  },
  buttonContainerStyle: {
    width: '60%',
    alignSelf: 'center',
    marginTop: 'auto',
    backgroundColor: !isIOS ? 'transparent' : undefined,
    paddingBottom: 10
  },
  iconContainerStyle: {
    height: 120
  },
  keyboardScrollViewContentStyle: {
    flex: 1,
    alignItems: 'center'
  },
  editIconStyle: {
    position: 'absolute',
    right: -10,
    top: 12
  }
}

export const Label = styled.Text`
  font-size: ${RF(2.5)};
  font-weight: 500;
`

export const InfoContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-horizontal: 20px;
  padding-vertical: 15px;
`

export const CircleImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: ${isIOS ? '60px' : '80px'};
  ${isIOS && 'border-color: #000'};
  ${isIOS && 'border-width: 1px'};
`

export const ImageContainer = styled.TouchableOpacity`
  padding-top: 15;
  align-items: center;
`

export const FlexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const InputContainer = styled.View`
  width: ${({width}) => width ? `${width}%` : '60%'};
  margin-bottom: 20px;
`
