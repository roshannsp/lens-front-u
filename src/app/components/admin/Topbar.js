import React, { Component } from 'react'
import Head from 'next/head'

class Topbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const dateTime = this.props.dateTime
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
          <div className="navbar-menu">
            <div className="navbar-start">
              <p className="navbar-item has-text-light">
                {dateTime.format('MMMM')}
              </p>
              <p className="navbar-item has-text-light">
                {dateTime.format('YYYY')}
              </p>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <a
                  className="button is-success"
                  onClick={this.props.openAddQueueModal}
                >
                  <span className="icon is-small">
                    <i className="fas fa-plus" />
                  </span>
                </a>
              </div>
              <div className="navbar-item">
                <div className="buttons has-addons">
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
              </div>
            </div>
          </div>
        </nav>
      </section>
    )
  }
}

export default Topbar
