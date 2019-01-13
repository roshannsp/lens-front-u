import * as React from 'react'
import '../../public/style.scss'
import firebase from '../lib/firebase'
import App from '../components/App'
import { Provider } from 'mobx-react'
import store from '../stores'
import 'babel-polyfill'

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
