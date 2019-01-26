import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { storage } from '../../lib/firebase'
import Link from 'next/link'
import { withRouter } from 'next/router'
import 'lodash'

@inject('store')
@observer
class Product extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      products: []
    }
  }

  async getProductImage(brand, products) {
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
    this.setState({ products: this.state.products.concat(newProducts) })
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

  componentDidMount = async () => {
    await this.store.brand.get()
    const brands = this.props.store.brand.brands
    const { query } = this.props.router
    if (query && query.brand) {
      const brand = brands[query.brand]
      if (brand.products) {
        this.getProductImage(query.brand, brand.products)
      }
    } else {
      Object.keys(brands).map(key => {
        if (brands[key].products) {
          this.getProductImage(key, brands[key].products)
        }
      })
    }
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

Product.propTypes = {
  store: PropTypes.object
}

export default withRouter(Product)
