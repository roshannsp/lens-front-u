import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Week from './Week'
import moment from 'moment'
import Topbar from './Topbar'
import AddQueueModal from './AddQueueModal'

@inject('store')
@observer
class Admin extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      dateTime: moment(),
      isAddQueueModalActive: false
    }
    this.previousMonth = this.previousMonth.bind(this)
    this.todayMonth = this.todayMonth.bind(this)
    this.nextMonth = this.nextMonth.bind(this)
    this.openAddQueueModal = this.openAddQueueModal.bind(this)
    this.closeAddQueueModal = this.closeAddQueueModal.bind(this)
    this.escFunction = this.escFunction.bind(this)
    this.submitQueue = this.submitQueue.bind(this)
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.closeAddQueueModal()
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false)
  }

  getDaysInMonth() {
    const dateTime = this.state.dateTime
    let date = moment(dateTime).startOf('month')
    let weeks = []
    let days = []
    for (let i = date.day(); i > 0; i--) {
      const dateBefore = moment(dateTime).date(date.date() - i)
      days.push(moment(dateBefore))
    }
    while (date.month() === moment(dateTime).month()) {
      days.push(moment(date))
      if (date.day() === 6) {
        weeks.push(days)
        days = []
      }
      date.date(date.date() + 1)
    }
    for (let i = date.day(); i <= 6; i++) {
      days.push(moment(date))
      date.date(date.date() + 1)
    }
    weeks.push(days)
    return weeks
  }

  renderWeeks() {
    const weeks = this.getDaysInMonth()
    const dateTime = this.state.dateTime
    return weeks.map((week, i) => (
      <Week dateTime={dateTime} key={i} week={week} isFirstWeek={i === 0} />
    ))
  }

  changeMonth(value) {
    let dateTime = moment()
    if (value !== 0) {
      dateTime = moment(this.state.dateTime).subtract(-value, 'months')
    }
    this.setState({
      dateTime
    })
  }

  previousMonth() {
    this.changeMonth(-1)
  }

  todayMonth() {
    this.changeMonth(0)
  }

  nextMonth() {
    this.changeMonth(1)
  }

  openAddQueueModal = async () => {
    this.setState({ isAddQueueModalActive: true })
    await this.store.product.get()
  }

  closeAddQueueModal() {
    this.setState({ isAddQueueModalActive: false })
  }

  submitQueue(value) {
    const { name, tel, note, productId, startDate, endDate } = value
    console.log('name', name)
    console.log('tel', tel)
    console.log('note', note)
    console.log('productId', productId)
    this.closeAddQueueModal()
  }

  render() {
    const dateTime = this.state.dateTime
    return (
      <main className="height-100">
        <Topbar
          dateTime={dateTime}
          previousMonth={this.previousMonth}
          todayMonth={this.todayMonth}
          nextMonth={this.nextMonth}
          openAddQueueModal={this.openAddQueueModal}
        />
        <AddQueueModal
          isActive={this.state.isAddQueueModalActive}
          closeModal={this.closeAddQueueModal}
          submitForm={this.submitQueue}
        />
        <div className="height-100">{this.renderWeeks()}</div>
      </main>
    )
  }
}

Admin.propTypes = {
  store: PropTypes.object
}

export default Admin
