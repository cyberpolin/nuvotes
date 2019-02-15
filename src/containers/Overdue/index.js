import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { OrderCard } from '../../components'
import { styles } from './styled'

export default class Overdue extends Component {
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
    const orders = [{name: 'House Insurance', endDate: '02/22/2019', id: '54322'}]
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
