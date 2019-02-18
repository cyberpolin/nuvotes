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
  ButtonContainer,
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
    this.handleCollapse = this.handleCollapse.bind(this)
  }
  componentWillUnmount () {
    this.willFocusSubscription.remove()
  }
  render () {
    const { isCollapsed } = this.state
    const { navigation } = this.props
    const orderId = navigation.getParam('id', '')
    const orderType = 'inspection'
    const orderPhoto = ''
    return (
      <Container>
        <ScrollContainer>
          <PhotoContainer>
            <Photo
              resizeMode='contain'
              source={{uri: orderPhoto || 'https://s3-us-west-1.amazonaws.com/nuvote-wo/static/admin/placeholder_feature.png'}}
              PlaceholderContent={<ActivityIndicator />}
            />
          </PhotoContainer>
          <InfoContainer>
            <Row>
              <Label>Type:</Label>
              <Text>Inspection</Text>
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
              onPress={this.handleCollapse}
            >
              <View>
                {this.renderGalleryTypes(orderType, orderId)}
                <GalleryButton
                  onPress={() => navigation.navigate('Documents', {orderId})}
                >
                  <Text>Property Documents</Text>
                  <Icon
                    name='angle-right'
                    type='font-awesome'
                    containerStyle={styles.iconContainerStyle}
                  />
                </GalleryButton>
              </View>
            </Collapsable>
            <ButtonContainer>
              <Button
                title='Upload Photos'
                type='outline'
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.buttonStyle}
                onPress={() => this.showModal('photos')}
              />
            </ButtonContainer>
            <ButtonContainer>
              <Button
                title='Upload Files'
                type='outline'
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.buttonStyle}
                onPress={() => this.showModal('files')}
              />
            </ButtonContainer>
            {this.renderModal(orderType)}
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

  renderModal (orderType) {
    const { isVisible, selectedModal } = this.state
    if (selectedModal === 'photos') {
      return (
        <Overlay
          isVisible={isVisible}
          windowBackgroundColor='rgba(0, 0, 0, .4)'
          overlayBackgroundColor='#FFF'
          onBackdropPress={() => this.changeVisibility(false)}
          animationType='fade'
          overlayStyle={styles.overlayStyle}
          height='65%'
        >
          <UploadPhotos
            isVisible={isVisible}
            changeVisibility={(visibility) => this.changeVisibility(visibility)}
            orderType={orderType}
          />
        </Overlay>
      )
    } return (
      <Overlay
        isVisible={isVisible}
        windowBackgroundColor='rgba(0, 0, 0, .4)'
        overlayBackgroundColor='#FFF'
        onBackdropPress={() => this.changeVisibility(false)}
        animationType='fade'
        overlayStyle={styles.overlayStyle}
        height='65%'
      >
        <UploadFiles
          isVisible={isVisible}
          changeVisibility={(visibility) => this.changeVisibility(visibility)}
        />
      </Overlay>
    )
  }

  changeVisibility (visibility) {
    this.setState({isVisible: visibility})
  }

  handleCollapse () {
    const { isCollapsed } = this.state
    this.setState({isCollapsed: !isCollapsed})
  }

  renderGalleryTypes (orderType, orderId) {
    const { navigate } = this.props.navigation
    const galleryTypes = [
      {
        label: 'Property Before Photos',
        galleryType: 'before'
      }, {
        label: 'Property In Progress Photos',
        galleryType: 'in_progress'
      }, {
        label: 'Property After Photos',
        galleryType: 'after'
      }
    ]
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
    } else {
      return (
        <View>
          {galleryTypes.map((gallery, index) => {
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
