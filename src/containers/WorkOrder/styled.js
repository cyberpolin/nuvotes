import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { Image } from 'react-native-elements'
import { isIphoneX } from 'react-native-iphone-x-helper'
import responsiveFont from '../../utils/responsiveFont'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from '../../utils/layout'

const isIOS = Platform.OS === 'ios'

export const styles = {
  buttonTitle: {
    color: '#000'
  },
  buttonStyle: {
    borderColor: '#000',
    alignSelf: 'center',
    width: '100%',
    height: 50,
    marginBottom: isIphoneX() && isIOS ? 40 : 20
  },
  iconContainerStyle: {
    marginLeft: 10
  },
  overlayStyle: {
    padding: 26,
    borderRadius: 20
  }
}

export const Container = styled.View`
  flex: 1;
`

export const ScrollContainer = styled.ScrollView.attrs({
  bounces: false
})`
`

export const PhotoContainer = styled.View`
  padding-vertical: ${hp(3)};
  height: ${hp(28)};
`

export const Photo = styled(Image)`
  width: 100%;
  height: 100%;
`

export const InfoContainer = styled.View`
  padding-horizontal: ${wp(5)};
`

export const Label = styled.Text`
  font-size: ${responsiveFont(2.5)};
  margin-bottom: ${hp(0.7)};
`

export const FlexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${hp(2)};
`

export const Row = styled.View`
  margin-bottom: ${hp(2)};
`

export const GalleryButton = styled.TouchableOpacity`
  align-self: flex-start;
  padding: 5px 10px 5px 0;
  margin-vertical: 5px;
  flex-direction: row;
  align-items: center;
`

export const ButtonContainer = styled.View`
  width: 65%;
  align-self: center;
`
