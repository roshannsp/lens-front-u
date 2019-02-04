import { observable, action, runInAction } from 'mobx'
import {
  get,
  addQueueByStartDate,
  addQueueByEndDate,
  deleteQueueByStartDate,
  deleteQueueByEndDate
} from '../services/queue'
import moment from 'moment'

export default class Queue {
  @observable queues = []
  @observable getQueuesStatue = ''
  @observable addQueueStatus = ''
  @observable deleteQueueStatus = ''
  @observable queuesForChecking = []
  @observable getQueuesForCheckingStatus = ''

  @action
  get = async dateTime => {
    this.getQueuesStatue = 'LOADING'
    try {
      const data = await get(dateTime)
      runInAction(() => {
        const queues = data.val()
        const tempQueues = []
        Object.keys(queues).map(queue => {
          let newQueue = Object.assign({}, queues[queue])
          newQueue.key = queue
          newQueue.color = this.getRandomColor()
          tempQueues.push(newQueue)
        })
        tempQueues.sort((a, b) => {
          const startDateDiff = moment(a.startDate).diff(moment(b.startDate))
          if (startDateDiff > 0) {
            return 1
          } else if (startDateDiff < 0) {
            return -1
          } else {
            const aDiff = moment(a.startDate).diff(moment(a.endDate))
            const bDiff = moment(b.startDate).diff(moment(b.endDate))
            if (aDiff > bDiff) {
              return 1
            } else if (aDiff < bDiff) {
              return -1
            } else {
              return 0
            }
          }
        })
        this.queues = tempQueues
        this.getQueuesStatue = 'SUCCESS'
      })
    } catch (error) {
      runInAction(() => {
        this.getQueuesStatue = 'FAILED'
      })
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  @action
  addQueue = async queue => {
    this.addQueueStatus = 'LOADING'
    try {
      const startDate = moment(queue.startDate)
      const endDate = moment(queue.endDate)
      const diffYear = startDate.year() - endDate.year()
      const diffMonth = startDate.month() - endDate.month()
      queue.timestamp = moment().unix()

      await addQueueByStartDate(queue)
      if (diffYear || diffMonth) {
        await addQueueByEndDate(queue)
      }
      runInAction(() => {
        this.addQueueStatus = 'SUCCESS'
      })
    } catch (error) {
      runInAction(() => {
        this.addQueueStatus = 'FAILED'
      })
    }
  }

  @action
  deleteQueue = async queue => {
    this.deleteQueueStatus = 'LOADING'
    try {
      const startDate = moment(queue.startDate)
      const endDate = moment(queue.endDate)
      const diffYear = startDate.year() - endDate.year()
      const diffMonth = startDate.month() - endDate.month()

      await deleteQueueByStartDate(queue)
      if (diffYear || diffMonth) {
        const data = await get(queue.endDate)
        const endDateQueues = data.val()
        Object.keys(endDateQueues).map(async key => {
          if (endDateQueues[key].timestamp === queue.timestamp) {
            const endDateQueue = Object.assign({}, endDateQueues[key])
            endDateQueue.key = key
            await deleteQueueByEndDate(endDateQueue)
          }
        })
      }
      runInAction(() => {
        this.deleteQueueStatus = 'SUCCESS'
      })
    } catch (error) {
      runInAction(() => {
        this.deleteQueueStatus = 'FAILED'
      })
    }
  }

  @action
  getQueuesForChecking = async (startDate, endDate) => {
    this.getQueuesForCheckingStatus = 'LOADING'
    try {
      const startDateTime = moment(startDate, 'YYYY-MM-DD')
      const endDateTime = moment(endDate, 'YYYY-MM-DD')
      const diffYear = startDateTime.year() - endDateTime.year()
      const diffMonth = startDateTime.month() - endDateTime.month()

      const startDateData = await get(startDate)
      let endDateData
      if (diffYear || diffMonth) {
        endDateData = await get(endDate)
      }
      runInAction(() => {
        let startDateQueues = startDateData.val()
        let endDateQueues = endDateData ? endDateData.val() : {}
        startDateQueues = Object.keys(startDateQueues).map(
          queue => startDateQueues[queue]
        )
        endDateQueues = Object.keys(endDateQueues).map(
          queue => endDateQueues[queue]
        )
        let tempQueues = startDateQueues.concat(endDateQueues)
        tempQueues = tempQueues.filter(queue => {
          const queueStartDate = moment(queue.startDate)
          const queueEndDate = moment(queue.endDate)
          const isStartDateIn =
            startDateTime.isSameOrAfter(queueStartDate) &&
            startDateTime.isSameOrBefore(queueEndDate)
          const isEndDateIn =
            endDateTime.isSameOrAfter(queueStartDate) &&
            endDateTime.isSameOrBefore(queueEndDate)
          const isQueueStartDateIn =
            queueStartDate.isSameOrAfter(startDateTime) &&
            queueStartDate.isSameOrBefore(endDateTime)
          const isQueueEndDateIn =
            queueEndDate.isSameOrAfter(startDateTime) &&
            queueEndDate.isSameOrBefore(endDateTime)
          return (
            isStartDateIn ||
            isEndDateIn ||
            isQueueStartDateIn ||
            isQueueEndDateIn
          )
        })
        this.queuesForChecking = tempQueues
        this.getQueuesForCheckingStatus = 'SUCCESS'
      })
    } catch (error) {
      runInAction(() => {
        this.getQueuesForCheckingStatus = 'FAILED'
      })
    }
  }

  @action
  resetAddQueueStatus = () => {
    runInAction(() => {
      this.addQueueStatus = ''
    })
  }
}
