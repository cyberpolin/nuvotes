import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'
import {
  Container,
  FlexRow,
  MiddleBox,
  SmallText,
  Text
} from './styled'

const OrderCard = ({order, ...props}) => {
  const { id, name, endDate } = order
  return (
    <Container {...props}>
      <FlexRow>
        <Text marginRight>#{id || ''}</Text>
        <Text>{name || ''}</Text>
      </FlexRow>
      <MiddleBox>
        <Icon
          type='font-awesome'
          name='angle-right'
        />
      </MiddleBox>
      <FlexRow>
        <SmallText marginRight>Vendor End Date:</SmallText>
        <SmallText>{endDate || ''}</SmallText>
      </FlexRow>
    </Container>
  )
}

OrderCard.propTypes = {
  order: PropTypes.object.isRequired
}

export default OrderCard
