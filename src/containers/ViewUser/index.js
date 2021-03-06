import React, { Component } from 'react'
import {
  View,
  ActivityIndicator
} from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { translate } from '../../helpers/localization'
import {
  Container,
  Label,
  Text,
  CircleImage,
  ImageContainer,
  InfoContainer
} from './styled'
import RF from '../../utils/responsiveFont'

class ViewUser extends Component {
  render () {
    const { user } = this.props
    return (
      <Container>
        <ImageContainer>
          {user.avatar
            ? <CircleImage
              source={{uri: user}}
              resizeMode='contain'
              PlaceholderContent={<ActivityIndicator />}
            />
            : <Icon name='user-circle' type='font-awesome' size={RF(20)} />
          }
        </ImageContainer>
        <InfoContainer>
          <View>
            <Label>{translate.userName}:</Label>
            <Text>{user['user_system'].username}</Text>
          </View>
          <View>
            <Label>{translate.firstName}:</Label>
            <Text>{user['first_name']}</Text>
          </View>
          <View>
            <Label>{translate.lastName}:</Label>
            <Text>{user['last_name']}</Text>
          </View>
          <View>
            <Label>{translate.state}:</Label>
            <Text>{user.state}</Text>
          </View>
          <View>
            <Label>{translate.address}:</Label>
            <Text>{user.address}</Text>
          </View>
          <View>
            <Label>{translate.email}:</Label>
            <Text>{user.email}</Text>
          </View>
        </InfoContainer>
      </Container>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user
})

export default connect(mapStateToProps, null)(ViewUser)
