import * as React from 'react'
import { Provider } from 'mobx-react'
import store from '../stores'
import 'babel-polyfill'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../../public/style.scss'
import Reviews from '../components/reviews/Reviews'

export default () => (
  <Provider store={store}>
    <main>
      <Header />
      <div className="container" style={{ paddingTop: 2 + 'rem' }}>
        <h2 className="title has-text-light is-size-2 is-uppercase header-title">
          รีวิว
        </h2>
        <Reviews />
      </div>
      <Footer />
    </main>
  </Provider>
)
