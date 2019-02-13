import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { OrderCard } from '../../components'
import { styles } from './styled'

export default class Orders extends Component {
  render () {
    const { navigation } = this.props
    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.containerStyle}
      >
        <OrderCard
          order={{id: '12345', endDate: '12/12/2018', name: 'Repair'}}
          onPress={() => navigation.navigate('WorkOrder')}
        />
      </ScrollView>
    )
  }
}
