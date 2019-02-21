import React, { Component } from 'react'
import {
  Icon,
  SearchBar
} from 'react-native-elements'
import {
  DrawerIconButton,
  HeaderContainer,
  HeaderTitle,
  SearchButton,
  styles
} from './styled'

export const DrawerIcon = ({...props}) => {
  return (
    <DrawerIconButton {...props}>
      <Icon
        type='font-awesome'
        name='bars'
      />
    </DrawerIconButton>
  )
}

export class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false,
      search: ''
    }
    this.toggleInput = this.toggleInput.bind(this)
    this.handleSearchText = this.handleSearchText.bind(this)
  }
  render () {
    const { isVisible, search } = this.state
    const { navigation, title } = this.props
    return (
      <HeaderContainer>
        <DrawerIcon onPress={navigation.toggleDrawer} />
        {isVisible
          ? <SearchBar
            placeholder='Search'
            platform='android'
            onChangeText={this.handleSearchText}
            containerStyle={styles.searchContainer}
            inputStyle={styles.searchInput}
            value={search}
          />
          : <HeaderTitle>Title</HeaderTitle>}
        <SearchButton onPress={this.toggleInput}>
          <Icon
            type='font-awesome'
            name='caret-left'
            size={15}
            containerStyle={styles.iconMargin}
          />
          <Icon
            type='font-awesome'
            name='search'
          />
        </SearchButton>
      </HeaderContainer>
    )
  }

  handleSearchText (search) {
    this.setState({ search })
  }

  toggleInput () {
    const { isVisible } = this.state
    this.setState({ isVisible: !isVisible })
  }
}
