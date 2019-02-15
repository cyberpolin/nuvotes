import React, { Component } from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import {
  Button,
  Text,
  Icon
} from 'react-native-elements'
import {
  Container,
  FlexRow,
  IconsContainer,
  styles
} from './styled'

export default class UploadFiles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: props.isVisible,
      files: []
    }
  }
  render () {
    return (
      <Container>
        <Text h4>Files</Text>
        {this.renderFiles()}
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
          type='outline'
          title='Select a File...'
          onPress={() => this.selectFile()}
        />
        <FlexRow>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            type='outline'
            title='Cancel'
            onPress={() => this.handleClose()}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            type='outline'
            title='Save'
          />
        </FlexRow>
      </Container>
    )
  }

  renderFiles () {
    const { files } = this.state
    if (files.length > 0) {
      return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <IconsContainer>
            {files.map((file, index) => {
              return (
                <View key={index}>
                  <Icon
                    type='font-awesome'
                    name='file'
                  />
                </View>
              )
            })}
          </IconsContainer>
        </ScrollView>
      )
    }
  }

  selectFile () {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.pdf()]
    }, (error, res) => {
      console.log(error)
      if (res) {
        const { files } = this.state
        const newFilesArray = [...files, res]
        this.setState({files: newFilesArray})
      }
    })
  }

  handleClose () {
    const { changeVisibility } = this.props
    const { isVisible } = this.state
    changeVisibility(!isVisible)
  }
}
