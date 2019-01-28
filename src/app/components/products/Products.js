import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { storage } from '../../lib/firebase'
import Link from 'next/link'
import { withRouter } from 'next/router'
import 'lodash'
import { BeatLoader, HashLoader } from 'react-spinners'
import ImageLoader from 'react-load-image'

@inject('store')
@observer
class Products extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      products: [],
      brand: undefined,
      loading: false
    }
  }

  componentDidUpdate = async () => {
    const { query } = this.props.router
    if (this.state.brand !== query.brand && this.state.loading === false) {
      this.fetchProducts()
    }
  }

  componentDidMount = async () => {
    if (_.isEmpty(this.props.store.brand.brands)) {
      await this.store.brand.get()
    }
    this.fetchProducts()
  }

  fetchProducts = async () => {
    this.setState({ loading: true })
    const brands = this.props.store.brand.brands
    const { query } = this.props.router
    if (query && query.brand && !_.isEmpty(brands)) {
      this.setState({ products: [], brand: query.brand })
      const brand = brands[query.brand]
      if (brand.products) {
        const products = await this.getProductImage(query.brand, brand.products)
        this.setState({
          products: this.state.products.concat(products),
          loading: false
        })
      } else {
        this.setState({ loading: false })
      }
    } else {
      this.setState({ products: [], brand: undefined })
      Object.keys(brands).map(async key => {
        if (brands[key].products) {
          const products = await this.getProductImage(key, brands[key].products)
          this.setState({
            products: this.state.products.concat(products),
            loading: false
          })
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
    if (this.isHasImageUrl(products)) {
      return products
    }
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
    return newProducts
  }

  getImage = async (brand, imageName) => {
    const storageRef = storage.ref(`images/brands/${brand}/${imageName}`)
    const imageUrl = await storageRef.getDownloadURL()
    return imageUrl
  }

  renderProducts(products) {
    return products.map((product, index) => (
      <div key={index} className="column is-3">
        <div className="box">
          <article className="media">
            <div className="media-content">
              <div className="content">
                <Link
                  href={{
                    pathname: '/product',
                    query: { brand: product.brand, id: product.id }
                  }}
                >
                  <div>
                    <ImageLoader src={product.images[0]}>
                      <img />
                      <div>Error!</div>
                      <div className="products-hash-loader">
                        <HashLoader color={'#f2acc7'} loading={true} />
                      </div>
                    </ImageLoader>
                    <p
                      className="has-text-centered"
                      style={{
                        height: '48px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {product.name}
                    </p>
                    <p className="has-text-centered has-text-danger">
                      {product.price} บาท/วัน
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    ))
  }

  render() {
    const brands = this.props.store.brand.brands
    const products = this.state.products
    return (
      <main>
        {(this.store.brand.getBrandStatus === 'LOADING' ||
          this.state.loading) && (
          <div className="products-clip-loader">
            <BeatLoader color={'#f2acc7'} loading={true} />
          </div>
        )}
        <div className="columns is-multiline">
          {this.renderProducts(products)}
        </div>
      </main>
    )
  }
}

Products.propTypes = {
  store: PropTypes.object
}

export default withRouter(Products)
