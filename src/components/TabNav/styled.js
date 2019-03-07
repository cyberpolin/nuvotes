import styled from 'styled-components/native'
import ResponsiveFont from '../../utils/responsiveFont'

export const IconContainer = {
  paddingHorizontal: 20
}

export const Title = styled.Text`
  color: ${({color}) => color};
  align-self: center;
  text-align: center;
  ${({isPending}) => isPending && 'width: 200%;'};
  font-size: ${ResponsiveFont(2)};
`
