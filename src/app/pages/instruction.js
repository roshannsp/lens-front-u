import * as React from 'react'
import { Provider } from 'mobx-react'
import store from '../stores'
import 'babel-polyfill'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Product from '../components/product/Product'
import '../../public/style.scss'
import Instructions from '../components/instructions/Instructions'

export default () => (
  <Provider store={store}>
    <main>
      <Header />
      <div className="container" style={{ paddingTop: 2 + 'rem' }}>
        <h2 className="title has-text-light is-size-2 is-uppercase header-title">
          ขั้นตอนการเช่า/เงื่อนไข
        </h2>
        <Instructions />
      </div>
      <Footer />
    </main>
  </Provider>
)
