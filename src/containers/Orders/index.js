import React, { Component } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import {
  Container,
  TextContainer,
  ListItemContainer
} from './styled'
import {
  filterOrders,
  filterOrderBySearch
} from '../../helpers/orders'
import _ from 'lodash'

class Orders extends Component {
  render () {
    return (
      <Container>
        {this.renderOrders()}
      </Container>
    )
  }

  renderOrders () {
    const { navigation, search } = this.props
    const orderType = navigation.state.routeName
    let orders = filterOrders(orderType)
    if (search !== '') {
      orders = filterOrderBySearch(orders, search)
    }
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

const mapStateToProps = ({ search }) => ({
  search: search
})

export default connect(mapStateToProps, null)(Orders)
