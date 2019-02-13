import { observable, action, runInAction } from 'mobx'
import { get } from '../services/user'

export default class User {
  @observable isLogedIn = false
  @observable getUsersStatus = ''

  @action
  login = async (username, password) => {
    this.isLogedIn = false
    this.getUsersStatus = 'LOADING'
    try {
      const data = await get(username)
      runInAction(() => {
        const passwordData = data.val()
        if (passwordData && passwordData === password) {
          this.isLogedIn = true
          this.getUsersStatus = 'SUCCESS'
        } else {
          this.isLogedIn = false
          this.getUsersStatus = 'FAILED'
        }
      })
    } catch (error) {
      runInAction(() => {
        this.isLogedIn = false
        this.getUsersStatus = 'FAILED'
      })
    }
  }
}
