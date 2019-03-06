import styled from 'styled-components/native'

export const Container = styled.ScrollView.attrs({
  bounces: false,
  contentContainerStyle: {
    alignItems: 'center'
  }
})`
  width: 100%;
`

export const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const ListItemContainer = {
  width: '100%',
  paddingVertical: 25
}
