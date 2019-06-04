import { Platform } from 'react-native'
import { Header } from 'react-navigation'
import styled from 'styled-components/native'
import {
  white,
  black,
  gray
} from '../../colorPalette'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from '../../utils/layout'
import responsiveFont from '../../utils/responsiveFont'
import { isIphoneX } from 'react-native-iphone-x-helper'

const isIOS = Platform.OS === 'ios'

export const styles = {
  iconMargin: {
    marginRight: 3
  },
  searchContainer: {
    alignItems: 'center',
    paddingTop: isIOS ? 4 : 0,
    paddingBottom: 0,
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  searchInput: {
    borderWidth: 0.5,
    borderRadius: 20,
    paddingRight: 10,
    paddingLeft: 20,
    marginTop: 0,
    fontSize: responsiveFont(2),
    minHeight: hp(4),
    height: !isIOS ? hp(4) : undefined,
    paddingVertical: 0
  },
  searchInputContainer: {
    backgroundColor: 'transparent'
  }
}

export const DrawerIconButton = styled.TouchableOpacity`
  padding: 10px;
`

export const HeaderContainer = styled.View`
  height: ${isIOS && isIphoneX() ? Header.HEIGHT + 24 : Header.HEIGHT};
  background-color: ${white};
  ${isIphoneX() ? 'padding-top: 40px' : isIOS && 'padding-top: 18px'};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  shadow-opacity: 1;
  shadow-offset: 0 0;
  shadow-color: ${black};
  shadow-radius: 1px;
  elevation: 3;
`

export const HeaderTitle = styled.Text`
  font-size: ${isIOS ? '17px' : '20px'};
  font-weight: ${isIOS ? '600' : '500'};
  color: ${gray};
  text-align: center;
`

export const SearchButton = styled(DrawerIconButton)`
  padding-left: 5px;
  flex-direction: row;
  align-items: center;
`

export const ButtonContainer = styled.TouchableOpacity`
  padding: 10px 15px 10px 10px;
`

export const EditTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
`

export const EmptyBox = styled.View`
  width: ${wp(11)};
`
