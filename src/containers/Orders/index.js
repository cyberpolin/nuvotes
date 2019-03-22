import React, { Component } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import _ from 'lodash'
import { Loading } from '../../components'
import {
  Container,
  ScrollViewContainer,
  TextContainer,
  styles
} from './styled'
import {
  filterOrders,
  filterOrderBySearch,
  getDateDiff
} from '../../helpers/orders'
import {
  primary,
  red,
  orange
} from '../../colorPalette'
import { translate } from '../../helpers/localization'

class Orders extends Component {
  render () {
    const { isLoading } = this.props.settings
    return (
      <Container>
        {this.renderOrders()}
        {isLoading && <Loading />}
      </Container>
    )
  }

  renderOrders () {
    const { navigation, search, orders } = this.props
    const orderType = navigation.state.routeName
    if (orders && !_.isEmpty(orders)) {
      let filteredOrders = filterOrders(orders, orderType)
      if (search !== '') {
        filteredOrders = filterOrderBySearch(orders, search)
      }
      return (
        <ScrollViewContainer>
          {filteredOrders.map((order, index) => {
            const { number, id } = order
            const daysToDueDate = getDateDiff(order['end_date'])
            return (
              <ListItem
                key={index}
                chevron
                title={`#${id} - ${number}`}
                subtitle={`Vendor Due Date: ${order['end_date']}`}
                containerStyle={styles.listItemContainer}
                titleStyle={{
                  ...styles.titleStyle,
                  color: daysToDueDate < 3 ? red
                    : daysToDueDate < 16 ? orange : primary
                }}
                subtitleStyle={styles.subtitleStyle}
                onPress={() => navigation.navigate('WorkOrder', {order})}
                bottomDivider
              />
            )
          })}
        </ScrollViewContainer>
      )
    }
    return (
      <TextContainer>
        <Text>{translate.noOrders}</Text>
      </TextContainer>
    )
  }
}

const mapStateToProps = ({ search, user, orders, settings }) => ({
  search,
  user,
  orders,
  settings
})

export default connect(mapStateToProps, null)(Orders)
