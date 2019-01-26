import React, { Component } from 'react'
import { storage } from '../lib/firebase'
import { observer, inject } from 'mobx-react'
import { Promise } from 'core-js'
import Link from 'next/link'
import 'babel-polyfill'

@inject('store')
@observer
export default class BrandList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brands: []
    }
    this.getImage = this.getImage.bind(this)
  }

  componentDidMount() {
    const brands = this.props.store.brand.brands
    if (!_.isEmpty(brands) && brands[Object.keys(brands)[0]].thumbnailUrl) {
      this.setState({ brands })
      return false
    } else {
      this.fetchThumbnailUrl()
    }
  }

  componentWillReact() {
    const brands = this.props.store.brand.brands
    if (!_.isEmpty(brands) && brands[Object.keys(brands)[0]].thumbnailUrl) {
      this.setState({ brands })
      return false
    } else {
      this.fetchThumbnailUrl()
    }
  }

  fetchThumbnailUrl = async () => {
    const brands = this.props.store.brand.brands
    const brandsImageUrlPromises = Object.keys(brands).map(async key => {
      return {
        brand: key,
        thumbnailUrl: await this.getImage(brands[key].thumbnail)
      }
    })
    const brandImageUrls = await Promise.all(brandsImageUrlPromises)
    brandImageUrls.map(brandImageUrl => {
      brands[brandImageUrl.brand].thumbnailUrl = brandImageUrl.thumbnailUrl
    })
    this.props.store.brand.set(brands)
    this.setState({
      brands
    })
  }

  getImage = async imageName => {
    const storageRef = storage.ref(`images/brands/${imageName}`)
    const imageUrl = await storageRef.getDownloadURL()
    return imageUrl
  }

  renderBrands(brands) {
    return Object.keys(brands).map(key => {
      return (
        <div key={key} className="column is-one-third">
          <Link
            href={{
              pathname: '/products',
              query: { brand: key }
            }}
          >
            <img src={brands[key].thumbnailUrl} />
          </Link>
        </div>
      )
    })
  }

  render() {
    const brands = this.props.store.brand.brands
    const brandImageUrls = this.state.brands
    return (
      <Link href="/products">
        <div className="columns">{this.renderBrands(brandImageUrls)}</div>
      </Link>
    )
  }
}
