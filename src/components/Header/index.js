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

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false,
      search: ''
    }
    this.toggleInput = this.toggleInput.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.handleOnSearch = this.handleOnSearch.bind(this)
  }
  render () {
    const { isVisible, search } = this.state
    const { navigation, title } = this.props
    return (
      <HeaderContainer>
        <DrawerIconButton onPress={navigation.toggleDrawer}>
          <Icon
            type='font-awesome'
            name='bars'
          />
        </DrawerIconButton>
        {isVisible
          ? <SearchBar
            placeholder='Search'
            onChangeText={this.onChangeText}
            containerStyle={styles.searchContainer}
            inputStyle={styles.searchInput}
            inputContainerStyle={styles.searchInputContainer}
            value={search}
            lightTheme
            onSubmitEditing={this.handleOnSearch}
            autoCapitalize='none'
            autoCorrect={false}
            searchIcon={<Icon
              name='search'
              type='font-awesome'
              size={20}
              onPress={this.handleOnSearch}
            />}
          />
          : <HeaderTitle>{title || 'Username'}</HeaderTitle>}
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

  handleOnSearch () {
  }

  onChangeText (search) {
    this.setState({ search })
  }

  toggleInput () {
    const { isVisible } = this.state
    this.setState({ isVisible: !isVisible })
  }
}
