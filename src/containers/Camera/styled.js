import styled from 'styled-components/native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from '../../utils/layout'

export const styles = {
  camera: {
    flex: 1
  },
  backIcon: {
    marginLeft: wp(2)
  }
}

export const Container = styled.View`
  flex: 1;
`

export const Options = styled.View`
  position: absolute;
  width: 100%
  bottom: 0;
  background-color: transparent;
  flex-direction: row;
  justify-content: center;
`

export const IconContainer = styled.View`
  flex: 1;
  background-color: transparent;
  padding-bottom: ${hp(1)};
  ${({ alignLeft }) => alignLeft && `
    justify-content: flex-start;
    flex-direction: row;
  `}
  ${({ alignRight }) => alignRight && `
    justify-content: flex-end;
    flex-direction: row;
  `}
`

export const MessageContainer = styled.TouchableOpacity`
  background-color: #EEA345;
  padding-top: 30px;
  padding-bottom: 10px;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`
