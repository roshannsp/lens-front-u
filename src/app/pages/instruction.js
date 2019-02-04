import * as React from 'react'
import { Provider } from 'mobx-react'
import store from '../stores'
import 'babel-polyfill'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Product from '../components/product/Product'
import '../../public/style.scss'

export default () => (
  <Provider store={store}>
    <main>
      <Header />
      <div className="container" style={{ paddingTop: 2 + 'rem' }}>
        <h1 className="title is-size-2 has-text-light">
          ขั้นตอนการเช่า/เงื่อนไข
        </h1>
      </div>
      <Footer />
    </main>
  </Provider>
)
