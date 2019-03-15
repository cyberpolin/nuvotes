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
            : <Icon name='user-circle' type='font-awesome' size={150} />
          }
        </ImageContainer>
        <InfoContainer>
          <View>
            <Label>{translate.userName}:</Label>
            <Text>John_Jhonson</Text>
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
            <Text>California</Text>
          </View>
          <View>
            <Label>{translate.address}:</Label>
            <Text>Fake Street, #51</Text>
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
