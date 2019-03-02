import React, { Component } from 'react'
import moment from 'moment'

class CheckQueueModal extends Component {
  constructor(props) {
    super(props)
  }

  mappingDate(startDate, endDate) {
    const dateFormat = 'D MMMM YYYY'
    return `${moment(startDate).format(dateFormat)} - ${moment(endDate).format(
      dateFormat
    )}`
  }

  render() {
    const isActive = this.props.isActive && 'is-active'
    const queues = this.props.checkedQueue
    return (
      <div className={'modal ' + isActive}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">ตรวจสอบคิว</p>
            <button className="delete" onClick={this.props.closeModal} />
          </header>
          <section className="modal-card-body">
            {queues && queues.length > 0 ? (
              queues.map((queue, index) => (
                <div>
                  <p key={index} className="has-text-dark">
                    {index + 1}. {queue.productId} :{' '}
                    {this.mappingDate(queue.startDate, queue.endDate)}
                  </p>
                </div>
              ))
            ) : (
              <p className="has-text-dark">ไม่พบคิวของคุณ</p>
            )}
          </section>
          <footer className="modal-card-foot">
            <button className="button" onClick={this.props.closeModal}>
              ปิด
            </button>
          </footer>
        </div>
      </div>
    )
  }
}

export default CheckQueueModal
