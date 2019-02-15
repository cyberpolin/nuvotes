import React, { Component } from 'react'
import { Button } from 'react-native'
import {
  Container,
  Text
} from './styled'

export default class InProgress extends Component {
  render () {
    return (
      <Container>
        <Text>IN PROGRESS SCREEN</Text>
        <Button
          title='CLICK!'
          onPress={() => this.props.navigation.navigate('Overdue')}
        />
      </Container>
    )
  }
}
