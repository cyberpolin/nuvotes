import styled from 'styled-components/native'

export const Container = styled.ScrollView.attrs({
  bounces: false,
  contentContainerStyle: {
    alignItems: 'center',
    paddingVertical: 15
  }
})`
`

export const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
