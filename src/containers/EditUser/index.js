import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Icon,
  Input,
  Button
} from 'react-native-elements'
import {
  Label,
  ImageContainer,
  CircleImage,
  InfoContainer,
  FlexRow,
  InputContainer,
  styles
} from './styled'

export default class EditUser extends Component {
  render () {
    const user = true
    return (
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.keyboardScrollViewContentStyle}
        keyboardShouldPersistTaps='always'
        keyboardDismissMode='on-drag'
      >
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
              containerStyle={styles.iconContainerStyle}
            />
          }
        </ImageContainer>
        <InfoContainer>
          <FlexRow>
            <InputContainer width={40}>
              <Label>First Name:</Label>
              <Input
                containerStyle={styles.containerStyle}
                autoCorrect={false}
                autoCapitalize='none'
                inputStyle={styles.inputStyle}
              />
            </InputContainer>
            <InputContainer width={40}>
              <Label>Last Name:</Label>
              <Input
                containerStyle={styles.containerStyle}
                autoCorrect={false}
                autoCapitalize='none'
                inputStyle={styles.inputStyle}
              />
            </InputContainer>
          </FlexRow>
          <InputContainer>
            <Label>State:</Label>
            <Input
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              autoCapitalize='none'
              inputStyle={styles.inputStyle}
            />
          </InputContainer>
          <InputContainer>
            <Label>Fake Street, #51:</Label>
            <Input
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              autoCapitalize='none'
              inputStyle={styles.inputStyle}
            />
          </InputContainer>
          <InputContainer>
            <Label>Email:</Label>
            <Input
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              autoCapitalize='none'
              inputStyle={styles.inputStyle}
            />
          </InputContainer>
          <InputContainer>
            <Label>Password:</Label>
            <Input
              containerStyle={styles.containerStyle}
              secureTextEntry
              inputStyle={styles.inputStyle}
            />
          </InputContainer>
          <Button
            title='Save'
            icon={{
              type: 'font-awesome',
              name: 'save'
            }}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            containerStyle={styles.buttonContainerStyle}
          />
        </InfoContainer>
      </KeyboardAwareScrollView>
    )
  }
}
