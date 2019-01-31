import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

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
      productId: '',
      startDate: null,
      endDate: null
    }
    this.submitForm = this.submitForm.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  submitForm() {
    const { name, tel, note, productId, startDate, endDate } = this.state
    this.props.submitForm(this.state)
  }

  render() {
    const products = this.store.product.products
    const dateTime = this.props.dateTime
    let isActive = this.props.isActive && 'is-active'
    return (
      <div className={'modal ' + isActive}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">เพิ่มคิว</p>
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
            <div className="field">
              <label className="label">อุปกรณ์</label>
              <div className="control">
                <div className="select" style={{ width: '100%' }}>
                  <select
                    style={{ width: '100%' }}
                    name="productId"
                    value={this.state.productId}
                    onChange={this.handleInputChange}
                  >
                    <option style={{ width: '100%' }}>เลือก</option>
                    {products &&
                      products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={this.submitForm}>
              บันทึก
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

export default AddQueueModal
