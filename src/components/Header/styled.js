import { Platform } from 'react-native'
import { Header } from 'react-navigation'
import styled from 'styled-components/native'
import {
  white,
  black
} from '../../colorPalette'

const isIOS = Platform.OS === 'ios'

export const styles = {
  iconMargin: {
    marginRight: 3
  },
  searchContainer: {
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 0,
    borderTopWidth: 0,
    backgroundColor: 'transparent'
  },
  searchInput: {
    borderWidth: 0.5,
    borderRadius: 20,
    paddingRight: 10,
    paddingLeft: 20,
    marginTop: !isIOS ? 5 : 0,
    fontSize: 15,
    minHeight: 30
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
  background-color: ${white};
  ${isIOS && 'padding-top: 18px'};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  shadow-opacity: 1;
  shadow-offset: 0 0;
  shadow-color: ${black};
  shadow-radius: 1px;
`

export const HeaderTitle = styled.Text`
  font-size: ${isIOS ? '17px' : '20px'};
  font-weight: ${isIOS ? '600' : '500'};
  color: ${black};
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
