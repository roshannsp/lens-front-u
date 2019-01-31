import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { storage } from '../../lib/firebase'
import Link from 'next/link'
import 'lodash'
import { BeatLoader, HashLoader } from 'react-spinners'
import ImageLoader from 'react-load-image'
import { getProductImage } from '../../services/product'

@inject('store')
@observer
class Products extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      products: [],
      loading: true
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
    const productPromises = products.map(async product => {
      const imagePromises = product.images.map(async image => {
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
      <div key={index} className="column is-3">
        <div className="box">
          <article className="media">
            <div className="media-content">
              <div className="content">
                <Link
                  href={{
                    pathname: '/product',
                    query: { id: product.id }
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
    const forUpdate = this.store.product.products
    const products = this.state.products
    return (
      <main>
        {(this.store.product.getProductStatus === 'LOADING' ||
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

export default Products
