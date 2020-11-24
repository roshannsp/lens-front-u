import { observable, action, runInAction } from 'mobx'
import { get } from '../services/qrcode'

export default class QRCode {
  @observable qrcode = {}
  @observable getQRCodeStatus = ''

  @action
  get = async () => {
    this.getQRCodeStatus = 'LOADING'
    try {
      const data = await get()
      runInAction(() => {
        this.qrcode = data.val()
        this.getQRCodeStatus = 'SUCCESS'
      })
    } catch (error) {
      runInAction(() => {
        this.getQRCodeStatus = 'FAILED'
      })
    }
  }
}
