import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import 'lodash'
import Slider from 'react-slick'
import { getBannerImage } from './../services/banner'
import Products from './products/Products'
import Link from 'next/link'
import * as moment from 'moment'

@inject('store')
@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      banners: [],
      loading: false
    }
    this.store = this.props.store
  }

  componentDidMount = async () => {
    moment.locale('th')
    this.setState({ loading: true })
    if (
      this.store.banner &&
      this.store.banner.banners &&
      this.store.banner.banners.length === 0
    ) {
      await this.store.banner.get()
    }
    this.getBannerImage()
  }

  async getBannerImage() {
    let banners = this.store.banner.banners
    if (banners && banners.length === 0) {
      this.setState({ loading: false })
      return false
    }
    const imagePromises = banners.map(async banner => {
      if (!banner.imageUrl) {
        banner.imageUrl = await getBannerImage(banner.imageName)
      }
      return banner
    })
    banners = await Promise.all(imagePromises)
    this.setState({ banners, loading: false })
  }

  render() {
    const forUpdate = this.store.banner.banners
    const banners = this.state.banners
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      cssEase: 'linear'
    }
    return (
      <main>
        <Slider {...settings}>
          {banners &&
            banners.map((banner, i) => {
              return (
                banner.imageUrl && (
                  <a key={i} href={banner.link}>
                    <img className="image-fluid" src={banner.imageUrl} />
                  </a>
                )
              )
            })}
        </Slider>
        <Header />
        <div className="container" style={{ paddingTop: 2 + 'rem' }}>
          <h1 className="title is-size-2 has-text-light header-title">แนะนำ</h1>
          <Products isRecommended={true} />
          <hr />
          <div>
            <h1 className="is-size-3 has-text-centered">
              ร้าน LensFrontU ให้เช่ากล้อง เช่าเลนส์ และ ให้เช่าอุปกรณ์ถ่ายภาพ
              DSLR Mirrorless ทุกระดับ Canon · Nikon · Sony · Leica · Fujifilm ·
              Olympus · GoPro · DJI OSMO
            </h1>
            <hr />
          </div>
        </div>
        <Footer />
      </main>
    )
  }
}

App.propTypes = {
  store: PropTypes.object
}

export default App
