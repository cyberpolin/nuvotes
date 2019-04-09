import styled from 'styled-components'

export const styles = {
  iconStyle: {
    padding: 10
  }
}

export const ScrollContainer = styled.ScrollView.attrs({
  bounces: false
})`
  flex: 1;
  width: 100%;
`

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const FlexRow = styled.View`
  flex-direction: row;
`
