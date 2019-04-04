import React, { Component } from 'react'
import {
  RefreshControl,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import _ from 'lodash'
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

  onRefresh () {
    const { user: { id, token }, getOrders } = this.props
    this.setState({isRefresing: true})
    getOrders(token, id)
    this.setState({isRefresing: false})
  }

  renderListItem (order) {
    const { navigation } = this.props
    const { number, id, status } = order
    const daysToDueDate = getDateDiff(order['end_date'])
    const isCompleted = status.description === 'Completed'
    const color = isCompleted ? primary : daysToDueDate < 3 ? red : daysToDueDate < 16 ? orange : primary
    return (
      <ListItem
        key={id}
        chevron
        title={`#${id} - ${number}`}
        subtitle={`Vendor Due Date: ${order['end_date']}`}
        containerStyle={styles.listItemContainer}
        titleStyle={{...styles.titleStyle, color}}
        subtitleStyle={styles.subtitleStyle}
        onPress={() => navigation.navigate('WorkOrder', {order})}
        bottomDivider
      />
    )
  }

  renderList () {
    const { navigation, search, orders } = this.props
    const { isRefresing } = this.state
    const orderType = navigation.state.routeName
    let filteredOrders = filterOrders(orders, orderType)
    if (search !== '') {
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
