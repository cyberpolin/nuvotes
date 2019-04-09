import React, { Component } from 'react'
import {
  ListItem,
  Text,
  Icon
} from 'react-native-elements'
import _ from 'lodash'
import {
  Container,
  ScrollContainer,
  FlexRow,
  styles
} from './styled'
import { translate } from '../../helpers/localization'
import {
  getFilename,
  downloadFile
} from '../../helpers/orders'
import { primary } from '../../colorPalette'

export default class Documents extends Component {
  render () {
    const { navigation } = this.props
    const files = navigation.getParam('documents', [])
    return (
      <Container>
        {files && !_.isEmpty(files)
          ? <ScrollContainer>{this.renderFiles(files)}</ScrollContainer>
          : <Text>{translate.noFiles}</Text>}
      </Container>
    )
  }

  renderFiles (files) {
    return files.map((file, index) => {
      const fileURL = file.document.document
      const filename = getFilename(fileURL)
      return (
        <ListItem
          key={index}
          leftIcon={{name: 'file-o', type: 'font-awesome'}}
          rightElement={this.renderRightItem(fileURL, filename)}
          title={filename}
          bottomDivider
        />
      )
    })
  }

  renderRightItem (fileURL, filename) {
    return (
      <FlexRow>
        <Icon
          name='download'
          type='font-awesome'
          iconStyle={styles.iconStyle}
          onPress={() => downloadFile(fileURL, filename)}
          color={primary}
        />
      </FlexRow>
    )
  }
}
