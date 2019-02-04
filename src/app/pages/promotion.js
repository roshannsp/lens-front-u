import * as React from 'react'
import { Provider } from 'mobx-react'
import store from '../stores'
import 'babel-polyfill'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Promotions from '../components/promotions/Promotions'
import '../../public/style.scss'

export default () => (
  <Provider store={store}>
    <main>
      <Header />
      <div className="container" style={{ paddingTop: 2 + 'rem' }}>
        <h2 className="title has-text-light is-size-2 is-uppercase header-title">
          โปรโมชั่น
        </h2>
        <Promotions />
      </div>
      <Footer />
    </main>
  </Provider>
)
