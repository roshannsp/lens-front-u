import { observable, action, runInAction } from 'mobx'
import { get } from '../services/instruction'

export default class Instruction {
  @observable instructions = []
  @observable getInstructionsStatus = ''

  @action
  get = async () => {
    this.getInstructionsStatus = 'LOADING'
    try {
      const data = await get()
      runInAction(() => {
        this.instructions = data.val()
        this.getInstructionsStatus = 'SUCCESS'
      })
    } catch (error) {
      runInAction(() => {
        this.getInstructionsStatus = 'FAILED'
      })
    }
  }
}
