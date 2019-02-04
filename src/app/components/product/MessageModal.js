import React, { Component } from 'react'

class MessageModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isActive = this.props.isActive && 'is-active'
    const { message, subMessage, subMessage2 } = this.props
    return (
      <div className={'modal ' + isActive}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Alert</p>
            <button className="delete" onClick={this.props.closeModal} />
          </header>
          <section className="modal-card-body">
            <p className="has-text-dark">{message}</p>
            <p className="has-text-dark">{subMessage}</p>
            <p className="has-text-dark">{subMessage2}</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={this.props.openLine}>
              ติดต่อเช่า
            </button>
            <button className="button" onClick={this.props.closeModal}>
              ยกเลิก
            </button>
          </footer>
        </div>
      </div>
    )
  }
}

export default MessageModal
