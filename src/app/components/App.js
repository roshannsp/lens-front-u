import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import BrandList from './BrandList'
import 'lodash'

@inject('store')
@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
  }

  componentDidMount = async () => {
    this.mounted = true
    if (_.isEmpty(this.store.brand.brands)) {
      await this.store.brand.get()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    return (
      <main>
        <Header />
        <div className="container" style={{ paddingTop: 2 + 'rem' }}>
          <BrandList />
          <hr />
          <div>
            <h1 className="is-size-3 has-text-centered">
              ร้าน LensFrontU ให้เช่ากล้อง เช่าเลนส์ และ ให้เช่าอุปกรณ์ถ่ายภาพ
              DSLR Mirrorless ทุกระดับ Canon · Nikon · Sony · Leica · Fujifilm ·
              Olympus · GoPro · DJI OSMO
            </h1>
          </div>
          <hr />
        </div>
        <Footer />
      </main>
    )
  }
}

App.propTypes = {
  store: PropTypes.object
}

export default App
