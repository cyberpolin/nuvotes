import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Options = styled.View`
  position: absolute;
  width: 100%
  bottom: 0;
  background-color: transparent;
  flex-direction: row;
  justify-content: center;
`

export const IconContainer = styled.View`
  flex: 1;
  background-color: transparent;
  ${({ alignLeft }) => alignLeft && `
    justify-content: flex-start;
    flex-direction: row;
  `}
`
