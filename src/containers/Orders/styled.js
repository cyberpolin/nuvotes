import styled from 'styled-components/native'
import responsiveFont from '../../utils/responsiveFont'

export const styles = {
  titleStyle: {
    fontSize: responsiveFont(2.6)
  },
  subtitleStyle: {
    fontSize: responsiveFont(2.3)
  },
  listItemContainer: {
    width: '100%',
    paddingVertical: 25
  }
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
`

export const ScrollViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center'
  },
  showsVerticalScrollIndicator: false
})`
  width: 100%;
`

export const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Text = styled.Text`
  align-self: center;
`
