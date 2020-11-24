import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import 'lodash'
import Slider from 'react-slick'
import ImageLoader from 'react-load-image'
import Loader from 'react-loader-spinner'
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
      title: '',
      productName: '',
      startDateMessage: '',
      endDateMessage: '',
      totalPriceMessage: '',
      isProductAvailable: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.getAvailableProducts = this.getAvailableProducts.bind(this)
    this.closeMessageModal = this.closeMessageModal.bind(this)
    this.openUrlScheme = this.openUrlScheme.bind(this)
    moment.locale('th')
  }

  async getProductImage() {
    const { query } = this.props.router
    const products = this.store.product.products
    const product = products.find((product) => product.id === query.id)
    if (!product) {
      this.setState({ loading: false })
      return false
    }
    const imagePromises = product.images.map(async (image) => {
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
          <img style={{ maxHeight: '50vh', margin: 'auto' }} />
          <div>Error!</div>
          {type === 0 ? (
            <div className="product-hash-loader1">
              <Loader
                type="ThreeDots"
                color="#f5f5f5"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            </div>
          ) : (
            <div className="product-hash-loader2">
              <Loader
                type="ThreeDots"
                color="#f5f5f5"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
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
        endDate: value,
      })
    }

    if (
      name === 'endDate' &&
      this.state.startDate &&
      moment(this.state.startDate).isAfter(moment(value))
    ) {
      this.setState({
        startDate: '',
      })
    }

    this.setState({
      [name]: value,
    })
  }

  getAvailableProducts = async () => {
    const { startDate, endDate } = this.state
    const tempStartDate = moment(startDate)
    const tempEndsDate = moment(endDate)
    if (tempStartDate.isSame(tempEndsDate)) {
      this.setState({
        title: 'ผิดพลาด',
        productName: 'ไม่สามารถเลือกวันเดียวกันได้',
        isMessageModalActive: true,
        isProductAvailable: false,
      })
      return
    }
    await this.store.queue.getQueuesForChecking(startDate, endDate)
    const queues = this.store.queue.queuesForChecking
    const product = Object.assign({}, this.state.product)
    queues.map((queue) => {
      if (product.id === queue.productId) {
        product.amount--
      }
    })
    if (product.amount > 0) {
      const diffDay = moment(endDate).diff(moment(startDate), 'days')
      const dateFormat = 'D MMMM YYYY'
      const startDateMessage = `รับของวันที่ ${moment(startDate).format(
        dateFormat
      )} `
      const endDateMessage = `คืนของวันที่ ${moment(endDate).format(
        dateFormat
      )}`
      const totalPriceMessage = `รวม ${diffDay} วัน ${diffDay *
        product.price} บาท`
      this.setState({
        title: 'คิวที่คุณเลือก ว่าง',
        productName: product.name,
        startDateMessage,
        endDateMessage,
        totalPriceMessage,
        isMessageModalActive: true,
        isProductAvailable: true,
      })
    } else {
      this.setState({
        title: 'คิวที่คุณเลือก ไม่ว่าง',
        productName: 'กรุณาเลือกใหม่',
        isMessageModalActive: true,
        isProductAvailable: false,
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

  openUrlScheme() {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const Android = /Android/.test(navigator.userAgent)
    if (iOS || Android) {
      window.location.href = 'fb-messenger://user-thread/lensfrontu'
    } else {
      window.location.href = 'https://www.facebook.com/messages/t/lensfrontu'
    }
  }

  render() {
    const forUpdate = this.props.store.product.products
    const product = this.state.product
    const isLoading =
      this.store.product.getProductStatus === 'LOADING' || this.state.loading
    const settings = {
      beforeChange: (current, next) => this.onSlideChange(next),
    }
    const {
      startDate,
      endDate,
      title,
      productName,
      startDateMessage,
      endDateMessage,
      totalPriceMessage,
      isMessageModalActive,
      isProductAvailable,
    } = this.state
    return (
      <main>
        {isLoading ? (
          <div className="product-clip-loader">
            <Loader
              type="ThreeDots"
              color="#f5f5f5"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
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
                    ref={(slider) => (this.slider1 = slider)}
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
                      ref={(slider) => (this.slider2 = slider)}
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
                        <p className="has-text-weight-bold">วันที่รับของ</p>
                        <input
                          className="input is-info"
                          type="date"
                          placeholder="วันที่รับของ"
                          name="startDate"
                          value={this.state.startDate}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="control column">
                        <p className="has-text-weight-bold">วันที่คืนของ</p>
                        <input
                          className="input is-info"
                          type="date"
                          placeholder="วันที่คืนของ"
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
          openUrlScheme={this.openUrlScheme}
          title={title}
          productName={productName}
          startDateMessage={startDateMessage}
          endDateMessage={endDateMessage}
          totalPriceMessage={totalPriceMessage}
          isProductAvailable={isProductAvailable}
        />
      </main>
    )
  }
}

Product.propTypes = {
  store: PropTypes.object,
}

export default withRouter(Product)
