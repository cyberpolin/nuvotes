import styled from 'styled-components/native'
import { Image } from 'react-native-elements'

export const Container = styled.ScrollView.attrs({
  bounces: false,
  contentContainerStyle: {
    flex: 1
  }
})`
  flex: 1;
`

export const PhotoContainer = styled.View`
  padding-top: 7%;
  flex: 2;
`

export const Photo = styled(Image)`
  width: 100%;
  height: 100%;
`

export const InfoContainer = styled.View`
  flex: 5;
  padding-horizontal: 5%;
`

export const Label = styled.Text`
  font-size: 17px;
  margin-bottom: 5px;
`

export const FlexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3%;
`

export const Row = styled.View`
  margin-bottom: 3%;
`
