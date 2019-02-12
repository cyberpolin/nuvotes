import React, { Component } from 'react'
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native'
import { Collapsable } from '../../components'
import {
  Container,
  Label,
  Photo,
  PhotoContainer,
  InfoContainer,
  FlexRow,
  Row,
  ScrollContainer
} from './styled'

export default class WorkOrder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isCollapsed: true
    }
  }
  render () {
    const { isCollapsed } = this.state
    return (
      <Container>
        <ScrollContainer>
          <PhotoContainer>
            <Photo
              resizeMode='contain'
              source={{uri: 'https://cdn.houseplans.com/product/q5qkhirat4bcjrr4rpg9fk3q94/w800x533.jpg?v=8'}}
              PlaceholderContent={<ActivityIndicator />}
            />
          </PhotoContainer>
          <InfoContainer>
            <Row>
              <Label>Type:</Label>
              <Text>Inspección</Text>
            </Row>
            <Row>
              <Label>Status:</Label>
              <Text>In Progress</Text>
            </Row>
            <Row>
              <Label>Address:</Label>
              <Text>California, fake street #24</Text>
            </Row>
            <Row>
              <Label>Vendor:</Label>
              <Text>Vendor Name</Text>
            </Row>
            <Row>
              <Label>Coordinator:</Label>
              <Text>Coordinator Name</Text>
            </Row>
            <FlexRow>
              <View>
                <Label>Start Date:</Label>
                <Text>07/09/2018</Text>
              </View>
              <View>
                <Label>End Date:</Label>
                <Text>08/10/2018</Text>
              </View>
            </FlexRow>
            <Row>
              <Label>Vendor Bill: </Label>
              <Text>$ 100.00</Text>
            </Row>
            <Collapsable
              label='Attachments'
              isCollapsed={isCollapsed}
              onPress={() => this.handleCollapse()}
            >
              <Text>Collapsed</Text>
            </Collapsable>
          </InfoContainer>
        </ScrollContainer>
      </Container>
    )
  }

  handleCollapse () {
    const { isCollapsed } = this.state
    this.setState({isCollapsed: !isCollapsed})
  }
}
