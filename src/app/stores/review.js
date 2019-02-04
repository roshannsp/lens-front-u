import { observable, action, runInAction } from 'mobx'
import { get } from '../services/review'

export default class Review {
  @observable reviews = []
  @observable getReviewsStatus = ''

  @action
  get = async () => {
    this.getReviewsStatus = 'LOADING'
    try {
      const data = await get()
      runInAction(() => {
        this.reviews = data.val()
        this.getReviewsStatus = 'SUCCESS'
      })
    } catch (error) {
      runInAction(() => {
        this.getReviewsStatus = 'FAILED'
      })
    }
  }
}
