import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import moment from 'moment'

const initialState = {
  name: '',
  tel: '',
  note: '',
  startDate: '',
  endDate: '',
  productId: '',
  products: []
}

@inject('store')
@observer
class AddQueueModal extends Component {
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
    this.submitForm = this.submitForm.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    this.setState(initialState)
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

  submitForm() {
    const { name, tel, startDate, endDate, productId } = this.state
    if (name && tel && startDate && endDate && productId) {
      this.props.submitForm({ name, tel, startDate, endDate, productId })
      this.closeModal()
    } else {
      alert('กรุณาระบุข้อมูลสำคัญให้ครบ')
    }
  }

  closeModal() {
    this.setState(initialState)
    this.props.closeModal()
  }

  render() {
    const products = this.state.products
    const dateTime = this.props.dateTime
    let isActive = this.props.isActive && 'is-active'
    return (
      <div className={'modal ' + isActive}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">เพิ่มคิว</p>
            <button className="delete" onClick={this.closeModal} />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">ชื่อ</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={this.state.name}
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
                  value={this.state.tel}
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
                  value={this.state.note}
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
                          value={this.state.startDate}
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
                          value={this.state.endDate}
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
                            value={this.state.productId}
                            onChange={this.handleInputChange}
                            required
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
            <button className="button is-success" onClick={this.submitForm}>
              บันทึก
            </button>
            <button className="button" onClick={this.closeModal}>
              ยกเลิก
            </button>
          </footer>
        </div>
      </div>
    )
  }
}

export default AddQueueModal
