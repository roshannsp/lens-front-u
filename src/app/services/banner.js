import { database, storage } from '../lib/firebase'
import 'babel-polyfill'

export const get = () => database.ref('/banners').once('value')

export const getBannerImage = async imageName => {
  const storageRef = storage.ref(`images/banners/${imageName}`)
  const imageUrl = await storageRef.getDownloadURL()
  return imageUrl
}
