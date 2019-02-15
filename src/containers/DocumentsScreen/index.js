import React, { Component } from 'react'
import {
  ListItem,
  Text,
  Icon
} from 'react-native-elements'
import {
  Container,
  ScrollContainer,
  FlexRow,
  styles
} from './styled'

export default class DocumentsScreen extends Component {
  render () {
    const files = []
    return (
      <Container>
        {files.length > 0
          ? <ScrollContainer>{this.renderFiles(files)}</ScrollContainer>
          : <Text>There are no files to show.</Text>}
      </Container>
    )
  }

  renderFiles (files) {
    return files.map((file, index) => {
      const { fileName } = file
      return (
        <ListItem
          key={index}
          leftIcon={{name: 'file', type: 'font-awesome'}}
          rightElement={this.renderRightItem()}
          title={fileName}
          bottomDivider
          rightSubtitle='File size: 200kb'
        />
      )
    })
  }

  renderRightItem () {
    return (
      <FlexRow>
        <Icon
          name='download'
          type='font-awesome'
          containerStyle={styles.marginRight}
        />
        <Icon
          name='times'
          type='font-awesome'
        />
      </FlexRow>
    )
  }
}
