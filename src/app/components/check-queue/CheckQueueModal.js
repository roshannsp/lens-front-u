import React, { Component } from 'react'

class CheckQueueModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      tel: '',
      isFirstActive: true
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.enterFunction = this.enterFunction.bind(this)
    this.checkQueue = this.checkQueue.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.enterFunction, false)
    this.nameInput.focus()
  }

  componentDidUpdate() {
    if (this.props.isActive && this.state.isFirstActive) {
      document.addEventListener('keydown', this.enterFunction, false)
      this.nameInput.focus()
      this.setState({ isFirstActive: false })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.enterFunction, false)
  }

  enterFunction(event) {
    if (event.keyCode === 13) {
      this.checkQueue()
    }
  }

  handleInputChange(event) {
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({ [name]: value })
  }

  checkQueue() {
    const { name, tel } = this.state
    if (name.length >= 2 || (tel && tel.match(/\d{10}/))) {
      this.props.checkQueue(this.state.name, this.state.tel)
      document.removeEventListener('keydown', this.enterFunction, false)
      this.setState({
        name: '',
        tel: '',
        isFirstActive: true
      })
    } else {
      alert('กรุณากรอกข้อมูลอย่างใดอย่างหนึ่งให้ถูกต้อง')
    }
  }

  closeModal() {
    this.setState({
      name: '',
      tel: '',
      isFirstActive: true
    })
    this.props.closeModal()
  }

  render() {
    const isActive = this.props.isActive && 'is-active'
    return (
      <div className={'modal ' + isActive}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">ตรวจสอบคิว</p>
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
                  ref={input => {
                    this.nameInput = input
                  }}
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
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={this.checkQueue}>
              ตรวจสอบ
            </button>
            <button className="button" onClick={this.closeModal}>
              ปิด
            </button>
          </footer>
        </div>
      </div>
    )
  }
}

export default CheckQueueModal
