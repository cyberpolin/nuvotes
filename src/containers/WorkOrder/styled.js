import styled from 'styled-components/native'
import { Image } from 'react-native-elements'

export const styles = {
  buttonTitle: {
    color: '#000'
  },
  buttonStyle: {
    borderColor: '#000',
    alignSelf: 'center',
    width: '65%',
    height: 50,
    marginBottom: 20
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
  padding-vertical: 30px;
  height: 230px;
`

export const Photo = styled(Image)`
  width: 100%;
  height: 100%;
`

export const InfoContainer = styled.View`
  padding-horizontal: 5%;
`

export const Label = styled.Text`
  font-size: 17px;
  margin-bottom: 5px;
`

export const FlexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`

export const Row = styled.View`
  margin-bottom: 12px;
`
