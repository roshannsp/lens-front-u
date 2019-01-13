import { observable, action, runInAction } from 'mobx'
import { get } from '../services/brand'

export default class Brand {
  @observable brands = {}
  @observable getBrandStatus = ''

  @action
  get = async () => {
    this.getBrandStatus = 'LOADING'
    try {
      const data = await get()
      runInAction(() => {
        this.brands = data.val()
        this.getBrandStatus = 'SUCCESS'
      })
    } catch (error) {
      runInAction(() => {
        this.getBrandStatus = 'FAILED'
      })
    }
  }

  test = () => {
    return 'test'
  }
}
