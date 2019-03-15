import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Container } from './styled'
import { primary } from '../../colorPalette'

const Loading = () => (
  <Container>
    <ActivityIndicator
      size='large'
      color={primary}
    />
  </Container>
)

export default Loading
