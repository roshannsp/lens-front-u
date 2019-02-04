import { observable, action, runInAction } from 'mobx'
import { get } from '../services/promotion'

export default class Promotion {
  @observable promotions = []
  @observable getPromotionsStatus = ''

  @action
  get = async () => {
    this.getPromotionsStatus = 'LOADING'
    try {
      const data = await get()
      runInAction(() => {
        this.promotions = data.val()
        this.getPromotionsStatus = 'SUCCESS'
      })
    } catch (error) {
      runInAction(() => {
        this.getPromotionsStatus = 'FAILED'
      })
    }
  }
}
