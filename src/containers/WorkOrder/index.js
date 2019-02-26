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
import { translate } from '../../helpers/localization'

export default class WorkOrder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isCollapsed: true,
      isVisible: false,
      selectedModal: ''
    }
    this.handleCollapse = this.handleCollapse.bind(this)
  }
  render () {
    const { isCollapsed } = this.state
    const { navigation } = this.props
    const order = navigation.getParam('order', {})
    const { id, status, endDate, descriptionJob } = order
    return (
      <Container>
        <ScrollContainer>
          <PhotoContainer>
            <Photo
              resizeMode='contain'
              source={{uri: order.orderPhoto || 'https://s3-us-west-1.amazonaws.com/nuvote-wo/static/admin/placeholder_feature.png'}}
              PlaceholderContent={<ActivityIndicator />}
            />
          </PhotoContainer>
          <InfoContainer>
            <Row>
              <Label>{translate.type}:</Label>
              <Text>{descriptionJob}</Text>
            </Row>
            <Row>
              <Label>{translate.state}:</Label>
              <Text>{status}</Text>
            </Row>
            <Row>
              <Label>{translate.address}:</Label>
              <Text>California, fake street #24</Text>
            </Row>
            <Row>
              <Label>{translate.vendor}:</Label>
              <Text>Vendor Name</Text>
            </Row>
            <Row>
              <Label>{translate.coordinator}:</Label>
              <Text>Coordinator Name</Text>
            </Row>
            <FlexRow>
              <View>
                <Label>{translate.startDate}:</Label>
                <Text>07/09/2018</Text>
              </View>
              <View>
                <Label>{translate.endDate}:</Label>
                <Text>{endDate}</Text>
              </View>
            </FlexRow>
            <Row>
              <Label>{translate.vendorBill}: </Label>
              <Text>$ 100.00</Text>
            </Row>
            <Collapsable
              label={translate.attachments}
              isCollapsed={isCollapsed}
              onPress={this.handleCollapse}
            >
              <View>
                {this.renderGalleryTypes(descriptionJob, id)}
                <GalleryButton
                  onPress={() => navigation.navigate('Documents', {id})}
                >
                  <Text>{translate.propertyDocuments}</Text>
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
                title={translate.uploadPhotos}
                type='outline'
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.buttonStyle}
                onPress={() => this.showModal('photos')}
              />
            </ButtonContainer>
            <ButtonContainer>
              <Button
                title={translate.uploadFiles}
                type='outline'
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.buttonStyle}
                onPress={() => this.showModal('files')}
              />
            </ButtonContainer>
            {this.renderModal(descriptionJob)}
          </InfoContainer>
        </ScrollContainer>
      </Container>
    )
  }
  showModal (selectedModal) {
    const { isVisible } = this.state
    this.setState({isVisible: !isVisible, selectedModal})
  }

  renderModal (descriptionJob) {
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
            descriptionJob={descriptionJob}
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

  renderGalleryTypes (descriptionJob, orderId) {
    const { navigate } = this.props.navigation
    const galleryTypes = [
      {
        label: translate.propertyBeforePhotos,
        galleryType: 'before'
      }, {
        label: translate.propertyInProgressPhotos,
        galleryType: 'in_progress'
      }, {
        label: translate.propertyAfterPhotos,
        galleryType: 'after'
      }
    ]
    if (descriptionJob === 'inspection') {
      return (
        <GalleryButton onPress={() => navigate('Gallery', { galleryType: 'property', orderId })}>
          <Text>{translate.propertyPhotos}</Text>
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
