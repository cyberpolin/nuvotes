import styled from 'styled-components/native'
import {
  black,
  primary,
  white
} from '../../colorPalette'
import { heightPercentageToDP as hp } from '../../utils/layout'

export const styles = {
  buttonStyle: {
    alignSelf: 'flex-end',
    height: '100%',
    width: '80%',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    borderWidth: 0
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
    backgroundColor: 'lightgray'
  },
  disabledText: {
    color: black
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

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-top: 5px;
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
  justify-content: center;
  border-color: ${white};
  border-width: 8px;
  border-radius: 38px;
`

export const CenterContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

export const DeleteButtonBar = styled.View`
`
