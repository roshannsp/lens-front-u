import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { storage } from '../../lib/firebase'
import Link from 'next/link'
import { withRouter } from 'next/router'
import 'lodash'

@inject('store')
@observer
class Products extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      products: [],
      brand: undefined,
      fetching: false
    }
  }

  componentDidUpdate = async () => {
    const { query } = this.props.router
    if (this.state.brand !== query.brand && this.state.fetching === false) {
      this.fetchProducts()
    }
  }

  componentDidMount = async () => {
    if (_.isEmpty(this.props.store.brand.brands)) {
      await this.store.brand.get()
    }
    this.fetchProducts()
  }

  fetchProducts() {
    this.setState({ fetching: true })
    const brands = this.props.store.brand.brands
    const { query } = this.props.router
    if (query && query.brand && !_.isEmpty(brands)) {
      this.setState({ brand: query.brand })
      const brand = brands[query.brand]
      if (brand.products) {
        this.getProductImage(query.brand, brand.products)
      } else {
        this.setState({ fetching: false })
      }
    } else {
      this.setState({ brand: undefined })
      Object.keys(brands).map(key => {
        if (brands[key].products) {
          this.getProductImage(key, brands[key].products)
        }
      })
    }
  }

  isHasImageUrl(products) {
    if (
      products.length > 0 &&
      products[0].images.length > 0 &&
      products[0].images[0].includes('firebasestorage')
    ) {
      return true
    }
    return false
  }

  async getProductImage(brand, products) {
    console.log('loaddddd1')
    if (this.isHasImageUrl(products)) {
      this.setState({
        products: this.state.products.concat(products),
        fetching: false
      })
      return false
    }
    console.log('loaddddd')
    const productPromises = products.map(async product => {
      const imagePromises = product.images.map(async image => {
        const imageUrl = await this.getImage(brand, image)
        return imageUrl
      })
      product.images = await Promise.all(imagePromises)
      product.brand = brand
      return product
    })
    const newProducts = await Promise.all(productPromises)
    this.props.store.brand.setProducts(brand, products)
    this.setState({
      products: this.state.products.concat(newProducts),
      fetching: false
    })
  }

  getImage = async (brand, imageName) => {
    const storageRef = storage.ref(`images/brands/${brand}/${imageName}`)
    const imageUrl = await storageRef.getDownloadURL()
    return imageUrl
  }

  renderProducts(products) {
    return products.map((product, index) => (
      <div key={index} className="column is-one-third">
        <Link
          href={{
            pathname: '/product',
            query: { brand: product.brand, id: product.id }
          }}
        >
          <div>
            <img src={product.images[0]} />
            <p>{product.name}</p>
          </div>
        </Link>
      </div>
    ))
  }

  render() {
    const brands = this.props.store.brand.brands
    const products = this.state.products
    return (
      <main>
        <div className="columns">{this.renderProducts(products)}</div>
      </main>
    )
  }
}

Products.propTypes = {
  store: PropTypes.object
}

export default withRouter(Products)
