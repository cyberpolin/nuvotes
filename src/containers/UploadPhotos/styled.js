import styled from 'styled-components/native'
import {
  black,
  primary,
  white
} from '../../colorPalette'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from '../../utils/layout'
import RF from '../../utils/responsiveFont'

export const styles = {
  buttonStyle: {
    height: '100%',
    width: '80%',
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  rightButtonStyle: {
    alignSelf: 'flex-end'
  },
  leftButtonStyle: {
    alignSelf: 'flex-start'
  },
  buttonTitle: {
    color: black,
    fontSize: 15
  },
  marginButton: {
    marginBottom: 15
  },
  scrollViewContainer: {
    flexDirection: 'row'
  },
  badgeStyle: {
    position: 'absolute',
    right: 2,
    top: 0
  },
  badgeContainer: {
    height: 22,
    width: 22
  },
  disabledStyle: {
    backgroundColor: 'transparent'
  },
  disabledText: {
    color: 'gray'
  },
  checkboxContainer: {
    position: 'absolute',
    top: 0,
    right: -10,
    padding: 0,
    margin: 0,
    width: 20
  },
  iconContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: primary,
    width: 60,
    height: 60,
    justifyContent: 'center',
    borderRadius: 30
  }
}

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${primary};
`

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-top: 5px;
  background-color: ${white};
`

export const ImagesContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-horizontal: 5px;
`

export const ImageBox = styled.TouchableOpacity`
  flex-basis: 49%;
`

export const Photo = styled.Image`
  width: 100%;
  height: ${hp(28)};
  margin-bottom: 5px;
`

export const ButtonsBar = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: ${primary};
  height: 45px;
`

export const Flex = styled.View`
  flex: ${({ flex }) => flex || '1'};
`

export const PhotoButtonContainer = styled.View`
  background-color: ${primary};
  position: absolute;
  bottom: 10;
  width: 76px;
  height: 76px;
  right: ${wp(39.5)}
  justify-content: center;
  border-color: ${white};
  border-width: 6px;
  border-radius: 38px;
`

export const DeleteButtonContainer = styled(PhotoButtonContainer)`
  background-color: crimson;
  position: absolute;
`

export const CenterContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

export const Touchable = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  justify-content: center;
  border-radius: 38px;
`

export const DeleteButtonBar = styled(ButtonsBar)`
  background-color: crimson;
  width: ${wp(100)};
`

export const MessageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 80%;
`

export const MessageText = styled.Text`
  font-size: ${RF(2.5)};
  text-align: center;
`
