import React, { Component } from 'react'
import { Button } from 'react-native'
import {
  Container,
  Text
} from './styled'

export default class Orders extends Component {
  render () {
    return (
      <Container>
        <Text>ORDERS SCREEN</Text>
        <Button
          title='CLICK!'
          onPress={() => this.props.navigation.navigate('InProgress')}
        />
      </Container>
    )
  }
}
