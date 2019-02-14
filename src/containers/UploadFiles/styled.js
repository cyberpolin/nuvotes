import styled from 'styled-components'

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
