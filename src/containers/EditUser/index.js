import React, { Component } from 'react'
import { Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-picker'
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
  SelectImage,
  styles
} from './styled'

export default class EditUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: ''
    }
  }
  render () {
    return (
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.keyboardScrollViewContentStyle}
        keyboardShouldPersistTaps='always'
        keyboardDismissMode='on-drag'
      >
        <ImageContainer>
          {this.renderAvatar()}
          <SelectImage onPress={() => this.showImagePicker()}>
            <Text>Change Image</Text>
          </SelectImage>
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

  renderAvatar () {
    const { image } = this.state
    const user = {}
    if (image !== '') {
      return <CircleImage source={{uri: image}} />
    }
    if (user.avatar) {
      return <CircleImage
        resizeMode='contain'
        source={{uri: user.avatar}}
      />
    }
    return <Icon
      name='user-circle'
      type='font-awesome'
      size={150}
      containerStyle={styles.iconContainerStyle}
    />
  }

  showImagePicker () {
    const options = {
      title: 'Select Avatar'
    }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('USER cancalled')
      } else if (response.error) {
        console.log('An error has ocurred')
      } else {
        const { uri } = response
        this.setState({image: uri})
      }
    })
  }
}
