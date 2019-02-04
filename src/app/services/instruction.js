import { database } from '../lib/firebase'
import 'babel-polyfill'

export const get = () => database.ref('/instructions').once('value')
