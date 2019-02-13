import React, { Component } from 'react'
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native'
import {
  Button,
  Icon,
  Overlay
} from 'react-native-elements'
import {
  UploadFiles,
  UploadPhotos
} from '../../containers'
import { Collapsable } from '../../components'
import {
  Container,
  Label,
  Photo,
  PhotoContainer,
  InfoContainer,
  FlexRow,
  Row,
  ScrollContainer,
  GalleryButton,
  styles
} from './styled'

export default class WorkOrder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isCollapsed: true,
      isVisible: false,
      selectedModal: ''
    }
    this.willFocusSubscription = props.navigation.addListener(
      'willFocus',
      payload => {
        props.navigation.setParams({ title: '12345' })
      }
    )
  }
  componentWillUnmount () {
    this.willFocusSubscription.remove()
  }
  render () {
    const { isCollapsed } = this.state
    const { navigation } = this.props
    const orderId = navigation.getParam('id', '')
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
              {this.renderGalleryTypes('inspection', orderId)}
            </Collapsable>
            <Button
              title='Upload Photos'
              type='outline'
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.buttonStyle}
              onPress={() => this.showModal('photos')}
            />
            <Button
              title='Upload Files'
              type='outline'
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.buttonStyle}
              onPress={() => this.showModal('files')}
            />
            {this.renderModal()}
          </InfoContainer>
        </ScrollContainer>
      </Container>
    )
  }
  showModal (modal) {
    let { isVisible } = this.state
    let { selectedModal } = this.state
    selectedModal = modal
    this.setState({isVisible: !isVisible, selectedModal})
  }

  renderModal () {
    const { isVisible, selectedModal } = this.state
    if (selectedModal === 'photos') {
      return (
        <Overlay
          isVisible={isVisible}
          windowBackgroundColor='rgba(0, 0, 0, .4)'
          overlayBackgroundColor='#FFF'
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <UploadPhotos />
        </Overlay>
      )
    } return (
      <Overlay
        isVisible={isVisible}
        windowBackgroundColor='rgba(0, 0, 0, .4)'
        overlayBackgroundColor='#FFF'
        onBackdropPress={() => this.setState({ isVisible: false })}
      >
        <UploadFiles />
      </Overlay>
    )
  }

  handleCollapse () {
    const { isCollapsed } = this.state
    this.setState({isCollapsed: !isCollapsed})
  }

  renderGalleryTypes (orderType, orderId) {
    const { navigate } = this.props.navigation
    const galleryTypes = {
      insurance: [{
        label: 'Property Before Photos',
        galleryType: 'before'
      }, {
        label: 'Property In Progress Photos',
        galleryType: 'in_progress'
      }, {
        label: 'Property After Photos',
        galleryType: 'after'
      }]
    }
    if (orderType === 'inspection') {
      return (
        <GalleryButton onPress={() => navigate('Gallery', { galleryType: 'property', orderId })}>
          <Text>Property Photos</Text>
          <Icon
            name='angle-right'
            type='font-awesome'
            containerStyle={styles.iconContainerStyle}
          />
        </GalleryButton>
      )
    } else if (orderType === 'insurance' || orderType === 'other_repair') {
      return (
        <View>
          {galleryTypes.insurance.map((gallery, index) => {
            const { label, galleryType } = gallery
            return (
              <GalleryButton
                onPress={() => navigate('Gallery', { galleryType, orderId })}
                key={index}
              >
                <Text>{label}</Text>
                <Icon
                  name='angle-right'
                  type='font-awesome'
                  containerStyle={styles.iconContainerStyle}
                />
              </GalleryButton>
            )
          })}
        </View>
      )
    }
  }
}
