import { database } from '../lib/firebase'
import moment from 'moment'

export const get = dateTime =>
  database
    .ref(`/queues/${moment(dateTime).year()}/${moment(dateTime).month()}`)
    .once('value')

export const addQueueByStartDate = queue =>
  database
    .ref(
      `/queues/${moment(queue.startDate).year()}/${moment(
        queue.startDate
      ).month()}`
    )
    .push()
    .set(queue)

export const addQueueByEndDate = queue =>
  database
    .ref(
      `/queues/${moment(queue.endDate).year()}/${moment(queue.endDate).month()}`
    )
    .push()
    .set(queue)

export const deleteQueueByStartDate = queue =>
  database
    .ref(
      `/queues/${moment(queue.startDate).year()}/${moment(
        queue.startDate
      ).month()}/${queue.key}`
    )
    .remove(error => console.log('error', error))

export const deleteQueueByEndDate = queue =>
  database
    .ref(
      `/queues/${moment(queue.endDate).year()}/${moment(
        queue.endDate
      ).month()}/${queue.key}`
    )
    .remove()
