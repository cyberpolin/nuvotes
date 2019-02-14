import React, { Component } from 'react'
import { DocumentPicker } from 'react-native-document-picker'
import {
  Button,
  Text
} from 'react-native-elements'
import {
  Container,
  FlexRow,
  styles
} from './styled'

export default class UploadFiles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: props.isVisible
    }
  }
  render () {
    return (
      <Container>
        <Text h4>Files</Text>
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

  selectFile () {
    DocumentPicker.show({
    }, (error, res) => {
      console.log(error)
      console.log(res)
    })
  }

  handleClose () {
    const { changeVisibility } = this.props
    const { isVisible } = this.state
    changeVisibility(!isVisible)
  }
}
