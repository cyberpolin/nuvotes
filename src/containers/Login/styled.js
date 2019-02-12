import styled from 'styled-components/native'
import { Text } from 'react-native-elements'
import { white, black } from '../../colorPalette'

export const styles = {
  inputContainerStyle: {
    borderColor: black
  },
  containerStyle: {
    width: '70%',
    marginBottom: 20
  },
  buttonTitle: {
    color: black
  },
  buttonContainer: {
    width: '60%'
  },
  buttonStyle: {
    borderColor: black,
    marginTop: 10
  }
}

export const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: steelblue;
`

export const LoginBox = styled.View`
  background-color: ${white};
  height: 250px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`

export const AvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
  padding-horizontal: 15%;
  align-content: center;
  justify-content: center;
`

export const Title = styled(Text)`
  margin-bottom: 30px;
  align-self: center;
`
