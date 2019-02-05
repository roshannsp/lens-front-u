import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import 'lodash'
import Slider from 'react-slick'
import { BeatLoader, HashLoader } from 'react-spinners'
import ImageLoader from 'react-load-image'
import { getProductImage } from '../../services/product'
import moment from 'moment'
import MessageModal from './MessageModal'

@inject('store')
@observer
class Product extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      product: {},
      loading: true,
      startDate: '',
      endDate: '',
      isMessageModalActive: false,
      message: '',
      subMessage: '',
      subMessage2: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.getAvailableProducts = this.getAvailableProducts.bind(this)
    this.closeMessageModal = this.closeMessageModal.bind(this)
    this.openLine = this.openLine.bind(this)
  }

  async getProductImage() {
    const { query } = this.props.router
    const products = this.store.product.products
    const product = products.find(product => product.id === query.id)
    if (!product) {
      this.setState({ loading: false })
      return false
    }
    const imagePromises = product.images.map(async image => {
      let imageUrl = image
      if (!imageUrl.includes('firebasestorage')) {
        imageUrl = await getProductImage(image)
      }
      return imageUrl
    })
    product.images = await Promise.all(imagePromises)
    this.setState({ product, loading: false })
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
    if (_.isEmpty(this.store.product.products)) {
      await this.store.product.get()
    }
    this.getProductImage()
  }

  handleInputChange(event) {
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if (
      name === 'startDate' &&
      (this.state.endDate === '' ||
        (this.state.endDate &&
          moment(this.state.endDate).isBefore(moment(value))))
    ) {
      this.setState({
        endDate: value
      })
    }

    if (
      name === 'endDate' &&
      this.state.startDate &&
      moment(this.state.startDate).isAfter(moment(value))
    ) {
      this.setState({
        startDate: ''
      })
    }

    this.setState({
      [name]: value
    })
  }

  getAvailableProducts = async () => {
    const { startDate, endDate } = this.state
    await this.store.queue.getQueuesForChecking(startDate, endDate)
    const queues = this.store.queue.queuesForChecking
    const product = Object.assign({}, this.state.product)
    queues.map(queue => {
      if (product.id === queue.productId) {
        product.amount--
      }
    })
    if (product.amount > 0) {
      const diffDay = moment(endDate).diff(moment(startDate), 'days') + 1
      const dateFormat = 'DD/MM/YYYY'
      const subMessage2 = `ตั้งแต่ ${moment(startDate).format(
        dateFormat
      )} ถึง ${moment(endDate).format(
        dateFormat
      )} รวม ${diffDay} วัน ${diffDay * product.price} บาท`
      this.setState({
        message: `คิวที่คุณเลือก ว่าง`,
        subMessage: product.name,
        subMessage2,
        isMessageModalActive: true
      })
    } else {
      this.setState({
        message: 'คิวที่คุณเลือก ไม่ว่าง',
        isMessageModalActive: true
      })
    }
  }

  onSlideChange(next) {
    this.slider1.slickGoTo(next)
    this.slider2.slickGoTo(next)
  }

  openMessageModal() {
    this.setState({ isMessageModalActive: true })
  }

  closeMessageModal() {
    this.setState({ isMessageModalActive: false })
  }

  openLine() {
    const { product, startDate, endDate } = this.state
    const dateFormat = 'DD/MM/YYYY'
    let message = `สนใจเช่า ${product.name} ตั้งแต่ ${moment(startDate).format(
      dateFormat
    )} ถึง ${moment(endDate).format(dateFormat)}`
    message = encodeURIComponent(message)
    // window.location.href = `line://oaMessage/@lensfrontu/?${message}`
    // window.location.href = `https://line.me/R/ti/p/lensfrontu`
  }

  render() {
    const forUpdate = this.props.store.product.products
    const product = this.state.product
    const isLoading =
      this.store.product.getProductStatus === 'LOADING' || this.state.loading
    const settings = {
      beforeChange: (current, next) => this.onSlideChange(next)
    }
    const {
      startDate,
      endDate,
      message,
      subMessage,
      subMessage2,
      isMessageModalActive
    } = this.state
    return (
      <main>
        {isLoading ? (
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
                <p className="is-size-4 has-text-weight-bold">{product.name}</p>
                <p className="is-size-5 has-text-weight-bold has-text-info has-text-underline">
                  {product.price} บาท/วัน
                </p>
                <div>
                  <Slider
                    infinite={true}
                    arrows={false}
                    ref={slider => (this.slider1 = slider)}
                    {...settings}
                  >
                    {product && product.images && this.renderImages(product, 0)}
                  </Slider>
                  {product && product.images && product.images.length > 1 && (
                    <Slider
                      {...settings}
                      slidesToShow={3}
                      swipeToSlide={true}
                      focusOnSelect={true}
                      ref={slider => (this.slider2 = slider)}
                    >
                      {product &&
                        product.images &&
                        this.renderImages(product, 1)}
                    </Slider>
                  )}
                </div>
              </div>
              <div
                className="column is-half-desktop"
                style={{ padding: '0 3rem 0 3rem' }}
              >
                {product && product.specs && product.specs.length > 0 && (
                  <div>
                    <p className="title is-5 has-text-info has-text-underline">
                      สเปค
                    </p>
                    <ul>
                      {product.specs.map((spec, i) => (
                        <li className="is-size-6 icon-w-text" key={i}>
                          <p
                            className="icon is-small"
                            style={{ marginTop: '5px' }}
                          >
                            <i className="fas fa-minus" />
                          </p>
                          <p style={{ paddingLeft: '0.5rem' }}>{spec}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product &&
                  product.accessories &&
                  product.accessories.length > 0 && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <p className="title is-5 has-text-info has-text-underline">
                        อุปกรณ์ที่ให้ไปด้วย
                      </p>
                      <ul>
                        {product.accessories.map((accessory, i) => (
                          <li className="is-size-6 icon-w-text" key={i}>
                            <p
                              className="icon is-small"
                              style={{ marginTop: '5px' }}
                            >
                              <i className="fas fa-minus" />
                            </p>
                            <p style={{ paddingLeft: '0.5rem' }}>{accessory}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
            <div className="box">
              <article className="media">
                <div className="media-content">
                  <div className="content is-desktop">
                    <p className="title is-size-5 has-text-info has-text-underline">
                      ตรวจสอบคิวว่าง
                    </p>
                    <div className="field columns">
                      <div className="control column">
                        <p className="has-text-weight-bold">ตั้งแต่</p>
                        <input
                          className="input is-info"
                          type="date"
                          placeholder="ตั้งแต่"
                          name="startDate"
                          value={this.state.startDate}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="control column">
                        <p className="has-text-weight-bold">ถึง</p>
                        <input
                          className="input is-info"
                          type="date"
                          placeholder="ถึง"
                          name="endDate"
                          value={this.state.endDate}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <a
                      className="button is-info"
                      style={{ marginTop: '1rem' }}
                      disabled={!startDate || !endDate}
                      onClick={this.getAvailableProducts}
                    >
                      เช็คคิว | คำนวนราคา
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        )}
        <MessageModal
          isActive={isMessageModalActive}
          closeModal={this.closeMessageModal}
          openLine={this.openLine}
          message={message}
          subMessage={subMessage}
          subMessage2={subMessage2}
        />
      </main>
    )
  }
}

Product.propTypes = {
  store: PropTypes.object
}

export default withRouter(Product)
