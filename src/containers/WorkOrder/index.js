import React, { Component } from 'react'
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native'
import {
  Container,
  Label,
  Photo,
  PhotoContainer,
  InfoContainer,
  FlexRow,
  Row
} from './styled'

export default class WorkOrder extends Component {
  render () {
    return (
      <Container>
        <PhotoContainer>
          <Photo
            resizeMode='contain'
            PlaceholderContent={<ActivityIndicator />}
            source={{uri: 'https://cdn.houseplans.com/product/q5qkhirat4bcjrr4rpg9fk3q94/w800x533.jpg?v=8'}}
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
          <Label>Vendor Bill:</Label>
          <Text>$ 100.00</Text>
        </InfoContainer>
      </Container>
    )
  }
}
