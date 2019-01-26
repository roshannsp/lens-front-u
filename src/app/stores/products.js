import { observable, action, runInAction } from 'mobx'

export default class Brand {
  @observable products = []

  @action
  set = products => {
    try {
      runInAction(() => {
        this.products = products
      })
    } catch (error) {
      console.log(error)
    }
  }
}
