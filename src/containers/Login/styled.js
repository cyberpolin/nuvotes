import styled from 'styled-components/native'
import { white } from '../../colorPalette'

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
  align-content: center;
  justify-content: center;
`
