import React, { Component } from 'react'
import { Button } from 'react-native'
import { connect } from 'react-redux'
import { changeLanguage } from '../../actions/language'
import { getLanguageToChange } from '../../helpers/localization'
import {
  Container,
  Text
} from './styled'

class Orders extends Component {
  render () {
    const { changeLanguage } = this.props
    return (
      <Container>
        <Text>ORDERS SCREEN</Text>
        <Button
          title='TO PROFILE'
          onPress={() => this.props.navigation.navigate('Profile')}
        />
        <Button
          title='Change Language'
          onPress={() => this.handleLanguage()}
        />
      </Container>
    )
  }

  handleLanguage () {
    console.log(getLanguageToChange())
  }
}

const mapStateToProps = ({language}) => ({
  language
})

const mapDispatchToProps = dispatch => {
  return {
    changeLanguage: (language) => {
      dispatch(changeLanguage(language))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
