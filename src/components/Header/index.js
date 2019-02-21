import React, { Component } from 'react'
import {
  Animated,
  Dimensions
} from 'react-native'
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
    this.renderSearchInput = this.renderSearchInput.bind(this)
    this.width = new Animated.Value(0)
  }
  render () {
    const { isVisible } = this.state
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
          ? this.renderSearchInput()
          : <HeaderTitle>{title || ''}</HeaderTitle>}
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

  renderSearchInput () {
    const { search } = this.state
    return (
      <Animated.View style={{width: this.width}}>
        <SearchBar
          placeholder='Search'
          onChangeText={this.onChangeText}
          containerStyle={styles.searchContainer}
          inputStyle={styles.searchInput}
          inputContainerStyle={styles.searchInputContainer}
          value={search}
          lightTheme
          autoCapitalize='none'
          autoCorrect={false}
          searchIcon={<Icon
            name='search'
            type='font-awesome'
            size={20}
          />}
        />
      </Animated.View>
    )
  }

  onChangeText (search) {
    this.setState({search})
  }

  toggleInput () {
    const { isVisible } = this.state
    const inputWidth = Dimensions.get('window').width * 0.7
    if (!isVisible) {
      this.setState({isVisible: !isVisible})
      const toValue = inputWidth
      this.width.setValue(0)
      Animated.timing(this.width, {
        toValue
      }).start()
    } else {
      const toValue = 0
      this.width.setValue(inputWidth)
      Animated.timing(this.width, {
        toValue
      }).start(() => this.setState({isVisible: !isVisible, search: ''}))
    }
  }
}
