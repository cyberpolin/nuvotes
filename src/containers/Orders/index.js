import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { OrderCard } from '../../components'
import { styles } from './styled'

export default class Orders extends Component {
  render () {
    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.containerStyle}
      >
        {this.renderOrders()}
      </ScrollView>
    )
  }

  renderOrders () {
    const { navigation } = this.props
    const orders = [{name: 'Repair', endDate: '08/10/2018', id: '12345'}]
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
}
