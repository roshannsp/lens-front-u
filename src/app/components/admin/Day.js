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
  'เสาร์'
]

@inject('store')
@observer
class Day extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
  }

  renderQueue() {
    return <div />
  }

  render() {
    const dateTime = this.props.dateTime
    const day = this.props.day
    const dayOfWeek = day.day()
    const isOtherMonth =
      moment(dateTime).month() !== day.month() && 'is-disabled'
    const isFirstWeek = this.props.isFirstWeek
    const isToday = moment().isSame(day, 'day') && 'has-background-danger'
    return (
      <div className={'card  height-100 ' + isOtherMonth}>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              {isFirstWeek && (
                <p className="title is-6 has-text-centered">
                  {days[dayOfWeek]}
                </p>
              )}
              <p className={'subtitle is-6 has-text-centered ' + isToday}>
                {day.date()}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Day.propTypes = {
  store: PropTypes.object
}

export default Day
