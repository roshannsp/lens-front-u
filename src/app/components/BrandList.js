import React, { Component } from 'react'
import { storage } from '../lib/firebase'
import { observer, inject } from 'mobx-react'
import { Promise } from 'core-js'

@inject('store')
@observer
export default class BrandList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brandImageUrls: []
    }
    this.getImage = this.getImage.bind(this)
  }

  componentWillReact() {
    const brands = this.props.store.brand.brands
    const brandsImageUrlPromises = Object.keys(brands).map(async key => {
      return await this.getImage(brands[key].thumbnail)
    })
    this._asyncRequest = Promise.all(brandsImageUrlPromises).then(
      brandImageUrls =>
        this.setState({
          brandImageUrls
        })
    )
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel()
    }
  }

  getImage = async imageName => {
    const storageRef = storage.ref(`images/brands/${imageName}`)
    const imageUrl = await storageRef.getDownloadURL()
    return imageUrl
  }

  renderBrands(brandImageUrls) {
    return brandImageUrls.map((imageUrl, index) => {
      return (
        <div key={index} className="column is-one-third">
          <img src={imageUrl} />
        </div>
      )
    })
  }

  render() {
    const brands = this.props.store.brand.brands
    const brandImageUrls = this.state.brandImageUrls
    return <div className="columns">{this.renderBrands(brandImageUrls)}</div>
  }
}
