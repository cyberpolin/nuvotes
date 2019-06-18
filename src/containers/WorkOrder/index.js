import React, { Component } from 'react'
import {
  View,
  ActivityIndicator,
  Alert
} from 'react-native'
import {
  Button,
  Icon
} from 'react-native-elements'
import { connect } from 'react-redux'
import _ from 'lodash'
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
    this.handleCompleteOrder = this.handleCompleteOrder.bind(this)
  }
  render () {
    const { isCollapsed } = this.state
    const { navigation, settings } = this.props
    const order = navigation.getParam('order', {})
    const { id, status, avatar, address, coordinator, vendor } = order
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
              <Text>{this.getOrderType(order['description_job'])}</Text>
            </Row>
            <Row>
              <Label>{translate.state}:</Label>
              <Text>{this.getStatus(status)}</Text>
            </Row>
            <Row>
              <Label>{translate.address}:</Label>
              <Text>{this.getAddress(address)}</Text>
            </Row>
            <Row>
              <Label>{translate.vendor}:</Label>
              <Text>{this.getFormattedName(vendor)}</Text>
            </Row>
            <Row>
              <Label>{translate.coordinator}:</Label>
              <Text>{this.getFormattedName(coordinator)}</Text>
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
            {this.getStatus(status) !== 'Completed' &&
            <ButtonContainer>
              <Button
                title={translate.uploadPhotos}
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.buttonStyle}
                onPress={() => navigation.navigate('Upload', {descriptionJob: order['description_job'], id})}
                disabled={settings.isUploading}
                loading={settings.isUploading}
                loadingProps={{color: secondary}}
              />
            </ButtonContainer>}
            {(this.getStatus(status) !== 'Pending Completion' && this.getStatus(status) !== 'Completed') &&
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
          </InfoContainer>
        </ScrollContainer>
      </Container>
    )
  }

  getAddress (address) {
    const formattedAddress = address.address
    return formattedAddress
  }

  getOrderType (description) {
    const formattedDescriptionJob = description.description === 'Other Repair'
      ? translate.otherRepair : description.description === 'Inspection'
        ? translate.inspection : translate.insurance
    return formattedDescriptionJob
  }

  getStatus (status) {
    const { description } = status
    const formattedStatus = description === 'Pending Completion'
      ? translate.pending : description === 'In Progress'
        ? translate.inProgress : description
    return formattedStatus
  }

  getFormattedName (person) {
    const name = `${_.capitalize(person['first_name'])} ${_.capitalize(person['last_name'])}`
    return name
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
