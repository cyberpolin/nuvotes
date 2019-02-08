import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 8%;
  padding-top: 5%;
`

export const DrawerItem = styled.TouchableOpacity`
  flex-direction: row;
  ${({noFlex}) => !noFlex && 'flex: 1'};
  align-items: center;
`

export const DrawerTop = styled.View`
  flex: 3;
`

export const DrawerBottom = styled.View`
  flex: 1;
`

export const ItemText = styled.Text`
  font-size: 18px;
  margin-left: 10px;
`
