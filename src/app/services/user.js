import { database } from '../lib/firebase'
import 'babel-polyfill'

export const get = username => database.ref('/users/' + username).once('value')
