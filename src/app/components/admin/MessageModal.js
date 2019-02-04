import React, { Component } from 'react'

class MessageModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isActive = this.props.isActive && 'is-active'
    const message = this.props.message
    return (
      <div className={'modal ' + isActive}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Alert</p>
            <button className="delete" onClick={this.props.closeModal} />
          </header>
          <section
            className="modal-card-body"
            style={{
              borderBottomLeftRadius: '6px',
              borderBottomRightRadius: '6px'
            }}
          >
            <p className="has-text-dark">{message}</p>
          </section>
        </div>
      </div>
    )
  }
}

export default MessageModal
