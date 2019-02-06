import styled from 'styled-components'

export const Container = styled.TouchableOpacity`
  background-color: white;
  width: 85%;
  border-radius: 12px;
  padding: 10px 15px;
  border: 1px solid #FFF;
  margin-bottom: 10px;
`

export const FlexRow = styled.View`
  flex-direction: row;
`

export const MiddleBox = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`

export const SmallText = styled.Text`
  font-size: 10px;
  ${({marginRight}) => marginRight && 'margin-right: 10px'};
`

export const Text = styled.Text`
  ${({marginRight}) => marginRight && 'margin-right: 10px'};
`
