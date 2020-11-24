import { database, storage } from '../lib/firebase'
import 'babel-polyfill'

export const get = () => database.ref('/qrcode').once('value')

export const getQRCodeImage = async (imageName) => {
  const storageRef = storage.ref(`images/qrcode/${imageName}`)
  const imageUrl = await storageRef.getDownloadURL()
  return imageUrl
}
