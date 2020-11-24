import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import moment from 'moment'

const days = [
  'อาทิตย์',
  'จันทร์',
  'อังคาร',
  'พุธ',
  'พฤหัสบดี',
  'ศุกร์',
  'เสาร์',
]

const colors = ['#E0BBE4', '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3']

@inject('store')
@observer
class Day extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.renderQueue = this.renderQueue.bind(this)
  }

  componentDidMount() {
    moment.locale('th')
  }

  renderQueue() {
    const day = this.props.day
    const queues = day.queues
    let renderQueues = []
    const findMaximum = Object.keys(queues)
      .map((key) => +key)
      .sort((a, b) => b - a)

    let isShowTooltip = ''
    if (typeof window !== 'undefined') {
      isShowTooltip = window && window.innerWidth > 768 ? 'tooltip' : ''
    }
    if (findMaximum) {
      const maximum = findMaximum[0]
      for (let i = 0; i <= maximum; i++) {
        const queue = queues[i]
        if (queue) {
          const startDate = moment(queue.startDate)
          const endDate = moment(queue.endDate)
          const isStartDate = day.dateTime.isSame(startDate) && 'start-date'
          const isEndDate = day.dateTime.isSame(endDate) && 'end-date'
          renderQueues.push(
            <a
              key={i}
              style={{
                backgroundColor: queue.color,
              }}
              className={
                'queue ' + isStartDate + ' ' + isEndDate + ' ' + isShowTooltip
              }
              onClick={() => this.props.openEditQueueModal(queue)}
              data-tooltip={`${queue.name} ${queue.productId}`}
            />
          )
        } else {
          renderQueues.push(
            <div
              key={i}
              style={{
                height: '10px',
                backgroundColor: 'transparent',
                margin: '5px 0',
                display: 'block',
              }}
            />
          )
        }
      }
    }
    return renderQueues
  }

  getRandomColor(index) {
    return colors[index % 5]
  }

  render() {
    const dateTime = this.props.dateTime
    const day = this.props.day.dateTime
    const isOtherMonth =
      moment(dateTime).month() !== day.month() && 'is-disabled'
    const isFirstWeek = this.props.isFirstWeek
    const isToday = moment().isSame(day, 'day') && 'has-background-danger round'
    return (
      <div className={'card height-100 ' + isOtherMonth}>
        <div className="card-content is-paddingless">
          <div className="media">
            <div className="media-content">
              {isFirstWeek && (
                <p className="title is-6 has-text-centered">
                  {day.format('ddd')}
                </p>
              )}
              <p
                className={'subtitle is-6 has-text-centered ' + isToday}
                style={{ marginBottom: '5px' }}
              >
                {day.format('D')}
              </p>
              {this.renderQueue()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Day.propTypes = {
  store: PropTypes.object,
}

export default Day
