import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Week from './Week'
import moment from 'moment'
import Topbar from './Topbar'
import AddQueueModal from './AddQueueModal'
import MessageModal from './MessageModal'
import EditQueueModal from './EditQueueModal'

@inject('store')
@observer
class Admin extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      dateTime: moment(),
      isAddQueueModalActive: false,
      isMessageModalActive: false,
      isEditQueueModalActive: false,
      messageMessageModal: '',
      editingQueue: null
    }
    this.previousMonth = this.previousMonth.bind(this)
    this.todayMonth = this.todayMonth.bind(this)
    this.nextMonth = this.nextMonth.bind(this)
    this.openAddQueueModal = this.openAddQueueModal.bind(this)
    this.closeAddQueueModal = this.closeAddQueueModal.bind(this)
    this.closeMessageModal = this.closeMessageModal.bind(this)
    this.openEditQueueModal = this.openEditQueueModal.bind(this)
    this.closeEditQueueModal = this.closeEditQueueModal.bind(this)
    this.editQueue = this.editQueue.bind(this)
    this.deleteQueue = this.deleteQueue.bind(this)
    this.escFunction = this.escFunction.bind(this)
    this.submitQueue = this.submitQueue.bind(this)
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.closeAddQueueModal()
      this.closeMessageModal()
    }
  }

  componentDidMount() {
    moment().locale('th')
    this.getQueues()
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
      days.push({ dateTime: moment(dateBefore), queues: {} })
    }
    let i = 0
    while (date.month() === moment(dateTime).month()) {
      days.push({ dateTime: moment(date), queues: {} })
      if (date.day() === 6) {
        weeks.push(days)
        days = []
      }
      date.date(date.date() + 1)
    }
    for (let i = date.day(); i <= 6; i++) {
      days.push({ dateTime: moment(date), queues: {} })
      date.date(date.date() + 1)
    }
    weeks.push(days)
    return weeks
  }

  renderQueues(weeks) {
    const queues = this.store.queue.queues
    queues.map(queue => {
      const startDate = moment(queue.startDate)
      const endDate = moment(queue.endDate)
      let index = null
      weeks.map(week => {
        week.map(day => {
          const refDate = day.dateTime
          if (
            refDate.isSameOrAfter(startDate) &&
            refDate.isSameOrBefore(endDate)
          ) {
            let i = 0
            while (index === null) {
              if (!day.queues[i]) {
                index = i
              }
              i++
            }
            day.queues[index] = queue
          }
        })
      })
    })
    return weeks
  }

  renderWeeks() {
    let weeks = this.getDaysInMonth()
    weeks = this.renderQueues(weeks)
    const dateTime = this.state.dateTime
    return weeks.map((week, i) => (
      <Week
        dateTime={dateTime}
        key={i}
        week={week}
        isFirstWeek={i === 0}
        openEditQueueModal={this.openEditQueueModal}
      />
    ))
  }

  changeMonth(value) {
    let dateTime = moment()
    if (value !== 0) {
      dateTime = moment(this.state.dateTime).subtract(-value, 'months')
    }
    this.setState(
      {
        dateTime
      },
      () => this.getQueues()
    )
  }

  getQueues = async () => {
    await this.store.queue.get(this.state.dateTime)
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
  }

  closeAddQueueModal = async () => {
    this.setState({ isAddQueueModalActive: false })
    await this.store.queue.get(this.state.dateTime)
  }

  closeMessageModal = async () => {
    await this.store.queue.resetAddQueueStatus()
    this.getQueues()
  }

  openEditQueueModal = async queue => {
    this.setState({ isEditQueueModalActive: true, editingQueue: queue })
    await this.store.product.get()
  }

  closeEditQueueModal() {
    this.setState({ isEditQueueModalActive: false })
  }

  submitQueue = async queue => {
    this.closeAddQueueModal()
    await this.store.queue.addQueue(queue)
  }

  editQueue = async (oldQueue, queue) => {
    this.closeEditQueueModal()
    await this.store.queue.deleteQueue(oldQueue)
    await this.store.queue.addQueue(queue)
    await this.store.queue.get(this.state.dateTime)
  }

  deleteQueue = async queue => {
    this.closeEditQueueModal()
    await this.store.queue.deleteQueue(queue)
    await this.store.queue.get(this.state.dateTime)
  }

  render() {
    const dateTime = this.state.dateTime
    const addQueueStatus = this.store.queue.addQueueStatus
    const isMessageModalActive = addQueueStatus && addQueueStatus !== 'LOADING'
    return (
      <main className="height-100">
        <Topbar
          dateTime={dateTime}
          previousMonth={this.previousMonth}
          todayMonth={this.todayMonth}
          nextMonth={this.nextMonth}
          openAddQueueModal={this.openAddQueueModal}
          openEditQueueModal={this.openEditQueueModal}
        />
        <AddQueueModal
          isActive={this.state.isAddQueueModalActive}
          closeModal={this.closeAddQueueModal}
          submitForm={this.submitQueue}
        />
        <MessageModal
          isActive={isMessageModalActive}
          closeModal={this.closeMessageModal}
          message={addQueueStatus}
        />
        <EditQueueModal
          isActive={this.state.isEditQueueModalActive}
          closeModal={this.closeEditQueueModal}
          queue={this.state.editingQueue}
          editQueue={this.editQueue}
          deleteQueue={this.deleteQueue}
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
