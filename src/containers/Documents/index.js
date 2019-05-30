import React, { Component } from 'react'
import {
  ListItem,
  Text
} from 'react-native-elements'
import _ from 'lodash'
import { Download } from '../../components'
import {
  Container,
  ScrollContainer
} from './styled'
import { translate } from '../../helpers/localization'
import { getFilename } from '../../helpers/orders'

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

  // Renders an item with a file info to download.
  renderFiles (files) {
    return files.map((file, index) => {
      const { document } = file
      const fileURL = document.document
      const filename = getFilename(fileURL)
      const id = document.id
      return (
        <ListItem
          key={index}
          leftIcon={{name: 'file-o', type: 'font-awesome'}}
          rightElement={<Download fileId={id} filename={filename} />}
          title={filename}
          bottomDivider
        />
      )
    })
  }
}
