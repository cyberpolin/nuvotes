import { Platform } from 'react-native'
import { Header } from 'react-navigation'
import styled from 'styled-components/native'
import palette from '../../colorPalette'

const isIOS = Platform.OS === 'ios'

export const styles = {
  iconMargin: {
    marginRight: 3
  },
  searchContainer: {
    width: '70%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 0
  },
  searchInput: {
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginTop: !isIOS ? 5 : 0
  },
  searchInputContainer: {
    backgroundColor: 'transparent'
  }
}

export const DrawerIconButton = styled.TouchableOpacity`
  padding: 10px;
`

export const HeaderContainer = styled.View`
  height: ${Header.HEIGHT};
  background-color: ${palette.white};
  ${isIOS && 'padding-top: 18px'};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  shadow-opacity: 1;
  shadow-offset: 0 0;
  shadow-color: ${palette.black};
  shadow-radius: 1px;
`

export const HeaderTitle = styled.Text`
  font-size: ${isIOS ? '17px' : '20px'};
  font-weight: ${isIOS ? '600' : '500'};
  color: ${palette.black};
  text-align: center;
`

export const SearchButton = styled(DrawerIconButton)`
  padding-left: 5px;
  flex-direction: row;
  align-items: center;
`
