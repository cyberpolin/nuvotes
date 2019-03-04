import React, { Component } from 'react'
import { Text } from 'react-native'
import { OrderCard } from '../../components'
import {
  Container,
  TextContainer
} from './styled'
import { filterOrders } from '../../helpers/orders'
import _ from 'lodash'

export default class Orders extends Component {
  render () {
    return (
      <Container>
        {this.renderOrders()}
      </Container>
    )
  }

  renderOrders () {
    const { navigation } = this.props
    const orderType = navigation.state.routeName
    const orders = filterOrders(orderType)
    if (orders && !_.isEmpty(orders)) {
      return orders.map((order, index) => {
        return (
          <OrderCard
            key={index}
            order={order}
            onPress={() => navigation.navigate('WorkOrder', {order})}
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
