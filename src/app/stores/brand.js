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

  @action
  set = async brands => {
    try {
      runInAction(() => {
        this.brands = brands
      })
    } catch (error) {
      console.log(error)
    }
  }

  @action
  setProducts = async (brand, products) => {
    try {
      runInAction(() => {
        this.brands[brand].products = products
      })
    } catch (error) {
      console.log(error)
    }
  }
}
