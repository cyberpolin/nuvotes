import React, { Component } from 'react'
import {
  View,
  ActivityIndicator,
  Alert
} from 'react-native'
import {
  Button,
  Icon,
  Overlay
} from 'react-native-elements'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
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
  styles,
  Text
} from './styled'
import { translate } from '../../helpers/localization'
import {
  sortPhotos,
  completeOrder
} from '../../helpers/orders'
import { secondary } from '../../colorPalette'

class WorkOrder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isCollapsed: true,
      isVisible: false
    }
    this.handleCollapse = this.handleCollapse.bind(this)
    this.changeVisibility = this.changeVisibility.bind(this)
    this.showModal = this.showModal.bind(this)
    this.changeVisibility = this.changeVisibility.bind(this)
    this.handleCompleteOrder = this.handleCompleteOrder.bind(this)
  }
  render () {
    const { isCollapsed } = this.state
    const { navigation, user, settings } = this.props
    const order = navigation.getParam('order', {})
    const { id, status, avatar, address, coordinator } = order
    const formattedAddress = `${_.capitalize(address.state.description)}, ${address.address}`
    const formattedCoordinator = `${_.capitalize(coordinator['first_name'])} ${_.capitalize(coordinator['last_name'])}`
    const formattedDescriptonJob = order['description_job'].description === 'Other Repair'
      ? translate.otherRepair : order['description_job'].description === 'Inspection'
        ? translate.inspection : translate.insurance
    const formattedStatus = status.description === 'Pending Completion'
      ? translate.pending : status.description === 'In Progress'
        ? translate.inProgress : status.description
    const formattedVendor = `${_.capitalize(user['first_name'])} ${_.capitalize(user['last_name'])}`
    return (
      <Container>
        <ScrollContainer>
          <PhotoContainer>
            <Photo
              resizeMode='contain'
              source={{uri: avatar || 'https://s3-us-west-1.amazonaws.com/nuvote-wo/static/admin/placeholder_feature.png'}}
              PlaceholderContent={<ActivityIndicator />}
            />
          </PhotoContainer>
          <InfoContainer>
            <Row>
              <Label>{translate.type}:</Label>
              <Text>{formattedDescriptonJob}</Text>
            </Row>
            <Row>
              <Label>{translate.state}:</Label>
              <Text>{formattedStatus}</Text>
            </Row>
            <Row>
              <Label>{translate.address}:</Label>
              <Text>{formattedAddress}</Text>
            </Row>
            <Row>
              <Label>{translate.vendor}:</Label>
              <Text>{formattedVendor}</Text>
            </Row>
            <Row>
              <Label>{translate.coordinator}:</Label>
              <Text>{formattedCoordinator}</Text>
            </Row>
            <FlexRow>
              <View>
                <Label>{translate.startDate}:</Label>
                <Text>{order['start_date']}</Text>
              </View>
              <View>
                <Label>{translate.endDate}:</Label>
                <Text>{order['end_date']}</Text>
              </View>
            </FlexRow>
            <Row>
              <Label>{translate.vendorBill}: </Label>
              <Text>$ {order['vendor_sub_out']}</Text>
            </Row>
            <Collapsable
              label={translate.attachments}
              isCollapsed={isCollapsed}
              onPress={this.handleCollapse}
            >
              <View>
                {this.renderGalleryTypes(order['description_job'], order.photos)}
                <GalleryButton onPress={() => navigation.navigate('Documents', {documents: order.documents})}>
                  <Text color>{translate.propertyDocuments}</Text>
                  <Icon
                    name='angle-right'
                    type='font-awesome'
                    containerStyle={styles.iconContainerStyle}
                    color={secondary}
                  />
                </GalleryButton>
              </View>
            </Collapsable>
            <ButtonContainer>
              <Button
                title={translate.uploadPhotos}
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.buttonStyle}
                onPress={this.showModal}
                disabled={settings.isUploading}
                loading={settings.isUploading}
                loadingProps={{color: secondary}}
              />
            </ButtonContainer>
            {formattedStatus !== 'Pending Completion' &&
              <ButtonContainer>
                <Button
                  title={translate.completeOrder}
                  titleStyle={styles.buttonTitle}
                  buttonStyle={styles.buttonStyle}
                  disabled={settings.isUploading}
                  loading={settings.isUploading}
                  loadingProps={{color: secondary}}
                  onPress={() => this.handleCompleteOrder(id)}
                />
              </ButtonContainer>}
            {this.renderModal(order['description_job'], order.id)}
          </InfoContainer>
        </ScrollContainer>
      </Container>
    )
  }
  showModal () {
    const { isVisible } = this.state
    this.setState({isVisible: !isVisible})
  }

  renderModal (descriptionJob, orderId) {
    const { isVisible } = this.state
    return (
      <Overlay
        isVisible={isVisible}
        windowBackgroundColor='rgba(0, 0, 0, .4)'
        overlayBackgroundColor='#FFF'
        onBackdropPress={this.changeVisibility}
        animationType='fade'
        overlayStyle={styles.overlayStyle}
        height='65%'
      >
        <UploadPhotos
          isVisible={isVisible}
          changeVisibility={this.changeVisibility}
          descriptionJob={descriptionJob}
          orderId={orderId}
        />
      </Overlay>
    )
  }

  changeVisibility () {
    const { isVisible } = this.state
    this.setState({isVisible: !isVisible})
  }

  handleCollapse () {
    const { isCollapsed } = this.state
    this.setState({isCollapsed: !isCollapsed})
  }

  renderGalleryTypes (descriptionJob, photos) {
    const { navigate } = this.props.navigation
    const galleryTypes = [
      {
        label: translate.propertyBeforePhotos,
        galleryType: 'Before'
      }, {
        label: translate.propertyInProgressPhotos,
        galleryType: 'In Progress'
      }, {
        label: translate.propertyAfterPhotos,
        galleryType: 'After'
      }
    ]
    if (descriptionJob.description === 'Inspection') {
      return (
        <GalleryButton onPress={() => navigate('Gallery', { galleryType: 'property', sortedPhotos: photos })}>
          <Text color>{translate.propertyPhotos}</Text>
          <Icon
            name='angle-right'
            type='font-awesome'
            containerStyle={styles.iconContainerStyle}
            color={secondary}
          />
        </GalleryButton>
      )
    } else {
      return (
        <View>
          {galleryTypes.map((gallery, index) => {
            const { label, galleryType } = gallery
            const sortedPhotos = sortPhotos(photos, galleryType)
            return (
              <GalleryButton
                onPress={() => navigate('Gallery', { galleryType, sortedPhotos })}
                key={index}
              >
                <Text color>{label}</Text>
                <Icon
                  name='angle-right'
                  type='font-awesome'
                  containerStyle={styles.iconContainerStyle}
                  color={secondary}
                />
              </GalleryButton>
            )
          })}
        </View>
      )
    }
  }

  handleCompleteOrder () {
    const { completeOrder, user: { id, token }, navigation } = this.props
    const order = navigation.getParam('order', {})
    const { id: orderId, photos } = order
    var photosCompleted
    if (order['description_job'].description === 'Inspection') {
      photosCompleted = photos.length > 0
    } else {
      const inProgress = sortPhotos(photos, 'In Progress')
      const after = sortPhotos(photos, 'After')
      const before = sortPhotos(photos, 'Before')
      photosCompleted = inProgress.length > 0 && after.length > 0 && before.length > 0
    }
    Alert.alert(
      translate.completeOrder,
      photosCompleted ? translate.completeOrderAlt : translate.completeOrderDescription,
      [
        {text: translate.cancel, style: 'cancel'},
        {text: 'Ok', onPress: () => completeOrder(token, orderId, id, navigation)}
      ]
    )
  }
}

const mapStateToProps = ({ user, settings }) => ({
  user,
  settings
})

const mapDispatchToProps = dispatch => ({
  completeOrder: (token, orderId, userId, navigation) => dispatch(completeOrder(token, orderId, userId, navigation))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkOrder)
