import React, { Component } from 'react'
import { getQRCodeImage } from '../services/qrcode'
import { inject, observer } from 'mobx-react'
import Loader from 'react-loader-spinner'

@inject('store')
@observer
class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qrCodeImageUrl: '',
      loading: false,
    }
    this.store = this.props.store
  }

  componentDidMount = async () => {
    this.setState({ loading: true })
    if (this.store.qrcode) {
      await this.store.qrcode.get()
    }
    this.getQRCodeImageUrl()
  }

  async getQRCodeImageUrl() {
    let qrcode = this.store.qrcode.qrcode
    if (!qrcode || !qrcode.imageName) {
      this.setState({ loading: false })
      return false
    }
    const qrCodeImageUrl = await getQRCodeImage(qrcode.imageName)
    this.setState({ qrCodeImageUrl, loading: false })
  }

  render() {
    return (
      <section style={{ paddingTop: '1rem' }}>
        <div className=" has-background-primary">
          <div className="container">
            <div className="columns">
              <div className="column">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flensfrontu%2F&tabs&width=340&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=245078872972696"
                  width="340"
                  height="214"
                  style={{ border: 'none', overflow: 'hidden', margin: '1rem' }}
                  scrolling="no"
                  allow="encrypted-media"
                />
              </div>
              <div className="column">
                {this.state.loading ? (
                  <Loader
                    type="ThreeDots"
                    color="#f5f5f5"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                  />
                ) : this.state.qrCodeImageUrl ? (
                  <img src={this.state.qrCodeImageUrl} />
                ) : null}
              </div>
              <div className="column">
                <h5 className="is-size-5">LENS FRONT U</h5>
                <p>เช่ากล้องเช่าเลนส์เชียงใหม่</p>
                <p>
                  ตึกแถวติดโรงเรียน มุทิตาช ประชารักษ์ ซอยทางเข้าวัดประทานพร
                </p>
                <p>เปิดทำการทุกวัน 11.00-20.00</p>
                <br />
                <p>ติดต่อสอบถามข้อมูล รายละเอียดการเช่า ข้อสงสัยต่าง ๆ</p>
                <p>โทร 091 858 8467</p>
              </div>
            </div>
          </div>
          <nav className="navbar is-primary">
            <div className="navbar-brand container">
              <span className="navbar-item nowrap has-text-pink">
                Copyright 2019 lensfrontu.com | All Rights Reserved | Powered by
                pullptong
              </span>
            </div>
          </nav>
        </div>
      </section>
    )
  }
}

export default Footer
