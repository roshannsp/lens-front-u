import React, { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import CheckQueueModal from './check-queue/CheckQueueModal'
import CheckedQueueModal from './check-queue/CheckedQueueModal'
import { inject, observer } from 'mobx-react'
import 'babel-polyfill'

@inject('store')
@observer
class Header extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      isActive: false,
      isCheckQueueModalActive: false,
      isCheckedQueueModalActive: false,
      checkedQueue: []
    }
    this.toggleBurger = this.toggleBurger.bind(this)
    this.openCheckQueueModal = this.openCheckQueueModal.bind(this)
    this.openCheckedQueueModal = this.openCheckedQueueModal.bind(this)
    this.closeCheckQueueModal = this.closeCheckQueueModal.bind(this)
    this.closeCheckedQueueModal = this.closeCheckedQueueModal.bind(this)
    this.checkQueue = this.checkQueue.bind(this)
  }

  toggleBurger() {
    this.setState({ isActive: !this.state.isActive })
  }

  openCheckQueueModal() {
    this.setState({ isCheckQueueModalActive: true })
  }

  openCheckedQueueModal() {
    this.setState({ isCheckedQueueModalActive: true })
  }

  closeCheckQueueModal() {
    this.setState({ isCheckQueueModalActive: false })
  }

  closeCheckedQueueModal() {
    this.setState({ isCheckedQueueModalActive: false })
  }

  async checkQueue(name, tel) {
    this.closeCheckQueueModal()
    await this.store.queue.checkQueue(name, tel)
    this.setState({ checkedQueue: this.store.queue.checkedQueue })
    this.openCheckedQueueModal()
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
            <div className="navbar-start container menu-bar">
              <Link href="/">
                <a className="navbar-item has-text-light has-background-dark">
                  หน้าแรก
                </a>
              </Link>
              <Link href="/products">
                <a className="navbar-item has-text-light has-background-dark">
                  รายการทั้งหมด
                </a>
              </Link>
              <Link href="/instruction">
                <a className="navbar-item has-text-light has-background-dark">
                  ขั้นตอนการเช่า / เงื่อนไข
                </a>
              </Link>
              <Link href="/promotion">
                <a className="navbar-item has-text-light has-background-dark">
                  โปรโมชั่น
                </a>
              </Link>
              <Link href="/review">
                <a className="navbar-item has-text-light has-background-dark">
                  รีวิว
                </a>
              </Link>
              <a
                className="navbar-item has-text-light has-background-dark"
                onClick={this.openCheckQueueModal}
              >
                ตรวจสอบคิว
              </a>
              <Link href="/contact">
                <a className="navbar-item has-text-light has-background-dark">
                  ติดต่อ
                </a>
              </Link>
            </div>
          </div>
        </nav>
        <CheckQueueModal
          isActive={this.state.isCheckQueueModalActive}
          closeModal={this.closeCheckQueueModal}
          checkQueue={this.checkQueue}
        />
        <CheckedQueueModal
          isActive={this.state.isCheckedQueueModalActive}
          closeModal={this.closeCheckedQueueModal}
          checkedQueue={this.state.checkedQueue}
        />
      </section>
    )
  }
}

export default Header
