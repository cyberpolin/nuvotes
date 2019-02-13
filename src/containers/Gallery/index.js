import React, { Component } from 'react'
import ImageBrowser from 'react-native-interactive-image-gallery'
import {
  Container
} from './styled'

const imageArray = [
  {id: '1234', URI: 'https://cdn.houseplans.com/product/q5qkhirat4bcjrr4rpg9fk3q94/w800x533.jpg?v=8', thumbnail: 'https://cdn.houseplans.com/product/q5qkhirat4bcjrr4rpg9fk3q94/w800x533.jpg?v=8'},
  {id: '123', URI: 'https://cdn.aarp.net/content/dam/aarp/home-and-family/your-home/2018/06/1140-house-inheriting.imgcache.rev68c065601779c5d76b913cf9ec3a977e.jpg', thumbnail: 'https://cdn.aarp.net/content/dam/aarp/home-and-family/your-home/2018/06/1140-house-inheriting.imgcache.rev68c065601779c5d76b913cf9ec3a977e.jpg'},
  {id: '222', URI: 'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1', thumbnail: 'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1'}
]

export default class Gallery extends Component {
  render () {
    const { navigation } = this.props
    const galleryType = navigation.getParam('galleryType', '')
    const orderId = navigation.getParam('orderId', '')
    return (
      <Container>
        <ImageBrowser
          images={imageArray}
        />
      </Container>
    )
  }
}
