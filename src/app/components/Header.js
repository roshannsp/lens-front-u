import React, { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false
    }
    this.toggleBurger = this.toggleBurger.bind(this)
  }

  toggleBurger() {
    this.setState({ isActive: !this.state.isActive })
  }

  render() {
    const isActive = oldClass => {
      return oldClass + (this.state.isActive ? ' is-active' : '')
    }
    return (
      <section>
        <Head>
          <title>Lens Front U</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <nav className="navbar is-primary">
          <div className="navbar-brand container">
            <span
              className="navbar-item has-text-pink"
              style={{
                whiteSpace: 'nowrap',
                fontSize: '13px',
                overflow: 'hidden'
              }}
            >
              ร้านให้เช่าเลนส์ เช่ากล้อง DSLR · Mirrorless · GoPro ชั้น 12
              อาคารเอเชีย (ตึกจอดรถโรงแรมเอเชีย) ติด BTS ราชเทวี
              กรุงเทพ|lenslineuprental@gmail.com
            </span>
          </div>
        </nav>
        <div
          className="is-flex"
          style={{
            justifyContent: 'center',
            width: 'auto',
            backgroundColor: 'black',
            alignItems: 'center'
          }}
        >
          <img src="https://firebasestorage.googleapis.com/v0/b/lens-front-u-dev.appspot.com/o/images%2Flens-front-u-logo.jpg?alt=media" />
        </div>
        <nav className="navbar is-primary">
          <div className="navbar-brand">
            <a
              className={isActive('navbar-burger burger')}
              onClick={this.toggleBurger}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div className={isActive('navbar-menu')}>
            <div className="navbar-start container">
              <Link href="/">
                <a className="navbar-item">หน้าแรก</a>
              </Link>
              <Link href="/products">
                <a className="navbar-item">รายการทั้งหมด</a>
              </Link>
              <Link href="/instruction">
                <a className="navbar-item">ขั้นตอนการเช่า / เงื่อนไข</a>
              </Link>
              <Link href="/contact">
                <a className="navbar-item">ติดต่อ</a>
              </Link>
            </div>
          </div>
        </nav>
      </section>
    )
  }
}

export default Header
