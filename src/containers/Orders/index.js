import React, { Component } from 'react'
import { Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import {
  Container,
  TextContainer,
  ListItemContainer
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
        const { name, endDate, id } = order
        return (
          <ListItem
            key={index}
            chevron
            title={`#${id} - ${name}`}
            subtitle={`Vendor End Date: ${endDate}`}
            containerStyle={ListItemContainer}
            onPress={() => navigation.navigate('WorkOrder', {order})}
            bottomDivider
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
