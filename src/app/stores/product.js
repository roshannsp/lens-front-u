import { observable, action, runInAction } from 'mobx'
import { get } from '../services/product'

export default class Brand {
  @observable products = []
  @observable getProductsStatus = ''

  @action
  get = async () => {
    this.getProductsStatus = 'LOADING'
    try {
      const data = await get()
      runInAction(() => {
        this.products = data.val()
        this.getProductsStatus = 'SUCCESS'
      })
    } catch (error) {
      runInAction(() => {
        this.getProductsStatus = 'FAILED'
      })
    }
  }

  @action
  set = async products => {
    try {
      runInAction(() => {
        this.products = products
      })
    } catch (error) {
      console.log(error)
    }
  }
}
