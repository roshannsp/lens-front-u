import { database } from '../lib/firebase'

export const get = () => database.ref('/brands').once('value')
