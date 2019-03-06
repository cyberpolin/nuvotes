import React, { Component } from 'react'
import { Alert } from 'react-native'
import {
  DocumentPicker,
  DocumentPickerUtil
} from 'react-native-document-picker'
import {
  Button,
  Text,
  ListItem,
  Icon
} from 'react-native-elements'
import {
  Container,
  FlexRow,
  FilesContainer,
  styles
} from './styled'
import { translate } from '../../helpers/localization'
import _ from 'lodash'

export default class UploadFiles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: props.isVisible,
      files: []
    }
    this.selectFile = this.selectFile.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  render () {
    return (
      <Container>
        <Text h4>{translate.files}</Text>
        {this.renderFiles()}
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
          type='outline'
          title={`${translate.selectFile}...`}
          onPress={this.selectFile}
        />
        <FlexRow>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            type='outline'
            title={translate.cancel}
            onPress={this.handleClose}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            type='outline'
            title={translate.save}
          />
        </FlexRow>
      </Container>
    )
  }

  renderFiles () {
    const { files } = this.state
    if (!_.isEmpty(files)) {
      return (
        <FilesContainer>
          {files.map((file, index) => {
            const { fileName } = file
            return (
              <ListItem
                key={index}
                leftIcon={{name: 'file', type: 'font-awesome'}}
                title={fileName}
                rightElement={
                  <Icon
                    name='times'
                    type='font-awesome'
                    onPress={() => this.deleteFile(index)}
                  />
                }
                bottomDivider
              />
            )
          })}
        </FilesContainer>
      )
    }
  }

  deleteFile (index) {
    let { files } = this.state
    files.splice(index, 1)
    this.setState({files})
  }

  selectFile () {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.pdf()]
    }, (error, res) => {
      if (error) {
        Alert.alert(translate.uploadError)
      }
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
