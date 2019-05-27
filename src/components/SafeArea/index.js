import React from 'react'
import styled from 'styled-components/native'

const StyledSafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ color }) => color || 'white'};
`

const SafeArea = ({ color, children }) => (
  <StyledSafeArea color={color}>
    {children}
  </StyledSafeArea>
)

export default SafeArea
