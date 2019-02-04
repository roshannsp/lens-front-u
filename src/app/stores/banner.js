import { observable, action, runInAction } from 'mobx'
import { get } from '../services/banner'

export default class Banner {
  @observable banners = []
  @observable getBannersStatus = ''

  @action
  get = async () => {
    this.getBannersStatus = 'LOADING'
    try {
      const data = await get()
      runInAction(() => {
        this.banners = data.val()
        this.getBannersStatus = 'SUCCESS'
      })
    } catch (error) {
      runInAction(() => {
        this.getBannersStatus = 'FAILED'
      })
    }
  }
}
