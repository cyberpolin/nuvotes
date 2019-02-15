import React, { Component } from 'react'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
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
        <FilesContainer>
          {files.map((file, index) => {
            const { fileName } = file
            return (
              <ListItem
                key={index}
                leftIcon={{name: 'file', type: 'font-awesome'}}
                title={fileName}
                rightElement={this.deleteButton(index)}
                bottomDivider
              />
            )
          })}
        </FilesContainer>
      )
    }
  }

  deleteButton (index) {
    return <Icon
      name='times'
      type='font-awesome'
      onPress={() => this.deleteFile(index)}
    />
  }

  deleteFile (index) {
    let { files } = this.state
    files.splice(index, 1)
    this.setState({files})
  }

  reduceFileName (fileName) {
    const extension = fileName.split('.')[1]
    let name = fileName.split('.')[0]
    if (name.length > 14) {
      name = name.substr(0, 12)
      return `${name}...${extension}`
    }
    return `${name}.${extension}`
  }

  selectFile () {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.pdf()]
    }, (error, res) => {
      if (error) {
        console.log(error)
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
