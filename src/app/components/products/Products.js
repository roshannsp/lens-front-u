import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import 'lodash'
import ImageLoader from 'react-load-image'
import Loader from 'react-loader-spinner'
import { getProductImage } from '../../services/product'

@inject('store')
@observer
class Products extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      products: [],
      loading: true,
    }
  }

  componentDidMount = async () => {
    if (_.isEmpty(this.store.product.products)) {
      await this.store.product.get()
    }
    this.getProductImage()
  }

  getProductImage = async () => {
    const products = this.store.product.products
    const productPromises = products.map(async (product) => {
      const imagePromises = product.images.map(async (image) => {
        let imageUrl = image
        if (!imageUrl.includes('firebasestorage')) {
          imageUrl = await getProductImage(image)
        }
        return imageUrl
      })
      product.images = await Promise.all(imagePromises)
      return product
    })
    const newProducts = await Promise.all(productPromises)
    this.setState({ products: newProducts, loading: false })
  }

  renderProducts(products) {
    return products.map((product, index) => (
      <div
        key={index}
        className="column is-one-quarter-desktop is-half-mobile is-one-third-tablet"
        style={{ cursor: 'pointer' }}
      >
        <div>
          <article className="media">
            <div className="media-content">
              <div className="content">
                <Link
                  href={{
                    pathname: '/product',
                    query: { id: product.id },
                  }}
                >
                  <div>
                    <ImageLoader src={product.images[0]}>
                      <img />
                      <div>Error!</div>
                      <div className="products-hash-loader">
                        <Loader
                          type="ThreeDots"
                          color="#f5f5f5"
                          height={100}
                          width={100}
                          timeout={3000} //3 secs
                        />
                      </div>
                    </ImageLoader>
                    <p
                      className="has-text-centered"
                      style={{
                        height: '48px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
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

  renderCategory(products) {
    const isRecommended = this.props.isRecommended
    let tempProducts = [...products]
    if (isRecommended) {
      tempProducts = tempProducts.filter((product) => product.isRecommended)
      return (
        <div className="columns is-multiline is-mobile">
          {this.renderProducts(tempProducts)}
        </div>
      )
    } else {
      let categories = {}
      tempProducts.map((product) => {
        const category = product.category
        if (categories[category] === undefined) {
          categories[category] = []
        }
        categories[category].push(product)
      })
      return Object.keys(categories).map((key) => (
        <div key={key} style={{ padding: '1rem 0' }}>
          <h2 className="title has-text-light is-size-2 is-uppercase header-title">
            {key}
          </h2>
          <div
            className="columns is-multiline is-mobile"
            style={{ padding: '1rem 0' }}
          >
            {this.renderProducts(categories[key])}
          </div>
        </div>
      ))
    }
  }

  render() {
    const forUpdate = this.store.product.products
    const products = this.state.products
    return (
      <main style={{ padding: '1rem 0' }}>
        {(this.store.product.getProductStatus === 'LOADING' ||
          this.state.loading) && (
          <div className="products-clip-loader">
            <Loader
              type="ThreeDots"
              color="#f5f5f5"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        )}
        <div>{this.renderCategory(products)}</div>
      </main>
    )
  }
}

Products.propTypes = {
  store: PropTypes.object,
}

export default Products
