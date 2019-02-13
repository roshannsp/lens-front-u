import React, { Component } from 'react'
import Head from 'next/head'
import * as moment from 'moment'

class Topbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false
    }
    this.toggleBurger = this.toggleBurger.bind(this)
  }

  componentDidMount() {
    moment.locale('th')
  }

  toggleBurger() {
    this.setState({ isActive: !this.state.isActive })
  }

  render() {
    const dateTime = this.props.dateTime
    const isActive = oldClass => {
      return oldClass + (this.state.isActive ? ' is-active' : '')
    }
    return (
      <section>
        <Head>
          <title>Admin Lens Front U</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <nav className="navbar">
          <div className="navbar-brand">
            <a className="navbar-item">
              <p className="navbar-item has-text-light">
                {dateTime.format('MMMM')}
              </p>
              <p className="navbar-item has-text-light">
                {dateTime.format('YYYY')}
              </p>
            </a>

            <a
              role="button"
              className="navbar-burger burger"
              className={isActive('navbar-burger burger has-text-light')}
              onClick={this.toggleBurger}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div className={isActive('navbar-menu')}>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <div
                    className="button is-success"
                    onClick={this.props.openAddQueueModal}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-plus" />
                    </span>
                  </div>
                  <div className="buttons has-addons is-marginless">
                    <span
                      className="button is-danger"
                      onClick={this.props.previousMonth}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-chevron-left" />
                      </span>
                    </span>
                    <span
                      className="button is-danger"
                      onClick={this.props.todayMonth}
                    >
                      Today
                    </span>
                    <span
                      className="button is-danger"
                      onClick={this.props.nextMonth}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-chevron-right" />
                      </span>
                    </span>
                  </div>
                  <span />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </section>
    )
  }
}

export default Topbar
