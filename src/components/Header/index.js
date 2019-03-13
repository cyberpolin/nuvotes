import React, { Component } from 'react'
import { Animated } from 'react-native'
import { connect } from 'react-redux'
import {
  Icon,
  SearchBar
} from 'react-native-elements'
import {
  DrawerIconButton,
  HeaderContainer,
  HeaderTitle,
  SearchButton,
  styles,
  ButtonContainer,
  EditTitle
} from './styled'
import { translate } from '../../helpers/localization'
import { getSearch } from '../../actions/search'
import { widthPercentageToDP as wp } from '../../utils/layout'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false,
      search: ''
    }
    this.toggleInput = this.toggleInput.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.renderSearchInput = this.renderSearchInput.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
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
    const { getSearch } = this.props
    return (
      <Animated.View style={{width: this.width}}>
        <SearchBar
          placeholder={translate.search}
          onChangeText={this.onChangeText}
          containerStyle={styles.searchContainer}
          inputStyle={styles.searchInput}
          inputContainerStyle={styles.searchInputContainer}
          value={search}
          lightTheme
          autoCapitalize='none'
          autoCorrect={false}
          onSubmitEditing={this.handleSearch}
          onClear={() => getSearch('')}
          searchIcon={<Icon
            name='search'
            type='font-awesome'
            size={20}
            onPress={this.handleSearch}
          />}
        />
      </Animated.View>
    )
  }

  handleSearch () {
    const { search } = this.state
    const { getSearch } = this.props
    getSearch(search)
  }

  onChangeText (search) {
    this.setState({search})
  }

  toggleInput () {
    const { isVisible } = this.state
    const inputWidth = wp(70)
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

export const EditButton = (navigation, routeName) => {
  return (
    <ButtonContainer onPress={() => navigation.navigate(routeName)}>
      <EditTitle>{translate.edit}</EditTitle>
    </ButtonContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  getSearch: search => {
    dispatch(getSearch(search))
  }
})

export default connect(null, mapDispatchToProps)(Header)
