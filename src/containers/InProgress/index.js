import React, { Component } from 'react'
import { Text } from 'react-native'
import { OrderCard } from '../../components'
import {
  Container,
  TextContainer
} from './styled'

export default class InProgress extends Component {
  render () {
    return (
      <Container>
        {this.renderOrders()}
      </Container>
    )
  }

  renderOrders () {
    const { navigation, orders } = this.props
    if (orders && orders.length > 0) {
      return orders.map((order, index) => {
        return (
          <OrderCard
            key={index}
            order={order}
            onPress={() => navigation.navigate('WorkOrder')}
          />
        )
      })
    }
    return (
      <TextContainer>
        <Text>There are no orders to show.</Text>
      </TextContainer>
    )
  }
}
