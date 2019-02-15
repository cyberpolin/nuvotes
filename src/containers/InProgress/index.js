import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { OrderCard } from '../../components'
import { styles } from './styled'

export default class InProgress extends Component {
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
    const orders = [{name: 'Small House Repair', endDate: '03/30/2019', id: '97413'}]
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
