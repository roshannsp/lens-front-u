import { database } from '../lib/firebase'

export const get = () => database.ref('/brands').once('value')

export const getProduct = brand =>
  database.ref(`/brands/${brand}/products`).once('value')
