import styled from 'styled-components/native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from '../../utils/layout'
import responsiveFont from '../../utils/responsiveFont'

export const Container = styled.View`
  flex: 1;
  padding-horizontal: ${wp(8)};
  padding-top: ${hp(2)};
`

export const DrawerItem = styled.TouchableOpacity`
  flex-direction: row;
  ${({noFlex}) => !noFlex && 'flex: 1'};
  align-items: center;
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop}px`};
`

export const DrawerTop = styled.View`
  flex: 3;
`

export const DrawerBottom = styled.View`
  flex: 1;
`

export const ItemText = styled.Text`
  font-size: ${responsiveFont(2.7)};
  margin-left: ${wp(3)};
`
