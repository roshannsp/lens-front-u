import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import moment from 'moment'

@inject('store')
@observer
class EditQueueModal extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      name: '',
      tel: '',
      note: '',
      startDate: '',
      endDate: '',
      productId: '',
      products: []
    }
    this.editQueue = this.editQueue.bind(this)
    this.deleteQueue = this.deleteQueue.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if (
      name === 'startDate' &&
      (this.state.endDate === '' ||
        (this.state.endDate &&
          moment(this.state.endDate).isBefore(moment(value))))
    ) {
      this.setState({
        endDate: value
      })
    }

    if (
      name === 'endDate' &&
      this.state.startDate &&
      moment(this.state.startDate).isAfter(moment(value))
    ) {
      this.setState({
        startDate: ''
      })
    }

    this.setState(
      {
        [name]: value
      },
      () => {
        if (name === 'startDate' || name === 'endDate') {
          if (this.state.startDate && this.state.endDate) {
            this.getAvailableProducts()
          }
        }
      }
    )
  }

  getAvailableProducts = async () => {
    await this.store.queue.getQueuesForChecking(
      this.state.startDate,
      this.state.endDate
    )
    await this.store.product.get()
    const queues = this.store.queue.queuesForChecking
    const products = this.store.product.products
    queues.map(queue => {
      const product = products.find(product => product.id === queue.productId)
      if (product) {
        product.amount--
      }
    })
    this.setState({ products })
  }

  editQueue() {
    const oldQueue = this.props.queue
    const queue = {
      name: this.state.name || oldQueue.name,
      tel: this.state.tel || oldQueue.tel,
      note: this.state.note || oldQueue.note,
      startDate: this.state.startDate || oldQueue.startDate,
      endDate: this.state.endDate || oldQueue.endDate,
      productId: this.state.productId || oldQueue.productId
    }
    const { name, tel, startDate, endDate, productId } = queue
    if (name && tel && startDate && endDate && productId) {
      if (confirm('แก้ไข?')) {
        this.props.editQueue(oldQueue, queue)
      }
    } else {
      alert('กรุณาระบุข้อมูลสำคัญให้ครบ')
    }
  }

  deleteQueue() {
    if (confirm('ลบ?')) {
      this.props.deleteQueue(this.props.queue)
    }
  }

  render() {
    const products = this.state.products
    const queue = this.props.queue
    let isActive = this.props.isActive && 'is-active'
    return (
      <div className={'modal ' + isActive}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">แก้ไขคิว</p>
            <button className="delete" onClick={this.props.closeModal} />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">ชื่อ</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={this.state.name || (queue && queue.name) || ''}
                  onChange={this.handleInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">เบอร์โทร</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="tel"
                  name="tel"
                  value={this.state.tel || (queue && queue.tel) || ''}
                  onChange={this.handleInputChange}
                  minLength={10}
                  maxLength={10}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-phone" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">รายละเอียดเพิ่มเติม</label>
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea"
                  name="note"
                  value={this.state.note || (queue && queue.note) || ''}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="box">
              <article className="media">
                <div className="media-content">
                  <div className="content is-desktop">
                    <p className="title is-size-5 has-text-info has-text-underline">
                      ลงคิว
                    </p>
                    <div className="field columns">
                      <div className="control column">
                        <p className="has-text-weight-bold">ตั้งแต่</p>
                        <input
                          className="input is-info"
                          type="date"
                          placeholder="ตั้งแต่"
                          name="startDate"
                          value={
                            this.state.startDate ||
                            (queue && queue.startDate) ||
                            ''
                          }
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <div className="control column">
                        <p className="has-text-weight-bold">ถึง</p>
                        <input
                          className="input is-info"
                          type="date"
                          placeholder="ถึง"
                          name="endDate"
                          value={
                            this.state.endDate || (queue && queue.endDate) || ''
                          }
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label has-text-light">อุปกรณ์</label>
                      <div className="control">
                        <div className="select" style={{ width: '100%' }}>
                          <select
                            style={{ width: '100%' }}
                            name="productId"
                            value={
                              this.state.productId ||
                              (queue && queue.productId) ||
                              ''
                            }
                            onChange={this.handleInputChange}
                          >
                            <option style={{ width: '100%' }}>เลือก</option>
                            {products &&
                              products.map(
                                product =>
                                  product.amount > 0 && (
                                    <option key={product.id} value={product.id}>
                                      {product.name}
                                    </option>
                                  )
                              )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={this.editQueue}>
              แก้ไข
            </button>
            <button className="button is-danger" onClick={this.deleteQueue}>
              ลบ
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

export default EditQueueModal
