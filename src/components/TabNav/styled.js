import styled from 'styled-components/native'

export const IconContainer = {
  paddingHorizontal: 20
}

export const Title = styled.Text`
  color: ${({color}) => color};
  align-self: center;
  text-align: center;
  ${({isPending}) => isPending && 'width: 200%;'};
`
