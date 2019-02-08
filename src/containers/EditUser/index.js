import React, { Component } from 'react'
import {
  Icon,
  Input,
  Button
} from 'react-native-elements'
import {
  Container,
  Label,
  ImageContainer,
  CircleImage,
  InfoContainer,
  FlexRow,
  InputContainer
} from './styled'

export default class EditUser extends Component {
  render () {
    const user = true
    return (
      <Container>
        <ImageContainer>
          {user
            ? <CircleImage
              resizeMode='contain'
              source={{uri: 'https://scienceoxford.com/wp-content/uploads/2018/03/avatar-male.jpg'}}
            />
            : <Icon
              name='user-circle'
              type='font-awesome'
              size={150}
              containerStyle={{
                height: 150
              }}
            />
          }
        </ImageContainer>
        <InfoContainer>
          <FlexRow>
            <InputContainer width={40}>
              <Label>First Name:</Label>
              <Input
                containerStyle={{
                  paddingHorizontal: 0
                }}
              />
            </InputContainer>
            <InputContainer width={40}>
              <Label>Last Name:</Label>
              <Input
                containerStyle={{
                  paddingHorizontal: 0
                }}
              />
            </InputContainer>
          </FlexRow>
          <InputContainer>
            <Label>State:</Label>
            <Input
              containerStyle={{
                paddingHorizontal: 0
              }}
            />
          </InputContainer>
          <InputContainer>
            <Label>Fake Street, #51:</Label>
            <Input
              containerStyle={{
                paddingHorizontal: 0
              }}
            />
          </InputContainer>
          <InputContainer>
            <Label>Email:</Label>
            <Input
              containerStyle={{
                paddingHorizontal: 0
              }}
            />
          </InputContainer>
          <InputContainer>
            <Label>Password:</Label>
            <Input
              containerStyle={{
                paddingHorizontal: 0
              }}
            />
          </InputContainer>
          <Button
            title='Save'
            icon={{
              type: 'font-awesome',
              name: 'save'
            }}
            buttonStyle={{
              backgroundColor: '#FFF',
              borderWidth: 1,
              borderColor: '#000'
            }}
            titleStyle={{
              color: '#000'
            }}
            containerStyle={{
              width: '40%',
              alignSelf: 'center',
              marginTop: 'auto'
            }}
          />
        </InfoContainer>
      </Container>
    )
  }
}
