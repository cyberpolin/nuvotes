import React, { Component } from 'react'
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

  handleClose () {
    const { changeVisibility } = this.props
    const { isVisible } = this.state
    changeVisibility(!isVisible)
  }
}
