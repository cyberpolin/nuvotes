import styled from 'styled-components/native'
import {
  black,
  primary
} from '../../colorPalette'
import { heightPercentageToDP as hp } from '../../utils/layout'

export const styles = {
  buttonStyle: {
    alignSelf: 'center',
    height: 36,
    backgroundColor: primary,
    borderWidth: 0,
    borderRadius: 13,
    paddingHorizontal: 15
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
    right: 4,
    top: 0
  },
  disabledStyle: {
    backgroundColor: 'lightgray'
  },
  disabledText: {
    color: black
  }
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-top: 5px;
`

export const FlexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const ButtonsContainer = styled.View`
  justify-content: flex-end;
  margin-bottom: 25px;
  margin-top: 20px;
`

export const ImagesContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-horizontal: 5px;
`

export const ImageBox = styled.View`
  flex-basis: 49%;
`

export const Photo = styled.Image`
  width: 100%;
  height: ${hp(28)};
  margin-bottom: 5px;
`
