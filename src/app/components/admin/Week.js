import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Day from './Day'

const days = [
  'อาทิตย์',
  'จันทร์',
  'อังคาร',
  'พุธ',
  'พฤหัสบดี',
  'ศุกร์',
  'เสาร์'
]

@inject('store')
@observer
class Week extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
  }

  renderQueue() {
    return <div />
  }

  render() {
    const week = this.props.week
    const isFirstWeek = this.props.isFirstWeek
    const dateTime = this.props.dateTime
    return (
      <div className="columns is-gapless is-marginless height-20">
        <div className="column is-2 height-100">
          {week[0].day() === 0 && (
            <Day dateTime={dateTime} isFirstWeek={isFirstWeek} day={week[0]} />
          )}
        </div>
        <div className="column is-8 height-100">
          <div className="columns is-gapless height-100">
            {week.map((day, i) => {
              if ([0, 6].indexOf(day.day()) === -1) {
                return (
                  <div key={i} className="column">
                    <Day
                      dateTime={dateTime}
                      isFirstWeek={isFirstWeek}
                      day={day}
                    />
                  </div>
                )
              }
            })}
          </div>
        </div>
        <div className="column is-2 height-100">
          {week[week.length - 1].day() === 6 && (
            <Day
              dateTime={dateTime}
              isFirstWeek={isFirstWeek}
              day={week[week.length - 1]}
            />
          )}
        </div>
      </div>
    )
  }
}

Week.propTypes = {
  store: PropTypes.object
}

export default Week
