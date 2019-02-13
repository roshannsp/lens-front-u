import React, { Component } from 'react'

class MessageModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isActive = this.props.isActive && 'is-active'
    const {
      title,
      productName,
      startDateMessage,
      endDateMessage,
      totalPriceMessage,
      isProductAvailable
    } = this.props
    return (
      <div className={'modal ' + isActive}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" onClick={this.props.closeModal} />
          </header>
          <section className="modal-card-body">
            <p className="has-text-dark">{productName}</p>
            <p className="has-text-dark">{startDateMessage}</p>
            <p className="has-text-dark">{endDateMessage}</p>
            <p className="has-text-dark">{totalPriceMessage}</p>
          </section>
          <footer className="modal-card-foot">
            {isProductAvailable && (
              <button
                className="button is-success"
                onClick={this.props.openUrlScheme}
              >
                ติดต่อเช่า
              </button>
            )}
            <button className="button" onClick={this.props.closeModal}>
              ปิด
            </button>
          </footer>
        </div>
      </div>
    )
  }
}

export default MessageModal
