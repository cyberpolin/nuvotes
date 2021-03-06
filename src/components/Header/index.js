import React, { Component } from 'react'
import {
  Animated,
  View,
  Platform,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import {
  Icon,
  SearchBar
} from 'react-native-elements'
import _ from 'lodash'
import { HeaderBackButton } from 'react-navigation'
import {
  DrawerIconButton,
  HeaderContainer,
  HeaderTitle,
  SearchButton,
  styles,
  ButtonContainer,
  EditTitle,
  EmptyBox
} from './styled'
import { translate } from '../../helpers/localization'
import { getSearch } from '../../actions/search'
import { widthPercentageToDP as wp } from '../../utils/layout'
import { gray } from '../../colorPalette'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false,
      search: props.search
    }
    this.toggleInput = this.toggleInput.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.renderSearchInput = this.renderSearchInput.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.width = new Animated.Value(0)
  }
  render () {
    const { isVisible } = this.state
    const { navigation } = this.props
    const { first_name: firstName, last_name: lastName } = this.props.user
    const formattedName = `${_.capitalize(firstName)}  ${_.capitalize(lastName)}`
    return (
      <HeaderContainer>
        <DrawerIconButton onPress={navigation.toggleDrawer}>
          <Icon
            type='font-awesome'
            name='bars'
            color={gray}
          />
        </DrawerIconButton>
        {isVisible
          ? this.renderSearchInput()
          : <HeaderTitle>{formattedName || ''}</HeaderTitle>}
        <EmptyBox />
        {/* <SearchButton onPress={this.toggleInput}>
          <Icon
            type='font-awesome'
            name='caret-left'
            size={15}
            containerStyle={styles.iconMargin}
            color={gray}
          />
          <Icon
            type='font-awesome'
            name='search'
            color={gray}
          />
        </SearchButton> */}
      </HeaderContainer>
    )
  }

  renderSearchInput () {
    const { search } = this.state
    const { getSearch } = this.props
    return (
      <Animated.View style={{width: this.width}}>
        <SearchBar
          placeholder={translate.searchInput}
          onChangeText={this.onChangeText}
          containerStyle={styles.searchContainer}
          inputStyle={styles.searchInput}
          inputContainerStyle={styles.searchInputContainer}
          value={search}
          lightTheme
          autoCapitalize='none'
          autoCorrect={false}
          onSubmitEditing={this.handleSearch}
          searchIcon={false}
          onClear={() => getSearch('')}
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
      }).start(() => this.setState({isVisible: !isVisible}))
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

const mapStateToProps = ({ user, search }) => ({
  user,
  search
})

const mapDispatchToProps = dispatch => ({
  getSearch: search => {
    dispatch(getSearch(search))
  }
})

const CustomBackButton = props => {
  const { isUploading, navigation } = props
  return (
    <HeaderBackButton
      tintColor='black'
      onPress={() => {
        isUploading
          ? Alert.alert(
            translate.backMessage,
            translate.backDescription,
            [
              {text: translate.cancel},
              {text: 'Ok', onPress: () => navigation.goBack()}
            ]
          )
          : navigation.goBack()
      }}
    />
  )
}

const mapStateToPropsBackButton = ({ settings }) => ({
  isUploading: settings.isUploading
})

export const BackButton = connect(mapStateToPropsBackButton, null)(CustomBackButton)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
