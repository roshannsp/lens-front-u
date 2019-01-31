import { database, storage } from '../lib/firebase'

export const get = () => database.ref('/products').once('value')

export const getProductImage = async imageName => {
  const storageRef = storage.ref(`images/products/${imageName}`)
  const imageUrl = await storageRef.getDownloadURL()
  return imageUrl
}
