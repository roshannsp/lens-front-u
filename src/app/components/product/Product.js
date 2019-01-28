import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { storage } from '../../lib/firebase'
import Link from 'next/link'
import { withRouter } from 'next/router'
import 'lodash'
// import bulmaCalendar from '../../../../node_modules/bulma-calendar/dist/js/bulma-calendar.min.js'
import Slider from 'react-slick'
import { BeatLoader, HashLoader } from 'react-spinners'
import ImageLoader from 'react-load-image'

@inject('store')
@observer
class Product extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      product: {},
      nav1: null,
      nav2: null,
      loading: true
    }
  }

  async getProductImage(brand, product) {
    const imagePromises = product.images.map(async image => {
      const imageUrl = await this.getImage(brand, image)
      return imageUrl
    })
    product.images = await Promise.all(imagePromises)
    product.brand = brand
    this.setState({ product, loading: false })
  }

  getImage = async (brand, imageName) => {
    const storageRef = storage.ref(`images/brands/${brand}/${imageName}`)
    const imageUrl = await storageRef.getDownloadURL()
    return imageUrl
  }

  renderImages(product, type) {
    return product.images.map((image, index) => (
      <div key={index}>
        <ImageLoader src={image}>
          <img />
          <div>Error!</div>
          {type === 0 ? (
            <div className="product-hash-loader1">
              <HashLoader color={'#f2acc7'} loading={true} />
            </div>
          ) : (
            <div className="product-hash-loader2">
              <HashLoader color={'#f2acc7'} loading={true} />
            </div>
          )}
        </ImageLoader>
      </div>
    ))
  }

  componentDidMount = async () => {
    const { query } = this.props.router
    await this.store.brand.getProduct(query.brand, query.id)
    const product = this.props.store.brand.product
    this.getProductImage(query.brand, product)
    const options = {
      isRange: true,
      dateFormat: 'DD/MM/YYYY',
      showFooter: false
    }
    // const calendars = bulmaCalendar.attach('[type="date"]', options)
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    })
  }

  render() {
    const brands = this.props.store.brand.brands
    const product = this.state.product
    return (
      <main>
        {this.store.brand.getProductStatus === 'LOADING' &&
        this.state.loading ? (
          <div className="product-clip-loader">
            <BeatLoader color={'#f2acc7'} loading={true} />
          </div>
        ) : (
          <div>
            <div className="columns is-desktop">
              <div
                className="column is-half-desktop"
                style={{ padding: '0 3rem 0 3rem' }}
              >
                <div>
                  <Slider
                    asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}
                  >
                    {product && product.images
                      ? this.renderImages(product, 0)
                      : ''}
                  </Slider>
                  {product && product.images && product.images.length > 1 && (
                    <Slider
                      asNavFor={this.state.nav1}
                      ref={slider => (this.slider2 = slider)}
                      slidesToShow={3}
                      swipeToSlide={true}
                      focusOnSelect={true}
                    >
                      {product && product.images
                        ? this.renderImages(product, 1)
                        : ''}
                    </Slider>
                  )}
                </div>
              </div>
              <div
                className="column is-half-desktop"
                style={{ padding: '0 3rem 0 3rem' }}
              >
                <p className="has-text-weight-bold">{product.name}</p>
                <p className="has-text-weight-bold has-text-danger">
                  {product.price} บาท/วัน
                </p>
                <hr />
                <p className="has-text-weight-bold has-text-danger">
                  ตรวจสอบคิวว่าง
                </p>
                <br />
                <p
                  className="has-text-weight-bold"
                  style={{ textDecoration: 'underline' }}
                >
                  โปรโมชั่นแนะนำ
                </p>
                <p>
                  - เช่า 7 วัน ราคา{' '}
                  <span style={{ textDecoration: 'line-through' }}>
                    {product.price * 7 || ''}
                  </span>{' '}
                  - {product.price * 5 || ''} บาท
                </p>
                <p>
                  - เช่า 4 วัน ราคา{' '}
                  <span style={{ textDecoration: 'line-through' }}>
                    {product.price * 4 || ''}
                  </span>{' '}
                  - {product.price * 3 || ''} บาท
                </p>
                <hr />
                <div className="field">
                  <div className="control">
                    <p>ตั้งแต่</p>
                    <input
                      className="input is-danger"
                      type="date"
                      placeholder="ตั้งแต่"
                    />
                  </div>
                  <div className="control">
                    <p>ถึง</p>
                    <input
                      className="input is-danger"
                      type="date"
                      placeholder="ถึง"
                    />
                  </div>
                </div>
                <a className="button is-danger">เช็คคิว | คำนวนราคา</a>
              </div>
            </div>
            <div className="box">
              <article className="media">
                <div className="media-content">
                  <div className="content columns is-desktop">
                    <div className="column is-half-desktop">
                      <p>Specifications</p>
                      <ul>
                        {product &&
                          product.specs &&
                          product.specs.map((spec, i) => (
                            <li key={i}>{spec}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="column is-half-desktop">
                      <p>อุปกรณ์ที่ให้ไปด้วย</p>
                      <ul>
                        {product &&
                          product.accessories &&
                          product.accessories.map((accessory, i) => (
                            <li key={i}>{accessory}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        )}
      </main>
    )
  }
}

Product.propTypes = {
  store: PropTypes.object
}

export default withRouter(Product)
