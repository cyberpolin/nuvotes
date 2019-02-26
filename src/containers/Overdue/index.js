import React, { Component } from 'react'
import { Button } from 'react-native'
import {
  Container,
  Text
} from './styled'

export default class Overdue extends Component {
  render () {
    return (
      <Container>
        <Text>OVERDUE SCREEN</Text>
        <Button
          title='CLICK!'
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </Container>
    )
  }
}
