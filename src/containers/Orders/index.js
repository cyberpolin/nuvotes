import React, { Component } from 'react'
import {
  RefreshControl,
  FlatList,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import _ from 'lodash'
import moment from 'moment'
import { Loading } from '../../components'
import {
  Container,
  styles,
  Text
} from './styled'
import {
  filterOrders,
  filterOrderBySearch,
  getDateDiff,
  getOrders
} from '../../helpers/orders'
import {
  primary,
  red,
  orange
} from '../../colorPalette'
import { translate } from '../../helpers/localization'

class Orders extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRefresing: false
    }
    this.renderList = this.renderList.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  render () {
    const { orders } = this.props
    const { isLoading } = this.props.settings
    return (
      <Container>
        {!_.isEmpty(orders)
          ? this.renderList()
          : <Text>{translate.noOrders}</Text>
        }
        {isLoading && <Loading />}
      </Container>
    )
  }

  // Handles refresh gesture to update orders
  onRefresh () {
    const { user: { id, token }, getOrders } = this.props
    this.setState({isRefresing: true})
    getOrders(token, id)
    this.setState({isRefresing: false})
  }

  // Renders orders as items.
  renderListItem (order) {
    const { navigation } = this.props
    const { number, id, address } = order
    const daysToDueDate = getDateDiff(order['end_date'])
    const color = daysToDueDate < 1 ? red : daysToDueDate === 1 ? orange : '#000'
    return (
      <ListItem
        key={id}
        chevron
        title={this.orderTitle(order['end_date'], number)}
        subtitle={address.address}
        containerStyle={styles.listItemContainer}
        titleStyle={{...styles.titleStyle, color}}
        subtitleStyle={{...styles.subtitleStyle, color}}
        onPress={() => navigation.navigate('WorkOrder', {order})}
        bottomDivider
      />
    )
  }

  orderTitle (date, orderNumber) {
    const dueDate = moment(date)
    return `Due: ${dueDate.format('MM/DD')} - WO#: ${orderNumber}`
  }

  // Renders a flatlist to show current orders.
  renderList () {
    const { navigation, search, orders } = this.props
    const { isRefresing } = this.state
    const orderType = navigation.state.routeName
    // Get order by the selected screen.
    let filteredOrders = filterOrders(orders, orderType)
    if (search !== '') {
      // If there's a search, show the search using the selected screen
      filteredOrders = filterOrderBySearch(orders, search, orderType)
    }
    if (_.isEmpty(filteredOrders)) {
      return <Text>{translate.noOrders}</Text>
    }
    return (
      <FlatList
        data={filteredOrders}
        renderItem={({item}) => this.renderListItem(item)}
        initialNumToRender={8}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Keyboard.dismiss}
        refreshControl={<RefreshControl
          refreshing={isRefresing}
          onRefresh={this.onRefresh}
          colors={[primary]}
          tintColor={primary}
        />}
      />
    )
  }
}

const mapStateToProps = ({ search, user, orders, settings }) => ({
  search,
  user,
  orders,
  settings
})

const mapDispatchToProps = dispatch => ({
  getOrders: (token, userId) => dispatch(getOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
