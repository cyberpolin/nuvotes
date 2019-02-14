import styled from 'styled-components/native'
import { Image } from 'react-native-elements'

export const styles = {
  buttonTitle: {
    color: '#000',
    fontSize: 15
  },
  buttonStyle: {
    borderColor: '#000',
    alignSelf: 'center',
    height: 36
  },
  marginButton: {
    marginBottom: 15
  },
  scrollViewContainer: {
    flexDirection: 'row'
  },
  deleteIcon: {
    position: 'absolute',
    right: 0,
    top: -3
  }
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`

export const FlexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const ButtonsContainer = styled.View`
  justify-content: flex-end;
  margin-bottom: 30px;
  margin-top: 20px;
`

export const ImagesContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const Thumbnail = styled(Image)`
  height: 70px;
  width: 70px;
  margin-bottom: 7px;
`
