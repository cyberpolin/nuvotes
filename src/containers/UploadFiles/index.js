import React, { Component } from 'react'
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
  FilesContainer,
  FileName,
  FileBox,
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
          <IconsContainer>
            {files.map((file, index) => {
              const { fileName } = file
              return (
                <FileBox key={index}>
                  <Icon
                    type='font-awesome'
                    name='file'
                    size={30}
                  />
                  <FileName>{this.reduceFileName(fileName)}</FileName>
                  <Icon
                    type='font-awesome'
                    name='times'
                    containerStyle={{marginLeft: 'auto'}}
                    onPress={() => this.deleteFile(index)}
                  />
                </FileBox>
              )
            })}
          </IconsContainer>
        </FilesContainer>
      )
    }
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
